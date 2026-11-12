"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LogEntry } from "@/lib/service-log";

// La page Services publique (12/11/2026), univers Cadastre 2027, registre
// Signal : la donnée comme matière, une seule couleur de signal, des étiquettes
// de lecture minuscules. Chaque service est une ligne de relevé soulevée par
// ses vrais projets publiés, une bosse par projet à son année ; plusieurs
// projets la même année s'additionnent en hauteur. Rien n'est inventé : sans
// projet, la ligne reste plate. Les industries filtrent le relevé (?for=<slug>).
// Aucun prix ici : ils ne vivent que sur la page cachée /fmr.

export const NIGHT = "#060a11";
export const CREAM = "#ffe8d6";
export const RED = "#ff2d12";

export type SProject = { slug: string; title: string; year?: string; last: number; services: string[]; industries: string[] };
export type SService = { slug: string; title: string; short?: string; log: LogEntry[] };
export type SIndustry = { slug: string; name: string; note?: string };

const Y0 = 2020.4;
const Y1 = 2026.8;
const W = 1000;
const ROW = 46;
const LIFT = 13; // pixels par projet
const SAMPLES = 240;
const YEARS = [2021, 2022, 2023, 2024, 2025, 2026];
const xOf = (yr: number) => (W * (yr - Y0)) / (Y1 - Y0);
const pad = (n: number) => String(n).padStart(2, "0");
const dim = (a: string) => `${CREAM}${a}`;

