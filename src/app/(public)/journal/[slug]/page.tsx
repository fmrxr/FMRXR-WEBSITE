import Link from "next/link";
import { notFound } from "next/navigation";
import { getBySlug, getPublished } from "@/lib/public-data";

export const revalidate = 60;

export async function generateStaticParams() {
  const rows = await getPublished("articles");
  return rows.map((a: any) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await getBySlug("articles", slug);
  if (!a) notFound();
  return (
    <article className="mx-auto max-w-2xl px-5 pb-24 md:px-8">
      <Link href="/journal" className="fm-link text-[11px] uppercase tracking-[0.12em] text-fmmuted">← Journal</Link>
      <p className="mt-8 text-[11px] uppercase tracking-[0.12em] text-fmmuted">
        {[a.category, a.date, a.read_time].filter(Boolean).join(" · ")}
      </p>
      <h1 className="fm-display mt-3 text-[clamp(2rem,5.5vw,4rem)] text-fmfg">{a.title}</h1>
      {a.cover_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={a.cover_url} alt={a.title} className="mt-8 w-full rounded-xl border border-fmborder object-cover" />
      )}
      <div className="fm-grotesk mt-8 flex flex-col gap-5 text-[15px] leading-relaxed text-fmfg/85">
        {Array.isArray(a.body) && a.body.map((para: string, i: number) => <p key={i}>{para}</p>)}
      </div>
    </article>
  );
}
