import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { clientIp, isSession, json, loadWall, rateLimited } from "@/lib/wall/server";

// POST /api/wall/like { slug, k|s, session, postId } — like ou retrait du like.
// Un like par session et par message, compte en base de facon atomique.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (rateLimited(`like:${clientIp(req)}`, 60)) return json({ ok: false, error: "RATE_LIMITED" }, 429);
  const b = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b) return json({ ok: false, error: "BAD_REQUEST" }, 400);
  const loaded = await loadWall(String(b.slug ?? ""), { k: String(b.k ?? ""), s: String(b.s ?? "") });
  if (!loaded.ok) return json({ ok: false, error: loaded.error }, loaded.status);
  const { campaign, config, access } = loaded.wall;
  if (!config.likes) return json({ ok: false, error: "OPTION_DISABLED" }, 403);
  if (access === "screen" && !config.screenInteractive) return json({ ok: false, error: "OPTION_DISABLED" }, 403);
  if (!isSession(b.session)) return json({ ok: false, error: "BAD_SESSION" }, 400);

  const sb = getSupabaseAdmin();
  const { data: post } = await sb.from("wall_posts").select("id").eq("id", String(b.postId ?? ""))
    .eq("campaign_id", campaign.id).eq("status", "approved").maybeSingle();
  if (!post) return json({ ok: false, error: "NOT_FOUND" }, 404);
  const { data, error } = await sb.rpc("wall_toggle_like", { p_post: post.id, p_session: b.session });
  if (error || !data?.[0]) return json({ ok: false, error: "SAVE_FAILED" }, 500);
  return json({ ok: true, liked: data[0].liked, likes: data[0].likes });
}
