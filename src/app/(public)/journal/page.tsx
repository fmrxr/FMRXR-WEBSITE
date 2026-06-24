import Link from "next/link";
import { getPublished } from "@/lib/public-data";
import { PageHero } from "@/components/site/PageHero";

export const revalidate = 60;

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
