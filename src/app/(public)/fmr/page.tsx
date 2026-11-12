import type { Metadata } from "next";
import { getPublished } from "@/lib/public-data";
import { SignalLevel } from "@/components/site/SignalLevel";
import { OFFERS } from "@/lib/offers";
import { lastYear } from "@/lib/years";

// Le niveau caché : on y arrive en tapant « fmr » n'importe où, ou par appui
// long sur le // du logo. Hors index, c'est une surprise, pas une page de plus.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Survey",
  robots: { index: false, follow: true },
};

export default async function Fmr() {
  const [services, projects] = await Promise.all([getPublished("services"), getPublished("projects")]);
  return (
    <SignalLevel
      services={(services as any[]).map((s) => ({ slug: s.slug, title: s.title }))}
      projects={(projects as any[]).map((p) => ({
        slug: p.slug,
        title: p.title,
        year: p.year ?? undefined,
        last: lastYear(p.year),
        services: p.services ?? [],
      }))}
      offers={OFFERS}
    />
  );
}
