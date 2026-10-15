import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseDb, relayPortrait } from "@/lib/photobooth/server";

// GET /api/photobooth/download/<usageId>?session=<id>[&dl=1]
// Relaie l'image generee (meme origine, donc telechargeable et affichable sans
// exposer l'URL du fournisseur). Higgsfield garde les sorties au moins 7 jours.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f-]{36}$/i;

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const session = req.nextUrl.searchParams.get("session");
  if (!UUID.test(id) || !session) return new NextResponse("Not found", { status: 404 });

  const u = await createSupabaseDb().getUsage(id);
  if (!u || u.session_id !== session || u.status !== "succeeded" || !u.result_url) {
    return new NextResponse("Not found", { status: 404 });
  }
  return relayPortrait(u.result_url, id, req.nextUrl.searchParams.get("dl") ? `fmrxr-portrait-${id.slice(0, 8)}` : null);
}
