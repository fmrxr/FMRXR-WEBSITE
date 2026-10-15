import { NextResponse } from "next/server";

// POST /api/photobooth/debug-log — en developpement seulement : la borne en
// mode &debug=1 y envoie ses erreurs et son etat, pour diagnostiquer un
// telephone dont on ne voit pas la console. Inexistant en production.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") return new NextResponse(null, { status: 404 });
  const body = await req.text();
  console.log(`[PHOTOBOOTH-DEBUG] ${body.slice(0, 8000)}`);
  return NextResponse.json({ ok: true });
}
