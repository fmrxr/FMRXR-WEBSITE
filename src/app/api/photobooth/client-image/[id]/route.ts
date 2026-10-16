import { NextResponse, type NextRequest } from "next/server";
import { currentRoles, currentUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { canSeeCampaign } from "@/lib/photobooth/client";
import { relayPortrait } from "@/lib/photobooth/server";
import { isGalleryKey, isHidden } from "@/lib/photobooth/gallery-access";

async function galleryKeyMatches(campaignId: string, g: string | null) {
  if (!g) return false;
  const { data } = await getSupabaseAdmin().from("photobooth_campaigns").select("access_key").eq("id", campaignId).maybeSingle();
  return Boolean(data && isGalleryKey(data.access_key, g));
}

// GET /api/photobooth/client-image/<usageId>[?dl=1] — portrait final (branding,
// mise en page) pour la galerie de l'espace client et la galerie d'equipe.
// Reserve aux membres de la campagne (et a l'admin), ou au porteur de la cle
// de galerie (?g=), verifie ici a chaque appel.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f-]{36}$/i;

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!UUID.test(id)) return new NextResponse("Not found", { status: 404 });
  const { data } = await getSupabaseAdmin()
    .from("photobooth_usage").select("status, result_url, campaign_id, mood").eq("id", id).maybeSingle();
  if (!data || data.status !== "succeeded" || !data.result_url || isHidden(data.mood)) return new NextResponse("Not found", { status: 404 });
  // Acces : cle de la galerie d'equipe, ou membre connecte de la campagne (ou admin).
  if (!(await galleryKeyMatches(data.campaign_id, req.nextUrl.searchParams.get("g")))) {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });
    const roles = await currentRoles();
    if (!(await canSeeCampaign(user.id, data.campaign_id, roles.includes("admin")))) {
      return new NextResponse("Not found", { status: 404 });
    }
  }
  return relayPortrait(data.result_url, id, req.nextUrl.searchParams.get("dl") ? `fmrxr-portrait-${id.slice(0, 8)}` : null);
}
