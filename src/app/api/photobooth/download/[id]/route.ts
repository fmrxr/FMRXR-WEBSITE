import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseDb } from "@/lib/photobooth/server";

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
  if (!u || u.session_id !== session || u.status !== "succeeded" || !u.result_url?.startsWith("https://")) {
    return new NextResponse("Not found", { status: 404 });
  }
  let up: Response;
  try {
    up = await fetch(u.result_url, { signal: AbortSignal.timeout(30_000) });
  } catch {
    return new NextResponse("Expired", { status: 410 });
  }
  if (!up.ok || !up.body) return new NextResponse("Expired", { status: 410 });

  const type = up.headers.get("content-type") ?? "image/png";
  if (!type.startsWith("image/")) return new NextResponse("Expired", { status: 410 });
  const ext = type.includes("jpeg") ? "jpg" : type.includes("webp") ? "webp" : "png";
  const headers = new Headers({
    "Content-Type": type,
    "Cache-Control": "private, max-age=3600",
    "X-Content-Type-Options": "nosniff",
  });
  if (req.nextUrl.searchParams.get("dl")) {
    headers.set("Content-Disposition", `attachment; filename="fmrxr-portrait-${id.slice(0, 8)}.${ext}"`);
  }
  return new NextResponse(up.body, { headers });
}
