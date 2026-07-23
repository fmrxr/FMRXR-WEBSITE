import { Card, CardTitle } from "../Card";
import type { ClientConcentration } from "@/lib/os/compute";
import type { OsGraph } from "@/lib/os/types";

interface ConcentrationRiskCardProps {
  concentration: ClientConcentration;
  graph: Pick<OsGraph, "clients">;
}

/** Un client >20% du CA (ou top-5 >50%) est un risque structurel — pas juste un chiffre de plus. */
export function ConcentrationRiskCard({ concentration, graph }: ConcentrationRiskCardProps) {
  const clientName = concentration.topClientId
    ? (graph.clients?.find((c) => c.id === concentration.topClientId)?.name ?? concentration.topClientId)
    : null;

  return (
    <Card href="/os/finance">
      <CardTitle>Risque de concentration client</CardTitle>
      {clientName ? (
        <>
          <div className={`font-display mt-2 text-lg md:text-xl ${concentration.risk === "high" ? "text-[#ff4d5e]" : "text-fmaccent"}`}>
            {Math.round(concentration.topClientPct)} %
          </div>
          <p className="mt-1 font-grotesk text-xs text-fmmuted">
            {clientName} · top-5 = {Math.round(concentration.top5Pct)} % du CA
          </p>
          {concentration.risk === "high" && (
            <p className="mt-2 font-grotesk text-xs text-[#ff4d5e]">⚠ un départ créerait un vrai trou — diversifier.</p>
          )}
        </>
      ) : (
        <p className="mt-2 font-grotesk text-sm text-fmmuted">Pas encore de données facturées.</p>
      )}
    </Card>
  );
}
