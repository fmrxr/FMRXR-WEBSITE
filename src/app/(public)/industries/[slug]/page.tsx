import Link from "next/link";
import { notFound } from "next/navigation";
import { getBySlug, getPublished } from "@/lib/public-data";

export const revalidate = 60;

export async function generateStaticParams() {
  const rows = await getPublished("industries");
  return rows.map((r: any) => ({ slug: r.slug }));
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
