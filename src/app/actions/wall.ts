"use server";
import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { assertRole } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getSupabaseServer } from "@/lib/supabase/server";
import { MAX_MODERATORS, resolveConfig, type Moderator } from "@/lib/wall/config";

// Administration des campagnes Live Wall. Reserve au role admin, verifie ici
// (serveur) et par la RLS des tables.

export type WallCampaignRow = {
  id: string; slug: string; name: string; client_name: string;
  status: "draft" | "active" | "suspended" | "ended";
  access_key: string; config: Record<string, unknown>;
  starts_at: string | null; expires_at: string | null; created_at: string; updated_at: string;
};

export type WallCounts = { pending: number; approved: number; hidden: number; comments: number; likes: number };

export async function listWalls() {
  await assertRole(["admin"]);
  const sb = await getSupabaseServer();
  const { data, error } = await sb.from("wall_campaigns").select("*").order("created_at", { ascending: false });
  if (error) return { error: error.message, walls: [] as { campaign: WallCampaignRow; counts: WallCounts }[] };
  // Tous les compteurs en une requete (migration 0022), service-role apres le controle de role.
  const { data: rows, error: rpcError } = await getSupabaseAdmin().rpc("wall_campaign_counts");
  if (rpcError) {
    // Migration 0022 pas encore appliquee : comptage mur par mur.
    const walls = await Promise.all((data as WallCampaignRow[]).map(async (c) => ({ campaign: c, counts: await slowCounts(c.id) })));
    return { error: null, walls };
  }
  const byId = new Map<string, WallCounts>(((rows ?? []) as Record<string, unknown>[]).map((r) => [r.campaign_id as string, {
    pending: Number(r.pending), approved: Number(r.approved), hidden: Number(r.hidden), comments: Number(r.comments), likes: Number(r.likes),
  }]));
  const empty: WallCounts = { pending: 0, approved: 0, hidden: 0, comments: 0, likes: 0 };
  return { error: null, walls: (data as WallCampaignRow[]).map((c) => ({ campaign: c, counts: byId.get(c.id) ?? empty })) };
}

async function slowCounts(id: string): Promise<WallCounts> {
  const sb = getSupabaseAdmin();
  const n = async (status: string) => (await sb.from("wall_posts").select("id", { count: "exact", head: true }).eq("campaign_id", id).eq("status", status)).count ?? 0;
  const [pending, approved, hidden, comments, likes] = await Promise.all([
    n("pending"), n("approved"), n("hidden"),
    sb.from("wall_comments").select("id", { count: "exact", head: true }).eq("campaign_id", id).then((r) => r.count ?? 0),
    sb.from("wall_posts").select("likes").eq("campaign_id", id).then((r) => (r.data ?? []).reduce((s, x) => s + x.likes, 0)),
  ]);
  return { pending, approved, hidden, comments, likes };
}

async function counts(id: string): Promise<WallCounts> {
  const { data, error } = await getSupabaseAdmin().rpc("wall_campaign_counts");
  if (error) return slowCounts(id);
  const r = ((data ?? []) as Record<string, unknown>[]).find((x) => x.campaign_id === id);
  return {
    pending: Number(r?.pending ?? 0), approved: Number(r?.approved ?? 0), hidden: Number(r?.hidden ?? 0),
    comments: Number(r?.comments ?? 0), likes: Number(r?.likes ?? 0),
  };
}

export async function getWall(id: string) {
  await assertRole(["admin"]);
  const sb = await getSupabaseServer();
  const { data } = await sb.from("wall_campaigns").select("*").eq("id", id).maybeSingle();
  if (!data) return null;
  return { campaign: data as WallCampaignRow, counts: await counts(id) };
}

const optDate = z.preprocess((v) => (v ? new Date(String(v)).toISOString() : null), z.string().nullable());

const input = z.object({
  slug: z.string().regex(/^[a-z0-9][a-z0-9-]{1,60}$/, "Slug : minuscules, chiffres et tirets"),
  name: z.string().min(1).max(120),
  client_name: z.string().max(120),
  status: z.enum(["draft", "active", "suspended", "ended"]),
  starts_at: optDate,
  expires_at: optDate,
  config: z.string(),
});

function toRow(raw: unknown) {
  const p = input.safeParse(raw);
  if (!p.success) return { error: p.error.issues[0].message } as const;
  let config: unknown = {};
  try {
    config = p.data.config.trim() ? JSON.parse(p.data.config) : {};
  } catch {
    return { error: "Configuration : JSON invalide" } as const;
  }
  const check = resolveConfig(config);
  if (!check.ok) return { error: `Configuration : ${check.error}` } as const;
  const { config: _c, ...rest } = p.data;
  void _c;
  return { row: { ...rest, config: check.config } } as const;
}

