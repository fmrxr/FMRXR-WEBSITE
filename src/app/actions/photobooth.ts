"use server";
import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { assertRole, currentUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getSupabaseServer } from "@/lib/supabase/server";
import { resolveConfig } from "@/lib/photobooth/config";
import { createSupabaseDb, getProvider } from "@/lib/photobooth/server";
import { pollGeneration } from "@/lib/photobooth/service";

// Administration des campagnes photobooth. Reserve au role admin, verifie
// ici (serveur) et par la RLS des tables : jamais par l'interface seule.

export type CampaignRow = {
  id: string; slug: string; name: string; client_name: string;
  status: "draft" | "active" | "suspended" | "ended";
  access_key: string; quota_limit: number; daily_quota_limit: number | null;
  max_concurrent: number; spending_limit_musd: number | null; reserve_cost_musd: number;
  warning_threshold: number; critical_threshold: number; timezone: string;
  starts_at: string | null; expires_at: string | null; config: Record<string, unknown>;
  created_at: string; updated_at: string;
};

export type UsageCounters = {
  campaign_id: string; succeeded: number; active: number; unknown: number;
  failed: number; today: number; spent_musd: number; reserved_musd: number;
};

const EMPTY = (id: string): UsageCounters => ({
  campaign_id: id, succeeded: 0, active: 0, unknown: 0, failed: 0, today: 0, spent_musd: 0, reserved_musd: 0,
});

export async function listCampaigns() {
  await assertRole(["admin"]);
  const sb = await getSupabaseServer();
  const [{ data: campaigns, error }, { data: usage }] = await Promise.all([
    sb.from("photobooth_campaigns").select("*").order("created_at", { ascending: false }),
    sb.from("photobooth_campaign_usage").select("*"),
  ]);
  if (error) return { error: error.message, campaigns: [] as { campaign: CampaignRow; usage: UsageCounters }[] };
  const byId = new Map((usage ?? []).map((u) => [u.campaign_id, u as UsageCounters]));
  return {
    error: null,
    campaigns: (campaigns as CampaignRow[]).map((c) => ({ campaign: c, usage: byId.get(c.id) ?? EMPTY(c.id) })),
  };
}

export async function getCampaign(id: string) {
  await assertRole(["admin"]);
  const sb = await getSupabaseServer();
  const [{ data: campaign }, { data: usage }, { data: history }, { data: audit }] = await Promise.all([
    sb.from("photobooth_campaigns").select("*").eq("id", id).maybeSingle(),
    sb.from("photobooth_campaign_usage").select("*").eq("campaign_id", id).maybeSingle(),
    sb.from("photobooth_usage")
      .select("id, status, model, provider_job_id, error_code, reserved_cost_musd, actual_cost_musd, created_at, completed_at, mood_id:mood->>id")
      .eq("campaign_id", id).order("created_at", { ascending: false }).limit(200),
    sb.from("photobooth_audit").select("id, action, actor, before, after, created_at")
      .eq("campaign_id", id).order("created_at", { ascending: false }).limit(30),
  ]);
  if (!campaign) return null;
  return {
    campaign: campaign as CampaignRow,
    usage: (usage as UsageCounters) ?? EMPTY(id),
    history: history ?? [],
    audit: audit ?? [],
  };
}

const optInt = z.preprocess((v) => (v === "" || v === null || v === undefined ? null : Number(v)), z.number().int().min(0).nullable());
const optDate = z.preprocess((v) => (v ? new Date(String(v)).toISOString() : null), z.string().nullable());

