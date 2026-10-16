"use server";
import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { assertRole } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getSupabaseServer } from "@/lib/supabase/server";
import { resolveConfig } from "@/lib/wall/config";

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
  const walls = await Promise.all((data as WallCampaignRow[]).map(async (c) => ({ campaign: c, counts: await counts(c.id) })));
  return { error: null, walls };
}

async function counts(id: string): Promise<WallCounts> {
  const sb = await getSupabaseServer();
  const n = async (status: string) => (await sb.from("wall_posts").select("id", { count: "exact", head: true }).eq("campaign_id", id).eq("status", status)).count ?? 0;
  const [pending, approved, hidden, comments, likes] = await Promise.all([
    n("pending"), n("approved"), n("hidden"),
    sb.from("wall_comments").select("id", { count: "exact", head: true }).eq("campaign_id", id).then((r) => r.count ?? 0),
    sb.from("wall_posts").select("likes").eq("campaign_id", id).then((r) => (r.data ?? []).reduce((s, x) => s + x.likes, 0)),
  ]);
  return { pending, approved, hidden, comments, likes };
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
  const { error } = await sb.from("wall_campaigns").update({ ...r.row, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return { error: error.code === "23505" ? "Ce slug existe déjà" : error.message };
  revalidatePath("/admin/wall");
  revalidatePath(`/admin/wall/${id}`);
  return { ok: true };
}

/** Nouvelle cle : coupe d'un coup les anciens liens invite, ecran et moderation. */
export async function rotateWallKey(id: string): Promise<{ ok: true } | { error: string }> {
  await assertRole(["admin"]);
  const sb = await getSupabaseServer();
  const { error } = await sb.from("wall_campaigns").update({ access_key: randomBytes(16).toString("hex"), updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath(`/admin/wall/${id}`);
  return { ok: true };
}

export async function deleteWall(id: string): Promise<{ ok: true } | { error: string }> {
  await assertRole(["admin"]);
  const sb = await getSupabaseServer();
  const { data: photos } = await sb.from("wall_posts").select("photo_path").eq("campaign_id", id).not("photo_path", "is", null);
  const paths = (photos ?? []).map((p) => p.photo_path as string);
  // Bucket prive sans politique : seul le service-role y ecrit (role admin verifie ci-dessus).
  if (paths.length) await getSupabaseAdmin().storage.from("wall-media").remove(paths);
  const { error } = await sb.from("wall_campaigns").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/wall");
  return { ok: true };
}
