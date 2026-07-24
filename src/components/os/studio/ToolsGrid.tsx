import type { OsTool } from "@/lib/os/types";

interface ToolsGridProps {
  tools: OsTool[];
}

/** Outils & code (hors skills Claude, affichés dans AI Workforce) — porte le bloc "Outils & code" de RENDER.studio. */
export function ToolsGrid({ tools }: ToolsGridProps) {
  const items = tools.filter((t) => t.kind !== "claude-skill");
  if (items.length === 0) return <p className="font-grotesk text-sm text-fmmuted">Aucun outil enregistré.</p>;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t) => (
        <div key={t.id} className="fm-glass-card rounded-2xl p-4">
          <span className="mb-2 inline-block rounded bg-fmmutedbg px-1.5 py-0.5 font-mono text-[10px] text-fmmuted">{t.kind}</span>
          <div className="font-grotesk text-sm font-semibold text-fmfg">{t.name}</div>
          {t.purpose && <div className="mt-1 font-grotesk text-xs text-fmmuted">{t.purpose}</div>}
          {t.file && <div className="mt-1 font-mono text-[10px] text-fmmuted">{t.file}</div>}
        </div>
      ))}
    </div>
  );
}
