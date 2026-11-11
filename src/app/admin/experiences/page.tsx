import { currentRoles } from "@/lib/auth";
import { getExperienceVisibility } from "@/app/actions/experiences";
import { EXPERIENCES, ROWS } from "@/lib/experiences";
import { PRODUCTS } from "@/lib/products";
import { getSupabaseServer } from "@/lib/supabase/server";
import { VisibilityForm, type Item } from "./form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const roles = await currentRoles();
  if (!roles.includes("admin")) {
    return <p className="text-muted-foreground">Le réglage des expériences est réservé aux administrateurs.</p>;
  }
  const { visible, error } = await getExperienceVisibility();
  // Lu à part : sans la migration 0023, le reste de la page fonctionne.
  const supabase = await getSupabaseServer();
  const home = await supabase.from("site_settings").select("home_experience").limit(1).maybeSingle();
  const rowLabel = Object.fromEntries(ROWS.map((r) => [r.id, r.label]));
  const items: Item[] = [
    // Un bloc par produit : presentation, demo et liens vers sa page Decouvrir (/<slug>) et le brief.
    ...PRODUCTS.map((p) => ({ slug: p.slug, title: p.name.join(""), group: "Bloc produit", poster: p.poster, pitch: `${p.tagline} Page Découvrir : /${p.slug}.` })),
    ...EXPERIENCES.map((e) => ({ slug: e.slug, title: e.title, group: rowLabel[e.row], poster: e.poster, pitch: e.pitch })),
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Expériences</h1>
        <p className="text-sm text-muted-foreground">
          Ce qui s’affiche sur la page publique /experiences. Une expérience cachée disparaît du catalogue et ne peut plus
          être ouverte par un lien <code>?play=</code>. Une nouvelle expérience ajoutée au code reste cachée jusqu’à son activation ici.
          Le <strong>hero</strong> passe en tête de page : un bloc produit (Photobooth, Live Wall) avant le catalogue, ou l’expérience choisie ouverte dans le lecteur du haut.
          <strong> Sur l’accueil</strong> choisit la nouvelle expérience montrée sur la page d’accueil (S/03) ; une expérience cachée devient visible pour que « Play » s’ouvre.
        </p>
      </div>
      {error ? (
        <p className="rounded-md border border-destructive/50 p-3 text-sm">
          Colonne introuvable : la migration <code>0019_experiences_visibility.sql</code> n’est pas encore appliquée ({error}).
        </p>
      ) : (
        <VisibilityForm
          items={items}
          initial={visible ?? items.map((i) => i.slug)}
          home={(home.data?.home_experience as string | null) ?? null}
          homeError={home.error?.message ?? null}
        />
      )}
    </div>
  );
}
