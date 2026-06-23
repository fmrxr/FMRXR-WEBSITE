"use server";
import { revalidatePath } from "next/cache";
import { assertRole } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import { settingsSchema } from "@/lib/schemas";

export async function getSettings() {
  const supabase = await getSupabaseServer();
  const { data } = await supabase.from("site_settings").select("*").limit(1).single();
  return data;
}

export async function saveSettings(input: unknown) {
  await assertRole(["admin"]);
  const parsed = settingsSchema.parse(input) as Record<string, unknown>;
  const supabase = await getSupabaseServer();
  const existing = await supabase.from("site_settings").select("id").limit(1).single();
  if (existing.data) await supabase.from("site_settings").update(parsed).eq("id", existing.data.id);
  else await supabase.from("site_settings").insert(parsed);
  // Settings show on the home, about, contact and llms.txt pages.
  for (const p of ["/", "/about", "/contact", "/llms.txt", "/sitemap.xml", "/admin/settings"]) {
    revalidatePath(p);
  }
}
