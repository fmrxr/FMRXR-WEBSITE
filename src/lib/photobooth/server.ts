import "server-only";
import { timingSafeEqual } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { resolveConfig, type CampaignConfig } from "./config";
import { createHiggsfieldProvider, type ImageProvider } from "./higgsfield";
import { pollGeneration, type PhotoboothDb } from "./service";
import { brandedFromUrl } from "./branding";

// Cote serveur uniquement : client service_role, cle Higgsfield.

export type Campaign = {
  id: string;
  slug: string;
  name: string;
  client_name: string;
  status: "draft" | "active" | "suspended" | "ended";
  access_key: string;
  starts_at: string | null;
  expires_at: string | null;
  config: unknown;
};

export function getProvider(): ImageProvider | null {
  const keyId = process.env.HF_API_KEY_ID;
  const secret = process.env.HF_API_KEY_SECRET;
  if (!keyId || !secret) return null;
  return createHiggsfieldProvider({ keyId, secret });
}

function sameKey(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/**
 * Charge une campagne pour la borne. La cle d'acces est exigee : sans elle,
 * une campagne n'existe pas (meme reponse que pour un slug inconnu).
 */
export async function loadCampaign(slug: string, key: string | null): Promise<
  | { ok: true; campaign: Campaign; config: CampaignConfig }
  | { ok: false; error: "NOT_FOUND" | "CONFIG_INVALID"; detail?: string }
> {
  if (!slug || !key) return { ok: false, error: "NOT_FOUND" };
  const { data } = await getSupabaseAdmin()
    .from("photobooth_campaigns")
    .select("id, slug, name, client_name, status, access_key, starts_at, expires_at, config")
    .eq("slug", slug)
    .maybeSingle();
  if (!data || !sameKey(data.access_key, key)) return { ok: false, error: "NOT_FOUND" };
  const cfg = resolveConfig(data.config);
  if (!cfg.ok) return { ok: false, error: "CONFIG_INVALID", detail: cfg.error };
  return { ok: true, campaign: data as Campaign, config: cfg.config };
}

/** Etat affichable d'une campagne, avant tout appel payant (la reservation re-verifie tout). */
export function campaignAvailability(c: Campaign): string | null {
  const now = Date.now();
  if (c.status === "suspended") return "CAMPAIGN_SUSPENDED";
  if (c.status !== "active") return "CAMPAIGN_INACTIVE";
  if (c.starts_at && now < Date.parse(c.starts_at)) return "CAMPAIGN_NOT_STARTED";
  if (c.expires_at && now >= Date.parse(c.expires_at)) return "CAMPAIGN_EXPIRED";
  return null;
}

export function createSupabaseDb(): PhotoboothDb {
  const sb = getSupabaseAdmin();
  return {
    async reserve({ campaignId, sessionId, idempotencyKey, model, mood }) {
      const { data, error } = await sb.rpc("photobooth_reserve", {
        _campaign_id: campaignId, _session_id: sessionId,
        _idempotency_key: idempotencyKey, _model: model, _mood: mood,
      });
      if (error) return { ok: false, error: "RESERVE_FAILED" };
      return data;
    },
    async transition(usageId, to, fields = {}) {
      const { data, error } = await sb.rpc("photobooth_transition", {
        _usage_id: usageId, _to: to,
        _provider_job_id: fields.providerJobId ?? null,
        _status_url: fields.statusUrl ?? null,
        _result_url: fields.resultUrl ?? null,
        _error_code: fields.errorCode ?? null,
        _actual_cost_musd: null,
      });
      if (error) return { ok: false, error: error.message };
      return data;
    },
    async getUsage(usageId) {
      const { data } = await sb
        .from("photobooth_usage")
        .select("id, campaign_id, session_id, status, status_url, result_url, error_code, created_at, share_token")
        .eq("id", usageId)
        .maybeSingle();
      return data;
    },
  };
}

// Limite de debit par IP, en memoire : suffit pour un seul processus Node
// (Hostinger). Les plafonds qui comptent (quota, concurrence) sont en base.
const hits = new Map<string, number[]>();
export function rateLimited(ip: string, max = 6, windowMs = 60_000) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
}

// ---------- partage ----------

/** Les portraits restent chez Higgsfield au moins 7 jours : le lien vit autant. */
export const SHARE_TTL_MS = 7 * 24 * 3600 * 1000;

/** Le QR doit pointer vers le site public, jamais vers localhost. */
export function shareUrl(token: string) {
  const origin = process.env.PHOTOBOOTH_SHARE_ORIGIN || "https://fmrxr.com";
  return `${origin}/experience/photobooth/share/${token}`;
}

export function isShareActive(completedAt: string | null, now = Date.now()) {
  return Boolean(completedAt) && now - Date.parse(completedAt!) < SHARE_TTL_MS;
}

