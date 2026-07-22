import { Card, CardTitle } from "../Card";
import { daysUntil } from "@/lib/os/compute";
import type { OsGraph, OsTask } from "@/lib/os/types";

/** Top 5 tâches ouvertes triées par échéance — retards en tête, en rouge (§7.3). */
export function TasksCard({ tasks, graph }: { tasks: OsTask[]; graph: OsGraph }) {
  const now = new Date();
  return (
    <Card href="/os/taches">
      <CardTitle>Tâches</CardTitle>
      <div className="mt-3 flex flex-col gap-2.5">
        {tasks.length === 0 && <p className="font-grotesk text-sm text-fmmuted">Rien en attente.</p>}
        {tasks.map((t) => {
          const d = daysUntil(t.due, now) ?? 0;
          const overdue = d < 0;
          const project = graph.projects.find((p) => p.id === t.project)?.name;
          return (
            <div key={t.id} className="font-grotesk text-sm">
              <div className={overdue ? "text-[#ff4d5e]" : "text-fmfg"}>{t.label}</div>
              <div className="text-xs text-fmmuted">
                {project ? `${project} · ` : ""}
                {overdue ? `retard ${Math.abs(d)} j` : d === 0 ? "aujourd'hui" : `J-${d}`}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
