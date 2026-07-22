import type { GanttItem } from "@/lib/os/compute";

/** Frise horizontale proportionnelle — porte ganttFor() du monolithe (§Agenda). */
export function MiniGantt({ items }: { items: GanttItem[] }) {
  if (!items.length) return <p className="font-grotesk text-sm text-fmmuted">Aucun jalon daté sur ce projet.</p>;

  return (
    <div className="flex flex-col gap-2">
      {items.map((i) => (
        <div key={i.id} className="flex items-center gap-3">
          <div className="w-48 shrink-0 truncate font-grotesk text-xs text-fmmuted" title={i.label}>
            {i.done ? "✓ " : ""}
            {i.label}
          </div>
          <div className="relative h-1.5 flex-1 rounded-full bg-fmmutedbg">
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
