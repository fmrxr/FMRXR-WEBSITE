import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { parsePos, zNow } from "@/lib/wall/shapes";
import { clientIp, isSession, json, loadWall, rateLimited } from "@/lib/wall/server";

// POST /api/wall/move { slug, k|s|m, session, postId, x, y, r }
// Deplace une carte. L'ecran (s) et l'equipe (m) deplacent toutes les cartes ;
// un invite (k) seulement les siennes, et seulement si l'option est active.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (rateLimited(`move:${clientIp(req)}`, 240)) return json({ ok: false, error: "RATE_LIMITED" }, 429);
  const b = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b) return json({ ok: false, error: "BAD_REQUEST" }, 400);
  const loaded = await loadWall(String(b.slug ?? ""), { k: String(b.k ?? ""), s: String(b.s ?? ""), m: String(b.m ?? "") });
  if (!loaded.ok) return json({ ok: false, error: loaded.error }, loaded.status);
  const { campaign, config, access } = loaded.wall;
  if (access === "screen" && !config.screenInteractive && config.sensor === "none") return json({ ok: false, error: "OPTION_DISABLED" }, 403);
  if (access === "guest" && !config.guestMove) return json({ ok: false, error: "OPTION_DISABLED" }, 403);
  const pos = parsePos(b.x, b.y, b.r);
  if (!pos) return json({ ok: false, error: "BAD_REQUEST" }, 400);

  const sb = getSupabaseAdmin();
  let q = sb.from("wall_posts").select("id, session_id").eq("id", String(b.postId ?? "")).eq("campaign_id", campaign.id).eq("status", "approved");
  if (access === "guest") {
    if (!isSession(b.session)) return json({ ok: false, error: "BAD_SESSION" }, 400);
    q = q.eq("session_id", b.session);
  }
  const { data: post } = await q.maybeSingle();
  if (!post) return json({ ok: false, error: "NOT_FOUND" }, 404);
  const full = { ...pos, z: zNow() };
  const { error } = await sb.from("wall_posts").update({ pos: full, updated_at: new Date().toISOString() }).eq("id", post.id);
  if (error) return json({ ok: false, error: "SAVE_FAILED" }, 500);
  return json({ ok: true, pos: full });
}
