import { Card, CardTitle } from "../Card";
import type { RevenueHorizon } from "@/lib/os/compute";
import type { OsGraph } from "@/lib/os/types";
import { Money } from "../Money";

function monthLabel(key: string | null): string | null {
  if (!key) return null;
  const [y, m] = key.split("-").map(Number);
  if (!y || !m) return null;
  return new Date(y, m - 1, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

/**
 * Horizon de revenu. Une dépendance à un client récurrent n'est pas un problème en soi : c'est une
 * base stable jusqu'à une date connue. La question utile n'est donc pas « quelle part pèse ce
 * client » mais « jusqu'à quand le revenu est engagé, et qu'est-ce qui est prévu après ».
 */
export function RevenueHorizonCard({ horizon, graph }: { horizon: RevenueHorizon; graph: OsGraph }) {
  const label = monthLabel(horizon.lastCommittedMonth);
  const client = horizon.topClientId
    ? (graph.clients?.find((c) => c.id === horizon.topClientId)?.name ?? horizon.topClientId)
    : null;

  return (
    <Card href="/os/finance">
      <CardTitle>Horizon de revenu</CardTitle>
      {label ? (
        <>
          <div className="font-display mt-2 text-lg capitalize text-fmfg md:text-xl">{label}</div>
          <p className="mt-1 font-grotesk text-xs text-fmmuted">
            <Money amountTND={horizon.committedTND} /> déjà engagés, {horizon.monthsCovered} mois couverts
          </p>
          {client && (
            <p className="mt-2 border-t border-fmborder pt-2 font-grotesk text-[11px] text-fmmuted">
              {client} porte {Math.round(horizon.topClientPct)} % du chiffre d&apos;affaires sur 12 mois glissants.
              <span className="mt-0.5 block">Base stable jusqu&apos;à la fin de l&apos;horizon, à diversifier avant.</span>
            </p>
          )}
        </>
      ) : (
        <p className="mt-2 font-grotesk text-sm text-fmmuted">Aucun revenu engagé au-delà d&apos;aujourd&apos;hui.</p>
      )}
    </Card>
  );
}
