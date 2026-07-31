import Link from "next/link";
import { Card, CardTitle } from "../Card";
import { Section } from "../Section";
import { Money } from "../Money";
import { Sparkline } from "../Sparkline";
import {
  cashProjection,
  clientSplit,
  curQuarter,
  funnelCounts,
  identitySplit,
  monthlySeries,
  okrObjectiveProgress,
} from "@/lib/os/compute";
import type { OsGraph } from "@/lib/os/types";

const IDENTITY_COLORS = ["#4D9FFF", "#F5F5F8", "#D9A441", "#7BEF7B"];

function Donut({ data, colors }: { data: [string, number][]; colors: string[] }) {
  const total = data.reduce((s, d) => s + d[1], 0) || 1;
  const R = 33;
  const r = 21;
  const c = 40;
  // Construit les tranches par reduce (accumulateur immuable) plutôt que de muter une variable
  // d'angle externe à chaque itération — react-hooks/immutability interdit cette dernière forme.
  const slices = data.reduce<{ id: string; a0: number; a1: number }[]>((acc, d) => {
    const start = acc.length ? acc[acc.length - 1].a1 : -Math.PI / 2;
    const frac = Math.min(0.9999, d[1] / total);
    return [...acc, { id: d[0], a0: start, a1: start + frac * 2 * Math.PI }];
  }, []);

  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16 shrink-0">
      {slices.map(({ id, a0, a1 }, i) => {
        const large = a1 - a0 > Math.PI ? 1 : 0;
        const path = `M${c + R * Math.cos(a0)},${c + R * Math.sin(a0)} A${R},${R} 0 ${large} 1 ${c + R * Math.cos(a1)},${c + R * Math.sin(a1)} L${c + r * Math.cos(a1)},${c + r * Math.sin(a1)} A${r},${r} 0 ${large} 0 ${c + r * Math.cos(a0)},${c + r * Math.sin(a0)} Z`;
        return <path key={id} d={path} fill={colors[i % colors.length]} />;
      })}
    </svg>
  );
}

interface BusinessAnalyticsProps {
  graph: OsGraph;
  now: Date;
}

