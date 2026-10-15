import "server-only";
import { timingSafeEqual } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { resolveConfig, type CampaignConfig } from "./config";
import { createHiggsfieldProvider, type ImageProvider } from "./higgsfield";
import { pollGeneration, type PhotoboothDb, type Submission } from "./service";
import type { MoodProfile } from "./mood";
import { finalFromUrl, type FinalOptions } from "./branding";
import { STYLES, isStyleId } from "./styles";
import { EXPRESSION_LABEL, EXPRESSIONS, type ExpressionId } from "./expression";
import type { Locale } from "./config";

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
    // Hors comptabilite : le statut et le quota ne passent que par les RPC ci-dessus.
    async saveSubmission(usageId, mood) {
      await sb.from("photobooth_usage").update({ mood }).eq("id", usageId);
    },
    async getRetryContext(usageId) {
      const { data } = await sb
        .from("photobooth_usage")
        .select("mood, campaign:photobooth_campaigns(config)")
        .eq("id", usageId)
        .maybeSingle();
      const mood = data?.mood as (MoodProfile & { submission?: Submission }) | null;
      if (!mood?.submission?.imageUrl) return null;
      const campaign = (Array.isArray(data!.campaign) ? data!.campaign[0] : data!.campaign) as { config: unknown } | null;
      const cfg = resolveConfig(campaign?.config);
      if (!cfg.ok) return null;
      return { config: cfg.config, mood, submission: mood.submission };
    },
    async audit(campaignId, action, before, after) {
      await sb.from("photobooth_audit").insert({ campaign_id: campaignId, actor: null, action, before, after });
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
  | { ok: true; usageId: string; resultUrl: string; title: Record<string, string> | null; campaignName: string; expiresAt: string; clientLogoUrl: string }
  | { ok: false; reason: "NOT_FOUND" | "EXPIRED" }
> {
  if (!/^[0-9a-f]{32}$/.test(token)) return { ok: false, reason: "NOT_FOUND" };
  const { data } = await getSupabaseAdmin()
    .from("photobooth_usage")
    .select("id, status, result_url, completed_at, mood, campaign:photobooth_campaigns(name, config)")
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
    usageId: data.id,
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

const STAT_LABELS: Record<"fr" | "en", [string, string, string, string]> = {
  fr: ["Énergie", "Univers", "Style", "Expression"],
  en: ["Energy", "World", "Style", "Expression"],
};

/**
 * Tout ce qu'il faut pour rendre l'image finale d'une generation : style,
 * textes de mise en page (titre d'ambiance, description, campagne, date) et
 * logo client. L'arabe tombe sur l'anglais dans les mises en page (police
 * embarquee latine).
 */
export async function finalOptionsForUsage(usageId: string): Promise<FinalOptions | null> {
  const { data } = await getSupabaseAdmin()
    .from("photobooth_usage")
    .select("mood, completed_at, campaign:photobooth_campaigns(name, config)")
    .eq("id", usageId).maybeSingle();
  if (!data) return null;
  const campaign = (Array.isArray(data.campaign) ? data.campaign[0] : data.campaign) as { name: string; config: unknown } | null;
  const cfg = resolveConfig(campaign?.config);
  const mood = (data.mood ?? {}) as {
    title?: Record<string, string>; description?: Record<string, string>;
    style?: string; locale?: string; expressionReading?: string;
  };
  const loc: "fr" | "en" = mood.locale === "en" || mood.locale === "ar" ? "en" : "fr";
  const style = isStyleId(mood.style) ? STYLES[mood.style] : STYLES.mood;
  const parts = (mood.description?.[loc] ?? "").split(" · ");
  const labels = STAT_LABELS[loc];
  const stats: [string, string][] = parts.slice(0, 3).map((v, i) => [labels[i], v]);
  const expr = mood.expressionReading && (EXPRESSIONS as readonly string[]).includes(mood.expressionReading)
    ? EXPRESSION_LABEL[mood.expressionReading as ExpressionId][loc as Locale] : null;
  if (expr) stats.push([labels[3], expr]);
  const d = data.completed_at ? new Date(data.completed_at) : new Date();
  return {
    clientLogoUrl: cfg.ok ? cfg.config.clientLogoUrl : "",
    layout: style.layout,
    text: {
      title: mood.title?.[loc] ?? "",
      subtitle: mood.description?.[loc] ?? "",
      masthead: cfg.ok ? cfg.config.title[loc] : campaign?.name ?? "",
      stats,
      date: `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`,
    },
  };
}

export async function relayPortrait(resultUrl: string, usageId: string, filename: string | null) {
  if (!resultUrl.startsWith("https://")) return new Response("Expired", { status: 410 });
  try {
    const o = await finalOptionsForUsage(usageId);
    const out = o ? await finalFromUrl(resultUrl, o) : null;
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
