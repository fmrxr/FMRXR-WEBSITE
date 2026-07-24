"use client";

import { useState } from "react";
import { ASSET_KIND_LABELS } from "@/lib/os/compute";
import type { AssetKind, OsAsset, OsProject } from "@/lib/os/types";

export interface AssetDraft {
  name: string;
  kind?: AssetKind;
  file?: string;
  url?: string;
  project?: string;
  status?: string;
  notes?: string;
}

interface AddAssetFormProps {
  projects: OsProject[];
  initial?: OsAsset;
  onSave: (draft: AssetDraft) => void;
  onCancel: () => void;
}

/** Formulaire d'ajout/modification d'asset — porte assetAdd()/assetEdit() du monolithe. */
export function AddAssetForm({ projects, initial, onSave, onCancel }: AddAssetFormProps) {
  const [name, setName] = useState(initial?.name || "");
  const [kind, setKind] = useState(initial?.kind || "design");
  const [locationType, setLocationType] = useState<"file" | "url">(initial?.url ? "url" : "file");
  const [location, setLocation] = useState(initial?.url || initial?.file || "");
  const [project, setProject] = useState(initial?.project || "");
  const [status, setStatus] = useState(initial?.status || "");
  const [notes, setNotes] = useState(initial?.notes || "");

  function submit() {
    if (!name.trim()) {
      alert("Nom requis.");
      return;
    }
    onSave({
      name: name.trim(),
      kind: kind || undefined,
      file: locationType === "file" ? location.trim() || undefined : undefined,
      url: locationType === "url" ? location.trim() || undefined : undefined,
      project: project || undefined,
      status: status.trim() || undefined,
      notes: notes.trim() || undefined,
    });
  }

  return (
    <div className="fm-glass-card flex flex-col gap-3 rounded-2xl p-5">
      <h2 className="font-grotesk text-sm font-semibold text-fmfg">{initial ? "Modifier l'asset" : "Ajouter un asset"}</h2>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Nom</label>
          <input
            className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder="ex : Maquette Affiche — VZ × CALYPSO"
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Type</label>
          <input
            className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            list="asset-kinds"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
          />
          <datalist id="asset-kinds">
            {ASSET_KIND_LABELS.map(([k, label]) => (
              <option key={String(k)} value={String(k)}>
                {label}
              </option>
            ))}
          </datalist>
        </div>
      </div>

      <div>
        <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Emplacement</label>
        <div className="flex items-center gap-2">
          <select
            className="rounded border border-fmborder bg-fmmutedbg px-2 py-1.5 font-grotesk text-sm text-fmfg"
            value={locationType}
            onChange={(e) => setLocationType(e.target.value as "file" | "url")}
          >
            <option value="file">fichier local</option>
            <option value="url">lien externe</option>
          </select>
          <input
            className="flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-mono text-xs text-fmfg"
            placeholder={locationType === "url" ? "https://…" : "ex : Content Calypso/affiche.pdf"}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Projet (optionnel)</label>
          <select
            className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          >
            <option value="">— aucun —</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Statut (optionnel)</label>
          <input
            className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder="ex : proposal, validé…"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Notes (optionnel)</label>
        <textarea
          className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <button type="button" onClick={submit} className="rounded-lg border border-fmaccent/40 px-4 py-1.5 font-grotesk text-sm text-fmaccent hover:bg-fmaccent/10">
          {initial ? "Enregistrer" : "Ajouter"}
        </button>
        <button type="button" onClick={onCancel} className="fm-link font-grotesk text-sm text-fmmuted">
          Annuler
        </button>
      </div>
    </div>
  );
}
