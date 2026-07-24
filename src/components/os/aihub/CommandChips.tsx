"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/os/clipboard";

const COMMANDS: [string, string][] = [
  ["sync os", "synchronise le journal avec la mémoire"],
  ["audit de l'os", "nouvel audit complet + correctifs"],
  ["run le BDM", "session biz dev à la demande"],
  ["génère les captions IG [projet]", "skill social-publish"],
  ["facture pour [client]", "génère une facture native (module Finance)"],
  ["relance [client]", "mail de relance prêt à envoyer"],
];

/** Commandes prêtes à dire à Claude — clic = copier. Porte le bloc CMDS de RENDER.aihub. */
export function CommandChips() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  async function copy(cmd: string, idx: number) {
    if (await copyToClipboard(cmd)) {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx((c) => (c === idx ? null : c)), 1200);
    }
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {COMMANDS.map(([cmd, desc], idx) => (
        <button
          key={cmd}
          type="button"
          title={desc}
          onClick={() => copy(cmd, idx)}
          className="rounded-full border border-fmborder px-3 py-1 font-grotesk text-xs text-fmmuted hover:border-fmaccent/40 hover:text-fmfg"
        >
          {copiedIdx === idx ? "copié ✓" : cmd}
        </button>
      ))}
    </div>
  );
}
