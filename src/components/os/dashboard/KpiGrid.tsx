import { Card } from "../Card";
import { kpiOk, kpiValue } from "@/lib/os/compute";
import type { OsGraph, OsKpi } from "@/lib/os/types";

interface KpiGridProps {
  kpis: OsKpi[];
  graph: Pick<OsGraph, "finance" | "deadlines" | "tasks" | "bdm">;
  now: Date;
}

/** Grille des KPIs — porte kpiGrid() du monolithe (lecture seule ici ; édition manuelle via /os/legacy). */
export function KpiGrid({ kpis, graph, now }: KpiGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {kpis.map((k) => {
        const v = kpiValue(k, graph, now);
        const ok = kpiOk(k, v);
        const target = k.target ?? 0;
        const pct = k.dir === "min" ? (target > 0 ? Math.min(100, (target / Math.max(v, 1)) * 100) : v === 0 ? 100 : 15) : Math.min(100, (v / (target || 1)) * 100);
        return (
          <Card key={k.id}>
            <div className="font-grotesk text-xs text-fmmuted">
              {k.name}
              {k.auto ? "" : " ✎"}
            </div>
            <div className={`font-display mt-1 text-lg ${ok ? "text-fmaccent" : "text-[#d9a441]"}`}>
              {v.toLocaleString("fr-FR")}
              {k.unit ? ` ${k.unit}` : ""}
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-fmmutedbg">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: ok ? "var(--color-fmaccent)" : "#d9a441" }} />
            </div>
            <div className="mt-1.5 font-grotesk text-[10px] text-fmmuted">
              cible {k.dir === "min" ? "≤" : "≥"} {target.toLocaleString("fr-FR")}
              {k.unit ? ` ${k.unit}` : ""} · {k.auto ? "auto" : "manuel"}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
