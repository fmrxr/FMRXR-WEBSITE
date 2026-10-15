import { currentRoles } from "@/lib/auth";
import { getExperienceVisibility } from "@/app/actions/experiences";
import { EXPERIENCES, PHOTOBOOTH_SLUG, ROWS } from "@/lib/experiences";
import { VisibilityForm, type Item } from "./form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const roles = await currentRoles();
  if (!roles.includes("admin")) {
    return <p className="text-muted-foreground">Le réglage des expériences est réservé aux administrateurs.</p>;
  }
  const { visible, error } = await getExperienceVisibility();
  const rowLabel = Object.fromEntries(ROWS.map((r) => [r.id, r.label]));
  const items: Item[] = [
    { slug: PHOTOBOOTH_SLUG, title: "AI Photobooth", group: "Bloc produit", poster: "/photobooth/hero-photobooth.webp", pitch: "Bloc de présentation et lien vers /photobooth." },
    ...EXPERIENCES.map((e) => ({ slug: e.slug, title: e.title, group: rowLabel[e.row], poster: e.poster, pitch: e.pitch })),
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Expériences</h1>
        <p className="text-sm text-muted-foreground">
          Ce qui s’affiche sur la page publique /experiences. Une expérience cachée disparaît du catalogue et ne peut plus
          être ouverte par un lien <code>?play=</code>. Une nouvelle expérience ajoutée au code reste cachée jusqu’à son activation ici.
        </p>
      </div>
      {error ? (
        <p className="rounded-md border border-destructive/50 p-3 text-sm">
          Colonne introuvable : la migration <code>0019_experiences_visibility.sql</code> n’est pas encore appliquée ({error}).
        </p>
      ) : (
        <VisibilityForm items={items} initial={visible ?? items.map((i) => i.slug)} />
      )}
    </div>
  );
}
