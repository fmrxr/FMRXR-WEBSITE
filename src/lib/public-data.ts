import { getSupabaseServer } from "./supabase/server";
import { SITE, type SiteSettings } from "./site-data";

export async function getPublished(table: string) {
  const supabase = await getSupabaseServer();
  const { data } = await supabase.from(table).select("*").eq("published", true).order("sort_order");
  return data ?? [];
}

export async function getAll(table: string) {
  const supabase = await getSupabaseServer();
  const { data } = await supabase.from(table).select("*").order("sort_order");
  return data ?? [];
}

export async function getBySlug(table: string, slug: string) {
  const supabase = await getSupabaseServer();
  const { data } = await supabase.from(table).select("*").eq("slug", slug).eq("published", true).maybeSingle();
  return data;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await getSupabaseServer();
  const { data } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
  return (data as SiteSettings) ?? SITE;
}
