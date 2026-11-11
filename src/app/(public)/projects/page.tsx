import type { Metadata } from "next";
import { social } from "@/lib/seo";
import Link from "next/link";
import { getPublished } from "@/lib/public-data";
import { PageHero } from "@/components/site/PageHero";
import { ProjectRow } from "@/components/site/ProjectRow";
import { IndustryNav } from "@/components/site/IndustryNav";
import { ProjectCard } from "@/components/site/ProjectCard";

// Rendu a la demande plutot qu'ISR. L'hebergement fait tourner plusieurs
// processus Node, chacun avec son propre cache : avec revalidate, une meme URL
// renvoyait tantot l'ancienne version tantot la nouvelle selon le worker
// touche. Le contenu vient de Supabase et change souvent, la coherence prime
// ici sur la mise en cache.
export const dynamic = "force-dynamic";

// Titre, description et canonical propres : sans eux la page héritait de ceux
// de l"accueil, canonical "/" compris, et Google la lisait comme un doublon.
export const metadata: Metadata = {
  title: "Work · Immersive installations and live A/V",
  description:
    "Selected work by FMRXR Studio: Ooredoo 5G, BYD Dolphin Surf, SPECTRUM, Les 100 Violons at the National Museum of Carthage, Interference, ClassZ, NeoPhi.",
  keywords: ["immersive installation portfolio", "projection mapping projects", "new media art", "brand activation", "live A/V", "Tunisia", "Paris"],
  alternates: { canonical: "/projects" },
  ...social({ url: "/projects", title: "Work · Immersive installations and live A/V · FMRXR//", description: "Selected work by FMRXR Studio: Ooredoo 5G, BYD Dolphin Surf, SPECTRUM, Les 100 Violons at the National Museum of Carthage, Interference, ClassZ, NeoPhi." }),
};

const pad = (n: number) => String(n).padStart(2, "0");

// Combien de projets dans la rangée d'ouverture. Assez pour remplir deux
// largeurs d'écran, pas au point de doubler les rangées qui suivent.
const LATEST = 8;

// La carte commune (ProjectCard) : hauteur fixe, couverture au format d'origine.
function Card({ p }: { p: any; i: number }) {
  return <ProjectCard p={p} summary className="max-w-[78vw]" />;
}

function Row({ id, title, href, cta, projects }: { id: string; title: string; href?: string; cta?: string; projects: any[] }) {
  return (
    // scroll-mt : le header fixe et le bandeau collé ne doivent pas masquer le
    // titre de la rangée quand on y saute depuis le bandeau.
    <section id={id} className="mt-14 scroll-mt-32 first-of-type:mt-0">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="fm-display text-xl text-fmfg md:text-2xl">
          {title} <span className="ml-1 align-middle text-[11px] tracking-[0.12em] text-fmmuted">{pad(projects.length)}</span>
        </h2>
        {href && (
          <Link href={href} className="fm-link shrink-0 text-[11px] uppercase tracking-[0.12em] text-fmmuted">
            {cta} →
          </Link>
        )}
      </div>
      <ProjectRow>
        {projects.map((p, i) => (
          <Card key={p.id} p={p} i={i} />
        ))}
      </ProjectRow>
    </section>
  );
}

// Deux classements du même catalogue, au choix du visiteur : par industrie
// (pour qui vient d'un secteur) ou par service (pour qui vient avec un besoin).
// Une rangée par entrée, dans l'ordre éditorial de sa table. Un projet qui
// relève de plusieurs entrées apparaît dans chacune, comme un titre classé
// dans plusieurs genres. Ceux qui n'ont rien de renseigné ne disparaissent
// pas : ils tombent dans une dernière rangée.
//
// Le choix passe par l'URL (?view=services) : il se partage, se garde au
// retour arrière, et la page reste rendue côté serveur.
const VIEWS = {
  industries: { table: "industries", field: "industries", name: "name", base: "/industries", cta: "The sector" },
  services: { table: "services", field: "services", name: "title", base: "/services", cta: "The service" },
} as const;

export default async function Projects({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const { view: requested } = await searchParams;
  const view = requested === "services" ? "services" : "industries";
  const V = VIEWS[view];
  const [projects, groups] = await Promise.all([getPublished("projects"), getPublished(V.table)]);

  const tagged = (p: any) => (Array.isArray(p[V.field]) ? (p[V.field] as string[]) : []);
  const rows = groups
    .map((g: any) => ({ g, items: projects.filter((p: any) => tagged(p).includes(g.slug)) }))
    .filter((r: any) => r.items.length > 0);

  const known = new Set(groups.map((g: any) => g.slug));
  const unsorted = projects.filter((p: any) => !tagged(p).some((s) => known.has(s)));

  const more = rows.length ? "More work" : "All projects";
  const nav = [
    { id: "latest", label: "Latest", count: Math.min(LATEST, projects.length) },
    ...rows.map(({ g, items }: any) => ({ id: g.slug, label: g[V.name], count: items.length })),
    ...(unsorted.length ? [{ id: "more", label: more, count: unsorted.length }] : []),
  ];

  return (
    <>
      <PageHero index="Work" title="Selected work" intro="Real systems, shipped under live conditions: new media art installations, projection mapping, generative environments and live A/V." />
      <div className="mx-auto max-w-[1200px] overflow-x-clip px-5 pb-24 md:px-8">
        <IndustryNav key={view} items={nav} view={view} />
        <Row id="latest" title="Latest" projects={projects.slice(0, LATEST)} />
        {rows.map(({ g, items }: any) => (
          <Row key={g.id} id={g.slug} title={g[V.name]} href={`${V.base}/${g.slug}`} cta={V.cta} projects={items} />
        ))}
        {unsorted.length > 0 && <Row id="more" title={more} projects={unsorted} />}
      </div>
    </>
  );
}
