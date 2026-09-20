"use client";

import { useState } from "react";
import { Card } from "../Card";
import { Badge } from "../Badge";
import { krAutoLabel, okrKrProgress, okrKrTarget, okrKrValue, okrObjectiveProgress } from "@/lib/os/compute";
import { quarterProgress } from "@/lib/os/today";
import type { OsGraph, OsOkr } from "@/lib/os/types";

/**
 * Le ton se juge par rapport au temps écoulé du trimestre, pas dans l'absolu.
 *
 * En doctrine OKR, atteindre 70 à 80 % d'un résultat clé ambitieux est le succès attendu : peindre
 * 60 % en rouge apprend à se fixer des cibles molles au trimestre suivant. Un objectif n'est donc
 * en alerte que s'il décroche nettement du rythme, et le rouge est réservé à ce décrochage.
 */
function paceTone(pct: number, elapsedPct: number): "accent" | "warn" | "danger" {
  const pace = pct - elapsedPct;
  if (pace >= 0 || pct >= 70) return "accent";
  if (pace > -20) return "warn";
  return "danger";
}

const TONE_COLOR: Record<"accent" | "warn" | "danger", string> = {
  accent: "var(--color-fmaccent)",
  warn: "#d9a441",
  danger: "#ff4d5e",
};

const TONE_TEXT: Record<"accent" | "warn" | "danger", string> = {
  accent: "text-fmaccent",
  warn: "text-[#d9a441]",
  danger: "text-[#ff4d5e]",
};

/** Trait vertical du temps écoulé : une barre qui le dépasse est en avance. */
function PaceMarker({ elapsedPct }: { elapsedPct: number }) {
  return (
    <span
      title="Position du trimestre écoulé"
      className="absolute -top-1 bottom-[-4px] w-px bg-fmmuted/70"
      style={{ left: `${elapsedPct}%` }}
    />
  );
}

function KrRow({
  krId,
  label,
  target,
  unit,
  auto,
  value,
  progress,
  elapsedPct,
  onSetValue,
}: {
  krId: string;
  label: string;
  target: number;
  unit?: string;
  auto?: string | null;
  value: number;
  progress: number;
  elapsedPct: number;
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
        {label}{" "}
        {auto ? (
          <Badge tone="primary" className="ml-1" >{auto}</Badge>
        ) : (
          <span className="text-fmmuted" title="Valeur saisie à la main, à tenir à jour">✎</span>
        )}
      </span>
      <div className="relative h-1.5 w-28 rounded-full bg-fmmutedbg">
        <div
          className="h-full rounded-full"
          style={{
            width: `${Math.min(100, progress)}%`,
            background: TONE_COLOR[paceTone(progress, elapsedPct)],
          }}
        />
        <PaceMarker elapsedPct={elapsedPct} />
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
  const { elapsedPct } = quarterProgress(now);
  const tone = paceTone(pct, elapsedPct);

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
        <div className={`font-display text-lg md:text-xl ${TONE_TEXT[tone]}`}>
          {Math.round(pct)} %
          <span className="ml-2 font-grotesk text-[11px] text-fmmuted">
            {pct - elapsedPct >= 0 ? "+" : ""}
            {Math.round(pct - elapsedPct)} pts
          </span>
        </div>
      </div>

      <div className="relative my-3 h-1.5 rounded-full bg-fmmutedbg">
        <div className="h-full rounded-full" style={{ width: `${Math.min(100, pct)}%`, background: TONE_COLOR[tone] }} />
        <PaceMarker elapsedPct={elapsedPct} />
      </div>

      {(okr.krs || []).map((kr) => (
        <KrRow
          key={kr.id}
          krId={kr.id}
          label={kr.label}
          unit={kr.unit}
          auto={krAutoLabel(kr)}
          value={okrKrValue(kr, graph, now)}
          target={okrKrTarget(kr, graph)}
          progress={okrKrProgress(kr, graph, now)}
          elapsedPct={elapsedPct}
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
