import { NextResponse } from "next/server";
import { currentRoles } from "@/lib/auth";

// GET /api/os/fx-rate — taux EUR→TND en direct (source publique, sans clé). Purement informatif :
// le taux qui fait foi sur les factures/comptabilité reste meta.eur_tnd (saisi/mis à jour à la main).

export async function GET() {
  const roles = await currentRoles();
  if (!roles.includes("admin")) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/EUR", { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const json: { rates?: Record<string, number>; time_last_update_utc?: string } = await res.json();
    const rate = json.rates?.TND;
    if (typeof rate !== "number") throw new Error("taux TND absent de la réponse");
    return NextResponse.json({ rate, asOf: json.time_last_update_utc ?? null });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}
