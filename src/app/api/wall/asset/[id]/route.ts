import type { NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { json, loadWall, MEDIA_BUCKET } from "@/lib/wall/server";

// GET /api/wall/asset/<id>?slug=&k|s|m=&t=strokes|photo
// Traits d'un dessin ou photo d'un message. Contenu immuable : mis en cache
// par le navigateur. Un message en attente n'est lisible que par l'equipe.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const q = req.nextUrl.searchParams;
  const loaded = await loadWall(q.get("slug") ?? "", { k: q.get("k"), s: q.get("s"), m: q.get("m") });
  if (!loaded.ok) return json({ ok: false }, 404);
  const { campaign, access } = loaded.wall;
  if (!/^[0-9a-f-]{36}$/.test(id)) return json({ ok: false }, 404);
  const sb = getSupabaseAdmin();
  const { data: p } = await sb.from("wall_posts").select("status, strokes, photo_path").eq("id", id).eq("campaign_id", campaign.id).maybeSingle();
  if (!p || (p.status !== "approved" && access !== "mod")) return json({ ok: false }, 404);
  const cache = p.status === "approved" ? "private, max-age=86400, immutable" : "no-store";

  if (q.get("t") === "strokes") {
    if (!p.strokes) return json({ ok: false }, 404);
    return Response.json(p.strokes, { headers: { "Cache-Control": cache } });
  }
  if (!p.photo_path) return json({ ok: false }, 404);
  const { data, error } = await sb.storage.from(MEDIA_BUCKET).download(p.photo_path);
  if (error || !data) return json({ ok: false }, 404);
  return new Response(data, { headers: { "Content-Type": "image/webp", "Cache-Control": cache } });
}
