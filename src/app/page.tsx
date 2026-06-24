import Link from "next/link";
import { getPublished, getAll, getSiteSettings } from "@/lib/public-data";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HeroVideo } from "@/components/site/HeroVideo";

export const revalidate = 60;

const pad = (n: number) => String(n).padStart(2, "0");

export default async function Home() {
  const [settings, projects, services, clients, articles] = await Promise.all([
    getSiteSettings(),
    getPublished("projects"),
    getPublished("services"),
    getAll("clients"),
    getPublished("articles"),
  ]);

  const heroClips = (settings.hero_media ?? []).filter((c) => c?.url);
  const hasHeroVideo = heroClips.length > 0;

  return (
    <div className="fm fm-canvas min-h-dvh">
      <Header />

      <main className="relative z-10">
        {/* ===== HERO ===== */}
        <section className={`relative overflow-hidden ${hasHeroVideo ? "flex min-h-dvh flex-col justify-end" : ""}`}>
          {hasHeroVideo && <HeroVideo clips={heroClips} />}
          {hasHeroVideo && (
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0d0c14]/60 via-[#0d0c14]/30 to-[#0d0c14]" />
          )}
          <div className={`relative z-20 mx-auto w-full max-w-[1200px] px-5 md:px-8 ${hasHeroVideo ? "pb-16 pt-32 md:pb-20 md:pt-40" : "pt-36 pb-20 md:pt-44 md:pb-28"}`}>
          <p className="fm-rise text-[11px] uppercase tracking-[0.15em] text-fmmuted" style={{ animationDelay: "0ms" }}>
            <span className="text-fmaccent">●</span>&nbsp; Available for projects — Tunis, TN&nbsp; /&nbsp; Since 2017
          </p>

          <h1 className="sr-only">FMRXR — Creative Technology</h1>

          <div className="fm-rise mt-8 grid gap-8 md:grid-cols-[1.3fr_1fr]" style={{ animationDelay: "120ms" }}>
            <p className="fm-grotesk max-w-xl text-base leading-relaxed text-fmfg/85 md:text-lg">
              Immersive systems, generative worlds, real-time AI art and marketing automation.
            </p>
            <div className="flex flex-col items-start gap-4 md:items-end md:justify-end">
              <Link
                href="/contact"
                className="group text-sm uppercase tracking-[0.12em] text-fmfg"
              >
                Start a project{" "}
                <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/projects"
                className="fm-link text-sm uppercase tracking-[0.12em] text-fmmuted"
              >
                View work ↠
              </Link>
            </div>
          </div>

          </div>
        </section>

        {/* ===== SELECTED WORK ===== */}
        <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
          <SectionHeader index="S/01" title="Real systems, shipped under live conditions." href="/projects" cta="All projects" />
          <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="fm-marquee flex w-max gap-4">
              {[...projects, ...projects].map((p: any, idx: number) => (
                <Link
                  key={idx}
                  href={`/projects/${p.slug}`}
                  className="fm-glass-card group block w-72 shrink-0 overflow-hidden rounded-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {p.cover_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.cover_url}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-fmmutedbg">
                        <span className="fm-display text-6xl text-white/5">{pad((idx % projects.length) + 1)}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="fm-display text-base text-fmfg">{p.title}</h3>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-fmmuted">
                      {[p.client, p.year, p.category].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CAPABILITIES ===== */}
        <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
          <SectionHeader index="S/02" title="One studio, Fullstack Brand Activation." href="/services" cta="All services" />
          <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="fm-marquee-rev flex w-max gap-3">
              {[...services, ...services].map((s: any, idx: number) => (
                <Link
                  key={idx}
                  href={`/services/${s.slug}`}
                  className="fm-glass-card group flex items-baseline gap-2 whitespace-nowrap rounded-full px-5 py-2.5"
                >
                  <span className="text-[10px] tracking-[0.1em] text-fmmuted">S/{pad((idx % services.length) + 1)}</span>
                  <span className="fm-display text-sm text-fmfg/80">{s.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CLIENTS ===== */}
        <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
          <SectionHeader index="S/03" title="Trusted by leaders" />
          <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="fm-marquee flex w-max gap-3">
              {[...clients, ...clients].map((c: any, idx: number) => (
                <span
                  key={idx}
                  className="fm-glass-card whitespace-nowrap rounded-full px-5 py-2.5"
                >
                  <span className="fm-display text-sm text-fmfg/80">{c.name}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== JOURNAL ===== */}
        {articles.length > 0 && (
          <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
            <SectionHeader index="S/04" title="Journal" href="/journal" cta="All entries" />
            <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
              <div className="fm-marquee-rev flex w-max gap-4">
                {[...articles, ...articles].map((a: any, idx: number) => (
                  <Link
                    key={idx}
                    href={`/journal/${a.slug}`}
                    className="fm-glass-card group block w-80 shrink-0 overflow-hidden rounded-xl"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      {a.cover_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={a.cover_url}
                          alt={a.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-fmmutedbg">
                          <span className="fm-display text-3xl text-white/5">FMRXR//</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">
                        {[a.category, a.read_time].filter(Boolean).join(" · ")}
                      </span>
                      <h3 className="fm-grotesk mt-2 text-base font-medium leading-snug text-fmfg">{a.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== CTA BAND ===== */}
        <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-24 text-center md:px-8 md:py-36">
          <p className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">Systems, not shows</p>
          <h2 className="fm-display mx-auto mt-6 max-w-4xl text-[clamp(2rem,6vw,4.5rem)] text-fmfg">
            Let&apos;s create something
            <br />
            that ships under live conditions
          </h2>
          <Link
            href="/contact"
            className="group mt-10 inline-block text-sm uppercase tracking-[0.14em] text-fmfg"
          >
            {settings.email}{" "}
            <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">↠</span>
          </Link>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}

function SectionHeader({
  index,
  title,
  href,
  cta,
}: {
  index: string;
  title: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <div className="flex items-baseline gap-4">
        <span className="text-[11px] tracking-[0.1em] text-fmmuted">— {index}</span>
        <h2 className="fm-display text-2xl text-fmfg md:text-4xl">{title}</h2>
      </div>
      {href && cta && (
        <Link href={href} className="fm-link shrink-0 text-[11px] uppercase tracking-[0.12em] text-fmmuted">
          {cta} →
        </Link>
      )}
    </div>
  );
}
