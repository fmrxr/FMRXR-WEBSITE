"use client";

import { useState } from "react";
import { LIBRARY_CATEGORIES } from "@/lib/os/compute";
import type { LibraryItemType, OsLibraryItem, OsProject } from "@/lib/os/types";

const LIB_PHASES = ["OUVERTURE", "INFILTRATION", "PEAK TIME", "DÉCÉLÉRATION", "TRANSVERSAL"];

const TYPE_OPTIONS: { value: LibraryItemType; label: string }[] = [
  { value: "prompt", label: "Prompt (SD/Deforum)" },
  { value: "preset", label: "Preset (animation)" },
  { value: "asset", label: "Asset (fichier)" },
  { value: "doc", label: "Document / note" },
  { value: "link", label: "Lien" },
  { value: "other", label: "Autre" },
];

interface AddLibraryItemFormProps {
  projects: OsProject[];
  onAdd: (item: Omit<OsLibraryItem, "id" | "favorite" | "created">) => void;
  onCancel: () => void;
}

/** Formulaire d'ajout — porte libAdd()/libTypeChange()/libSave() de RENDER.stack. */
export function AddLibraryItemForm({ projects, onAdd, onCancel }: AddLibraryItemFormProps) {
  const [type, setType] = useState<LibraryItemType>("prompt");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("AI");
  const [subcategory, setSubcategory] = useState("");
  const [project, setProject] = useState("");
  const [tags, setTags] = useState("");
  const [engine, setEngine] = useState("");
  const [phase, setPhase] = useState("");
  const [prompt, setPrompt] = useState("");
  const [negative, setNegative] = useState("");
  const [settings, setSettings] = useState("");
  const [notes, setNotes] = useState("");
  const [fileRef, setFileRef] = useState("");
  const [content, setContent] = useState("");

  function submit() {
    if (!title.trim()) {
      alert("Titre requis.");
      return;
    }
    const base = {
      title: title.trim(),
      type,
      category: category || null,
      subcategory: subcategory.trim() || null,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      used_in: project ? [project] : [],
      source: "manuel",
    };
    if (type === "prompt") {
      onAdd({ ...base, content: { prompt, negative: negative || undefined, phase: phase || undefined, engine: engine || undefined } });
    } else if (type === "preset") {
      onAdd({ ...base, content: { settings, notes: notes || undefined, engine: engine || undefined } });
    } else if (type === "asset" || type === "link") {
      onAdd({ ...base, file_ref: fileRef || null });
    } else {
      onAdd({ ...base, content: content || null });
    }
  }

  return (
    <div className="fm-glass-card flex flex-col gap-3 rounded-2xl p-5">
      <h2 className="font-grotesk text-sm font-semibold text-fmfg">Ajouter à la bibliothèque</h2>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Type</label>
          <select
            className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            value={type}
            onChange={(e) => setType(e.target.value as LibraryItemType)}
          >
            {TYPE_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Titre</label>
          <input
            className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder="ex : PEAK · Laser rain"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Catégorie</label>
          <select
            className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {LIBRARY_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Sous-catégorie (libre)</label>
          <input
            className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder="ex : Prompt Library"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Lié à un projet (optionnel)</label>
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

      {type === "prompt" && (
        <>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Moteur</label>
              <input
                className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
                placeholder="SD txt2img, Deforum…"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Phase / usage (optionnel)</label>
              <select
                className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
              >
                <option value="">— optionnel —</option>
                {LIB_PHASES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Prompt</label>
            <textarea
              className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Negative prompt</label>
            <textarea
              className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
              rows={2}
              value={negative}
              onChange={(e) => setNegative(e.target.value)}
            />
          </div>
        </>
      )}

      {type === "preset" && (
        <>
          <div>
            <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Moteur</label>
            <input
              className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
              placeholder="Deforum, A1111…"
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Réglages (un paramètre par ligne)</label>
            <textarea
              className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-mono text-xs text-fmfg"
              rows={5}
              value={settings}
              onChange={(e) => setSettings(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Notes</label>
            <textarea
              className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </>
      )}

      {(type === "asset" || type === "link") && (
        <div>
          <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">{type === "link" ? "URL" : "Chemin du fichier"}</label>
          <input
            className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder={type === "link" ? "https://…" : "ex : ASSETS/mood-board.pdf"}
            value={fileRef}
            onChange={(e) => setFileRef(e.target.value)}
          />
        </div>
      )}

      {(type === "doc" || type === "other") && (
        <div>
          <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Contenu / note</label>
          <textarea
            className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      )}

      <div>
        <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Tags (séparés par des virgules)</label>
        <input
          className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          placeholder="liminal, rouge, loop"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <button type="button" onClick={submit} className="rounded-lg border border-fmaccent/40 px-4 py-1.5 font-grotesk text-sm text-fmaccent hover:bg-fmaccent/10">
          Ajouter
        </button>
        <button type="button" onClick={onCancel} className="fm-link font-grotesk text-sm text-fmmuted">
          Annuler
        </button>
      </div>
    </div>
  );
}
