import type { NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { json, loadWall } from "@/lib/wall/server";

// Ouvrir, mettre en pause ou clore le mur, depuis la page de controle.
// POST { slug, m, status: "active" | "suspended" | "ended" }
//
// C'est la soiree du client : si un message echappe a la moderation ou si
// la salle s'emballe, son equipe doit pouvoir arreter le mur tout de
// suite, sans appeler FMRXR. Les trois etats sont reversibles.
//
// « draft » n'est pas propose : il appartient a la preparation, avant que
// la campagne existe pour le client. Et les dates d'ouverture et de
// fermeture restent a l'admin, parce qu'elles engagent la facturation.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set(["active", "suspended", "ended"]);

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => null);
  if (!b || typeof b.slug !== "string" || !ALLOWED.has(b.status)) {
    return json({ ok: false, error: "BAD_REQUEST" }, 400);
  }
  const loaded = await loadWall(b.slug, { m: b.m });
  if (!loaded.ok || loaded.wall.access !== "mod") return json({ ok: false }, 404);

  // updated_at entre dans la version du flux (/api/wall/feed) : sans lui,
  // ecrans et telephones ne voyaient rien tant qu'aucune carte ne bougeait.
  const { error } = await getSupabaseAdmin()
    .from("wall_campaigns").update({ status: b.status, updated_at: new Date().toISOString() }).eq("id", loaded.wall.campaign.id);
  if (error) return json({ ok: false, error: "SAVE_FAILED" }, 500);

  return json({ ok: true, status: b.status });
}
