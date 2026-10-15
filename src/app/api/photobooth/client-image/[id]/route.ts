import { NextResponse, type NextRequest } from "next/server";
import { currentRoles, currentUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { canSeeCampaign } from "@/lib/photobooth/client";
import { relayPortrait } from "@/lib/photobooth/server";

// GET /api/photobooth/client-image/<usageId>[?dl=1] — portrait final (branding,
// mise en page) pour la galerie de l'espace client. Reserve aux membres de la
// campagne du portrait (et a l'admin), verifie ici a chaque appel.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f-]{36}$/i;

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });
  const { id } = await ctx.params;
  if (!UUID.test(id)) return new NextResponse("Not found", { status: 404 });
  const { data } = await getSupabaseAdmin()
    .from("photobooth_usage").select("status, result_url, campaign_id").eq("id", id).maybeSingle();
  if (!data || data.status !== "succeeded" || !data.result_url) return new NextResponse("Not found", { status: 404 });
  const roles = await currentRoles();
  if (!(await canSeeCampaign(user.id, data.campaign_id, roles.includes("admin")))) {
    return new NextResponse("Not found", { status: 404 });
  }
  return relayPortrait(data.result_url, id, req.nextUrl.searchParams.get("dl") ? `fmrxr-portrait-${id.slice(0, 8)}` : null);
}
