import { NextResponse, type NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

// POST /api/spicy/join  { role: "tower" | "booth" | "stage" | "feed", code }
//
// La porte du live SOFI AIRLINES (SPICY AIRPORT, servi en statique sous
// /experiences/spicy-airport/). Avant, les codes vivaient dans la page : qui
// lisait le bundle lisait le code, et le canal du relais en derivait. Ici le
// code est verifie cote serveur, et la page ne recoit en echange que :
//   - le nom du canal Supabase Realtime du show (impossible a deviner sans
//     passer par cette porte) ;
//   - la cle de signature des messages qui pilotent la projection (intentions
//     de la tour, evenements du cockpit). La scene refuse tout message non
//     signe : un curieux qui trouverait le canal ne peut rien y commander.
//
// Variables d'environnement (Hostinger + .env.local) :
//   SPICY_SHOW_SECRET   au moins 32 caracteres aleatoires
//   SPICY_CODE_TOWER    code de la tour (FMR)
//   SPICY_CODE_BOOTH    code du DJ booth (Spicy Sofi)
//   SPICY_CODE_STAGE    code de la machine de projection
//   SPICY_CODE_FEED     code des pages TouchDesigner (Web Render) qui miroitent le show en lecture seule
// Changer SPICY_SHOW_SECRET change le canal et la cle : tous les postes
// doivent alors resaisir leur code.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ROLES = { tower: "SPICY_CODE_TOWER", booth: "SPICY_CODE_BOOTH", stage: "SPICY_CODE_STAGE", feed: "SPICY_CODE_FEED" } as const;
type Role = keyof typeof ROLES;

// Limite les essais de code : 10 par minute et par adresse (memoire du process).
const tries = new Map<string, { n: number; at: number }>();
function limited(ip: string): boolean {
  const now = Date.now();
  const t = tries.get(ip);
  if (!t || now - t.at > 60_000) {
    tries.set(ip, { n: 1, at: now });
    return false;
  }
  t.n += 1;
  return t.n > 10;
}

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "");

function sameCode(typed: string, want: string): boolean {
  const a = Buffer.from(norm(typed));
  const b = Buffer.from(norm(want));
  return a.length === b.length && timingSafeEqual(a, b);
}

const derive = (secret: string, what: string) => createHmac("sha256", secret).update(what).digest("base64url");

export async function POST(req: NextRequest) {
  const secret = process.env.SPICY_SHOW_SECRET ?? "";
  if (secret.length < 32) return NextResponse.json({ error: "show not configured" }, { status: 503 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return NextResponse.json({ error: "too many tries" }, { status: 429 });

  let body: { role?: string; code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const role = body.role as Role;
  if (!(role in ROLES) || typeof body.code !== "string") return NextResponse.json({ error: "bad request" }, { status: 400 });
  const want = process.env[ROLES[role]] ?? "";
  if (!want || !sameCode(body.code, want)) return NextResponse.json({ error: "refused" }, { status: 403 });

  return NextResponse.json(
    {
      role,
      channel: `sofi-airlines:${derive(secret, "channel").slice(0, 24)}`,
      secret: derive(secret, "sign"),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
