import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBySlug, getPublished } from "@/lib/public-data";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getPublished("projects");
  return projects.map((p: any) => ({ slug: p.slug }));
}

// Chaque projet doit porter son propre titre et sa propre description : sans ça
// les dix pages héritaient du titre global et Google les traitait comme des
// doublons. On dérive tout du contenu réel plutôt que d'un gabarit figé.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getBySlug("projects", slug);
  if (!p) return { title: "Projet introuvable", robots: { index: false, follow: false } };

  const context = [p.client, p.year, p.location].filter(Boolean).join(" · ");
  const description = (p.summary || p.description || "").replace(/\s+/g, " ").trim().slice(0, 300)
    || `${p.title}${context ? `. ${context}` : ""}`;
  const url = `/projects/${p.slug}`;
  const images = p.cover_url ? [{ url: p.cover_url, alt: p.title }] : undefined;

  return {
    title: `${p.title}${p.category ? ` · ${p.category}` : ""}`,
    description,
    keywords: [...(p.tags ?? []), ...(p.stack ?? []), p.client, p.category].filter(Boolean),
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: p.title, description, images },
    twitter: { card: "summary_large_image", title: p.title, description, images: images?.map((i) => i.url) },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getBySlug("projects", slug);
  if (!p) notFound();
  return (
    <article className="mx-auto max-w-4xl px-5 pb-24 md:px-8">
      <Link href="/projects" className="fm-link text-[11px] uppercase tracking-[0.12em] text-fmmuted">← Work</Link>

      <p className="mt-8 text-[11px] uppercase tracking-[0.12em] text-fmmuted">
        {[p.client, p.year, p.category].filter(Boolean).join(" · ")}
      </p>
      <h1 className="fm-display mt-3 text-[clamp(2.25rem,6vw,4.5rem)] text-fmfg">{p.title}</h1>

      {p.cover_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.cover_url} alt={p.title} className="mt-8 w-full rounded-xl border border-fmborder object-cover" />
      )}

      {p.summary && <p className="fm-grotesk mt-8 max-w-2xl text-lg leading-relaxed text-fmfg/85">{p.summary}</p>}
      {p.description && <p className="fm-grotesk mt-4 max-w-2xl whitespace-pre-line leading-relaxed text-fmmuted">{p.description}</p>}

      {(Array.isArray(p.role) && p.role.length > 0) || (Array.isArray(p.stack) && p.stack.length > 0) ? (
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2">
          {Array.isArray(p.role) && p.role.length > 0 && (
            <div className="bg-fmbg p-5">
              <p className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Role</p>
              <p className="fm-grotesk mt-2 text-sm text-fmfg">{p.role.join(" · ")}</p>
            </div>
          )}
          {Array.isArray(p.stack) && p.stack.length > 0 && (
            <div className="bg-fmbg p-5">
              <p className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Stack</p>
              <p className="fm-grotesk mt-2 text-sm text-fmfg">{p.stack.join(" · ")}</p>
            </div>
          )}
        </div>
      ) : null}

      {Array.isArray(p.gallery) && p.gallery.length > 0 && (
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {p.gallery.map((g: any, i: number) => (
            <figure key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.url} alt={g.alt} className="rounded-xl border border-fmborder" />
              {g.caption && <figcaption className="mt-2 text-xs text-fmmuted">{g.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      <div className="mt-16 border-t border-fmborder pt-8">
        <Link href="/contact" className="group text-sm uppercase tracking-[0.12em] text-fmfg">
          Request a similar installation{" "}
          <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: p.title,
        headline: p.title,
        about: p.category,
        dateCreated: p.year,
        url: `https://fmrxr.com/projects/${p.slug}`,
        description: p.summary || undefined,
        abstract: p.description || undefined,
        image: p.cover_url || undefined,
        keywords: [...(p.role ?? []), ...(p.stack ?? []), ...(p.tags ?? [])].join(", ") || undefined,
        locationCreated: p.location ? { "@type": "Place", name: p.location } : undefined,
        genre: "New media art",
        inLanguage: "fr",
        creator: {
          "@type": "Organization",
          name: "FMRXR Studio",
          url: "https://fmrxr.com",
          founder: { "@type": "Person", name: "Haïfa Al Jamila Becheikh", alternateName: "EFFET MÈRE" },
        },
        ...(p.client ? { sponsor: { "@type": "Organization", name: p.client } } : {}),
      }) }} />
    </article>
  );
}
