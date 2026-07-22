"use client";

import { Card } from "../Card";
import { daysUntil } from "@/lib/os/compute";
import type { OsGraph, OsTask } from "@/lib/os/types";

interface TaskRowProps {
  task: OsTask;
  now: Date;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/** Porte taskRow() du monolithe : case à cocher, libellé, propriétaire/échéance, suppression. */
function TaskRow({ task, now, onToggle, onDelete }: TaskRowProps) {
  const late = task.due && !task.done && (daysUntil(task.due, now) ?? 0) < 0;
  const dueDays = task.due ? daysUntil(task.due, now) : null;
  return (
    <div className="flex items-center gap-2.5 py-1.5">
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        className={`font-grotesk text-base ${task.done ? "text-fmaccent" : "text-fmmuted"}`}
      >
        {task.done ? "☑" : "☐"}
      </button>
      <span className={`flex-1 font-grotesk text-sm ${task.done ? "text-fmmuted line-through" : "text-fmfg"}`}>{task.label}</span>
      <span className="font-mono text-[10.5px] text-fmmuted">
        {task.owner}
        {task.due ? ` · ${task.due}${late ? " retard" : !task.done && (dueDays ?? 0) >= 0 ? ` · J-${dueDays}` : ""}` : ""}
      </span>
      <button type="button" onClick={() => onDelete(task.id)} title="Supprimer" className="px-0.5 text-fmmuted hover:text-[#ff4d5e]">
        ✕
      </button>
    </div>
  );
}

interface TaskGroupListProps {
  tasks: OsTask[];
  graph: Pick<OsGraph, "projects" | "identities">;
  now: Date;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/** Groupé par projet (ou "Général") — porte la boucle Object.entries(groups) de RENDER.taches. */
export function TaskGroupList({ tasks, graph, now, onToggle, onDelete }: TaskGroupListProps) {
  const groups = new Map<string, OsTask[]>();
  for (const t of tasks) {
    const key = t.project || "_general";
    groups.set(key, [...(groups.get(key) || []), t]);
  }

  return (
    <div className="flex flex-col gap-5">
      {Array.from(groups.entries()).map(([key, group]) => {
        const entity = key === "_general" ? null : graph.projects.find((p) => p.id === key) || graph.identities.find((i) => i.id === key);
        const openCount = group.filter((t) => !t.done).length;
        const sorted = [...group].sort((a, b) => Number(a.done) - Number(b.done));
        return (
          <div key={key}>
            <h2 className="mb-2 font-grotesk text-xs uppercase tracking-[0.12em] text-fmmuted">
              {entity?.name ?? "Général"} — {openCount} ouverte(s) / {group.length}
            </h2>
            <Card>
              {sorted.map((t) => (
                <TaskRow key={t.id} task={t} now={now} onToggle={onToggle} onDelete={onDelete} />
              ))}
            </Card>
          </div>
        );
      })}
    </div>
  );
}
