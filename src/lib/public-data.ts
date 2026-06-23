import { createClient } from "@supabase/supabase-js";
import { SITE, type SiteSettings } from "./site-data";

// Public reads use a plain anon client (no cookies). Public pages only ever
// surface published content (RLS allows anon to read published rows), and this
// client works both at request time AND at build time inside generateStaticParams
// — unlike the cookie-bound server client, which requires an HTTP request.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } },
);

export async function getPublished(table: string) {
  const { data } = await supabase.from(table).select("*").eq("published", true).order("sort_order");
  return data ?? [];
}

export async function getAll(table: string) {
  const { data } = await supabase.from(table).select("*").order("sort_order");
  return data ?? [];
}

export async function getBySlug(table: string, slug: string) {
  const { data } = await supabase.from(table).select("*").eq("slug", slug).eq("published", true).maybeSingle();
  return data;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
  return (data as SiteSettings) ?? SITE;
}
