import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseDb, getProvider } from "@/lib/photobooth/server";
import { pollGeneration } from "@/lib/photobooth/service";

// GET /api/photobooth/status/<usageId>?session=<id> — la borne interroge ici,
// jamais Higgsfield directement. Seule la session qui a lance la generation y a acces.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f-]{36}$/i;

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const session = req.nextUrl.searchParams.get("session");
  if (!UUID.test(id) || !session) return NextResponse.json({ status: "not_found" }, { status: 404 });
  const provider = getProvider();
  if (!provider) return NextResponse.json({ status: "failed", error: "PROVIDER_NOT_CONFIGURED" }, { status: 503 });

  const r = await pollGeneration(id, session, { db: createSupabaseDb(), provider });
  if (r.status === "not_found") return NextResponse.json(r, { status: 404 });
  // L'URL Higgsfield n'est pas renvoyee : le telechargement passe par /download.
  if (r.status === "succeeded") {
    return NextResponse.json({ status: "succeeded", image: `/api/photobooth/download/${id}?session=${encodeURIComponent(session)}` });
  }
  return NextResponse.json(r);
}
