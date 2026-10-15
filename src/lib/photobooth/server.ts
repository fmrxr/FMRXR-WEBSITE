import "server-only";
import { timingSafeEqual } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { resolveConfig, type CampaignConfig } from "./config";
import { createHiggsfieldProvider, type ImageProvider } from "./higgsfield";
import type { PhotoboothDb } from "./service";

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
        .select("id, campaign_id, session_id, status, status_url, result_url, error_code, created_at")
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