export async function createWall(raw: unknown): Promise<{ id: string } | { error: string }> {
  await assertRole(["admin"]);
  const r = toRow(raw);
  if ("error" in r) return { error: r.error! };
  const sb = await getSupabaseServer();
  const { data, error } = await sb.from("wall_campaigns").insert(r.row).select("id").single();
  if (error) return { error: error.code === "23505" ? "Ce slug existe déjà" : error.message };
  revalidatePath("/admin/wall");
  return { id: data.id };
}

export async function updateWall(id: string, raw: unknown): Promise<{ ok: true } | { error: string }> {
  await assertRole(["admin"]);
  const r = toRow(raw);
  if ("error" in r) return { error: r.error! };
  const sb = await getSupabaseServer();
  // Les moderateurs se gerent a part (addModerator / removeModerator) : le
  // formulaire ne les ecrase jamais, meme ouvert avant un ajout.
  const moderators = await currentModerators(id);
  const { error } = await sb.from("wall_campaigns").update({ ...r.row, config: { ...r.row.config, moderators }, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return { error: error.code === "23505" ? "Ce slug existe déjà" : error.message };
  revalidatePath("/admin/wall");
  revalidatePath(`/admin/wall/${id}`);
  return { ok: true };
}

async function currentModerators(id: string): Promise<Moderator[]> {
  const sb = await getSupabaseServer();
  const { data } = await sb.from("wall_campaigns").select("config").eq("id", id).maybeSingle();
  const r = resolveConfig(data?.config ?? {});
  return r.ok ? r.config.moderators : [];
}

async function saveModerators(id: string, moderators: Moderator[]) {
  const sb = await getSupabaseServer();
  const { data } = await sb.from("wall_campaigns").select("config").eq("id", id).maybeSingle();
  if (!data) return { error: "Mur introuvable" };
  const { error } = await sb.from("wall_campaigns")
    .update({ config: { ...(data.config as object), moderators }, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath(`/admin/wall/${id}`);
  return { ok: true as const };
}

/** Ajoute un moderateur nomme, avec son propre lien. Cinq au plus par mur. */
export async function addModerator(id: string, name: string): Promise<{ ok: true } | { error: string }> {
  await assertRole(["admin"]);
  const clean = name.trim().slice(0, 40);
  if (!clean) return { error: "Nom requis" };
  const list = await currentModerators(id);
  if (list.length >= MAX_MODERATORS) return { error: `${MAX_MODERATORS} modérateurs au plus par mur` };
  if (list.some((m) => m.name.toLowerCase() === clean.toLowerCase())) return { error: "Ce nom existe déjà" };
  return saveModerators(id, [...list, { id: randomBytes(5).toString("hex"), name: clean, key: randomBytes(16).toString("hex") }]);
}

/** Retire un moderateur : son lien cesse de marcher aussitot. */
export async function removeModerator(id: string, moderatorId: string): Promise<{ ok: true } | { error: string }> {
  await assertRole(["admin"]);
  const list = await currentModerators(id);
  return saveModerators(id, list.filter((m) => m.id !== moderatorId));
}

/**
 * Nouvelle cle : coupe d'un coup les anciens liens invite, ecran et
 * moderation, y compris les liens personnels des moderateurs (regeneres).
 */
export async function rotateWallKey(id: string): Promise<{ ok: true } | { error: string }> {
  await assertRole(["admin"]);
  const sb = await getSupabaseServer();
  const { data } = await sb.from("wall_campaigns").select("config").eq("id", id).maybeSingle();
  if (!data) return { error: "Mur introuvable" };
  const moderators = (await currentModerators(id)).map((m) => ({ ...m, key: randomBytes(16).toString("hex") }));
  const { error } = await sb.from("wall_campaigns").update({
    access_key: randomBytes(16).toString("hex"),
    config: { ...(data.config as object), moderators },
    updated_at: new Date().toISOString(),
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath(`/admin/wall/${id}`);
  return { ok: true };
}

export async function deleteWall(id: string): Promise<{ ok: true } | { error: string }> {
  await assertRole(["admin"]);
  const sb = await getSupabaseServer();
  // Toutes les photos, par pages de 1000 (PostgREST tronque au-dela).
  const paths: string[] = [];
  for (let from = 0; ; from += 1000) {
    const { data: page } = await sb.from("wall_posts").select("photo_path").eq("campaign_id", id)
      .not("photo_path", "is", null).order("id").range(from, from + 999);
    paths.push(...(page ?? []).map((p) => p.photo_path as string));
    if (!page || page.length < 1000) break;
  }
  // La base d'abord : si elle refuse, aucun message ne pointe vers une photo effacee.
  const { error } = await sb.from("wall_campaigns").delete().eq("id", id);
  if (error) return { error: error.message };
  // Bucket prive sans politique : seul le service-role y ecrit (role admin verifie ci-dessus).
  for (let i = 0; i < paths.length; i += 500) await getSupabaseAdmin().storage.from("wall-media").remove(paths.slice(i, i + 500));
  revalidatePath("/admin/wall");
  return { ok: true };
}
