import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBySlug, getPublished } from "@/lib/public-data";

// Rendu a la demande plutot qu'ISR. L'hebergement fait tourner plusieurs
// processus Node, chacun avec son propre cache : avec revalidate, une meme URL
// renvoyait tantot l'ancienne version tantot la nouvelle selon le worker
// touche. Le contenu vient de Supabase et change souvent, la coherence prime
// ici sur la mise en cache.
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const rows = await getPublished("industries");
  return rows.map((r: any) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = await getBySlug("industries", slug);
  if (!r) return { title: "Sector not found", robots: { index: false, follow: false } };

  const description = (r.note || "").replace(/\s+/g, " ").trim().slice(0, 300)
    || `Immersive and new media art work for ${r.name}, by FMRXR Studio.`;
  const url = `/industries/${r.slug}`;

  return {
    title: r.name,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: r.name, description },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = await getBySlug("industries", slug);
  if (!r) notFound();
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 md:px-8">
      <Link href="/industries" className="fm-link text-[11px] uppercase tracking-[0.12em] text-fmmuted">← Industries</Link>
      <h1 className="fm-display mt-8 text-[clamp(2.25rem,6vw,4.5rem)] text-fmfg">{r.name}</h1>
      {r.note && <p className="fm-grotesk mt-6 max-w-2xl text-lg leading-relaxed text-fmmuted">{r.note}</p>}
      <div className="mt-16 border-t border-fmborder pt-8">
        <Link href="/start" className="group text-sm uppercase tracking-[0.12em] text-fmfg">
          Start a project{" "}
          <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}
