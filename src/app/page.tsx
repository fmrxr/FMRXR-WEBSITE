import Link from "next/link";
import { getPublished, getAll, getSiteSettings } from "@/lib/public-data";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

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

  return (
    <div className="fm fm-canvas min-h-dvh">
      <Header />

      <main className="relative z-10">
        {/* ===== HERO ===== */}
        <section className="mx-auto max-w-[1200px] px-5 pt-36 pb-20 md:px-8 md:pt-44 md:pb-28">
          <p className="fm-rise text-[11px] uppercase tracking-[0.15em] text-fmmuted" style={{ animationDelay: "0ms" }}>
            <span className="text-fmaccent">●</span>&nbsp; Available for projects — Tunis, TN&nbsp; /&nbsp; Since 2017
          </p>

          <h1 className="fm-display fm-rise mt-8 text-[clamp(3rem,11vw,9.5rem)] text-fmfg" style={{ animationDelay: "80ms" }}>
            Creative
            <br />
            Tech<span className="text-fmmuted">nology</span>
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
          <dl className="fm-rise mt-16 grid grid-cols-2 gap-px overflow-hidden rounded border border-fmborder bg-fmborder md:grid-cols-4" style={{ animationDelay: "240ms" }}>
            {[
              ["Studio", "FMRXR//"],
              ["Founder", settings.founder ?? "Haïfa Becheikh"],
              ["Based", settings.location ?? "Tunis, TN"],
              ["Discipline", "Immersive / XR / Live A/V"],
            ].map(([label, value]) => (
              <div key={label} className="bg-fmbg p-5">
                <dt className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">{label}</dt>
                <dd className="fm-grotesk mt-2 text-sm text-fmfg">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ===== SELECTED WORK ===== */}
        <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
          <SectionHeader index="S/01" title="Selected Work" href="/projects" cta="All projects" />
          <ul className="mt-10">
            {work.map((p: any, i: number) => (
              <li key={p.id}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="fm-row group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-t border-fmborder px-2 py-6 md:gap-8 md:px-4 md:py-8"
                >
                  <span className="text-[11px] tabular-nums text-fmmuted">{pad(i + 1)}</span>
                  <span>
                    <span className="fm-display block text-2xl text-fmfg md:text-4xl">{p.title}</span>
                    <span className="mt-2 block text-[11px] uppercase tracking-[0.1em] text-fmmuted">
                      {[p.client, p.year, p.category].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                  <span className="fm-arrow self-center text-xl text-fmmuted">→</span>
                </Link>
              </li>
            ))}
            <li className="border-t border-fmborder" />
          </ul>
        </section>

        {/* ===== CAPABILITIES ===== */}
        <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
          <SectionHeader index="S/02" title="Capabilities" href="/services" cta="All services" />
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
            <ul className="mt-10 grid gap-px overflow-hidden border border-fmborder bg-fmborder md:grid-cols-3">
              {articles.slice(0, 3).map((a: any) => (
                <li key={a.id} className="bg-fmcard">
                  <Link href={`/journal/${a.slug}`} className="group block h-full p-6 transition-colors hover:bg-fmmutedbg">
                    <span className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">
                      {[a.category, a.read_time].filter(Boolean).join(" · ")}
                    </span>
                    <h3 className="fm-grotesk mt-3 text-lg font-medium leading-snug text-fmfg">{a.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-fmmuted">{a.excerpt}</p>
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
