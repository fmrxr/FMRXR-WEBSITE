import Link from "next/link";
import { getPublished } from "@/lib/public-data";
import { PageHero } from "@/components/site/PageHero";

export const revalidate = 60;

const pad = (n: number) => String(n).padStart(2, "0");

export default async function Projects() {
  const projects = await getPublished("projects");
  return (
    <>
      <PageHero index="Work" title="Selected work" intro="Real systems, shipped under live conditions — immersive installations, projection mapping, generative environments and live A/V." />
      <section className="mx-auto max-w-[1200px] px-5 pb-24 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p: any, i: number) => (
            <Link
              key={p.id}
              href={`/projects/${p.slug}`}
              className="fm-glass-card group block overflow-hidden rounded-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {p.cover_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.cover_url} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-fmmutedbg">
                    <span className="fm-display text-6xl text-white/5">{pad(i + 1)}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-4">
                <h2 className="fm-display text-base text-fmfg md:text-lg">{p.title}</h2>
                <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-fmmuted">
                  {[p.client, p.year, p.category].filter(Boolean).join(" · ")}
                </p>
                {p.summary && <p className="fm-grotesk mt-2 line-clamp-2 text-[13px] leading-relaxed text-fmmuted">{p.summary}</p>}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
