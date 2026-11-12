import type { Metadata } from "next";
import { social } from "@/lib/seo";
import { getPublished } from "@/lib/public-data";
import { PageHero } from "@/components/site/PageHero";
import { ServicesExplorer, type XProject } from "@/components/site/ServicesExplorer";
import { serviceFilm } from "@/lib/service-films";
import { OFFERS } from "@/lib/offers";
import { lastYear } from "@/lib/years";
import { parseLog } from "@/lib/service-log";

// Rendu a la demande plutot qu'ISR. L'hebergement fait tourner plusieurs
// processus Node, chacun avec son propre cache : avec revalidate, une meme URL
// renvoyait tantot l'ancienne version tantot la nouvelle selon le worker
// touche. Le contenu vient de Supabase et change souvent, la coherence prime
// ici sur la mise en cache.
export const dynamic = "force-dynamic";

// Services et Industries ne font plus qu'une page (12/11/2026) : les industries
// filtrent les offres et les services, /industries redirige ici.
const DESCRIPTION =
  "Book an interactive wall, an LED installation, projection mapping, a live A/V set or a motion loop, with starting prices and what each side brings. Filter by industry, from telecom to festivals.";

export const metadata: Metadata = {
  title: "Services & industries · Prices, demos, what we bring",
  description: DESCRIPTION,
  keywords: ["creative technology services", "interactive wall price", "projection mapping price Tunisia", "interactive installation", "live A/V", "VJ", "motion design", "brand activation", "immersive experiences for brands"],
  alternates: { canonical: "/services" },
  ...social({ url: "/services", title: "Services & industries · FMRXR//", description: DESCRIPTION }),
};

export default async function Services({ searchParams }: { searchParams: Promise<{ for?: string }> }) {
  const [{ for: initialFor }, services, industries, projects] = await Promise.all([
    searchParams,
    getPublished("services"),
    getPublished("industries"),
    getPublished("projects"),
  ]);

  const xprojects: XProject[] = (projects as any[]).map((p) => ({
    slug: p.slug,
    title: p.title,
    client: p.client ?? undefined,
    year: p.year ?? undefined,
    services: p.services ?? [],
    industries: p.industries ?? [],
    last: lastYear(p.year),
  }));

  return (
    <>
      <PageHero
        index="Services"
        title="Try it, then book it."
        intro="Five offers you can book as they are, with a starting price and what each side brings. Everything else, from CGI to large installations, is built on a quote. Pick your industry to see the work done for it."
      />
      <ServicesExplorer
        offers={OFFERS}
        services={(services as any[]).map((s) => ({
          slug: s.slug,
          title: s.title,
          short: s.short ?? undefined,
          outcomes: s.outcomes ?? [],
          film: serviceFilm(s.slug),
          log: parseLog(s.log),
        }))}
        industries={(industries as any[]).map((i) => ({ slug: i.slug, name: i.name, note: i.note ?? undefined }))}
        projects={xprojects}
        initialFor={initialFor ?? null}
      />
    </>
  );
}
