import { NextResponse, type NextRequest } from "next/server";
import { currentRoles } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { relayPortrait, thumbWidth } from "@/lib/photobooth/server";
import { isHidden } from "@/lib/photobooth/gallery-access";

// GET /api/photobooth/image/<usageId> — portrait vu depuis la galerie admin.
// Reserve au role admin, verifie ici et pas seulement par la page.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f-]{36}$/i;

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const roles = await currentRoles();
  if (!roles.includes("admin")) return new NextResponse("Forbidden", { status: 403 });
  const { id } = await ctx.params;
  if (!UUID.test(id)) return new NextResponse("Not found", { status: 404 });
  const { data } = await getSupabaseAdmin()
    .from("photobooth_usage").select("status, result_url, campaign_id, mood").eq("id", id).maybeSingle();
  if (!data || data.status !== "succeeded" || !data.result_url || isHidden(data.mood)) return new NextResponse("Not found", { status: 404 });
  return relayPortrait(
    data.result_url, id,
    req.nextUrl.searchParams.get("dl") ? `fmrxr-portrait-${id.slice(0, 8)}` : null,
    thumbWidth(req.nextUrl.searchParams.get("w")),
  );
}
