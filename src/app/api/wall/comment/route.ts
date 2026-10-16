import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { cleanText, flagText } from "@/lib/wall/moderation";
import { availability, campaignBusy, clientIp, isSession, json, loadWall, rateLimited } from "@/lib/wall/server";

// POST /api/wall/comment { slug, k, session, postId, author, body, sticker }
// Un commentaire texte, ou une reaction en sticker de marque, ou les deux.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (rateLimited(`comment:${clientIp(req)}`, 20)) return json({ ok: false, error: "RATE_LIMITED" }, 429);
  const b = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b) return json({ ok: false, error: "BAD_REQUEST" }, 400);
  const loaded = await loadWall(String(b.slug ?? ""), { k: String(b.k ?? "") });
  if (!loaded.ok) return json({ ok: false, error: loaded.error }, loaded.status);
  const { campaign, config } = loaded.wall;
  if (!config.comments) return json({ ok: false, error: "OPTION_DISABLED" }, 403);
  const closed = availability(campaign);
  if (closed) return json({ ok: false, error: closed }, 403);
  if (!isSession(b.session)) return json({ ok: false, error: "BAD_SESSION" }, 400);
  if (rateLimited(`comment-s:${b.session}`, 6)) return json({ ok: false, error: "RATE_LIMITED" }, 429);

  const author = cleanText(b.author, 40);
  const body = cleanText(b.body, 280);
  const sticker = typeof b.sticker === "string" && config.stickersEnabled && config.stickers.some((s) => s.id === b.sticker) ? b.sticker : null;
  if (!body && !sticker) return json({ ok: false, error: "EMPTY" }, 400);

  if (await campaignBusy("wall_comments", campaign.id, 150)) return json({ ok: false, error: "RATE_LIMITED" }, 429);
  const sb = getSupabaseAdmin();
  const { data: post } = await sb.from("wall_posts").select("id").eq("id", String(b.postId ?? ""))
    .eq("campaign_id", campaign.id).eq("status", "approved").maybeSingle();
  if (!post) return json({ ok: false, error: "NOT_FOUND" }, 404);

  const flag = flagText(`${author}\n${body}`, config.blockedWords);
  const status = flag || config.moderation === "manual" ? "pending" : "approved";
  const { error } = await sb.from("wall_comments").insert({
    post_id: post.id, campaign_id: campaign.id, session_id: b.session, author, body, sticker, status, flag,
  });
  if (error) return json({ ok: false, error: "SAVE_FAILED" }, 500);
  // Le mur relit le message : la date de revision change.
  await sb.from("wall_posts").update({ updated_at: new Date().toISOString() }).eq("id", post.id);
  return json({ ok: true, status });
}
