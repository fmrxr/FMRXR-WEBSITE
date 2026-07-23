"use client";

import { useState } from "react";
import { Card } from "../Card";
import { Badge } from "../Badge";
import { okrKrProgress, okrKrValue, okrObjectiveProgress } from "@/lib/os/compute";
import type { OsGraph, OsOkr } from "@/lib/os/types";

function progressTone(pct: number): "accent" | "warn" | "danger" {
  if (pct >= 70) return "accent";
  if (pct >= 40) return "warn";
  return "danger";
}

function KrRow({
  krId,
  label,
  target,
  unit,
  auto,
  value,
  progress,
  onSetValue,
}: {
  krId: string;
  label: string;
  target: number;
  unit?: string;
  auto?: string;
  value: number;
  progress: number;
  onSetValue: (krId: string, value: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));

  if (editing) {
    return (
      <div className="flex items-center gap-2 py-1">
        <span className="flex-1 font-grotesk text-[11.5px] text-fmfg">{label}</span>
        <input
          className="w-24 rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
          type="number"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const n = parseFloat(draft);
              if (!Number.isNaN(n)) onSetValue(krId, n);
              setEditing(false);
            }
            if (e.key === "Escape") setEditing(false);
          }}
        />
        <button
          type="button"
          className="fm-link font-grotesk text-xs text-fmaccent"
          onClick={() => {
            const n = parseFloat(draft);
            if (!Number.isNaN(n)) onSetValue(krId, n);
            setEditing(false);
          }}
        >
          ✓
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2.5 py-1 ${auto ? "" : "cursor-pointer"}`}
      onClick={() => {
        if (!auto) setEditing(true);
      }}
    >
      <span className="flex-1 font-grotesk text-[11.5px] text-fmfg">
        {label} {auto ? <Badge tone="primary">auto</Badge> : <span className="text-fmmuted">✎</span>}
      </span>
      <div className="h-1.5 w-28 rounded-full bg-fmmutedbg">
        <div
          className="h-full rounded-full"
          style={{ width: `${progress}%`, background: progress >= 100 ? "var(--color-fmaccent)" : "var(--color-fmprimary)" }}
        />
      </div>
      <span className="w-32 text-right font-mono text-[10.5px] text-fmmuted">
        {Math.round(value).toLocaleString("fr-FR")} / {target.toLocaleString("fr-FR")} {unit || ""}
      </span>
    </div>
  );
}

interface OkrObjectiveCardProps {
  okr: OsOkr;
  graph: Pick<OsGraph, "finance">;
  identityName?: string;
  now: Date;
  onAddKr: (label: string, target: number, unit: string) => void;
  onSetKrValue: (krId: string, value: number) => void;
  onDelete: () => void;
}

export function OkrObjectiveCard({ okr, graph, identityName, now, onAddKr, onSetKrValue, onDelete }: OkrObjectiveCardProps) {
  const [addingKr, setAddingKr] = useState(false);
  const [label, setLabel] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");

  const pct = okrObjectiveProgress(okr, graph, now);

  function submitKr() {
    const t = parseFloat(target);
    if (!label.trim() || Number.isNaN(t)) return;
    onAddKr(label.trim(), t, unit.trim());
    setLabel("");
    setTarget("");
    setUnit("");
    setAddingKr(false);
  }

  return (
    <Card className="mb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2 font-grotesk text-xs text-fmmuted">
            {identityName ? <Badge>{identityName}</Badge> : null}
            {okr.quarter}
          </div>
          <div className="font-grotesk text-[14.5px] font-semibold text-fmfg">{okr.objective}</div>
        </div>
        <div className={`font-display text-lg md:text-xl ${progressTone(pct) === "accent" ? "text-fmaccent" : progressTone(pct) === "warn" ? "text-[#d9a441]" : "text-[#ff4d5e]"}`}>
          {Math.round(pct)} %
        </div>
      </div>

      <div className="my-3 h-1.5 rounded-full bg-fmmutedbg">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: pct >= 70 ? "var(--color-fmaccent)" : "#ff4d5e" }}
        />
      </div>

      {(okr.krs || []).map((kr) => (
        <KrRow
          key={kr.id}
          krId={kr.id}
          label={kr.label}
          target={kr.target}
          unit={kr.unit}
          auto={kr.auto}
          value={okrKrValue(kr, graph, now)}
          progress={okrKrProgress(kr, graph, now)}
          onSetValue={onSetKrValue}
        />
      ))}

      {addingKr ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input
            className="flex-1 rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
            placeholder="Résultat clé (mesurable)"
            value={label}
            autoFocus
            onChange={(e) => setLabel(e.target.value)}
          />
          <input
            className="w-24 rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
            placeholder="Cible"
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
          <input
            className="w-24 rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
            placeholder="Unité"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
          <button type="button" className="fm-link font-grotesk text-xs text-fmaccent" onClick={submitKr}>
            Ajouter
          </button>
          <button type="button" className="fm-link font-grotesk text-xs text-fmmuted" onClick={() => setAddingKr(false)}>
            Annuler
          </button>
        </div>
      ) : (
        <div className="mt-3 flex gap-4">
          <button type="button" className="fm-link font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted" onClick={() => setAddingKr(true)}>
            + résultat clé
          </button>
          <button type="button" className="fm-link font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted" onClick={onDelete}>
            supprimer
          </button>
        </div>
      )}
    </Card>
  );
}
