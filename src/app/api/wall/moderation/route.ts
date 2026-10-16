import type { NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { autoPos, zNow } from "@/lib/wall/shapes";
import { json, loadWall, placedCount } from "@/lib/wall/server";

// Moderation du mur, pour l'equipe (cle m), depuis un telephone ou l'admin.
// GET  ?slug=&m=          -> messages et commentaires recents, en attente d'abord
// Cle m : lien commun de l'equipe ou lien personnel d'un des 5 moderateurs ;
// chaque action garde le nom de son auteur (moderated_by).
// POST { slug, m, target: "post"|"comment", id, action: "approve"|"hide"|"pin"|"unpin" }

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const loaded = await loadWall(q.get("slug") ?? "", { m: q.get("m") });
  if (!loaded.ok || loaded.wall.access !== "mod") return json({ ok: false }, 404);
  const id = loaded.wall.campaign.id;
  const sb = getSupabaseAdmin();
  const [{ data: posts }, { data: comments }] = await Promise.all([
    sb.from("wall_posts").select("id, kind, author, body, color, stickers, status, flag, likes, pinned, has_strokes, photo_path, created_at, moderated_by")
      .eq("campaign_id", id).order("created_at", { ascending: false }).limit(200),
    sb.from("wall_comments").select("id, post_id, author, body, sticker, status, flag, created_at, moderated_by")
      .eq("campaign_id", id).order("created_at", { ascending: false }).limit(300),
  ]);
  return json({
    ok: true,
    by: loaded.wall.by,
    posts: (posts ?? []).map(({ photo_path, has_strokes, ...p }) => ({ ...p, hasPhoto: Boolean(photo_path), hasStrokes: has_strokes })),
    comments: comments ?? [],
  });
}

export async function POST(req: Request) {
  const b = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b) return json({ ok: false, error: "BAD_REQUEST" }, 400);
  const loaded = await loadWall(String(b.slug ?? ""), { m: String(b.m ?? "") });
  if (!loaded.ok || loaded.wall.access !== "mod") return json({ ok: false }, 404);
  const campaignId = loaded.wall.campaign.id;
  const by = loaded.wall.by ?? "Équipe";
  const id = String(b.id ?? "");
  const action = String(b.action ?? "");
  const sb = getSupabaseAdmin();
  const now = new Date().toISOString();

  if (b.target === "comment") {
    if (action !== "approve" && action !== "hide") return json({ ok: false, error: "BAD_ACTION" }, 400);
    const { data: c, error } = await sb.from("wall_comments").update({ status: action === "approve" ? "approved" : "hidden", moderated_by: by, moderated_at: now })
      .eq("id", id).eq("campaign_id", campaignId).select("post_id").maybeSingle();
    if (error || !c) return json({ ok: false, error: "NOT_FOUND" }, 404);
    await sb.from("wall_posts").update({ updated_at: now }).eq("id", c.post_id);
    return json({ ok: true });
  }

  const { data: p } = await sb.from("wall_posts").select("id, pos").eq("id", id).eq("campaign_id", campaignId).maybeSingle();
  if (!p) return json({ ok: false, error: "NOT_FOUND" }, 404);
  let patch: Record<string, unknown>;
  if (action === "approve") {
    // Une carte validee prend sa place sur le mur, au premier plan.
    patch = { status: "approved", moderated_at: now, pos: p.pos ?? autoPos(await placedCount(campaignId), zNow()) };
  } else if (action === "hide") patch = { status: "hidden", moderated_at: now };
  else if (action === "pin") patch = { pinned: true };
  else if (action === "unpin") patch = { pinned: false };
  else return json({ ok: false, error: "BAD_ACTION" }, 400);
  const { error } = await sb.from("wall_posts").update({ ...patch, moderated_by: by, updated_at: now }).eq("id", p.id);
  if (error) return json({ ok: false, error: "SAVE_FAILED" }, 500);
  return json({ ok: true });
}
