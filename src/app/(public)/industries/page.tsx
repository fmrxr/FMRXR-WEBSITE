import type { Metadata } from "next";
import Link from "next/link";
import { getPublished } from "@/lib/public-data";
import { PageHero } from "@/components/site/PageHero";

// Rendu a la demande plutot qu'ISR. L'hebergement fait tourner plusieurs
// processus Node, chacun avec son propre cache : avec revalidate, une meme URL
// renvoyait tantot l'ancienne version tantot la nouvelle selon le worker
// touche. Le contenu vient de Supabase et change souvent, la coherence prime
// ici sur la mise en cache.
export const dynamic = "force-dynamic";

// Titre, description et canonical propres : sans eux la page héritait de ceux
// de l"accueil, canonical "/" compris, et Google la lisait comme un doublon.
export const metadata: Metadata = {
  title: "Industries · Culture, telecom, automotive, festivals, brands",
  description:
    "How FMRXR Studio works across music, festivals, art and galleries, corporate brands, cultural institutions, telecom, automotive, nightlife, finance and tech.",
  keywords: ["immersive experiences for brands", "cultural institutions", "festivals", "automotive launch", "telecom activation", "music visuals"],
  alternates: { canonical: "/industries" },
  openGraph: { type: "website", url: "/industries", title: "Industries · Culture, telecom, automotive, festivals, brands · FMRXR//", description: "How FMRXR Studio works across music, festivals, art and galleries, corporate brands, cultural institutions, telecom, automotive, nightlife, finance and tech." },
};

export default async function Industries() {
  const rows = await getPublished("industries");
  return (
    <>
      <PageHero index="Industries" title="Where we operate" intro="Institutional, telecom, automotive, finance, art & galleries, festivals, nightlife and corporate brands." />
      <section className="mx-auto max-w-[1200px] px-5 pb-24 md:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((r: any) => (
            <Link key={r.id} href={`/industries/${r.slug}`} className="fm-glass-card group rounded-lg p-6">
              <h2 className="fm-display text-lg text-fmfg">{r.name}</h2>
              {r.note && <p className="fm-grotesk mt-2 text-[13px] leading-relaxed text-fmmuted">{r.note}</p>}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
