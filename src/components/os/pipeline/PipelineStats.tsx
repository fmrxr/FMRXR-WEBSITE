import { Card, CardTitle } from "../Card";
import { Stat } from "../Stat";
import type { BdmSummary } from "@/lib/os/compute";

interface PipelineStatsProps {
  summary: BdmSummary;
  relancesCount: number;
}

/** Compteurs du pipeline — porte la grille g4 de RENDER.bdm. */
export function PipelineStats({ summary, relancesCount }: PipelineStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card>
        <CardTitle>À postuler</CardTitle>
        <Stat label="" value={summary.activeCount} sub={`${summary.proposalCount} proposition(s) en cours`} />
      </Card>
      <Card>
        <CardTitle>Ferme bientôt (≤14 j)</CardTitle>
        <Stat
          label=""
          value={summary.closingSoonCount}
          tone={summary.closingUrgentCount ? "danger" : summary.closingSoonCount ? "warn" : "default"}
          sub={summary.closingUrgentCount ? `⚠ ${summary.closingUrgentCount} à ≤5 j` : "rien d'urgent"}
        />
      </Card>
      <Card>
        <CardTitle>À relancer</CardTitle>
        <Stat label="" value={relancesCount} tone={relancesCount ? "warn" : "default"} sub="factures/devis en attente" />
      </Card>
      <Card>
        <CardTitle>Gagnées</CardTitle>
        <Stat label="" value={summary.wonCount} tone="accent" sub="opportunités converties" />
      </Card>
    </div>
  );
}
