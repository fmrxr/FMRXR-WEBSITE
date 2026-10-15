import { NextResponse, type NextRequest } from "next/server";
import { findShared, relayImage } from "@/lib/photobooth/server";

// GET /api/photobooth/share/<jeton>[?dl=1] — image d'un portrait partage par QR.
// Le jeton est distinct de l'identifiant interne et expire 7 jours apres la generation.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  const s = await findShared(token);
  if (!s.ok) return new NextResponse(s.reason === "EXPIRED" ? "Expired" : "Not found", { status: s.reason === "EXPIRED" ? 410 : 404 });
  return relayImage(s.resultUrl, req.nextUrl.searchParams.get("dl") ? `fmrxr-portrait-${token.slice(0, 8)}` : null);
}
