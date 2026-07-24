"use client";

import { useState } from "react";
import { CfCard } from "./CfCard";
import { CF_STAGES, cfAdjacentStage, cfSummary } from "@/lib/os/compute";
import type { OsCfBatch, OsGraph } from "@/lib/os/types";

interface CfBoardProps {
  batches: OsCfBatch[];
  graph: Pick<OsGraph, "projects">;
  onSetStage: (id: string, stage: OsCfBatch["stage"]) => void;
  onDelete: (id: string) => void;
}

/** Kanban 5 étapes glisser-déposer + résumé — porte cfPipelineBlock()/cfAdvance() du monolithe. */
export function CfBoard({ batches, graph, onSetStage, onDelete }: CfBoardProps) {
  const [overStage, setOverStage] = useState<OsCfBatch["stage"] | null>(null);
  const summary = cfSummary(batches);
  const projectName = (id?: string) => (id ? graph.projects.find((p) => p.id === id)?.name : undefined);

  function move(id: string, dir: 1 | -1) {
    const b = batches.find((x) => x.id === id);
    if (!b) return;
    const next = cfAdjacentStage(b.stage, dir);
    if (next) onSetStage(id, next);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="fm-glass-card flex items-center gap-1 rounded-2xl p-3">
        {CF_STAGES.map((s) => {
          const count = summary.counts[s.key] || 0;
          return (
            <div key={s.key} className="flex-1 text-center">
              <div className={`h-1.5 rounded-full ${count ? "bg-[#ff4d5e]" : "bg-white/[.07]"}`} />
              <div className="mt-1.5 font-grotesk text-[9.5px] text-fmmuted">
                {s.label.split(" (")[0]}
                <br />
                <b className="text-fmfg">{count}</b>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {CF_STAGES.map(({ key, label }) => {
          const items = batches.filter((b) => b.stage === key);
          return (
            <div
              key={key}
              onDragOver={(e) => {
                e.preventDefault();
                setOverStage(key);
              }}
              onDragLeave={() => setOverStage((c) => (c === key ? null : c))}
              onDrop={(e) => {
                e.preventDefault();
                setOverStage(null);
                const id = e.dataTransfer.getData("text/plain");
                if (id) onSetStage(id, key);
              }}
              className={`flex min-h-[160px] flex-col gap-2.5 rounded-2xl border p-3 transition-colors ${
                overStage === key ? "border-fmaccent/50 bg-fmaccent/5" : "border-fmborder bg-fmmutedbg/40"
              }`}
            >
              <div className="flex items-center justify-between px-1 font-grotesk text-xs uppercase tracking-[0.12em] text-fmmuted">
                <span>{label.split(" (")[0]}</span>
                <span>{items.length}</span>
              </div>
              {items.length === 0 ? (
                <div className="rounded-xl border border-dashed border-fmborder p-4 text-center font-grotesk text-xs text-fmmuted">déposer ici</div>
              ) : (
                items.map((b) => (
                  <CfCard
                    key={b.id}
                    batch={b}
                    projectName={projectName(b.project)}
                    canGoBack={cfAdjacentStage(b.stage, -1) !== null}
                    canGoForward={cfAdjacentStage(b.stage, 1) !== null}
                    onMove={move}
                    onDelete={onDelete}
                  />
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
