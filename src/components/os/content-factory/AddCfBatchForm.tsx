"use client";

import { useState } from "react";
import type { OsProject } from "@/lib/os/types";

export interface CfBatchDraft {
  name: string;
  source?: string;
  project?: string;
  note?: string;
}

interface AddCfBatchFormProps {
  projects: OsProject[];
  onAdd: (draft: CfBatchDraft) => void;
  onCancel: () => void;
}

/** Formulaire nouveau lot — entre toujours en "attente de la source". */
export function AddCfBatchForm({ projects, onAdd, onCancel }: AddCfBatchFormProps) {
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [project, setProject] = useState("");
  const [note, setNote] = useState("");

  function submit() {
    if (!name.trim()) {
      alert("Nom du lot requis.");
      return;
    }
    onAdd({ name: name.trim(), source: source.trim() || undefined, project: project || undefined, note: note.trim() || undefined });
  }

  return (
    <div className="fm-glass-card flex flex-wrap items-center gap-2 rounded-2xl p-4">
      <input
        className="min-w-[200px] flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
        placeholder="ex : Set 4 — Backstage (DJ set)"
        value={name}
        autoFocus
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-48 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
        placeholder="Source (ex : Disque dur Sofi)"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select
        className="rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
        value={project}
        onChange={(e) => setProject(e.target.value)}
      >
        <option value="">— aucun projet —</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <input
        className="min-w-[180px] flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
        placeholder="Note (optionnel)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button type="button" className="fm-link font-grotesk text-sm text-fmaccent" onClick={submit}>
        Ajouter au pipeline
      </button>
      <button type="button" className="fm-link font-grotesk text-sm text-fmmuted" onClick={onCancel}>
        Annuler
      </button>
    </div>
  );
}
