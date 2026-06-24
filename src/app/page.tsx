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

  const work = projects.slice(0, 6);
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

          <h1 className={`fm-display fm-rise mt-8 text-[clamp(3rem,11vw,9.5rem)] ${hasHeroVideo ? "fm-glass-see" : "fm-glass-text"}`} style={{ animationDelay: "80ms" }}>
            Creative
            <br />
            Technology
          </h1>

          <div className="fm-rise mt-10 grid gap-8 md:grid-cols-[1.3fr_1fr]" style={{ animationDelay: "160ms" }}>
            <p className="fm-grotesk max-w-xl text-base leading-relaxed text-fmfg/85 md:text-lg">
              We design immersive experiences at the intersection of art, technology and brand.
              TouchDesigner-first, hardware-aware, editorially rigorous. Every project is treated
              as a living system that must survive live conditions.
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

          {/* meta row */}
          <dl className="fm-rise mt-16 grid grid-cols-1 gap-px overflow-hidden rounded border border-fmborder bg-fmborder sm:grid-cols-3" style={{ animationDelay: "240ms" }}>
            {[
              ["Studio", "FMRXR//"],
              ["Based", "Tunis, Tunisie · Miami 2027"],
              ["Discipline", "Immersive / XR / Live A/V"],
            ].map(([label, value]) => (
              <div key={label} className="bg-fmbg p-5">
                <dt className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">{label}</dt>
                <dd className="fm-grotesk mt-2 text-sm text-fmfg">{value}</dd>
              </div>
            ))}
          </dl>
          </div>
        </section>

        {/* ===== SELECTED WORK ===== */}
        <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
          <SectionHeader index="S/01" title="Selected Work" href="/projects" cta="All projects" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {work.map((p: any, i: number) => (
              <Link key={p.id} href={`/projects/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden border border-fmborder bg-fmmutedbg">
                  {p.cover_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.cover_url}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="fm-display text-6xl text-white/5">{pad(i + 1)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <span className="absolute right-4 top-4 fm-arrow text-lg text-fmfg opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="text-[10px] tabular-nums text-fmmuted">{pad(i + 1)}</span>
                    <h3 className="fm-display mt-1 text-xl text-fmfg md:text-2xl">{p.title}</h3>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-fmmuted">
                      {[p.client, p.year, p.category].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== CAPABILITIES ===== */}
        <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
          <SectionHeader index="S/02" title="Services" href="/services" cta="All services" />
          <div className="mt-10 grid gap-px overflow-hidden border border-fmborder bg-fmborder sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s: any, i: number) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="group bg-fmcard p-6 transition-colors hover:bg-fmmutedbg"
              >
                <span className="text-[10px] uppercase tracking-[0.15em] text-fmmuted">S/{pad(i + 1)}</span>
                <h3 className="fm-display mt-3 text-lg text-fmfg">{s.title}</h3>
                <p className="fm-grotesk mt-2 text-[13px] leading-relaxed text-fmmuted">{s.short}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== CLIENTS ===== */}
        <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
          <SectionHeader index="S/03" title="Selected Clients" />
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {clients.map((c: any) => (
              <span key={c.id} className="fm-display text-xl text-fmfg/55 transition-colors hover:text-fmfg md:text-2xl">
                {c.name}
              </span>
            ))}
          </div>
        </section>

        {/* ===== JOURNAL ===== */}
        {articles.length > 0 && (
          <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
            <SectionHeader index="S/04" title="Journal" href="/journal" cta="All entries" />
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {articles.slice(0, 3).map((a: any) => (
                <li key={a.id}>
                  <Link href={`/journal/${a.slug}`} className="group flex h-full flex-col border border-fmborder bg-fmcard transition-colors hover:bg-fmmutedbg">
                    <div className="relative aspect-[16/9] overflow-hidden bg-fmmutedbg">
                      {a.cover_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={a.cover_url}
                          alt={a.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center border-b border-fmborder">
                          <span className="fm-display text-3xl text-white/5">FMRXR//</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">
                        {[a.category, a.read_time].filter(Boolean).join(" · ")}
                      </span>
                      <h3 className="fm-grotesk mt-3 text-lg font-medium leading-snug text-fmfg">{a.title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-fmmuted">{a.excerpt}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
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
