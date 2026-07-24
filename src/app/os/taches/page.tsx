"use client";

import { useOs } from "@/lib/os/store";
import { daysUntil } from "@/lib/os/compute";
import { NewTaskForm, buildTaskTargets } from "@/components/os/taches/NewTaskForm";
import { TaskStatsRow } from "@/components/os/taches/TaskStatsRow";
import { TaskGroupList } from "@/components/os/taches/TaskGroupList";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export default function TachesPage() {
  const { graph, loading, error, mutate, logChange } = useOs();

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  const now = new Date();
  const open = graph.tasks.filter((t) => !t.done);
  const done = graph.tasks.filter((t) => t.done);
  const lateCount = open.filter((t) => t.due && (daysUntil(t.due, now) ?? 0) < 0).length;
  const explabOpenCount = graph.tasks.filter((t) => t.project === "explab" && !t.done).length;

  function addTask(label: string, project: string, owner: string, due: string) {
    let id = `t-${slugify(label)}`;
    let i = 2;
    while (graph!.tasks.find((t) => t.id === id)) id = `t-${slugify(label).slice(0, 30)}-${i++}`;
    const projectName = project ? (graph!.projects.find((p) => p.id === project)?.name ?? graph!.identities.find((x) => x.id === project)?.name) : undefined;
    const created = {
      id,
      label,
      done: false,
      ...(project ? { project } : {}),
      ...(owner ? { owner } : {}),
      ...(due ? { due } : {}),
    };
    mutate((draft) => {
      draft.tasks.push(created);
    });
    logChange("create", id, `nouvelle tâche : ${label}${projectName ? ` → ${projectName}` : ""}`, { entityType: "task", snapshot: created });
  }

  function toggleTask(id: string) {
    const before = graph!.tasks.find((x) => x.id === id);
    if (!before) return;
    const nowDone = !before.done;
    mutate((draft) => {
      const t = draft.tasks.find((x) => x.id === id);
      if (t) t.done = nowDone;
    });
    logChange("update", id, `tâche ${nowDone ? "✓ faite" : "réouverte"} : ${before.label}`, {
      entityType: "task",
      snapshot: { before, after: { ...before, done: nowDone } },
    });
  }

  function deleteTask(id: string) {
    const t = graph!.tasks.find((x) => x.id === id);
    if (!t) return;
    if (!confirm(`Supprimer la tâche « ${t.label} » ?`)) return;
    mutate((draft) => {
      draft.trash = draft.trash || [];
      draft.trash.unshift({ ts: new Date().toISOString(), kind: "task", data: t });
      draft.tasks = draft.tasks.filter((x) => x.id !== id);
    });
    logChange("delete", id, `tâche supprimée (→ corbeille) : ${t.label}`, { entityType: "task", snapshot: t });
  }

  return (
    <div className="fm-rise flex flex-col gap-5">
      <NewTaskForm targets={buildTaskTargets(graph)} onAdd={addTask} />
      <TaskStatsRow openCount={open.length} lateCount={lateCount} doneCount={done.length} explabOpenCount={explabOpenCount} />
      <TaskGroupList tasks={graph.tasks} graph={graph} now={now} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}
