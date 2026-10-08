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
  title: "Journal · Notes on generative systems and live conditions",
  description:
    "Field notes from FMRXR Studio: generative systems, TouchDesigner pipelines, live production and the practice behind the work.",
  keywords: ["generative systems", "TouchDesigner pipeline", "immersive art Tunisia", "live production", "new media art"],
  alternates: { canonical: "/journal" },
  openGraph: { type: "website", url: "/journal", title: "Journal · Notes on generative systems and live conditions · FMRXR//", description: "Field notes from FMRXR Studio: generative systems, TouchDesigner pipelines, live production and the practice behind the work." },
};

export default async function Journal() {
  const rows = await getPublished("articles");
  return (
    <>
      <PageHero index="Journal" title="Journal" intro="Notes on generative systems, live conditions, and the practice behind the work." />
      <section className="mx-auto max-w-[1200px] px-5 pb-24 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((a: any) => (
            <Link key={a.id} href={`/journal/${a.slug}`} className="fm-glass-card group block overflow-hidden rounded-xl">
              <div className="relative aspect-[16/9] overflow-hidden">
                {a.cover_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.cover_url} alt={a.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-fmmutedbg">
                    <span className="fm-display text-3xl text-white/5">FMRXR//</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <span className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">
                  {[a.category, a.date, a.read_time].filter(Boolean).join(" · ")}
                </span>
                <h2 className="fm-grotesk mt-2 text-lg font-medium leading-snug text-fmfg">{a.title}</h2>
                {a.excerpt && <p className="mt-2 text-[13px] leading-relaxed text-fmmuted">{a.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
