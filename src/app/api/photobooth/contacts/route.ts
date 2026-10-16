import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isGalleryKey } from "@/lib/photobooth/gallery-access";
import { campaignContacts } from "@/lib/photobooth/client";
import { contactsCsv } from "@/lib/photobooth/contact";

// GET /api/photobooth/contacts?slug=<slug>&g=<cle de galerie> — export CSV des
// coordonnees laissees a la borne (option contact). Meme cle que la galerie
// d'equipe, verifiee ici.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug") ?? "";
  const g = req.nextUrl.searchParams.get("g");
  const { data: c } = await getSupabaseAdmin()
    .from("photobooth_campaigns").select("id, slug, access_key").eq("slug", slug).maybeSingle();
  if (!c || !isGalleryKey(c.access_key, g)) return new NextResponse("Not found", { status: 404 });
  const rows = await campaignContacts(c.id);
  return new NextResponse(contactsCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="contacts-${c.slug}.csv"`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
