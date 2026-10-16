import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { resolveConfig } from "@/lib/photobooth/config";
import { isGalleryKey, isHidden } from "@/lib/photobooth/gallery-access";
import { isShareActive } from "@/lib/photobooth/server";

// GET /api/photobooth/wall?slug=<slug>&g=<cle de galerie> — derniers portraits
// pour le mur en direct (option payante). Meme cle que la galerie d'equipe.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug") ?? "";
  const g = req.nextUrl.searchParams.get("g");
  const sb = getSupabaseAdmin();
  const { data: c } = await sb.from("photobooth_campaigns").select("id, access_key, config").eq("slug", slug).maybeSingle();
  if (!c || !isGalleryKey(c.access_key, g)) return NextResponse.json({ ok: false }, { status: 404 });
  const cfg = resolveConfig(c.config);
  if (!cfg.ok || !cfg.config.liveWall) return NextResponse.json({ ok: false, error: "OPTION_DISABLED" }, { status: 403 });
  const { data } = await sb.from("photobooth_usage").select("id, completed_at, mood")
    .eq("campaign_id", c.id).eq("status", "succeeded").not("completed_at", "is", null)
    .order("completed_at", { ascending: false }).limit(40);
  const items = (data ?? [])
    .filter((r) => isShareActive(r.completed_at) && !isHidden(r.mood))
    .slice(0, 24)
    .map((r) => ({ id: r.id, at: r.completed_at, title: ((r.mood ?? {}) as { title?: Record<string, string> }).title ?? null }));
  return NextResponse.json({ ok: true, items }, { headers: { "Cache-Control": "no-store" } });
}
