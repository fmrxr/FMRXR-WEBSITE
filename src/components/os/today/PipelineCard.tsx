import { Card, CardTitle } from "../Card";
import { oppDeadlineStatus } from "@/lib/os/compute";
import type { OsOpportunity } from "@/lib/os/types";

/** Opportunités non closes fermant ≤14 j, urgent ≤5 j en rouge (§7.3). */
export function PipelineCard({ opportunities }: { opportunities: OsOpportunity[] }) {
  const now = new Date();
  return (
    <Card href="/os/pipeline">
      <CardTitle>Pipeline — ferme bientôt</CardTitle>
      <div className="mt-3 flex flex-col gap-2.5">
        {opportunities.length === 0 && <p className="font-grotesk text-sm text-fmmuted">Rien ≤14 j.</p>}
        {opportunities.map((o) => {
          const dl = oppDeadlineStatus(o, now);
          const urgent = dl.status === "urgent";
          return (
            <div key={o.id} className="font-grotesk text-sm">
              <div className={urgent ? "text-[#ff4d5e]" : "text-fmfg"}>{o.name}</div>
              <div className="text-xs text-fmmuted">{dl.days != null ? `J-${dl.days}` : ""}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
