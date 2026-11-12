"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CardFilm } from "@/components/site/CardFilm";
import type { Offer } from "@/lib/offers";

// La page Services fusionnée avec Industries : les industries ne sont plus des
// pages, elles filtrent. Le filtre vit dans l'URL (?for=<industrie>) pour qu'un
// lien partagé, et les anciennes adresses /industries/<slug>, tombent sur la
// bonne vue. Le journal de chaque service vient des vrais projets publiés.

export type XService = { slug: string; title: string; short?: string; outcomes: string[]; film: { src: string; poster: string } | null };
export type XIndustry = { slug: string; name: string; note?: string };
export type XProject = { slug: string; title: string; client?: string; year?: string; services: string[]; industries: string[]; last: number };

const pad = (n: number) => String(n).padStart(2, "0");

export function ServicesExplorer({
  offers,
  services,
  industries,
  projects,
  initialFor,
}: {
  offers: Offer[];
  services: XService[];
  industries: XIndustry[];
  projects: XProject[];
  initialFor: string | null;
}) {
  const [active, setActive] = useState<string | null>(
    industries.some((i) => i.slug === initialFor) ? initialFor : null,
  );
  const [open, setOpen] = useState<string | null>(null);

  function choose(slug: string | null) {
    setActive(slug);
    const url = slug ? `?for=${slug}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }

  const industry = industries.find((i) => i.slug === active) ?? null;
  const inScope = (p: XProject) => !active || p.industries.includes(active);

  // Projets les plus récents d'abord : ils font la preuve et le journal.
  const sorted = useMemo(() => [...projects].sort((a, b) => b.last - a.last), [projects]);
  const proofOf = (svcs: string[]) => sorted.filter((p) => inScope(p) && p.services.some((s) => svcs.includes(s)));

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of projects) for (const i of p.industries) m.set(i, (m.get(i) ?? 0) + 1);
    return m;
  }, [projects]);

  const offerRows = offers
    .map((o) => ({ o, proof: proofOf(o.services) }))
    .sort((a, b) => (active ? Number(b.proof.length > 0) - Number(a.proof.length > 0) : 0));
  const serviceRows = services
    .map((s, i) => ({ s, i, log: proofOf([s.slug]) }))
    .sort((a, b) => (active ? b.log.length - a.log.length : 0));

  return (
    <>
      {/* Filtre par industrie */}
      <div className="sticky top-[57px] z-30 border-y border-fmborder/70 bg-[#0d0c14]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1200px] items-center gap-2 overflow-x-auto px-5 py-3 md:px-8 [scrollbar-width:none]">
          <span className="shrink-0 pr-2 text-[10px] uppercase tracking-[0.15em] text-fmmuted">For</span>
          <Chip on={!active} onClick={() => choose(null)}>Everyone</Chip>
          {industries.map((i) => (
            <Chip key={i.slug} on={active === i.slug} onClick={() => choose(active === i.slug ? null : i.slug)}>
              {i.name}
              <span className="ml-1.5 text-fmmuted">{counts.get(i.slug) ?? 0}</span>
            </Chip>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-[1200px] px-5 pt-10 md:px-8">
        {industry && (
          <div className="fm-glass-card mb-10 grid gap-6 rounded-xl p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-fmaccent">How we work for</p>
              <h2 className="fm-display mt-2 text-2xl text-fmfg md:text-3xl">{industry.name}</h2>
              {industry.note && <p className="fm-grotesk mt-3 max-w-2xl text-sm leading-relaxed text-fmfg/80">{industry.note}</p>}
            </div>
            <Link
              href={`/start?industry=${industry.slug}`}
              data-cta="services_industry_start"
              className="group shrink-0 text-[11px] uppercase tracking-[0.12em] text-fmfg"
            >
              Start a {industry.name.toLowerCase()} project{" "}
              <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        )}

        {/* S/01 : les offres à réserver telles quelles */}
        <header className="flex items-baseline justify-between gap-4">
          <h2 className="fm-display text-lg text-fmfg md:text-xl">
            <span className="mr-3 text-[10px] tracking-[0.15em] text-fmmuted">S/01</span>Book as is
          </h2>
          <p className="hidden text-[11px] text-fmmuted md:block">Try it, check what each side brings, book it.</p>
        </header>

        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offerRows.map(({ o, proof }) => {
            const dim = active && proof.length === 0;
            return (
              <article
                key={o.slug}
                className={`flex flex-col overflow-hidden rounded-xl border border-fmborder bg-fmbg transition-opacity duration-300 ${dim ? "opacity-40" : ""}`}
              >
                {o.media.src ? (
                  <CardFilm src={o.media.src} poster={o.media.poster} className="aspect-video w-full bg-fmbg object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={o.media.poster} alt="" className="aspect-video w-full object-cover" />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="fm-display text-lg text-fmfg">{o.title}</h3>
                  <p className="mt-2 text-fmfg">
                    <span className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">From </span>
                    <span className="fm-display text-xl text-fmaccent">{o.from}</span>
                  </p>
                  {o.fromNote && <p className="text-[11px] text-fmmuted">{o.fromNote}</p>}
                  <p className="fm-grotesk mt-3 text-[13px] leading-relaxed text-fmfg/80">{o.pitch}</p>

                  <dl className="mt-5 grid gap-3 text-[12px] leading-snug">
                    <Gear label="We bring" items={o.bring} />
                    <Gear label="You provide" items={o.provide} />
                    <Gear label="Options" items={o.options} />
                  </dl>

                  {proof.length > 0 && (
                    <p className="mt-5 text-[11px] leading-relaxed text-fmmuted">
                      <span className="uppercase tracking-[0.12em]">Done for </span>
                      {proof.slice(0, 3).map((p, k) => (
                        <span key={p.slug}>
                          {k > 0 && " · "}
                          <Link href={`/projects/${p.slug}`} className="fm-link text-fmfg/85">{p.title}</Link>
                        </span>
                      ))}
                    </p>
                  )}

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                    <Link href={o.demo.href} data-cta={`offer_demo_${o.slug}`} className="fm-link text-[11px] uppercase tracking-[0.12em] text-fmmuted">
                      {o.demo.label} ↗
                    </Link>
                    <Link
                      href={`/start?service=${o.services[0]}${active ? `&industry=${active}` : ""}&ref=${o.slug}`}
                      data-cta={`offer_book_${o.slug}`}
                      className="group rounded-full border border-fmaccent/60 px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-fmfg transition-colors hover:bg-fmaccent/15"
                    >
                      Book it <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-fmmuted">
          Starting prices for Tunis. The final quote depends on the venue, the dates and the hardware. Hardware is
          excluded unless listed under “We bring”.
        </p>
      </section>

      {/* S/02 : tout ce que le studio construit, avec son journal */}
      <section className="mx-auto max-w-[1200px] px-5 pb-24 pt-20 md:px-8">
        <header className="flex items-baseline justify-between gap-4">
          <h2 className="fm-display text-lg text-fmfg md:text-xl">
            <span className="mr-3 text-[10px] tracking-[0.15em] text-fmmuted">S/02</span>Everything we build
          </h2>
          <p className="hidden text-[11px] text-fmmuted md:block">Built on a quote. Open a line to see its latest work.</p>
        </header>

        <ul className="mt-5 flex flex-col gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder">
          {serviceRows.map(({ s, i, log }) => {
            const isOpen = open === s.slug;
            const dim = active && log.length === 0;
            return (
              <li key={s.slug} className={`bg-fmbg transition-opacity duration-300 ${dim ? "opacity-40" : ""}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : s.slug)}
                  aria-expanded={isOpen}
                  className="grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 px-5 py-5 text-left transition-colors hover:bg-fmmutedbg md:grid-cols-[3rem_14rem_1fr_auto] md:px-6"
                >
                  <span className="text-[10px] tracking-[0.15em] text-fmmuted">{pad(i + 1)}</span>
                  <span className="fm-display text-base text-fmfg md:text-lg">{s.title}</span>
                  <span className="fm-grotesk col-start-2 text-[13px] leading-relaxed text-fmmuted md:col-start-auto">{s.short}</span>
                  <span className="col-start-3 row-start-1 text-right text-[11px] text-fmmuted md:col-start-4">
                    {log.length} <span className={`ml-2 inline-block text-fmaccent transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                  </span>
                </button>

                {isOpen && (
                  <div className="grid gap-6 px-5 pb-6 md:grid-cols-[1fr_1fr] md:px-6 md:pl-[4.5rem]">
                    <div>
                      {s.film && <CardFilm src={s.film.src} poster={s.film.poster} />}
                      <ul className="mt-4 flex flex-col gap-1.5">
                        {s.outcomes.map((o) => (
                          <li key={o} className="fm-grotesk text-[13px] text-fmfg/85">
                            <span className="mr-2 text-fmaccent">▸</span>{o}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-fmmuted">
                        Log{industry ? ` · ${industry.name}` : ""}
                      </p>
                      {log.length === 0 ? (
                        <p className="fm-grotesk mt-3 text-[13px] text-fmmuted">Nothing shipped for this sector yet. It can be the first.</p>
                      ) : (
                        <ol className="mt-3 flex flex-col border-l border-fmborder">
                          {log.slice(0, 4).map((p) => (
                            <li key={p.slug} className="relative pb-4 pl-5 last:pb-0">
                              <span className="absolute -left-[3px] top-1.5 h-[5px] w-[5px] rounded-full bg-fmaccent" />
                              <span className="font-mono text-[10px] text-fmmuted">{p.year}</span>
                              <Link href={`/projects/${p.slug}`} className="fm-link block text-[13px] text-fmfg">{p.title}</Link>
                              {p.client && <span className="text-[11px] text-fmmuted">{p.client}</span>}
                            </li>
                          ))}
                        </ol>
                      )}
                      <div className="mt-6 flex flex-wrap gap-5">
                        <Link href={`/services/${s.slug}`} className="fm-link text-[11px] uppercase tracking-[0.12em] text-fmmuted">Full page →</Link>
                        <Link
                          href={`/start?service=${s.slug}${active ? `&industry=${active}` : ""}`}
                          data-cta="services_row_start"
                          className="group text-[11px] uppercase tracking-[0.12em] text-fmfg"
                        >
                          Brief this <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.08em] transition-colors ${
        on ? "border-fmaccent bg-fmaccent/15 text-fmfg" : "border-fmborder text-fmmuted hover:text-fmfg"
      }`}
    >
      {children}
    </button>
  );
}

function Gear({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-2">
      <dt className="pt-px text-[10px] uppercase tracking-[0.1em] text-fmmuted">{label}</dt>
      <dd className="fm-grotesk text-fmfg/85">{items.join(" · ")}</dd>
    </div>
  );
}
