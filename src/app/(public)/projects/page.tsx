import type { Metadata } from "next";
import { social } from "@/lib/seo";
import Link from "next/link";
import { getPublished } from "@/lib/public-data";
import { PageHero } from "@/components/site/PageHero";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ProjectRow } from "@/components/site/ProjectRow";
import { SECTIONS, sectionOf } from "@/lib/work-sections";

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

// Deux sections seulement (11/11/2026), par acheteur : Brands & Institutions,
// puis Art, Music & Live. Chaque projet porte sa section dans l'admin. Dans
// une section, un carrousel façon streaming (ProjectRow) : même hauteur,
// chaque couverture dans son format d'origine, du plus récent au plus ancien.
export default async function Projects() {
  const projects = (await getPublished("projects")) as any[];
  const groups = SECTIONS.map((sec) => ({ ...sec, items: projects.filter((p) => sectionOf(p) === sec.id) })).filter(
    (g) => g.items.length > 0,
  );

  return (
    <>
      <PageHero index="Work" title="Selected work" intro="Real systems, shipped under live conditions: new media art installations, projection mapping, generative environments and live A/V." />
      <div className="mx-auto max-w-[1200px] px-5 pb-24 md:px-8">
        <nav aria-label="Sections" className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <Link
              key={g.id}
              href={`#${g.id}`}
              className="fm-glass-card rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-fmfg/85 transition hover:text-fmaccent"
            >
              {g.title} <span className="ml-1 text-fmmuted">{pad(g.items.length)}</span>
            </Link>
          ))}
        </nav>
        {groups.map((g) => (
          <section key={g.id} id={g.id} className="mt-12 scroll-mt-28 border-t border-fmborder pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
              <h2 className="fm-display text-2xl text-fmfg md:text-4xl">
                <span className="mr-3 align-middle text-[11px] tracking-[0.1em] text-fmmuted">— {g.index}</span>
                {g.title}
              </h2>
              <p className="fm-grotesk max-w-md text-[14px] leading-relaxed text-fmmuted">{g.intro}</p>
            </div>
            {/* Le carrousel façon streaming de la page Work : défilement natif,
                aimantation sur les cartes, flèches à la souris. */}
            <div className="mt-6">
              <ProjectRow>
                {g.items.map((p) => (
                  <ProjectCard key={p.id} p={p} summary className="max-w-[78vw]" />
                ))}
              </ProjectRow>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