/** Portrait partage : reussi, de moins de 7 jours, campagne qui autorise le partage. */
export async function findShared(token: string): Promise<
  | { ok: true; resultUrl: string; title: Record<string, string> | null; campaignName: string; expiresAt: string; clientLogoUrl: string }
  | { ok: false; reason: "NOT_FOUND" | "EXPIRED" }
> {
  if (!/^[0-9a-f]{32}$/.test(token)) return { ok: false, reason: "NOT_FOUND" };
  const { data } = await getSupabaseAdmin()
    .from("photobooth_usage")
    .select("status, result_url, completed_at, mood, campaign:photobooth_campaigns(name, config)")
    .eq("share_token", token)
    .maybeSingle();
  if (!data || data.status !== "succeeded" || !data.result_url) return { ok: false, reason: "NOT_FOUND" };
  const campaign = (Array.isArray(data.campaign) ? data.campaign[0] : data.campaign) as { name: string; config: unknown } | null;
  const cfg = resolveConfig(campaign?.config);
  if (!cfg.ok || !cfg.config.shareEnabled) return { ok: false, reason: "NOT_FOUND" };
  if (!isShareActive(data.completed_at)) return { ok: false, reason: "EXPIRED" };
  const mood = data.mood as { title?: Record<string, string> } | null;
  return {
    ok: true,
    resultUrl: data.result_url,
    title: mood?.title ?? null,
    campaignName: campaign?.name ?? "",
    clientLogoUrl: cfg.config.clientLogoUrl,
    expiresAt: new Date(Date.parse(data.completed_at!) + SHARE_TTL_MS).toISOString(),
  };
}

/** Relaie une image distante (sortie Higgsfield) en meme origine. */
export async function relayImage(url: string, filename: string | null) {
  if (!url.startsWith("https://")) return new Response("Expired", { status: 410 });
  let up: Response;
  try {
    up = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  } catch {
    return new Response("Expired", { status: 410 });
  }
  const type = up.headers.get("content-type") ?? "image/png";
  if (!up.ok || !up.body || !type.startsWith("image/")) return new Response("Expired", { status: 410 });
  const ext = type.includes("jpeg") ? "jpg" : type.includes("webp") ? "webp" : "png";
  const headers = new Headers({
    "Content-Type": type,
    "Cache-Control": "private, max-age=3600",
    "X-Content-Type-Options": "nosniff",
  });
  if (filename) headers.set("Content-Disposition", `attachment; filename="${filename}.${ext}"`);
  return new Response(up.body, { headers });
}

/**
 * Reconciliation automatique : une generation dont personne ne suit plus le
 * statut (page rechargee, borne eteinte) resterait « en cours » et occuperait
 * une place du quota. Avant chaque nouvelle demande, on interroge Higgsfield
 * pour celles de la campagne qui attendent depuis plus de 90 s. Borne a 3 par
 * appel pour ne jamais ralentir le visiteur.
 */
export async function reconcileStale(campaignId: string, provider: ImageProvider, db: PhotoboothDb) {
  const before = new Date(Date.now() - 90_000).toISOString();
  const { data } = await getSupabaseAdmin()
    .from("photobooth_usage").select("id")
    .eq("campaign_id", campaignId).in("status", ["processing", "unknown"])
    .lt("created_at", before).order("created_at").limit(3);
  await Promise.all((data ?? []).map((u) => pollGeneration(u.id, null, { db, provider }).catch(() => null)));
}

/** Logo client de la campagne (fichier officiel saisi dans l'admin), vide sinon. */
export async function campaignLogoUrl(campaignId: string): Promise<string> {
  const { data } = await getSupabaseAdmin()
    .from("photobooth_campaigns").select("config").eq("id", campaignId).maybeSingle();
  const cfg = resolveConfig(data?.config);
  return cfg.ok ? cfg.config.clientLogoUrl : "";
}

/**
 * Relaie le portrait AVEC le branding (bande, logo client, FMRXR//). Si la
 * composition echoue, on renvoie l'image brute plutot que rien.
 */
export async function relayPortrait(resultUrl: string, clientLogoUrl: string, filename: string | null) {
  if (!resultUrl.startsWith("https://")) return new Response("Expired", { status: 410 });
  try {
    const out = await brandedFromUrl(resultUrl, clientLogoUrl);
    if (!out) return new Response("Expired", { status: 410 });
    const headers = new Headers({
      "Content-Type": "image/jpeg",
      "Cache-Control": "private, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    });
    if (filename) headers.set("Content-Disposition", `attachment; filename="${filename}.jpg"`);
    return new Response(new Uint8Array(out), { headers });
  } catch {
    return relayImage(resultUrl, filename);
  }
}
