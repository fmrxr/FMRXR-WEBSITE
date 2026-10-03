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

// Les projets s'affichent toujours du plus récent au plus ancien, partout :
// page /projects, accueil, sitemap, llms.txt. C'est une règle de lecture, pas
// une donnée à maintenir à la main, donc elle est appliquée ici une fois pour
// toutes plutôt que via `sort_order` qu'il faudrait renuméroter à chaque ajout.
//
// `year` est un texte libre et pas une date : on y trouve "2026", "2021–2022",
// "2022–present". On retient l'année la plus tardive qu'il contient, donc la fin
// d'une période, et un projet toujours en cours passe devant tout le reste.
// `sort_order` reste décisif à année égale : le classement éditorial de Haïfa
// continue de s'appliquer à l'intérieur d'une même année.
const ONGOING = /present|ongoing|aujourd|en cours/i;

function recency(year?: string | null): number {
  if (!year) return -1;
  if (ONGOING.test(year)) return 9999;
  const found = String(year).match(/\d{4}/g);
  return found ? Math.max(...found.map(Number)) : -1;
}

export async function getPublished(table: string) {
  const { data } = await supabase.from(table).select("*").eq("published", true).order("sort_order");
  const rows = data ?? [];
  if (table !== "projects") return rows;
  return [...rows].sort(
    (a, b) => recency(b.year) - recency(a.year) || (a.sort_order ?? 0) - (b.sort_order ?? 0),
  );
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
