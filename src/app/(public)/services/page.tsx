import type { Metadata } from "next";
import { social } from "@/lib/seo";
import { getPublished } from "@/lib/public-data";
import { SignalSurvey } from "@/components/site/SignalSurvey";
import { lastYear } from "@/lib/years";
import { parseLog } from "@/lib/service-log";

// Rendu a la demande plutot qu'ISR. L'hebergement fait tourner plusieurs
// processus Node, chacun avec son propre cache : avec revalidate, une meme URL
// renvoyait tantot l'ancienne version tantot la nouvelle selon le worker
// touche. Le contenu vient de Supabase et change souvent, la coherence prime
// ici sur la mise en cache.
export const dynamic = "force-dynamic";

// Services et Industries ne font qu'une page : le relevé des services dans le
// registre Signal de Cadastre 2027, filtré par industrie (?for=<slug>).
// Aucun prix ici, ils ne vivent que sur la page cachée /fmr.
const DESCRIPTION =
  "Every service of FMRXR Studio drawn from its real projects: projection mapping, interactive installations, real-time systems, live A/V, XR, motion and web. Filter by industry, from telecom to festivals.";

export const metadata: Metadata = {
  title: "Services & industries · What the studio actually shipped",
  description: DESCRIPTION,
  keywords: ["creative technology services", "projection mapping", "interactive installation", "real-time systems", "live A/V", "VJ", "XR", "motion design", "brand activation", "immersive experiences for brands"],
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

  return (
    <SignalSurvey
      services={(services as any[]).map((s) => ({ slug: s.slug, title: s.title, short: s.short ?? undefined, log: parseLog(s.log) }))}
      projects={(projects as any[]).map((p) => ({
        slug: p.slug,
        title: p.title,
        year: p.year ?? undefined,
        last: lastYear(p.year),
        services: p.services ?? [],
        industries: p.industries ?? [],
      }))}
      industries={(industries as any[]).map((i) => ({ slug: i.slug, name: i.name, note: i.note ?? undefined }))}
      initialFor={initialFor ?? null}
    />
  );
}
