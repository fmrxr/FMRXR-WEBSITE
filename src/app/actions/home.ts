"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { assertRole } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import { CONFIGURABLE_SLUGS } from "@/lib/experiences";

// Réglages de l'accueil (site_settings.hero_projects, site_settings.home_experience).
// Enregistrés à part du formulaire des réglages : tant que la migration 0023
// n'est pas appliquée, seul ce réglage échoue, avec son message.

type Result = { ok: true } | { ok: false; error: string };

async function update(patch: Record<string, unknown>): Promise<Result> {
  const supabase = await getSupabaseServer();
  const existing = await supabase.from("site_settings").select("id").limit(1).single();
  const { error } = existing.data
    ? await supabase.from("site_settings").update(patch).eq("id", existing.data.id)
    : await supabase.from("site_settings").insert(patch);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/");
  return { ok: true };
}

// Un fichier "use server" n'exporte que des fonctions async.
const HERO_PROJECTS_MAX = 3;

export async function saveHeroProjects(input: unknown): Promise<Result> {
  await assertRole(["admin"]);
  const parsed = z.array(z.string().min(1).max(200)).max(HERO_PROJECTS_MAX).safeParse(input);
  if (!parsed.success) return { ok: false, error: `Trois projets au plus` };
  const r = await update({ hero_projects: [...new Set(parsed.data)] });
  if (r.ok) revalidatePath("/admin/settings");
  return r;
}

const KNOWN = new Set(CONFIGURABLE_SLUGS);

/** Met une expérience à la une de l'accueil, et l'affiche sur /experiences pour que « Play » s'ouvre. */
export async function saveHomeExperience(slug: unknown, visible: unknown): Promise<Result> {
  await assertRole(["admin"]);
  const s = z.string().refine((v) => KNOWN.has(v)).safeParse(slug);
  if (!s.success) return { ok: false, error: "Expérience inconnue" };
  const list = z.array(z.string().refine((v) => KNOWN.has(v))).safeParse(visible);
  const patch: Record<string, unknown> = { home_experience: s.data };
  if (list.success && !list.data.includes(s.data)) patch.experiences_visible = [...list.data, s.data];
  const r = await update(patch);
  if (r.ok) {
    revalidatePath("/experiences");
    revalidatePath("/admin/experiences");
  }
  return r;
}
