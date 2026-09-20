"use client";

import { useState } from "react";
import { CONFIDENCE_LABEL, checkinFreshness, objectiveConfidence } from "@/lib/os/okr";
import type { OsOkr } from "@/lib/os/types";

const TONE: Record<1 | 2 | 3, string> = {
  1: "#ff4d5e",
  2: "#d9a441",
  3: "var(--color-fmaccent)",
};

/** Trois crans de confiance, lisibles sans couleur grâce au libellé porté en `title` et en texte. */
function ConfidenceBars({ level, onPick }: { level: 1 | 2 | 3 | null; onPick?: (v: 1 | 2 | 3) => void }) {
  return (
    <span className="inline-flex items-center gap-1" title={level ? CONFIDENCE_LABEL[level] : "confiance non déclarée"}>
      {([1, 2, 3] as const).map((v) => (
        <button
          key={v}
          type="button"
          disabled={!onPick}
          aria-label={CONFIDENCE_LABEL[v]}
          onClick={() => onPick?.(v)}
          className={`h-1.5 w-4 rounded-sm ${onPick ? "cursor-pointer" : "cursor-default"}`}
          style={{ background: level && v <= level ? TONE[level] : "var(--color-fmmutedbg)" }}
        />
      ))}
    </span>
  );
}

/**
 * Point de suivi d'un objectif. La confiance passe devant la progression : savoir qu'un résultat
 * est à moitié fait compte moins que savoir si on croit encore l'atteindre.
 */
export function OkrCheckin({
  okr,
  now,
  onCheckin,
}: {
  okr: OsOkr;
  now: Date;
  onCheckin: (confidence: 1 | 2 | 3, note: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [confidence, setConfidence] = useState<1 | 2 | 3>(objectiveConfidence(okr) ?? 2);
  const [note, setNote] = useState("");

  const fresh = checkinFreshness(okr, now);
  const level = objectiveConfidence(okr);

  if (open) {
    return (
      <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-fmborder pt-3">
        <span className="font-grotesk text-[11px] text-fmmuted">Confiance</span>
        <ConfidenceBars level={confidence} onPick={setConfidence} />
        <span className="font-grotesk text-[11px] text-fmfg">{CONFIDENCE_LABEL[confidence]}</span>
        <input
          className="min-w-48 flex-1 rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
          placeholder="Ce qui a changé depuis le dernier point…"
          value={note}
          autoFocus
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onCheckin(confidence, note.trim());
              setNote("");
              setOpen(false);
            }
          }}
        />
        <button
          type="button"
          className="fm-link font-grotesk text-xs text-fmaccent"
          onClick={() => {
            onCheckin(confidence, note.trim());
            setNote("");
            setOpen(false);
          }}
        >
          Enregistrer
        </button>
        <button type="button" className="fm-link font-grotesk text-xs text-fmmuted" onClick={() => setOpen(false)}>
          Annuler
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-fmborder pt-3 font-grotesk text-[11px]">
      <ConfidenceBars level={level} />
      <span className={level ? "text-fmfg" : "text-fmmuted"}>
        {level ? CONFIDENCE_LABEL[level] : "confiance non déclarée"}
      </span>
      <span className={fresh.stale ? "text-[#d9a441]" : "text-fmmuted"}>
        {fresh.days === null
          ? "aucun point de suivi"
          : fresh.days === 0
            ? "point fait aujourd'hui"
            : `dernier point il y a ${fresh.days} j`}
      </span>
      {fresh.last?.note && <span className="text-fmmuted">« {fresh.last.note} »</span>}
      <button type="button" className="fm-link ml-auto text-xs text-fmaccent" onClick={() => setOpen(true)}>
        Point de suivi
      </button>
    </div>
  );
}
