"use client";

import { useOs } from "@/lib/os/store";
import {
  buildAlerts,
  clientConcentration,
  daysUntil,
  focusToday,
  healthScore,
  kpiOk,
  kpiValue,
  monthlyAnomaly,
  monthlySeries,
  pipelineWinRate,
  runRateProjection,
} from "@/lib/os/compute";
import { ActionBar } from "@/components/os/dashboard/ActionBar";
import { FocusHealthCard } from "@/components/os/dashboard/FocusHealthCard";
import { QuickStatsGrid } from "@/components/os/dashboard/QuickStatsGrid";
import { ConcentrationRiskCard } from "@/components/os/dashboard/ConcentrationRiskCard";
import { RunRateProjectionCard } from "@/components/os/dashboard/RunRateProjectionCard";
import { PipelineWinRateCard } from "@/components/os/dashboard/PipelineWinRateCard";
import { AnomalyCard } from "@/components/os/dashboard/AnomalyCard";
import { FxRateCard } from "@/components/os/dashboard/FxRateCard";
import { BusinessAnalytics } from "@/components/os/dashboard/BusinessAnalytics";
import { KpiGrid } from "@/components/os/dashboard/KpiGrid";
import { AlertsList } from "@/components/os/dashboard/AlertsList";
import { RecentActivity } from "@/components/os/dashboard/RecentActivity";
import { ProjectsPreviewGrid } from "@/components/os/dashboard/ProjectsPreviewGrid";

const PENDING_STATUSES = new Set(["sent", "partial", "late", "disputed"]);

export default function DashboardPage() {
  const { graph, loading, error } = useOs();

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  const now = new Date();
  const eurTnd = graph.meta?.eur_tnd;

  const health = healthScore(graph, now);
  const focus = focusToday(graph, now);

  const upcomingDeadlines = graph.deadlines
    .filter((d) => !d.done && (daysUntil(d.date, now) ?? -1) >= 0)
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  const nextDeadline = upcomingDeadlines[0] ?? null;

  const activeProjects = graph.projects.filter((p) => p.status === "active");
  const criticalProject = activeProjects.find((p) => p.priority === "critical") ?? null;
  const criticalProjectNextDeadline = criticalProject
    ? (graph.deadlines
        .filter((d) => d.project === criticalProject.id && !d.done && (daysUntil(d.date, now) ?? -1) >= 0)
        .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))[0] ?? null)
    : null;

  const yearInvoices = graph.finance.filter((f) => (f.issued || "").startsWith(String(now.getFullYear())));
  const pendingCount = graph.finance.filter((f) => PENDING_STATUSES.has(f.status)).length;

  const alerts = buildAlerts(graph, now);
  const concentration = clientConcentration(graph.finance, eurTnd);
  const runRate = runRateProjection(graph.finance, now, eurTnd);
  const winRate = pipelineWinRate(graph.bdm?.opportunities || []);
  const anomaly = monthlyAnomaly(monthlySeries(graph.finance, now, eurTnd));
  const journalUnsynced = (graph.log || []).some((l) => !l.synced);

  return (
    <div className="fm-rise flex flex-col gap-6">
      <ActionBar journalUnsynced={journalUnsynced} />

      <FocusHealthCard health={health} focus={focus} graph={graph} now={now} />

      <QuickStatsGrid
        nextDeadline={nextDeadline}
        criticalProject={criticalProject}
        criticalProjectNextDeadline={criticalProjectNextDeadline}
        activeProjects={activeProjects}
        yearInvoices={yearInvoices}
        pendingCount={pendingCount}
        now={now}
      />

      <div>
        <h2 className="mb-3 font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted">Analyses avancées</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          <ConcentrationRiskCard concentration={concentration} graph={graph} />
          <RunRateProjectionCard projection={runRate} now={now} />
          <PipelineWinRateCard winRate={winRate} />
          <AnomalyCard anomaly={anomaly} />
          <FxRateCard />
        </div>
      </div>

      <BusinessAnalytics graph={graph} now={now} />

      <div>
        <h2 className="mb-3 flex items-center gap-2 font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted">
          KPIs
          <span className="rounded-full border border-fmborder px-2 py-0.5 text-[10px] normal-case tracking-normal text-fmmuted">
            {(graph.kpis || []).filter((k) => kpiOk(k, kpiValue(k, graph, now))).length}/{(graph.kpis || []).length} au vert
          </span>
        </h2>
        <KpiGrid kpis={graph.kpis || []} graph={graph} now={now} />
      </div>

      <div>
        <h2 className="mb-3 font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted">Alertes & risques</h2>
        <AlertsList alerts={alerts} />
      </div>

      {(graph.log || []).length > 0 && (
        <div>
          <h2 className="mb-3 font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted">Activité récente</h2>
          <RecentActivity log={graph.log} />
        </div>
      )}

      <div>
        <h2 className="mb-3 font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted">Projets en cours</h2>
        <ProjectsPreviewGrid projects={activeProjects} graph={graph} now={now} />
      </div>
    </div>
  );
}
