import { Card, CardTitle } from "../Card";
import type { ImminentDeadline } from "@/lib/os/compute";

/** Deadlines ≤7 j + retards, tri chrono, critiques en accent (§7.3). */
export function DeadlinesCard({ deadlines }: { deadlines: ImminentDeadline[] }) {
  return (
    <Card href="/os/agenda">
      <CardTitle>Deadlines imminentes</CardTitle>
      <div className="mt-3 flex flex-col gap-2.5">
        {deadlines.length === 0 && <p className="font-grotesk text-sm text-fmmuted">Rien à ≤7 j.</p>}
        {deadlines.map((d) => (
          <div key={d.id} className="font-grotesk text-sm">
            <div className={d.overdue || d.critical ? "text-[#ff4d5e]" : "text-fmfg"}>{d.label}</div>
            <div className="text-xs text-fmmuted">
              {d.overdue ? `retard ${Math.abs(d.daysUntil)} j` : d.daysUntil === 0 ? "aujourd'hui" : `J-${d.daysUntil}`}
              {d.project ? ` · ${d.project}` : ""}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
