import "server-only";
import { getSupabaseServer } from "@/lib/supabase/server";
import { compareForDisplay } from "./types";
import type { Opportunity, OpportunityNote, OpportunityTask } from "./types";

// Les requetes vivent a part des types et des calculs de dates : controls.tsx
// est un composant client et ne peut pas importer un module server-only.
export * from "./types";

/**
 * Table absente : la migration 0012 n'a pas encore ete appliquee. PostgREST
 * renvoie alors 42P01 (relation inconnue) ou PGRST205 (table hors du cache de
 * schema). On le distingue d'une vraie panne pour afficher une consigne au lieu
 * d'une erreur 500.
 */
export class SchemaMissingError extends Error {}

function rethrow(error: { code?: string; message: string }): never {
  if (error.code === "42P01" || error.code === "PGRST205") {
    throw new SchemaMissingError(error.message);
  }
  throw error;
}

export async function listOpportunities(): Promise<Opportunity[]> {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.from("opportunities").select("*");
  if (error) rethrow(error);
  return ((data ?? []) as Opportunity[]).sort(compareForDisplay);
}

export async function getOpportunity(slug: string) {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase
    .from("opportunities").select("*").eq("slug", slug).maybeSingle();
  if (error) rethrow(error);
  if (!data) return null;
  const opportunity = data as Opportunity;

  const [tasks, notes] = await Promise.all([
    supabase.from("opportunity_tasks").select("*")
      .eq("opportunity_id", opportunity.id)
      .order("done", { ascending: true })
      .order("position", { ascending: true }),
    supabase.from("opportunity_notes").select("*")
      .eq("opportunity_id", opportunity.id)
      .order("created_at", { ascending: false }),
  ]);

  return {
    opportunity,
    tasks: (tasks.data ?? []) as OpportunityTask[],
    notes: (notes.data ?? []) as OpportunityNote[],
  };
}

export type CollabActivity = {
  id: string;
  author_email: string | null;
  body: string;
  created_at: string;
  slug: string;
  title: string;
};

/**
 * Tout ce que les collaborateurs ont ecrit dans /collab, pour l'OS.
 *
 * L'admin ne va pas ouvrir dix-huit dossiers pour voir si quelqu'un a repondu.
 * Le fil est donc remonte a plat, le plus recent d'abord, avec le dossier
 * d'origine en lien.
 */
export async function listActivity(limit = 80): Promise<CollabActivity[]> {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase
    .from("opportunity_notes")
    .select("id, author_email, body, created_at, opportunities(slug, title)")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) rethrow(error);

  return (data ?? []).map((n: any) => ({
    id: n.id,
    author_email: n.author_email,
    body: n.body,
    created_at: n.created_at,
    // L'imbrication PostgREST rend un objet pour une relation « plusieurs vers
    // un », mais le typage generique la decrit parfois comme un tableau.
    slug: (Array.isArray(n.opportunities) ? n.opportunities[0]?.slug : n.opportunities?.slug) ?? "",
    title: (Array.isArray(n.opportunities) ? n.opportunities[0]?.title : n.opportunities?.title) ?? "Dossier supprimé",
  }));
}

/**
 * Dossiers reellement modifies depuis leur import, pour voir les changements
 * d'etat qui ne passent pas par le fil de discussion.
 *
 * Trier sur updated_at seul ne vaut rien tant que rien n'a bouge : toutes les
 * lignes importees le meme jour portent la meme date et le classement devient
 * arbitraire, ce qui donne une liste d'appels auxquels personne n'a touche.
 * PostgREST ne sait pas comparer deux colonnes entre elles, donc l'ecart se
 * mesure ici.
 */
export async function recentlyTouched(limit = 8): Promise<Opportunity[]> {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase
    .from("opportunities").select("*")
    .order("updated_at", { ascending: false }).limit(60);
  if (error) rethrow(error);
  return ((data ?? []) as Opportunity[])
    .filter((o) => new Date(o.updated_at).getTime() - new Date(o.created_at).getTime() > 2000)
    .slice(0, limit);
}

/** Horodatage de la derniere consultation du fil par l'admin. */
export async function lastSeen(): Promise<string | null> {
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("collab_meta").select("value").eq("key", "admin_last_seen").maybeSingle();
  return ((data?.value ?? null) as { at?: string } | null)?.at ?? null;
}

/** Date du dernier releve de veille, pour afficher l'age de la page. */
export async function lastScan(): Promise<{ at: string; sources: string[] } | null> {
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("collab_meta").select("value").eq("key", "last_scan").maybeSingle();
  const v = (data?.value ?? null) as { at?: string; sources?: string[] } | null;
  if (!v?.at) return null;
  return { at: v.at, sources: v.sources ?? [] };
}
