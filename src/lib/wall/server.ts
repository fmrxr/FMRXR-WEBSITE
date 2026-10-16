import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { resolveConfig, type WallConfig } from "./config";
import { accessFor, moderatorName, type Access } from "./keys";
import { autoPos, zNow } from "./shapes";
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

export type Loaded = { campaign: WallCampaign; config: WallConfig; access: Access; by: string | null };

/** Campagne + acces, ou une erreur a renvoyer telle quelle. */
export async function loadWall(
  slug: string,
  keys: { k?: string | null; s?: string | null; m?: string | null },
): Promise<{ ok: true; wall: Loaded } | { ok: false; status: number; error: string }> {
  if (!/^[a-z0-9][a-z0-9-]{1,60}$/.test(slug)) return { ok: false, status: 404, error: "NOT_FOUND" };
  const { data: c } = await getSupabaseAdmin().from("wall_campaigns").select("*").eq("slug", slug).maybeSingle();
  if (!c) return { ok: false, status: 404, error: "NOT_FOUND" };
  const cfg = resolveConfig(c.config);
  if (!cfg.ok) return { ok: false, status: 500, error: "CONFIG_INVALID" };
  const access = accessFor(c.access_key, keys, cfg.config.moderators);
  if (!access) return { ok: false, status: 404, error: "NOT_FOUND" };
  const by = access === "mod" ? moderatorName(c.access_key, keys.m, cfg.config.moderators) : null;
  return { ok: true, wall: { campaign: c as WallCampaign, config: cfg.config, access, by } };
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
  // Au-dela de 5000 cles, on oublie les plus anciennes (ordre d'insertion) :
  // inonder de fausses IP ne remet plus les compteurs de tout le monde a zero.
  if (hits.size > 5000) for (const k of [...hits.keys()].slice(0, 1000)) hits.delete(k);
  return list.length > max;
}

/**
 * IP du visiteur telle que la voit le proxy d'Hostinger. Le premier element de
 * x-forwarded-for est fourni par le client (falsifiable) ; x-real-ip et le
 * DERNIER element sont poses par le proxy, juste devant le serveur.
 */
export function clientIp(req: Request) {
  const real = req.headers.get("x-real-ip")?.trim();
  if (real) return real;
  const xff = req.headers.get("x-forwarded-for");
  return xff?.split(",").map((s) => s.trim()).filter(Boolean).pop() || "local";
}

type PostRow = {
  id: string; session_id: string; kind: WallPost["kind"]; author: string; body: string; color: string;
  stickers: WallPost["stickers"]; likes: number; pos: Pos | null; pinned: boolean;
  has_strokes: boolean; photo_path: string | null; created_at: string; updated_at: string;
};

const POST_COLS = "id, session_id, kind, author, body, color, stickers, likes, pos, pinned, has_strokes, photo_path, created_at, updated_at";

/**
 * Version du mur : la date de la derniere modification d'un message (envoi,
 * deplacement, like, commentaire, moderation touchent tous updated_at).
 * Une seule ligne lue : les telephones qui interrogent toutes les 2 s ne
 * declenchent la lecture complete que si le mur a change.
 */
export async function wallVersion(campaignId: string): Promise<string> {
  const { data } = await getSupabaseAdmin().from("wall_posts").select("updated_at")
    .eq("campaign_id", campaignId).order("updated_at", { ascending: false }).limit(1).maybeSingle();
  return data?.updated_at ?? "empty";
}

/**
 * Messages valides du mur, du plus recent au plus ancien, avec leurs derniers
 * commentaires valides. Les traits de dessin et les photos se chargent a part
 * (ils ne changent jamais, le navigateur les garde en cache).
 */
export async function wallFeed(campaignId: string, max: number, session: string | null): Promise<WallPost[]> {
  const sb = getSupabaseAdmin();
  const { data: rows } = await sb.from("wall_posts").select(POST_COLS)
    .eq("campaign_id", campaignId).eq("status", "approved")
    // Ordre de validation : un message valide tard par l'equipe entre bien sur le mur.
    .order("pinned", { ascending: false }).order("moderated_at", { ascending: false, nullsFirst: false }).limit(max);
  const posts = (rows ?? []) as unknown as PostRow[];
  if (posts.length === 0) return [];
  const ids = posts.map((p) => p.id);
  // Les 12 derniers commentaires de chaque message et leur total (migration 0022).
  const [comments, { data: liked }] = await Promise.all([
    feedComments(ids),
    session
      ? sb.from("wall_likes").select("post_id").in("post_id", ids).eq("session_id", session)
      : Promise.resolve({ data: [] as { post_id: string }[] }),
  ]);
  const byPost = new Map<string, WallComment[]>();
  const totals = new Map<string, number>();
  for (const c of comments) {
    const list = byPost.get(c.post_id) ?? [];
    list.push({ id: c.id, author: c.author, body: c.body, sticker: c.sticker, at: c.created_at });
    byPost.set(c.post_id, list);
    totals.set(c.post_id, Number(c.total));
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
      comments: all, commentCount: totals.get(p.id) ?? 0,
    };
  });
}

