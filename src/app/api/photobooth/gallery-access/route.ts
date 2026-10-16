import { NextResponse, type NextRequest } from "next/server";
import { clientIp, loadCampaign, rateLimited } from "@/lib/photobooth/server";
import { galleryPath, isGalleryPin } from "@/lib/photobooth/gallery-access";

// POST /api/photobooth/gallery-access  {slug, k, pin}
// Depuis la premiere page de la borne : le code equipe ouvre la galerie.
// Lien de la borne + bon code exiges ; 6 essais par minute et par adresse,
// donc un code a 6 chiffres ne se devine pas.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (rateLimited(`gallery:${clientIp(req)}`, 6)) return NextResponse.json({ ok: false, error: "RATE_LIMITED" }, { status: 429 });
  const b = (await req.json().catch(() => ({}))) as { slug?: unknown; k?: unknown; pin?: unknown };
  if (typeof b.slug !== "string" || typeof b.k !== "string" || typeof b.pin !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const loaded = await loadCampaign(b.slug, b.k);
  if (!loaded.ok || !isGalleryPin(loaded.campaign.access_key, b.pin.trim())) {
    return NextResponse.json({ ok: false, error: "WRONG_CODE" }, { status: 403 });
  }
  return NextResponse.json({ ok: true, path: galleryPath(b.slug, loaded.campaign.access_key) });
}
