import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { resolveConfig, type WallConfig } from "./config";
import { accessFor, type Access } from "./keys";
import type { Pos, WallComment, WallPost } from "./types";

// Acces serveur du Live Wall (service-role). Chaque route verifie la cle
// presentee ici avant de lire ou d'ecrire quoi que ce soit.

export const MEDIA_BUCKET = "wall-media";

export type WallCampaign = {
  id: string; slug: string; name: string; client_name: string;
  status: "draft" | "active" | "suspended" | "ended";
  access_key: string; config: Record<string, unknown>;
  starts_at: string | null; expires_at: string | null;
};

export type Loaded = { campaign: WallCampaign; config: WallConfig; access: Access };

/** Campagne + acces, ou une erreur a renvoyer telle quelle. */
export async function loadWall(
  slug: string,
  keys: { k?: string | null; s?: string | null; m?: string | null },
): Promise<{ ok: true; wall: Loaded } | { ok: false; status: number; error: string }> {
  if (!/^[a-z0-9][a-z0-9-]{1,60}$/.test(slug)) return { ok: false, status: 404, error: "NOT_FOUND" };
  const { data: c } = await getSupabaseAdmin().from("wall_campaigns").select("*").eq("slug", slug).maybeSingle();
  if (!c) return { ok: false, status: 404, error: "NOT_FOUND" };
  const access = accessFor(c.access_key, keys);
  if (!access) return { ok: false, status: 404, error: "NOT_FOUND" };
  const cfg = resolveConfig(c.config);
  if (!cfg.ok) return { ok: false, status: 500, error: "CONFIG_INVALID" };
  return { ok: true, wall: { campaign: c as WallCampaign, config: cfg.config, access } };
}

/** Raison pour laquelle les invites ne peuvent pas ecrire, ou null. La moderation passe toujours. */
export function availability(c: WallCampaign, now = Date.now()): string | null {
  if (c.status === "draft") return "NOT_STARTED";
  if (c.status === "suspended") return "SUSPENDED";
  if (c.status === "ended") return "ENDED";
  if (c.starts_at && now < Date.parse(c.starts_at)) return "NOT_STARTED";
  if (c.expires_at && now > Date.parse(c.expires_at)) return "ENDED";
  return null;
}

export const isSession = (s: unknown): s is string => typeof s === "string" && /^[A-Za-z0-9_-]{8,80}$/.test(s);

// Limite de debit par IP, en memoire (un seul processus Node chez Hostinger).
const hits = new Map<string, number[]>();
export function rateLimited(key: string, max: number, windowMs = 60_000) {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
}

type PostRow = {
  id: string; session_id: string; kind: WallPost["kind"]; author: string; body: string; color: string;
  stickers: WallPost["stickers"]; likes: number; pos: Pos | null; pinned: boolean;
  has_strokes: boolean; photo_path: string | null; created_at: string; updated_at: string;
};

const POST_COLS = "id, session_id, kind, author, body, color, stickers, likes, pos, pinned, has_strokes, photo_path, created_at, updated_at";

/**
 * Messages valides du mur, du plus recent au plus ancien, avec leurs derniers
 * commentaires valides. Les traits de dessin et les photos se chargent a part
 * (ils ne changent jamais, le navigateur les garde en cache).
 */
export async function wallFeed(campaignId: string, max: number, session: string | null): Promise<WallPost[]> {
  const sb = getSupabaseAdmin();
  const { data: rows } = await sb.from("wall_posts").select(POST_COLS)
    .eq("campaign_id", campaignId).eq("status", "approved")
    .order("pinned", { ascending: false }).order("created_at", { ascending: false }).limit(max);
  const posts = (rows ?? []) as unknown as PostRow[];
  if (posts.length === 0) return [];
  const ids = posts.map((p) => p.id);
  const [{ data: comments }, { data: liked }] = await Promise.all([
    sb.from("wall_comments").select("id, post_id, author, body, sticker, created_at")
      .in("post_id", ids).eq("status", "approved").order("created_at", { ascending: true }).limit(1000),
    session
      ? sb.from("wall_likes").select("post_id").in("post_id", ids).eq("session_id", session)
      : Promise.resolve({ data: [] as { post_id: string }[] }),
  ]);
  const byPost = new Map<string, WallComment[]>();
  for (const c of comments ?? []) {
    const list = byPost.get(c.post_id) ?? [];
    list.push({ id: c.id, author: c.author, body: c.body, sticker: c.sticker, at: c.created_at });
    byPost.set(c.post_id, list);
  }
  const likedSet = new Set((liked ?? []).map((l) => l.post_id));
  return posts.map((p, i) => {
    const all = byPost.get(p.id) ?? [];
    return {
      id: p.id, kind: p.kind, author: p.author, body: p.body, color: p.color,
      stickers: Array.isArray(p.stickers) ? p.stickers : [],
      likes: p.likes, liked: likedSet.has(p.id),
      pos: p.pos ?? { x: 0.5, y: 0.5, r: 0, z: i },
      pinned: p.pinned,
      hasStrokes: p.has_strokes, hasPhoto: Boolean(p.photo_path),
      mine: session !== null && p.session_id === session,
      at: p.created_at, rev: p.updated_at,
      comments: all.slice(-12), commentCount: all.length,
    };
  });
}

/** Etat des messages de cet invite (en attente, publie, masque). */
export async function myPosts(campaignId: string, session: string) {
  const { data } = await getSupabaseAdmin().from("wall_posts").select("id, kind, status, created_at")
    .eq("campaign_id", campaignId).eq("session_id", session).order("created_at", { ascending: false }).limit(50);
  return (data ?? []).map((r) => ({ id: r.id, kind: r.kind, status: r.status, at: r.created_at }));
}

/** Nombre de messages deja places : sert de rang pour la position automatique. */
export async function placedCount(campaignId: string) {
  const { count } = await getSupabaseAdmin().from("wall_posts").select("id", { count: "exact", head: true })
    .eq("campaign_id", campaignId).not("pos", "is", null);
  return count ?? 0;
}

export const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
