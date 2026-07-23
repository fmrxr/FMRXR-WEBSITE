"use client";

import { useOs } from "@/lib/os/store";
import { closingSoon, daysUntil, focusToday, healthScore, imminentDeadlines, relances } from "@/lib/os/compute";
import { Badge } from "@/components/os/Badge";
import { PriorityHero } from "@/components/os/today/PriorityHero";
import { TasksCard } from "@/components/os/today/TasksCard";
import { DeadlinesCard } from "@/components/os/today/DeadlinesCard";
import { RelancesCard } from "@/components/os/today/RelancesCard";
import { PipelineCard } from "@/components/os/today/PipelineCard";
import { AgentSuggestion } from "@/components/os/today/AgentSuggestion";

function healthTone(score: number): "accent" | "warn" | "danger" {
  if (score >= 70) return "accent";
  if (score >= 45) return "warn";
  return "danger";
}

export default function TodayPage() {
  const { graph, loading, error } = useOs();

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  const now = new Date();
  const hs = healthScore(graph, now);
  const focus = focusToday(graph, now);
  const deadlines = imminentDeadlines(graph.deadlines, now, 7);
  const rel = relances(graph, now);
  const opps = closingSoon(graph.bdm?.opportunities ?? [], now);
  const openTasks = (graph.tasks || [])
    .filter((t) => !t.done)
    .sort((a, b) => (daysUntil(a.due, now) ?? 99_999) - (daysUntil(b.due, now) ?? 99_999))
    .slice(0, 5);

  const hour = now.getHours();
  const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";
  const dateLabel = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="fm-rise flex flex-col gap-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-fmfg md:text-3xl">{greeting}, Haïfa</h1>
          <p className="mt-1 font-grotesk text-sm capitalize text-fmmuted">{dateLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-grotesk text-xs text-fmmuted">Business Health</span>
          <Badge tone={healthTone(hs)}>{hs}/100</Badge>
        </div>
      </header>

      <PriorityHero focus={focus} graph={graph} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <TasksCard tasks={openTasks} graph={graph} />
        <DeadlinesCard deadlines={deadlines} />
        <RelancesCard items={rel} graph={graph} />
        <PipelineCard opportunities={opps} />
      </div>

      <AgentSuggestion relancesCount={rel.length} closingCount={opps.length} tasksCount={openTasks.length} />
    </div>
  );
}
