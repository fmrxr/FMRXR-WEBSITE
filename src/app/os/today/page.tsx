"use client";

import { useEffect, useState } from "react";
import { useOs } from "@/lib/os/store";
import {
  briefing, columns, debt, healthBreakdown, nextAction, okrStrip, recentActivity,
} from "@/lib/os/today";
import { TODAY_COPY } from "@/lib/os/today-copy";
import { clientConcentration, monthlyAnomaly, monthlySeries, pipelineWinRate, revenueHorizon, runRateProjection } from "@/lib/os/compute";
import { Briefing } from "@/components/os/today/Briefing";
import { CaptureBar } from "@/components/os/today/CaptureBar";
import { ColumnCard } from "@/components/os/today/ColumnCard";
import { DebtSection } from "@/components/os/today/DebtSection";
import { Fold } from "@/components/os/today/Fold";
import { HealthChips } from "@/components/os/today/HealthChips";
import { OkrStripCard } from "@/components/os/today/OkrStripCard";
import { ConcentrationRiskCard } from "@/components/os/dashboard/ConcentrationRiskCard";
import { RunRateProjectionCard } from "@/components/os/dashboard/RunRateProjectionCard";
import { PipelineWinRateCard } from "@/components/os/dashboard/PipelineWinRateCard";
import { AnomalyCard } from "@/components/os/dashboard/AnomalyCard";
import { FxRateCard } from "@/components/os/dashboard/FxRateCard";
import { RevenueHorizonCard } from "@/components/os/dashboard/RevenueHorizonCard";
import { KpiGrid } from "@/components/os/dashboard/KpiGrid";

const LAST_VISIT_KEY = "fmrxr-cc-last-visit-v1";

/**
 * Command Center. Une seule page, en pyramide inversée : saisie, briefing, colonnes métier, bande
 * OKR, puis les replis de détail. La page n'assemble que des vues calculées ailleurs ; toute la
 * logique vit dans lib/os/today.ts et lib/os/compute.ts, tous les textes dans lib/os/today-copy.ts.
 */
export default function CommandCenterPage() {
  const { graph, loading, error } = useOs();
  const [lastVisit, setLastVisit] = useState<Date | undefined>(undefined);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LAST_VISIT_KEY);
      const parsed = saved ? Date.parse(saved) : NaN;
      // Lecture unique au montage d'une préférence propre au navigateur.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!Number.isNaN(parsed)) setLastVisit(new Date(parsed));
      localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
    } catch {
      // stockage indisponible : rien n'est marqué comme nouveau
    }
  }, []);

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  const now = new Date();
  const eurTnd = graph.meta?.eur_tnd;
  const lines = briefing(graph, now);
  const action = nextAction(graph, now);
  const cols = columns(graph, now);
  const strip = okrStrip(graph, now);
  const { items: debtItems, fossilCount } = debt(graph, now);
  const facets = healthBreakdown(graph, now);
  const activity = recentActivity(graph, undefined, lastVisit);

  // Le prénom vient du graphe, comme le reste : rien n'est écrit en dur dans la page.
  const owner = String(graph.meta?.owner ?? "").trim();
  const firstName = owner ? owner.split(/\s+/)[0] : null;
  const dateLabel = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  const savedAt = graph.meta?.updated ? new Date(graph.meta.updated) : null;
  const freshness =
    savedAt && !Number.isNaN(savedAt.getTime())
      ? TODAY_COPY.freshness(dateLabel, savedAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }))
      : TODAY_COPY.freshnessUnknown(dateLabel);

  return (
    <div className="fm-rise flex flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-fmfg md:text-3xl">{TODAY_COPY.greeting(now.getHours())}{firstName ? `, ${firstName}` : ""}
          </h1>
          <p className="mt-1 font-grotesk text-sm capitalize text-fmmuted">{freshness}</p>
        </div>
        <HealthChips facets={facets} />
      </header>

      <CaptureBar />

      <Briefing lines={lines} action={action} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cols.map((col) => (
          <ColumnCard key={col.id} col={col} />
        ))}
      </div>

      <OkrStripCard strip={strip} />

      <DebtSection items={debtItems} fossilCount={fossilCount} />

      <Fold id="analysis" title={TODAY_COPY.folds.analysis} summary={TODAY_COPY.folds.analysisSummary}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <RevenueHorizonCard horizon={revenueHorizon(graph.finance, now, eurTnd)} graph={graph} />
          <ConcentrationRiskCard concentration={clientConcentration(graph.finance, eurTnd, now)} graph={graph} />
          <RunRateProjectionCard projection={runRateProjection(graph.finance, now, eurTnd)} now={now} />
          <PipelineWinRateCard winRate={pipelineWinRate(graph.bdm?.opportunities || [], now)} />
          <AnomalyCard anomaly={monthlyAnomaly(monthlySeries(graph.finance, now, eurTnd), 40, now)} />
          <FxRateCard />
        </div>
        <div className="mt-4">
          <KpiGrid kpis={graph.kpis || []} graph={graph} now={now} />
        </div>
      </Fold>

      <Fold id="journal" title={TODAY_COPY.folds.journal} summary={TODAY_COPY.folds.journalSummary(activity.length)}>
        <ul className="flex flex-col gap-2">
          {activity.map((e) => (
            <li key={e.id} className="font-grotesk text-xs leading-snug">
              <span className="text-fmfg">{e.detail}</span>
              <span className="ml-2 text-[10px] text-fmmuted">
                {new Date(e.ts).toLocaleString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                {e.by ? `, ${e.by}` : ""}
              </span>
              {e.isNew && (
                <span className="ml-2 rounded-full border border-fmaccent/40 px-1.5 py-px text-[9px] uppercase tracking-[0.1em] text-fmaccent">
                  {TODAY_COPY.folds.newSinceVisit}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Fold>
    </div>
  );
}
