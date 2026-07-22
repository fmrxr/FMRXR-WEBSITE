"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { OsGraph, OsProject, ProjectStatus } from "@/lib/os/types";

const COLUMNS: { status: ProjectStatus; label: string }[] = [
  { status: "active", label: "En cours" },
  { status: "delivered", label: "Livrés" },
  { status: "archived", label: "Archives" },
];

interface KanbanBoardProps {
  projects: OsProject[];
  graph: Pick<OsGraph, "identities" | "clients" | "deadlines" | "finance" | "quotes" | "assets">;
  now: Date;
  onDropStatus: (projectId: string, status: ProjectStatus) => void;
}

/** 3 colonnes glisser-déposer natif HTML5 — porte pKanban()/pDrop() du monolithe. */
export function KanbanBoard({ projects, graph, now, onDropStatus }: KanbanBoardProps) {
  const [overColumn, setOverColumn] = useState<ProjectStatus | null>(null);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {COLUMNS.map(({ status, label }) => {
        const items = projects.filter((p) => p.status === status);
        return (
          <div
            key={status}
            onDragOver={(e) => {
              e.preventDefault();
              setOverColumn(status);
            }}
            onDragLeave={() => setOverColumn((c) => (c === status ? null : c))}
            onDrop={(e) => {
              e.preventDefault();
              setOverColumn(null);
              const id = e.dataTransfer.getData("text/plain");
              if (id) onDropStatus(id, status);
            }}
            className={`flex min-h-[200px] flex-col gap-2.5 rounded-2xl border p-3 transition-colors ${
              overColumn === status ? "border-fmaccent/50 bg-fmaccent/5" : "border-fmborder bg-fmmutedbg/40"
            }`}
          >
            <div className="flex items-center justify-between px-1 font-grotesk text-xs uppercase tracking-[0.12em] text-fmmuted">
              <span>{label}</span>
              <span>{items.length}</span>
            </div>
            {items.length === 0 ? (
              <div className="rounded-xl border border-dashed border-fmborder p-4 text-center font-grotesk text-xs text-fmmuted">
                déposer ici
              </div>
            ) : (
              items.map((p) => <ProjectCard key={p.id} project={p} graph={graph} now={now} />)
            )}
          </div>
        );
      })}
    </div>
  );
}
