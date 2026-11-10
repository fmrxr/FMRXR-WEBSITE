import type { NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { json, loadWall } from "@/lib/wall/server";
import { applyBrand, brandOf, brandPatchSchema } from "@/lib/wall/brand";
import { resolveConfig } from "@/lib/wall/config";

// La charte du mur, posee par l'equipe du client depuis sa page de controle.
// GET  ?slug=&m=            -> la charte actuelle
// POST { slug, m, patch }   -> enregistre la charte
//
// Seuls les champs d'habillage passent (voir lib/wall/brand.ts) : la cle de
// moderation n'ouvre jamais les moderateurs, les mots bloques, le mode de
// moderation ni les limites d'envoi.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const loaded = await loadWall(q.get("slug") ?? "", { m: q.get("m") });
  if (!loaded.ok || loaded.wall.access !== "mod") return json({ ok: false }, 404);
  return json({ ok: true, brand: brandOf(loaded.wall.config), by: loaded.wall.by });
}

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => null);
  if (!b || typeof b.slug !== "string") return json({ ok: false, error: "BAD_REQUEST" }, 400);

  const loaded = await loadWall(b.slug, { m: b.m });
  if (!loaded.ok || loaded.wall.access !== "mod") return json({ ok: false }, 404);

  const parsed = brandPatchSchema.safeParse(b.patch);
  if (!parsed.success) {
    const i = parsed.error.issues[0];
    return json({ ok: false, error: `${i.path.join(".")} : ${i.message}` }, 400);
  }

  const next = applyBrand(loaded.wall.config, parsed.data);
  // On repasse par le schema complet : la charte ne doit pas pouvoir
  // produire une configuration que le mur refuserait de lire.
  const check = resolveConfig(next);
  if (!check.ok) return json({ ok: false, error: check.error }, 400);

  // updated_at entre dans la version du flux (/api/wall/feed) : sans lui,
  // ecrans et telephones ne voyaient rien tant qu'aucune carte ne bougeait.
  const { error } = await getSupabaseAdmin()
    .from("wall_campaigns").update({ config: check.config, updated_at: new Date().toISOString() }).eq("id", loaded.wall.campaign.id);
  if (error) return json({ ok: false, error: "SAVE_FAILED" }, 500);

  return json({ ok: true, brand: brandOf(check.config) });
}