const campaignInput = z.object({
  slug: z.string().regex(/^[a-z0-9][a-z0-9-]{1,60}$/, "Slug : minuscules, chiffres et tirets"),
  name: z.string().min(1).max(120),
  client_name: z.string().max(120),
  status: z.enum(["draft", "active", "suspended", "ended"]),
  quota_limit: z.coerce.number().int().min(0),
  daily_quota_limit: optInt,
  max_concurrent: z.coerce.number().int().min(1).max(50),
  // Saisie en dollars dans le formulaire, stockage en milliemes (entiers).
  spending_limit_usd: z.preprocess((v) => (v === "" || v == null ? null : Number(v)), z.number().min(0).nullable()),
  reserve_cost_usd: z.coerce.number().min(0),
  warning_threshold: z.coerce.number().int().min(1).max(100),
  critical_threshold: z.coerce.number().int().min(1).max(100),
  starts_at: optDate,
  expires_at: optDate,
  config: z.string(),
});

function toRow(input: unknown) {
  const p = campaignInput.safeParse(input);
  if (!p.success) return { error: p.error.issues[0].message } as const;
  const d = p.data;
  let config: unknown = {};
  try {
    config = d.config.trim() ? JSON.parse(d.config) : {};
  } catch {
    return { error: "Configuration : JSON invalide" } as const;
  }
  const check = resolveConfig(config);
  if (!check.ok) return { error: `Configuration : ${check.error}` } as const;
  return {
    row: {
      slug: d.slug, name: d.name, client_name: d.client_name, status: d.status,
      quota_limit: d.quota_limit, daily_quota_limit: d.daily_quota_limit, max_concurrent: d.max_concurrent,
      spending_limit_musd: d.spending_limit_usd === null ? null : Math.round(d.spending_limit_usd * 1000),
      reserve_cost_musd: Math.round(d.reserve_cost_usd * 1000),
      warning_threshold: d.warning_threshold, critical_threshold: d.critical_threshold,
      starts_at: d.starts_at, expires_at: d.expires_at, config,
    },
  } as const;
}

export async function createCampaign(input: unknown): Promise<{ id: string } | { error: string }> {
  await assertRole(["admin"]);
  const r = toRow(input);
  if ("error" in r) return { error: r.error! };
  const sb = await getSupabaseServer();
  const { data, error } = await sb.from("photobooth_campaigns").insert(r.row).select("id").single();
  if (error) return { error: error.code === "23505" ? "Ce slug existe deja" : error.message };
  revalidatePath("/admin/photobooth");
  return { id: data.id };
}

export async function updateCampaign(id: string, input: unknown): Promise<{ ok: true } | { error: string }> {
  await assertRole(["admin"]);
  const r = toRow(input);
  if ("error" in r) return { error: r.error! };
  const sb = await getSupabaseServer();
  const { error } = await sb.from("photobooth_campaigns").update(r.row).eq("id", id);
  if (error) return { error: error.code === "23505" ? "Ce slug existe deja" : error.message };
  revalidatePath("/admin/photobooth");
  revalidatePath(`/admin/photobooth/${id}`);
  return { ok: true };
}

export async function setCampaignStatus(id: string, status: CampaignRow["status"]) {
  await assertRole(["admin"]);
  const sb = await getSupabaseServer();
  const { error } = await sb.from("photobooth_campaigns").update({ status }).eq("id", id);
  revalidatePath("/admin/photobooth");
  revalidatePath(`/admin/photobooth/${id}`);
  return error ? { error: error.message } : { ok: true };
}

/** Nouvelle cle de borne : l'ancien lien cesse de fonctionner immediatement. */
export async function rotateAccessKey(id: string) {
  await assertRole(["admin"]);
  const sb = await getSupabaseServer();
  const key = crypto.randomUUID().replace(/-/g, "");
  const { error } = await sb.from("photobooth_campaigns").update({ access_key: key }).eq("id", id);
  revalidatePath(`/admin/photobooth/${id}`);
  return error ? { error: error.message } : { ok: true };
}

/**
 * Reconciliation : interroge Higgsfield pour chaque generation en cours ou a
 * l'issue inconnue de la campagne, et fait avancer leur etat.
 */
