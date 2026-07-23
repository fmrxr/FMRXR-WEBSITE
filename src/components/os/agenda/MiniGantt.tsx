import type { GanttItem } from "@/lib/os/compute";

function fmtDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
}

interface MiniGanttProps {
  items: GanttItem[];
  /** Position 0–100 d'"aujourd'hui" sur la même frise que `items` (voir ganttItems()). */
  nowPct: number;
}

/** Frise horizontale proportionnelle — porte ganttFor() du monolithe (§Agenda), avec dates et repère "aujourd'hui". */
export function MiniGantt({ items, nowPct }: MiniGanttProps) {
  if (!items.length) return <p className="font-grotesk text-sm text-fmmuted">Aucun jalon daté sur ce projet.</p>;

  return (
    <div className="flex flex-col gap-3">
      {/* Repère "aujourd'hui" — aligné avec les lignes ci-dessous car les deux colonnes de gauche
          (largeur fixe) sont identiques, donc nowPct% tombe au même pixel écran sur chaque ligne. */}
      <div className="flex items-center gap-3">
        <div className="w-40 shrink-0 md:w-48" />
        <div className="relative flex-1">
          <span
            className="absolute -translate-x-1/2 whitespace-nowrap font-grotesk text-[9px] uppercase tracking-[0.08em] text-fmaccent"
            style={{ left: `${nowPct}%` }}
          >
            ↓ Aujourd&apos;hui
          </span>
        </div>
      </div>

      {items.map((i) => (
        <div key={i.id} className="flex items-center gap-3">
          <div className="w-40 shrink-0 md:w-48">
            <div className="truncate font-grotesk text-xs text-fmmuted" title={i.label}>
              {i.done ? "✓ " : ""}
              {i.label}
            </div>
            <div className="font-mono text-[10px] text-fmmuted/70">{fmtDate(i.date)}</div>
          </div>
          <div className="relative h-1.5 flex-1 rounded-full bg-fmmutedbg">
            <div
              className="absolute w-px bg-fmaccent/50"
              style={{ left: `${nowPct}%`, top: "-6px", bottom: "-6px" }}
              aria-hidden="true"
            />
            <div
              className={`absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ${
                i.done ? "bg-fmaccent" : i.critical ? "bg-[#ff4d5e]" : "bg-fmprimary"
              }`}
              style={{ left: `${Math.min(i.pct, 97)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