/** Projection · CA par identité · top clients · plafond · funnel BDM · OKR · sparkline 12 mois. */
export function BusinessAnalytics({ graph, now }: BusinessAnalyticsProps) {
  const eurTnd = graph.meta?.eur_tnd;
  const proj = cashProjection(graph.finance, now, eurTnd);
  const ids = identitySplit(graph.finance, graph.projects, eurTnd);
  const cls = clientSplit(graph.finance, eurTnd);
  const totalCA = cls.reduce((s, [, v]) => s + v, 0) || 1;
  const funnel = funnelCounts(graph.bdm?.opportunities || []);
  const funnelMax = Math.max(...funnel.map((f) => f.count), 1);

  const yearInvoices = graph.finance.filter((f) => (f.issued || "").startsWith(String(now.getFullYear())));
  const yearCA = yearInvoices.reduce((s, f) => s + (f.currency === "EUR" ? (f.amount || 0) * (eurTnd || 3.38) : f.amount || 0), 0);
  const plafond = 75_000;
  const plafondPct = (yearCA / plafond) * 100;
  const plafondTone = plafondPct >= 90 ? "#ff4d5e" : plafondPct >= 70 ? "#d9a441" : "var(--color-fmaccent)";

  const q = curQuarter(now);
  const okrsThisQuarter = (graph.okrs || []).filter((o) => o.quarter === q);
  const okrGlobalPct = okrsThisQuarter.length
    ? okrsThisQuarter.reduce((s, o) => s + okrObjectiveProgress(o, graph, now), 0) / okrsThisQuarter.length
    : null;

  const series = monthlySeries(graph.finance, now, eurTnd);

  return (
    <Section id="dashboard-business" title="📊 Business">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardTitle>Projection encaissements</CardTitle>
            <div className="mt-2 flex flex-col gap-1 font-grotesk text-sm">
              <span className="text-fmaccent">
                ≤ 30 j <Money amountTND={proj.d30} className="text-fmfg" />
              </span>
              <span className="text-[#d9a441]">
                30-60 j <Money amountTND={proj.d60} className="text-fmfg" />
              </span>
              <span className="text-fmmuted">
                60-90 j <Money amountTND={proj.d90} className="text-fmfg" />
              </span>
            </div>
          </Card>

          <Card>
            <CardTitle>CA par identité</CardTitle>
            <div className="mt-2 flex items-center gap-3">
              <Donut data={ids} colors={IDENTITY_COLORS} />
              <div className="font-grotesk text-xs text-fmmuted">
                {ids.map(([id, v], i) => (
                  <div key={id}>
                    <span style={{ color: IDENTITY_COLORS[i % IDENTITY_COLORS.length] }}>●</span> {graph.identities.find((x) => x.id === id)?.name ?? id}{" "}
                    <b className="text-fmfg">{Math.round(v / 1000)}k</b>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <CardTitle>Top clients — concentration</CardTitle>
            <div className="mt-2 flex flex-col gap-1 font-grotesk text-xs text-fmmuted">
              {cls.slice(0, 4).map(([id, v]) => (
                <div key={id}>
                  {graph.clients?.find((c) => c.id === id)?.name ?? id} <b className="text-fmfg">{Math.round((v / totalCA) * 100)} %</b>
                </div>
              ))}
              {cls[0] && cls[0][1] / totalCA > 0.4 && <div className="text-[#d9a441]">⚠ dépendance élevée</div>}
            </div>
          </Card>

          <Link href="/os/finance" className="block no-underline">
            <Card>
              <CardTitle>Plafond auto-entrepreneur {now.getFullYear()}</CardTitle>
              <div className="mt-2 font-display text-lg" style={{ color: plafondTone }}>
                {plafondPct.toFixed(1)} %
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-fmmutedbg">
                <div className="h-full rounded-full" style={{ width: `${Math.min(100, plafondPct)}%`, background: plafondTone }} />
              </div>
              <div className="mt-1.5 font-grotesk text-[10px] text-fmmuted">
                <Money amountTND={yearCA} /> / <Money amountTND={plafond} />
              </div>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link href="/os/pipeline" className="block no-underline">
            <Card>
              <CardTitle>Funnel Biz Dev</CardTitle>
              <div className="mt-2 flex flex-col gap-1.5">
                {funnel.map((f) => (
                  <div key={f.status} className="flex items-center gap-2">
                    <span className="w-16 font-grotesk text-[10.5px] text-fmmuted">{f.label}</span>
                    <div className="h-2.5 flex-1 rounded bg-fmmutedbg">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(f.count / funnelMax) * 100}%`, background: f.status === "won" ? "var(--color-fmaccent)" : "#ff4d5e" }}
                      />
                    </div>
                    <b className="font-mono text-[11px] text-fmfg">{f.count}</b>
                  </div>
                ))}
              </div>
            </Card>
          </Link>

          {okrGlobalPct !== null && (
            <Link href="/os/okr" className="block no-underline">
              <Card>
                <CardTitle>🎯 OKR {q}</CardTitle>
                <div className="mt-2 font-grotesk text-sm text-fmfg">{Math.round(okrGlobalPct)} % atteints</div>
                <div className="mt-2 flex flex-col gap-1">
                  {okrsThisQuarter.map((o) => {
                    const p = okrObjectiveProgress(o, graph, now);
                    return (
                      <div key={o.id} className="flex items-center gap-2">
                        <span className="flex-1 truncate font-grotesk text-[10.5px] text-fmmuted">{o.objective}</span>
                        <div className="h-1.5 w-24 rounded-full bg-fmmutedbg">
                          <div className="h-full rounded-full" style={{ width: `${p}%`, background: p >= 70 ? "var(--color-fmaccent)" : "#ff4d5e" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </Link>
          )}
        </div>

        <Card>
          <CardTitle>CA 12 derniers mois — encaissé (rouge) vs facturé (gris)</CardTitle>
          <div className="mt-3">
            <Sparkline series={series} />
          </div>
        </Card>
      </div>
    </Section>
  );
}
