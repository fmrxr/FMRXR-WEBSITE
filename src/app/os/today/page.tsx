"use client";

import { useOs } from "@/lib/os/store";
import { briefing, columns, debt, healthBreakdown, nextAction } from "@/lib/os/today";
import { TODAY_COPY } from "@/lib/os/today-copy";
import { Briefing } from "@/components/os/today/Briefing";
import { ColumnCard } from "@/components/os/today/ColumnCard";
import { DebtSection } from "@/components/os/today/DebtSection";
import { HealthChips } from "@/components/os/today/HealthChips";

/**
 * Command Center, page Today. Pyramide inversée : briefing, colonnes métier, dette repliée.
 * La page n'assemble que des vues déjà calculées : toute la logique vit dans lib/os/today.ts,
 * et tous les textes dans lib/os/today-copy.ts.
 */
export default function TodayPage() {
  const { graph, loading, error } = useOs();

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  const now = new Date();
  const lines = briefing(graph, now);
  const action = nextAction(graph, now);
  const cols = columns(graph, now);
  const { items: debtItems, fossilCount } = debt(graph, now);
  const facets = healthBreakdown(graph, now);

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
          <h1 className="font-display text-2xl text-fmfg md:text-3xl">{TODAY_COPY.greeting(now.getHours())}, Haïfa</h1>
          <p className="mt-1 font-grotesk text-sm capitalize text-fmmuted">{freshness}</p>
        </div>
        <HealthChips facets={facets} />
      </header>

      <Briefing lines={lines} action={action} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cols.map((col) => (
          <ColumnCard key={col.id} col={col} />
        ))}
      </div>

      <DebtSection items={debtItems} fossilCount={fossilCount} />
    </div>
  );
}
