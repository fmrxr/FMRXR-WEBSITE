"use client";

import { useState } from "react";
import { useOs } from "@/lib/os/store";
import { LIBRARY_CATEGORIES, libraryByCategory, libraryCategoryCounts, libraryTriage } from "@/lib/os/compute";
import { LibraryItemCard } from "@/components/os/stack/LibraryItemCard";
import { TriageInbox } from "@/components/os/stack/TriageInbox";
import { AddLibraryItemForm } from "@/components/os/stack/AddLibraryItemForm";
import { Section } from "@/components/os/Section";
import { genId } from "@/lib/os/id";
import type { OsLibraryItem } from "@/lib/os/types";

export default function KnowledgePage() {
  const { graph, loading, error, mutate, logChange } = useOs();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  const library = graph.library || [];
  const triage = libraryTriage(library);
  const counts = libraryCategoryCounts(library);
  const categories = activeCategory ? [activeCategory] : LIBRARY_CATEGORIES;

  function toggleFavorite(id: string) {
    mutate((draft) => {
      const item = (draft.library || []).find((i) => i.id === id);
      if (item) item.favorite = !item.favorite;
    });
  }

  function deleteItem(id: string) {
    const item = library.find((i) => i.id === id);
    if (!item) return;
    if (!confirm(`Retirer « ${item.title} » de la bibliothèque ?`)) return;
    mutate((draft) => {
      draft.trash = draft.trash || [];
      draft.trash.unshift({ ts: new Date().toISOString(), kind: "library", data: item });
      draft.library = (draft.library || []).filter((i) => i.id !== id);
    });
    logChange("delete", id, `item bibliothèque retiré : ${item.title}`, { entityType: "library", snapshot: item });
  }

  function classify(id: string, category: string, subcategory: string) {
    const before = library.find((i) => i.id === id);
    if (!before) return;
    mutate((draft) => {
      const item = (draft.library || []).find((i) => i.id === id);
      if (!item) return;
      item.category = category;
      if (subcategory) item.subcategory = subcategory;
    });
    const after = { ...before, category, ...(subcategory ? { subcategory } : {}) };
    logChange("update", id, `item classé : ${before.title} → ${category}${subcategory ? ` / ${subcategory}` : ""}`, {
      entityType: "library",
      snapshot: { before, after },
    });
  }

  function addItem(fields: Omit<OsLibraryItem, "id" | "favorite" | "created">) {
    const id = genId("lib");
    const created = { id, favorite: false, created: new Date().toISOString(), ...fields };
    mutate((draft) => {
      draft.library = draft.library || [];
      draft.library.unshift(created);
    });
    logChange("create", id, `item bibliothèque ajouté : ${fields.title}`, { entityType: "library", snapshot: created });
    setAdding(false);
  }

  return (
    <div className="fm-rise flex flex-col gap-6">
      {adding ? (
        <AddLibraryItemForm projects={graph.projects} onAdd={addItem} onCancel={() => setAdding(false)} />
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-sm text-fmfg hover:border-fmaccent/40"
          >
            + Ajouter
          </button>
          <input
            className="min-w-[200px] flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder="Chercher (titre, tags, contenu)…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {LIBRARY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory((c) => (c === cat ? null : cat))}
              className={`rounded-full border px-3 py-1 font-grotesk text-xs ${
                activeCategory === cat ? "border-fmaccent text-fmaccent" : "border-fmborder text-fmmuted hover:border-fmaccent/40"
              }`}
            >
              {cat} · {counts[cat] || 0}
            </button>
          ))}
          <span className="flex-1" />
          <span className="rounded-full border border-fmborder px-2.5 py-1 font-grotesk text-xs text-fmmuted">{library.length} item(s)</span>
        </div>
      )}

      <TriageInbox items={triage} onClassify={classify} />

      {categories.map((cat) => {
        const items = libraryByCategory(library, cat, query);
        if (items.length === 0) return null;
        return (
          <Section key={cat} id={`knowledge-cat-${cat}`} title={`${cat} — ${items.length}`}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <LibraryItemCard key={item.id} item={item} onToggleFavorite={toggleFavorite} onDelete={deleteItem} />
              ))}
            </div>
          </Section>
        );
      })}

      {library.length === 0 && <p className="font-grotesk text-sm text-fmmuted">Aucun item classé ne correspond.</p>}
    </div>
  );
}
