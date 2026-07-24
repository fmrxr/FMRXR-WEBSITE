"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/os/clipboard";
import type { OsLibraryItem } from "@/lib/os/types";

interface LibraryItemCardProps {
  item: OsLibraryItem;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

function copyText(item: OsLibraryItem): string {
  const c = item.content;
  if (item.type === "prompt" && c && typeof c === "object") {
    return c.prompt ? c.prompt + (c.negative ? `\n\nNegative prompt: ${c.negative}` : "") : "";
  }
  if (item.type === "preset" && c && typeof c === "object") return c.settings || "";
  return typeof c === "string" ? c : "";
}

/** Carte item bibliothèque — porte libItemCard() de RENDER.stack (rendu par type : prompt/preset/autre). */
export function LibraryItemCard({ item, onToggleFavorite, onDelete }: LibraryItemCardProps) {
  const [copied, setCopied] = useState(false);
  const c = item.content && typeof item.content === "object" ? item.content : null;
  const text = copyText(item);

  async function copy() {
    if (!text) return;
    if (await copyToClipboard(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <div className="fm-glass-card rounded-2xl p-4">
      <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
        <span className="rounded bg-fmaccent/15 px-1.5 py-0.5 font-mono text-[10px] text-fmaccent">{item.subcategory || item.type}</span>
        {c?.engine && <span className="rounded bg-fmmutedbg px-1.5 py-0.5 font-mono text-[10px] text-fmmuted">{c.engine}</span>}
        {c?.phase && <span className="rounded bg-fmmutedbg px-1.5 py-0.5 font-mono text-[10px] text-fmmuted">{c.phase}</span>}
        <span className="flex-1" />
        <button type="button" onClick={() => onToggleFavorite(item.id)} title="Favori" className="text-sm">
          {item.favorite ? "⭐" : "☆"}
        </button>
        <button type="button" onClick={() => onDelete(item.id)} title="Retirer" className="text-fmmuted hover:text-[#ff4d5e]">
          ✕
        </button>
      </div>

      <div className="mb-1.5 font-grotesk text-sm font-semibold text-fmfg">{item.title}</div>

      {item.type === "prompt" && c?.prompt && (
        <div className="max-h-20 overflow-hidden font-mono text-[10.5px] leading-relaxed text-fmmuted">{c.prompt}</div>
      )}
      {item.type === "preset" && c?.settings && (
        <pre className="whitespace-pre-wrap rounded-lg border border-fmborder bg-fmmutedbg px-2.5 py-2 font-mono text-[10px] leading-relaxed text-fmmuted">
          {c.settings}
        </pre>
      )}
      {item.type !== "prompt" && item.type !== "preset" && item.file_ref && (
        <div className="font-mono text-[10.5px] text-fmmuted">{item.file_ref}</div>
      )}
      {item.type !== "prompt" && item.type !== "preset" && !item.file_ref && typeof item.content === "string" && (
        <div className="max-h-20 overflow-hidden font-mono text-[10.5px] leading-relaxed text-fmmuted">{item.content}</div>
      )}

      <div className="mt-2.5 flex items-center gap-2">
        {item.tags && item.tags.length > 0 && <span className="font-grotesk text-[10px] text-fmmuted">{item.tags.join(", ")}</span>}
        <span className="flex-1" />
        {text && (
          <button
            type="button"
            onClick={copy}
            className="rounded border border-fmborder px-2 py-0.5 font-grotesk text-[10px] text-fmmuted hover:border-fmaccent/40 hover:text-fmfg"
          >
            {copied ? "copié ✓" : "📋 copier"}
          </button>
        )}
      </div>
    </div>
  );
}
