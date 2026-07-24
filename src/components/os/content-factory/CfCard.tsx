"use client";

import type { OsCfBatch } from "@/lib/os/types";

interface CfCardProps {
  batch: OsCfBatch;
  projectName?: string;
  canGoBack: boolean;
  canGoForward: boolean;
  onMove: (id: string, dir: 1 | -1) => void;
  onDelete: (id: string) => void;
}

/** Carte lot draggable + boutons ◀▶ (fallback tactile) — porte le rendu de cfPipelineBlock(). */
export function CfCard({ batch, projectName, canGoBack, canGoForward, onMove, onDelete }: CfCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", batch.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      className="fm-glass-card cursor-grab rounded-xl p-3 active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="font-grotesk text-[13px] font-medium leading-snug text-fmfg">{batch.name}</div>
        <button type="button" onClick={() => onDelete(batch.id)} title="Supprimer" className="shrink-0 text-fmmuted hover:text-[#ff4d5e]">
          ✕
        </button>
      </div>
      {batch.note && <div className="mt-1 font-grotesk text-xs text-fmmuted">{batch.note}</div>}
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {batch.source && <span className="rounded-full border border-fmborder px-2 py-0.5 font-grotesk text-[10px] text-fmmuted">{batch.source}</span>}
        {projectName && <span className="rounded-full border border-fmborder px-2 py-0.5 font-grotesk text-[10px] text-fmmuted">{projectName}</span>}
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <button
          type="button"
          disabled={!canGoBack}
          onClick={() => onMove(batch.id, -1)}
          title="Étape précédente"
          className="rounded border border-fmborder px-2 py-0.5 font-grotesk text-[10px] text-fmmuted hover:border-fmaccent/40 hover:text-fmfg disabled:opacity-30"
        >
          ← précédent
        </button>
        <button
          type="button"
          disabled={!canGoForward}
          onClick={() => onMove(batch.id, 1)}
          title="Étape suivante"
          className="rounded border border-fmborder px-2 py-0.5 font-grotesk text-[10px] text-fmmuted hover:border-fmaccent/40 hover:text-fmfg disabled:opacity-30"
        >
          suivant →
        </button>
      </div>
    </div>
  );
}