export async function reconcileCampaign(id: string) {
  await assertRole(["admin"]);
  const provider = getProvider();
  if (!provider) return { error: "Cle Higgsfield absente du serveur" };
  const sb = await getSupabaseServer();
  const { data } = await sb.from("photobooth_usage").select("id")
    .eq("campaign_id", id).in("status", ["processing", "unknown"]).limit(100);
  const db = createSupabaseDb();
  const results: Record<string, number> = {};
  for (const u of data ?? []) {
    const r = await pollGeneration(u.id, null, { db, provider });
    results[r.status] = (results[r.status] ?? 0) + 1;
  }
  revalidatePath(`/admin/photobooth/${id}`);
  return { ok: true, checked: data?.length ?? 0, results };
}

/**
 * Libere a la main une reservation a l'issue inconnue, apres verification
 * dans la console Higgsfield qu'aucune image n'a ete facturee.
 */
export async function releaseUsage(campaignId: string, usageId: string) {
  await assertRole(["admin"]);
  const r = await createSupabaseDb().transition(usageId, "cancelled", { errorCode: "RELEASED_BY_ADMIN" });
  revalidatePath(`/admin/photobooth/${campaignId}`);
  return r.ok ? { ok: true } : { error: r.error ?? r.status ?? "Transition refusee" };
}

// ---------- acces client ----------
// Un client n'a pas de role (voir migration 0018) : il est membre de campagnes.

export async function listClientAccess(campaignId: string) {
  await assertRole(["admin"]);
  const admin = getSupabaseAdmin();
  const [{ data: rows }, { data: users }] = await Promise.all([
    admin.from("photobooth_campaign_members").select("user_id, created_at").eq("campaign_id", campaignId),
    admin.auth.admin.listUsers({ perPage: 1000 }),
  ]);
  return (rows ?? []).map((r) => {
    const u = users?.users.find((x) => x.id === r.user_id);
    return { user_id: r.user_id, email: u?.email ?? "(compte supprimé)", last_sign_in_at: u?.last_sign_in_at ?? null, created_at: r.created_at };
  });
}

/**
 * Ouvre l'espace client a une adresse pour cette campagne. Cree le compte s'il
 * n'existe pas (mot de passe temporaire renvoye une seule fois, comme dans
 * /admin/team), sans lui donner de role.
 */
export async function grantClientAccess(campaignId: string, email: string): Promise<
  { ok: true; created: boolean; password: string | null } | { error: string }
> {
  await assertRole(["admin"]);
  const address = email.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(address)) return { error: "Adresse email invalide" };
  const admin = getSupabaseAdmin();

  const password = randomBytes(12).toString("base64url");
  const { data, error } = await admin.auth.admin.createUser({ email: address, password, email_confirm: true });
  let userId = data?.user?.id;
  let created = true;
  if (error) {
    const { data: users } = await admin.auth.admin.listUsers({ perPage: 1000 });
    userId = users?.users.find((u) => u.email?.toLowerCase() === address)?.id;
    if (!userId) return { error: error.message };
    created = false;
  }

  const { error: mErr } = await admin.from("photobooth_campaign_members")
    .upsert({ campaign_id: campaignId, user_id: userId }, { onConflict: "campaign_id,user_id" });
  if (mErr) {
    if (created && userId) await admin.auth.admin.deleteUser(userId);
    return { error: mErr.message };
  }
  await admin.from("photobooth_audit").insert({
    campaign_id: campaignId, actor: (await currentUser())?.id ?? null, action: "client_access_granted", after: { email: address },
  });
  revalidatePath(`/admin/photobooth/${campaignId}`);
  return { ok: true, created, password: created ? password : null };
}

export async function revokeClientAccess(campaignId: string, userId: string) {
  await assertRole(["admin"]);
  const admin = getSupabaseAdmin();
  const { error } = await admin.from("photobooth_campaign_members").delete()
    .eq("campaign_id", campaignId).eq("user_id", userId);
  if (error) return { error: error.message };
  await admin.from("photobooth_audit").insert({
    campaign_id: campaignId, actor: (await currentUser())?.id ?? null, action: "client_access_revoked", before: { user_id: userId },
  });
  revalidatePath(`/admin/photobooth/${campaignId}`);
  return { ok: true };
}