type FeedComment = { post_id: string; id: string; author: string; body: string; sticker: string | null; created_at: string; total: number };

/**
 * Les 12 derniers commentaires valides de chaque message et leur total, via
 * la fonction de la migration 0022. Si elle n'est pas encore appliquee :
 * ancienne methode (1000 commentaires au plus pour tout le mur).
 */
async function feedComments(ids: string[]): Promise<FeedComment[]> {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb.rpc("wall_feed_comments", { p_posts: ids, p_per: 12 });
  if (!error) return (data ?? []) as FeedComment[];
  const { data: rows } = await sb.from("wall_comments").select("id, post_id, author, body, sticker, created_at")
    .in("post_id", ids).eq("status", "approved").order("created_at", { ascending: true }).limit(1000);
  const all = rows ?? [];
  const total = new Map<string, number>();
  for (const r of all) total.set(r.post_id, (total.get(r.post_id) ?? 0) + 1);
  const seen = new Map<string, number>();
  return all.filter((r) => {
    const n = (seen.get(r.post_id) ?? 0) + 1;
    seen.set(r.post_id, n);
    return n > (total.get(r.post_id) ?? 0) - 12;
  }).map((r) => ({ ...r, total: total.get(r.post_id) ?? 0 }));
}

/** Etat des messages de cet invite (en attente, publie, masque). */
export async function myPosts(campaignId: string, session: string) {
  const { data } = await getSupabaseAdmin().from("wall_posts").select("id, kind, status, created_at")
    .eq("campaign_id", campaignId).eq("session_id", session).order("created_at", { ascending: false }).limit(50);
  return (data ?? []).map((r) => ({ id: r.id, kind: r.kind, status: r.status, at: r.created_at }));
}

/**
 * Place libre pour une nouvelle carte : parmi 16 positions candidates bien
 * reparties (suite de Halton), celle qui est la plus loin des cartes deja
 * posees. Un petit decalage tire de l'identifiant separe deux cartes validees
 * au meme instant (elles liraient le meme mur et choisiraient la meme place).
 */
export async function freePos(campaignId: string, postId: string) {
  const { data } = await getSupabaseAdmin().from("wall_posts").select("pos")
    .eq("campaign_id", campaignId).eq("status", "approved").not("pos", "is", null)
    .order("moderated_at", { ascending: false, nullsFirst: false }).limit(150);
  const taken = (data ?? []).map((r) => r.pos as Pos);
  const start = taken.length;
  let best = autoPos(start, 0), bestScore = -1;
  for (let i = 0; i < 16; i++) {
    const c = autoPos(start + i, 0);
    // Coin bas droit reserve au QR de l'ecran : jamais de carte dessous.
    if (c.x > 0.68 && c.y > 0.66) continue;
    // Distance ponderee : le mur est plus large que haut (16:9).
    const score = taken.length ? Math.min(...taken.map((t) => Math.hypot((t.x - c.x) * 1.78, t.y - c.y))) : 1;
    if (score > bestScore) { best = c; bestScore = score; }
  }
  const h = parseInt(postId.replace(/-/g, "").slice(0, 8), 16) || 0;
  const jx = ((h % 1000) / 1000 - 0.5) * 0.04, jy = ((Math.floor(h / 1000) % 1000) / 1000 - 0.5) * 0.04;
  return {
    x: Math.round(Math.min(0.92, Math.max(0.08, best.x + jx)) * 1000) / 1000,
    y: Math.round(Math.min(0.88, Math.max(0.12, best.y + jy)) * 1000) / 1000,
    r: best.r, z: zNow(),
  };
}

/**
 * Plafond par mur, en base : quel que soit le nombre de sessions ou d'IP
 * inventees, un mur n'accepte pas plus de `max` envois par minute.
 */
export async function campaignBusy(table: "wall_posts" | "wall_comments", campaignId: string, max: number) {
  const { count } = await getSupabaseAdmin().from(table).select("id", { count: "exact", head: true })
    .eq("campaign_id", campaignId).gte("created_at", new Date(Date.now() - 60_000).toISOString());
  return (count ?? 0) >= max;
}

export const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