export function SignalSurvey({
  services,
  projects,
  industries,
  initialFor,
}: {
  services: SService[];
  projects: SProject[];
  industries: SIndustry[];
  initialFor: string | null;
}) {
  const [hot, setHot] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(industries.some((i) => i.slug === initialFor) ? initialFor : null);

  function choose(slug: string | null) {
    setActive(slug);
    window.history.replaceState(null, "", slug ? `?for=${slug}` : window.location.pathname);
  }

  const industry = industries.find((i) => i.slug === active) ?? null;
  const scope = useMemo(
    () => projects.filter((p) => p.last > 0 && (!active || p.industries.includes(active))),
    [projects, active],
  );

  const rows = useMemo(
    () =>
      services.map((s) => {
        const mine = scope.filter((p) => p.services.includes(s.slug)).sort((a, b) => b.last - a.last);
        const pts: [number, number][] = [];
        for (let i = 0; i <= SAMPLES; i++) {
          const yr = Y0 + ((Y1 - Y0) * i) / SAMPLES;
          let h = 0;
          for (const p of mine) h += Math.exp(-((yr - p.last) ** 2) / (2 * 0.075 ** 2));
          pts.push([(W * i) / SAMPLES, h]);
        }
        return { s, mine, pts };
      }),
    [services, scope],
  );

  // Marge haute = la plus haute pile de la première ligne, pour qu'elle ne sorte pas du cadre.
  const top = Math.max(1, ...(rows[0]?.pts.map(([, h]) => h) ?? [1])) * LIFT + 10;
  const height = rows.length * ROW + top + 40;
  const hotRow = rows.find((r) => r.s.slug === hot) ?? null;
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of projects) for (const i of p.industries) m.set(i, (m.get(i) ?? 0) + 1);
    return m;
  }, [projects]);

  return (
    // Pleine largeur sur bleu nuit, sous l'en-tête fixe du site.
    <div className="-mt-28 pb-28 pt-28 md:-mt-32 md:pt-32" style={{ background: NIGHT, color: CREAM }}>
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: dim("99") }}>
          FMRXR// · Survey of services · {scope.length} projects{industry ? ` · ${industry.name}` : ""}
        </p>

        <h1 className="fm-display mt-8 text-[clamp(2.5rem,9vw,7.5rem)] uppercase leading-[0.9]">
          What the studio<br />actually shipped
        </h1>
        <p className="mt-5 max-w-xl font-mono text-[11px] leading-relaxed" style={{ color: dim("b3") }}>
          One line per service. Each peak is a published project, set at its year. Height is the number of
          projects. Hover or tap a line to turn it red.
        </p>

        {/* Filtre par industrie : il refait le relevé avec les seuls projets du secteur. */}
        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em]">
          <span style={{ color: dim("66") }}>For</span>
          {[{ slug: null as string | null, name: "Everyone" }, ...industries].map((i) => {
            const on = active === i.slug;
            return (
              <button
                key={i.slug ?? "all"}
                onClick={() => choose(on && i.slug ? null : i.slug)}
                aria-pressed={on}
                className="underline-offset-4 hover:underline"
                style={{ color: on ? RED : dim("b3"), textDecoration: on ? "underline" : undefined }}
              >
                {i.name}
                {i.slug && <sup className="ml-0.5" style={{ color: dim("59") }}>{counts.get(i.slug) ?? 0}</sup>}
              </button>
            );
          })}
        </div>
        {industry?.note && (
          <p className="mt-5 max-w-2xl font-mono text-[11px] leading-relaxed" style={{ color: dim("cc") }}>
            {industry.note}{" "}
            <Link href={`/start?industry=${industry.slug}`} data-cta="services_industry_start" className="uppercase tracking-[0.12em]" style={{ color: RED }}>
              Start a project →
            </Link>
          </p>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_18rem]">
          <svg viewBox={`-200 -20 ${W + 210} ${height}`} className="w-full" role="img" aria-label="Published projects per service and per year">
            {/* De l'arrière vers l'avant : chaque ligne masque celles qu'elle recouvre. */}
            {rows.map((r, i) => {
              const base = i * ROW + top;
              const d = r.pts.map(([x, h], k) => `${k ? "L" : "M"}${x.toFixed(1)},${(base - h * LIFT).toFixed(1)}`).join("");
              const on = hot === r.s.slug;
              const faint = (hot && !on) || r.mine.length === 0;
              return (
                <g key={r.s.slug} onMouseEnter={() => setHot(r.s.slug)} onClick={() => setHot(on ? null : r.s.slug)} style={{ cursor: "pointer" }}>
                  <path d={`${d}L${W},${base + ROW}L0,${base + ROW}Z`} fill={NIGHT} />
                  <path d={d} fill="none" stroke={on ? RED : CREAM} strokeWidth={on ? 2 : 1} strokeOpacity={faint ? 0.3 : 1} />
                  <text x={-12} y={base + 4} textAnchor="end" fontSize={11} fill={on ? RED : CREAM} fillOpacity={faint ? 0.35 : 0.9} fontFamily="var(--font-geist-mono)">
                    {r.s.title.toUpperCase()}
                  </text>
                  <text x={W + 6} y={base + 4} fontSize={10} fill={on ? RED : CREAM} fillOpacity={0.6} fontFamily="var(--font-geist-mono)">{r.mine.length}</text>
                </g>
              );
            })}
            {/* Les années par-dessus : le masque de la dernière ligne les cachait. */}
            {YEARS.map((y) => (
              <g key={y}>
                <line x1={xOf(y)} x2={xOf(y)} y1={-10} y2={height - 60} stroke={CREAM} strokeOpacity={0.08} />
                <text x={xOf(y)} y={height - 40} textAnchor="middle" fontSize={11} fill={CREAM} fillOpacity={0.5} fontFamily="var(--font-geist-mono)">{y}</text>
              </g>
            ))}
          </svg>

          <aside className="font-mono text-[11px] leading-relaxed">
            {hotRow ? (
              <>
                <p className="uppercase tracking-[0.15em]" style={{ color: RED }}>{hotRow.s.title}</p>
                {hotRow.s.short && <p className="mt-2" style={{ color: dim("b3") }}>{hotRow.s.short}</p>}
                <ol className="mt-4 flex flex-col gap-1.5">
                  {hotRow.mine.map((p) => (
                    <li key={p.slug}>
                      <span style={{ color: dim("80") }}>{p.year} </span>
                      <Link href={`/projects/${p.slug}`} className="underline-offset-2 hover:underline">{p.title}</Link>
                    </li>
                  ))}
                  {hotRow.mine.length === 0 && <li style={{ color: dim("80") }}>Nothing shipped for this sector yet.</li>}
                </ol>
                {hotRow.s.log.length > 0 && (
                  <>
                    <p className="mt-6 uppercase tracking-[0.15em]" style={{ color: dim("80") }}>Logbook</p>
                    <ol className="mt-2 flex flex-col gap-2">
                      {hotRow.s.log.slice(0, 3).map((e, k) => (
                        <li key={`${e.date}-${k}`}>
                          <span style={{ color: k === 0 ? RED : dim("80") }}>{e.label} </span>
                          {e.text}
                        </li>
                      ))}
                    </ol>
                  </>
                )}
                <Link href={`/services/${hotRow.s.slug}`} className="mt-5 inline-block uppercase tracking-[0.15em]" style={{ color: RED }}>Open →</Link>
              </>
            ) : (
              <p style={{ color: dim("80") }}>Pick a line.</p>
            )}
          </aside>
        </div>

        {/* L'index : la même information en liste, lisible au téléphone. */}
        <h2 className="mt-20 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: dim("99") }}>Index</h2>
        <ol className="mt-4">
          {rows.map((r, i) => (
            <li key={r.s.slug} className="border-t" style={{ borderColor: dim("26") }}>
              <Link
                href={`/services/${r.s.slug}`}
                onMouseEnter={() => setHot(r.s.slug)}
                className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-4 md:grid-cols-[2.5rem_16rem_1fr_9rem_2rem]"
              >
                <span className="font-mono text-[10px]" style={{ color: dim("66") }}>{pad(i + 1)}</span>
                <span className="fm-display text-base uppercase group-hover:text-[#ff2d12] md:text-lg">{r.s.title}</span>
                <span className="col-start-2 font-mono text-[11px] leading-relaxed md:col-start-auto" style={{ color: dim("99") }}>{r.s.short}</span>
                <span className="hidden font-mono text-[10px] md:block" style={{ color: dim("80") }}>{r.s.log[0]?.label ?? ""}</span>
                <span className="col-start-3 row-start-1 text-right font-mono text-[10px] md:col-start-5" style={{ color: r.mine.length ? RED : dim("59") }}>
                  {r.mine.length}
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-wrap items-baseline justify-between gap-4 border-t pt-6 font-mono text-[10px] uppercase tracking-[0.15em]" style={{ borderColor: dim("26") }}>
          <span style={{ color: dim("66") }}>Data: published projects on fmrxr.com</span>
          <Link href={`/start${active ? `?industry=${active}` : ""}`} data-cta="services_start" style={{ color: RED }}>Start a project →</Link>
        </div>
      </div>
    </div>
  );
}
