import Link from "next/link";
import { notFound } from "next/navigation";
import { getBySlug, getPublished } from "@/lib/public-data";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getPublished("projects");
  return projects.map((p: any) => ({ slug: p.slug }));
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
        "@context": "https://schema.org", "@type": "CreativeWork",
        name: p.title, about: p.category, dateCreated: p.year,
        creator: { "@type": "Organization", name: "FMRXR Studio" },
      }) }} />
    </article>
  );
}
