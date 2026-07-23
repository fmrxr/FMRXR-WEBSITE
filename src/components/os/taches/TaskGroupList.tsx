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
  const hasMeta = task.owner || task.due;
  return (
    <div className="flex items-start gap-2.5 py-2">
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 shrink-0 font-grotesk text-base leading-none ${task.done ? "text-fmaccent" : "text-fmmuted"}`}
      >
        {task.done ? "☑" : "☐"}
      </button>
      <div className="min-w-0 flex-1">
        <div className={`font-grotesk text-sm ${task.done ? "text-fmmuted line-through" : "text-fmfg"}`}>{task.label}</div>
        {hasMeta && (
          <div className="mt-0.5 font-mono text-[10.5px] text-fmmuted">
            {task.owner}
            {task.due ? `${task.owner ? " · " : ""}${task.due}${late ? " retard" : !task.done && (dueDays ?? 0) >= 0 ? ` · J-${dueDays}` : ""}` : ""}
          </div>
        )}
      </div>
      <button type="button" onClick={() => onDelete(task.id)} title="Supprimer" className="shrink-0 px-0.5 text-fmmuted hover:text-[#ff4d5e]">
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
