"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import type { Offer } from "@/lib/offers";

// Le niveau caché de /services, ouvert en tapant « fmr » (ou par appui long sur
// le // du logo). Univers Cadastre 2027, registre Signal : la donnée comme
// matière, une seule couleur de signal, des étiquettes de lecture minuscules.
// Chaque service est une ligne de relevé soulevée par ses vrais projets publiés,
// une bosse par projet à son année. Rien n'est inventé : sans projet, la ligne
// reste plate.

const NIGHT = "#060a11";
const CREAM = "#ffe8d6";
const RED = "#ff2d12";

export type SProject = { slug: string; title: string; year?: string; last: number; services: string[] };
export type SService = { slug: string; title: string };

const Y0 = 2020.4;
const Y1 = 2026.8;
const W = 1000;
const ROW = 46;
const LIFT = 13; // pixels par projet
const SAMPLES = 240;
const noop = () => () => {};

export function SignalLevel({ services, projects, offers }: { services: SService[]; projects: SProject[]; offers: Offer[] }) {
  const router = useRouter();
  const [hot, setHot] = useState<string | null>(null);
  // Vrai seulement côté navigateur : le portail a besoin de document.body.
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && router.push("/services");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  const rows = useMemo(
    () =>
      services.map((s) => {
        const mine = projects.filter((p) => p.services.includes(s.slug) && p.last > 0).sort((a, b) => b.last - a.last);
        // Un projet = une bosse posée sur son année exacte. Plusieurs projets la
        // même année s'additionnent en hauteur : la hauteur se lit comme un compte.
        const pts: [number, number][] = [];
        for (let i = 0; i <= SAMPLES; i++) {
          const yr = Y0 + ((Y1 - Y0) * i) / SAMPLES;
          let h = 0;
          for (const p of mine) h += Math.exp(-((yr - p.last) ** 2) / (2 * 0.075 ** 2));
          pts.push([(W * i) / SAMPLES, h]);
        }
        return { s, mine, pts };
      }),
    [services, projects],
  );

  // Marge haute = la plus haute pile de la première ligne, pour qu'elle ne sorte pas du cadre.
  const top = Math.max(1, ...(rows[0]?.pts.map(([, h]) => h) ?? [1])) * LIFT + 10;
  const height = rows.length * ROW + top + 40;
  const years = [2021, 2022, 2023, 2024, 2025, 2026];
  const xOf = (yr: number) => (W * (yr - Y0)) / (Y1 - Y0);
  const hotRow = rows.find((r) => r.s.slug === hot) ?? null;

  // Portail sur <body> : rendu dans <main> (z-10), la page passait sous l'en-tête et le pied de page.
  if (!mounted) return null;
  return createPortal(
    <div className="fixed inset-0 z-[60] overflow-y-auto" style={{ background: NIGHT, color: CREAM }}>
      <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-8 md:px-8">
        <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: `${CREAM}99` }}>
          <span>FMRXR// · Survey of services · {projects.length} projects</span>
          <Link href="/services" className="hover:opacity-100" style={{ color: CREAM }}>Esc · exit</Link>
        </div>

        <h1 className="fm-display mt-10 text-[clamp(2.5rem,9vw,7.5rem)] uppercase leading-[0.9]">
          What the studio<br />actually shipped
        </h1>
        <p className="mt-5 max-w-xl font-mono text-[11px] leading-relaxed" style={{ color: `${CREAM}b3` }}>
          One line per service. Each peak is a published project, set at its year. Height is the number of
          projects. Hover a line to turn it red.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_17rem]">
          <svg viewBox={`-200 -20 ${W + 210} ${height}`} className="w-full" role="img" aria-label="Published projects per service and per year">
            {/* De l'arrière vers l'avant : chaque ligne masque celles qu'elle recouvre. */}
            {rows.map((r, i) => {
              const base = i * ROW + top;
              const d = r.pts.map(([x, h], k) => `${k ? "L" : "M"}${x.toFixed(1)},${(base - h * LIFT).toFixed(1)}`).join("");
              const on = hot === r.s.slug;
              return (
                <g
                  key={r.s.slug}
                  onMouseEnter={() => setHot(r.s.slug)}
                  onClick={() => setHot(on ? null : r.s.slug)}
                  style={{ cursor: "pointer" }}
                >
                  <path d={`${d}L${W},${base + ROW}L0,${base + ROW}Z`} fill={NIGHT} />
                  <path d={d} fill="none" stroke={on ? RED : CREAM} strokeWidth={on ? 2 : 1} strokeOpacity={on || !hot ? 1 : 0.35} />
                  <text x={-12} y={base + 4} textAnchor="end" fontSize={11} fill={on ? RED : CREAM} fillOpacity={on || !hot ? 0.9 : 0.4} fontFamily="var(--font-geist-mono)">
                    {r.s.title.toUpperCase()}
                  </text>
                  <text x={W + 6} y={base + 4} fontSize={10} fill={on ? RED : CREAM} fillOpacity={0.6} fontFamily="var(--font-geist-mono)">{r.mine.length}</text>
                </g>
              );
            })}
            {/* Les années par-dessus : le masque de la dernière ligne les cachait. */}
            {years.map((y) => (
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
                <ol className="mt-3 flex flex-col gap-1.5">
                  {hotRow.mine.map((p) => (
                    <li key={p.slug}>
                      <span style={{ color: `${CREAM}80` }}>{p.year} </span>
                      <Link href={`/projects/${p.slug}`} className="underline-offset-2 hover:underline">{p.title}</Link>
                    </li>
                  ))}
                  {hotRow.mine.length === 0 && <li style={{ color: `${CREAM}80` }}>No published project yet.</li>}
                </ol>
                <Link href={`/services/${hotRow.s.slug}`} className="mt-4 inline-block uppercase tracking-[0.15em]" style={{ color: RED }}>Open →</Link>
              </>
            ) : (
              <p style={{ color: `${CREAM}80` }}>Pick a line.</p>
            )}
          </aside>
        </div>

        <h2 className="mt-20 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: `${CREAM}99` }}>Starting prices · Tunis</h2>
        <table className="mt-4 w-full border-collapse font-mono text-[11px]">
          <tbody>
            {offers.map((o) => (
              <tr key={o.slug} className="border-t" style={{ borderColor: `${CREAM}26` }}>
                <td className="py-3 pr-4 uppercase tracking-[0.1em]">{o.title}</td>
                <td className="py-3 pr-4 text-right" style={{ color: RED }}>{o.from}</td>
                <td className="hidden py-3 md:table-cell" style={{ color: `${CREAM}99` }}>{o.provide.join(" · ")}</td>
                <td className="py-3 text-right">
                  <Link href={`/start?service=${o.services[0]}&ref=${o.slug}-signal`} className="hover:underline">Book →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>,
    document.body,
  );
}

// Écoute « fmr » tapé n'importe où sur le site, sauf dans un champ de saisie.
export function SecretLevelListener() {
  const router = useRouter();
  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
      buf = (buf + e.key.toLowerCase()).slice(-3);
      if (buf === "fmr" && window.location.pathname !== "/fmr") {
        buf = "";
        router.push("/fmr");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);
  return null;
}
