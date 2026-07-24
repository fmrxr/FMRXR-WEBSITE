"use client";

import { useOs } from "@/lib/os/store";
import { daysUntil, ganttItems } from "@/lib/os/compute";
import { AgendaOverview } from "@/components/os/agenda/AgendaOverview";
import { MiniGantt } from "@/components/os/agenda/MiniGantt";
import { DeadlineTimeline } from "@/components/os/agenda/DeadlineTimeline";
import { Section } from "@/components/os/Section";
import { genId } from "@/lib/os/id";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export default function AgendaPage() {
  const { graph, loading, error, mutate, logChange } = useOs();

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  const now = new Date();
  const sorted = [...graph.deadlines].sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  const upcoming = sorted.filter((d) => (daysUntil(d.date, now) ?? -1) >= 0);
  const targets = [
    ...graph.projects.filter((p) => p.status === "active").map((p) => ({ id: p.id, name: p.name })),
    ...graph.identities.map((i) => ({ id: i.id, name: i.name })),
  ];
  // Le monolithe cible le projet VZ×Calypso par un regex sur le nom — on généralise ici au projet
  // actif de priorité "critical" (même résultat aujourd'hui, robuste si un autre projet prend le relais).
  const criticalProject = graph.projects.find((p) => p.status === "active" && p.priority === "critical");

  function toggleDeadline(id: string) {
    const before = graph!.deadlines.find((x) => x.id === id);
    if (!before) return;
    const nowDone = !before.done;
    mutate((draft) => {
      const d = draft.deadlines.find((x) => x.id === id);
      if (d) d.done = nowDone;
    });
    logChange("update", id, `deadline ${nowDone ? "✓ faite" : "réouverte"} : ${before.label}`, {
      entityType: "deadline",
      snapshot: { before, after: { ...before, done: nowDone } },
    });
  }

  function deleteDeadline(id: string) {
    const d = graph!.deadlines.find((x) => x.id === id);
    if (!d) return;
    if (!confirm(`Supprimer la deadline « ${d.label} » ?`)) return;
    mutate((draft) => {
      draft.trash = draft.trash || [];
      draft.trash.unshift({ ts: new Date().toISOString(), kind: "deadline", data: d });
      draft.deadlines = draft.deadlines.filter((x) => x.id !== id);
    });
    logChange("delete", id, `deadline supprimée (→ corbeille) : ${d.label}`, { entityType: "deadline", snapshot: d });
  }

  function addDeadline(label: string, date: string, project: string, owner: string, critical: boolean) {
    const id = genId(`d-${slugify(label)}`);
    const created = {
      id,
      date,
      label,
      done: false,
      ...(project ? { project } : {}),
      ...(owner ? { owner } : {}),
      ...(critical ? { critical } : {}),
    };
    mutate((draft) => {
      draft.deadlines.push(created);
    });
    logChange("create", id, `nouvelle deadline : ${label}`, { entityType: "deadline", snapshot: created });
  }

  return (
    <div className="fm-rise flex flex-col gap-6">
      <AgendaOverview
        now={now}
        upcomingCount={upcoming.length}
        upcomingCriticalCount={upcoming.filter((d) => d.critical).length}
        calSyncDate={(graph.meta?.cal_sync as string | undefined) ?? null}
      />

      {criticalProject && (
        <Section id="agenda-gantt" title={`📅 Gantt — ${criticalProject.name}`}>
          <div className="fm-glass-card rounded-2xl p-5">
            <MiniGantt {...ganttItems(graph.deadlines, graph.tasks, criticalProject.id, now)} />
          </div>
        </Section>
      )}

      <DeadlineTimeline
        deadlines={sorted}
        graph={graph}
        now={now}
        targets={targets}
        onToggle={toggleDeadline}
        onDelete={deleteDeadline}
        onAdd={addDeadline}
      />
    </div>
  );
}
