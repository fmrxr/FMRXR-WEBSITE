"use client";

import type { DocumentItem } from "@/lib/os/document";

interface ItemRowsProps {
  items: DocumentItem[];
  onChange: (items: DocumentItem[]) => void;
}

/** Lignes de prestations dynamiques — porte itemRow()/addItemRow()/readItems() du monolithe. */
export function ItemRows({ items, onChange }: ItemRowsProps) {
  function updateItem(i: number, patch: Partial<DocumentItem>) {
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  }
  function removeItem(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function addItem() {
    onChange([...items, { title: "", desc: "", qty: 1, pu: 0 }]);
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map((it, i) => (
        <div key={i} className="rounded-lg border border-fmborder bg-fmmutedbg/40 p-3">
          <input
            className="mb-2 w-full rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
            placeholder="Prestation"
            value={it.title}
            onChange={(e) => updateItem(i, { title: e.target.value })}
          />
          <textarea
            className="mb-2 w-full rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
            placeholder="Description (une ligne par détail)"
            rows={2}
            value={it.desc || ""}
            onChange={(e) => updateItem(i, { desc: e.target.value })}
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              className="w-16 rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
              value={it.qty}
              onChange={(e) => updateItem(i, { qty: parseInt(e.target.value, 10) || 1 })}
            />
            <span className="font-grotesk text-xs text-fmmuted">×</span>
            <input
              type="number"
              step="0.01"
              placeholder="P.U. HT"
              className="w-28 rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
              value={it.pu}
              onChange={(e) => updateItem(i, { pu: parseFloat(e.target.value) || 0 })}
            />
            <span className="flex-1" />
            <button type="button" onClick={() => removeItem(i)} className="text-fmmuted hover:text-[#ff4d5e]" title="Retirer la ligne">
              ✕
            </button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addItem} className="self-start font-grotesk text-xs text-fmaccent hover:underline">
        + ajouter une ligne
      </button>
    </div>
  );
}
