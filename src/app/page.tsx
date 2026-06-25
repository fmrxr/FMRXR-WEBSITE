import Link from "next/link";
import { getPublished, getAll, getSiteSettings } from "@/lib/public-data";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { StartRequest } from "@/components/site/StartRequest";
import { Rail } from "@/components/site/Rail";

export const revalidate = 60;

const pad = (n: number) => String(n).padStart(2, "0");

export default async function Home() {
  const [settings, projects, services, industries, clients, articles] = await Promise.all([
    getSiteSettings(),
    getPublished("projects"),
    getPublished("services"),
    getPublished("industries"),
    getAll("clients"),
    getPublished("articles"),
  ]);

  const heroClips = (settings.hero_media ?? []).filter((c) => c?.url);

  return (
    <div className="fm fm-canvas min-h-dvh">
      <Header />

      <main className="relative z-10">
        {/* ===== HERO ===== */}
        <Hero clips={heroClips} />

        {/* ===== SELECTED WORK ===== */}
        <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
          <SectionHeader index="S/01" title="Real systems, shipped under live conditions." href="/projects" cta="All projects" />
          <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <Rail>
              {projects.map((p: any, i: number) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.slug}`}
                  className="fm-glass-card group block w-72 shrink-0 overflow-hidden rounded-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {p.cover_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.cover_url}
                        alt={p.title}
                        draggable={false}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-fmmutedbg">
                        <span className="fm-display text-6xl text-white/5">{pad(i + 1)}</span>
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
            </Rail>
          </div>
        </section>

        {/* ===== CAPABILITIES ===== */}
        <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
          <SectionHeader index="S/02" title="One studio, Fullstack Brand Activation." href="/services" cta="All services" />
          <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <Rail reverse gapClass="gap-3">
              {services.map((s: any, i: number) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  className="fm-glass-card group flex shrink-0 items-baseline gap-2 whitespace-nowrap rounded-full px-5 py-2.5"
                >
                  <span className="text-[10px] tracking-[0.1em] text-fmmuted">S/{pad(i + 1)}</span>
                  <span className="fm-display text-sm text-fmfg/80">{s.title}</span>
                </Link>
              ))}
            </Rail>
          </div>
        </section>

        {/* ===== CLIENTS ===== */}
        <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
          <SectionHeader index="S/03" title="Trusted by leaders" />
          <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <Rail gapClass="gap-3">
              {clients.map((c: any) => (
                <span key={c.id} className="fm-glass-card block shrink-0 whitespace-nowrap rounded-full px-5 py-2.5">
                  <span className="fm-display text-sm text-fmfg/80">{c.name}</span>
                </span>
              ))}
            </Rail>
          </div>
        </section>

        {/* ===== JOURNAL ===== */}
        {articles.length > 0 && (
          <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
            <SectionHeader index="S/04" title="Journal" href="/journal" cta="All entries" />
            <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
              <Rail reverse>
                {articles.map((a: any) => (
                  <Link
                    key={a.id}
                    href={`/journal/${a.slug}`}
                    className="fm-glass-card group block w-80 shrink-0 overflow-hidden rounded-xl"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      {a.cover_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={a.cover_url}
                          alt={a.title}
                          draggable={false}
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
              </Rail>
            </div>
          </section>
        )}

        {/* ===== CTA BAND ===== */}
        <section className="relative mx-auto max-w-[1200px] overflow-hidden border-t border-fmborder px-5 py-28 text-center md:px-8 md:py-44">
          <div className="relative z-10">
            <span className="fm-glass-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-fmmuted">
              <span className="text-fmaccent">●</span> Systems Over Spectacle
            </span>

            <h2 className="fm-display mx-auto mt-8 max-w-5xl text-[clamp(2rem,7vw,5rem)] leading-[0.95] text-fmfg">
              Let&apos;s <span className="fm-glow-accent text-fmaccent">create</span> immersive experiences that ship under{" "}
              <span className="fm-glow-accent whitespace-nowrap text-fmaccent">live conditions</span>
            </h2>

            <p className="fm-grotesk mx-auto mt-8 max-w-xl text-sm leading-relaxed text-fmmuted">
              Pick your industry and the service you need — we&apos;ll take you to a short brief and the request lands with the studio.
            </p>
            <StartRequest industries={industries} services={services} />
            <Link href="/contact" className="fm-link mt-8 inline-block text-[11px] uppercase tracking-[0.14em] text-fmmuted">
              or email {settings.email} ↠
            </Link>
          </div>
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
