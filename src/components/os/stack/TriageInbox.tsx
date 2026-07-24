"use client";

import { useState } from "react";
import { Section } from "../Section";
import { LIBRARY_CATEGORIES } from "@/lib/os/compute";
import type { OsLibraryItem } from "@/lib/os/types";

interface TriageRowProps {
  item: OsLibraryItem;
  onClassify: (id: string, category: string, subcategory: string) => void;
}

function TriageRow({ item, onClassify }: TriageRowProps) {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  return (
    <div className="flex flex-wrap items-start gap-2 border-b border-fmborder py-2.5 last:border-0">
      <div className="min-w-[160px] flex-1">
        <div className="font-grotesk text-sm font-medium text-fmfg">{item.title}</div>
        <div className="font-grotesk text-[10px] text-fmmuted">
          {item.type}
          {item.source ? ` · ${item.source}` : ""}
        </div>
      </div>
      <select
        className="rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">— catégorie —</option>
        {LIBRARY_CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        className="w-36 rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
        placeholder="sous-catégorie (libre)"
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
      />
      <button
        type="button"
        disabled={!category}
        onClick={() => onClassify(item.id, category, subcategory)}
        className="rounded border border-fmborder px-2.5 py-1 font-grotesk text-xs text-fmmuted hover:border-fmaccent/40 hover:text-fmfg disabled:opacity-40"
      >
        Classer
      </button>
    </div>
  );
}

interface TriageInboxProps {
  items: OsLibraryItem[];
  onClassify: (id: string, category: string, subcategory: string) => void;
}

/** Inbox de triage — items sans catégorie, à classer un par un (porte le bloc "📥 À classer" de RENDER.stack). */
export function TriageInbox({ items, onClassify }: TriageInboxProps) {
  if (items.length === 0) return null;
  return (
    <Section id="knowledge-triage" title={`📥 À classer — ${items.length}`}>
      <div className="fm-glass-card rounded-2xl px-4">
        {items.map((item) => (
          <TriageRow key={item.id} item={item} onClassify={onClassify} />
        ))}
      </div>
    </Section>
  );
}
