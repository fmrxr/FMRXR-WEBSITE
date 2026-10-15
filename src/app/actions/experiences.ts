"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { assertRole } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import { EXPERIENCES, PHOTOBOOTH_SLUG } from "@/lib/experiences";

// Visibilité des expériences sur /experiences (site_settings.experiences_visible).

const KNOWN = new Set([PHOTOBOOTH_SLUG, ...EXPERIENCES.map((e) => e.slug)]);
const visibleSchema = z.array(z.string().refine((s) => KNOWN.has(s), "Expérience inconnue")).max(KNOWN.size);

/** null : réglage jamais posé (tout s'affiche). error : colonne absente, migration 0019 à appliquer. */
export async function getExperienceVisibility(): Promise<{ visible: string[] | null; error: string | null }> {
  await assertRole(["admin"]);
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.from("site_settings").select("experiences_visible").limit(1).maybeSingle();
  if (error) return { visible: null, error: error.message };
  return { visible: (data?.experiences_visible as string[] | null) ?? null, error: null };
}

export async function saveExperienceVisibility(input: unknown): Promise<{ ok: true } | { ok: false; error: string }> {
  await assertRole(["admin"]);
  const parsed = visibleSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Liste invalide" };
  const visible = [...new Set(parsed.data)];
  const supabase = await getSupabaseServer();
  const existing = await supabase.from("site_settings").select("id").limit(1).single();
  const { error } = existing.data
    ? await supabase.from("site_settings").update({ experiences_visible: visible }).eq("id", existing.data.id)
    : await supabase.from("site_settings").insert({ experiences_visible: visible });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/experiences");
  revalidatePath("/admin/experiences");
  return { ok: true };
}
