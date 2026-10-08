import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBySlug, getPublished } from "@/lib/public-data";
import { ScrollFilm } from "@/components/site/ScrollFilm";
import { serviceFilm } from "@/lib/service-films";

// Rendu a la demande plutot qu'ISR. L'hebergement fait tourner plusieurs
// processus Node, chacun avec son propre cache : avec revalidate, une meme URL
// renvoyait tantot l'ancienne version tantot la nouvelle selon le worker
// touche. Le contenu vient de Supabase et change souvent, la coherence prime
// ici sur la mise en cache.
export const dynamic = "force-dynamic";

// La boucle motion du service : voir src/lib/service-films.ts.

export async function generateStaticParams() {
  const rows = await getPublished("services");
  return rows.map((s: any) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = await getBySlug("services", slug);
  if (!s) return { title: "Service not found", robots: { index: false, follow: false } };

  const description = (s.short || s.description || "").replace(/\s+/g, " ").trim().slice(0, 300)
    || `${s.title} by FMRXR Studio, Tunis.`;
  const url = `/services/${s.slug}`;

  return {
    title: s.title,
    description,
    keywords: [...(s.outcomes ?? []), s.title, "FMRXR Studio", "new media art", "Tunis"].filter(Boolean),
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: s.title, description },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getBySlug("services", slug);
  if (!s) notFound();
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 md:px-8">
      <Link href="/services" className="fm-link text-[11px] uppercase tracking-[0.12em] text-fmmuted">← Services</Link>
      <h1 className="fm-display mt-8 text-[clamp(2.25rem,6vw,4.5rem)] text-fmfg">{s.title}</h1>
      {s.short && <p className="fm-grotesk mt-5 text-lg leading-relaxed text-fmfg/85">{s.short}</p>}
      {serviceFilm(s.slug) && (
        <ScrollFilm
          src={serviceFilm(s.slug)!.src}
          poster={serviceFilm(s.slug)!.poster}
          label={`${s.title}: a 15 second loop generated in light`}
          sound={false}
          className="mt-8"
        />
      )}
      {s.description && <p className="fm-grotesk mt-4 whitespace-pre-line leading-relaxed text-fmmuted">{s.description}</p>}

      {Array.isArray(s.outcomes) && s.outcomes.length > 0 && (
        <ul className="mt-10 flex flex-col gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder">
          {s.outcomes.map((o: string, i: number) => (
            <li key={i} className="bg-fmbg px-5 py-4 text-sm text-fmfg/90">
              <span className="mr-3 text-fmaccent">▸</span>{o}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-16 border-t border-fmborder pt-8">
        <Link href="/contact" className="group text-sm uppercase tracking-[0.12em] text-fmfg">
          Book a technical feasibility call{" "}
          <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}
