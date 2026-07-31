import { Card, CardTitle } from "../Card";
import { Money } from "../Money";
import { Sparkline } from "../Sparkline";
import { cashProjection, futureCommitments, monthlySeries } from "@/lib/os/compute";
import type { OsGraph } from "@/lib/os/types";

interface FinanceForecastProps {
  graph: Pick<OsGraph, "finance" | "meta">;
  now: Date;
}

/**
 * Prévisions financières — cash projection (déjà calculée ailleurs mais jamais affichée dans
 * Finance), série 12 mois, et engagements déjà facturés pour les mois à venir (pas une
 * extrapolation : ce sont de vraies factures déjà créées, ex. une série récurrente).
 */
export function FinanceForecast({ graph, now }: FinanceForecastProps) {
  const eurTnd = graph.meta?.eur_tnd;
  const proj = cashProjection(graph.finance, now, eurTnd);
  const series = monthlySeries(graph.finance, now, eurTnd);
  const commitments = futureCommitments(graph.finance, now, 5, eurTnd);
  const hasCommitments = commitments.some((m) => m.count > 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardTitle>Projection encaissements</CardTitle>
          <div className="mt-2 flex flex-col gap-1 font-grotesk text-sm">
            <span className="text-fmaccent">
              ≤ 30 j <Money amountTND={proj.d30} className="text-fmfg" />
            </span>
            <span className="text-[#d9a441]">
              30-60 j <Money amountTND={proj.d60} className="text-fmfg" />
            </span>
            <span className="text-fmmuted">
              60-90 j <Money amountTND={proj.d90} className="text-fmfg" />
            </span>
          </div>
        </Card>

        {hasCommitments && (
          <Card>
            <CardTitle>Facturation déjà engagée — {commitments.length} mois</CardTitle>
            <div className="mt-2 flex flex-col gap-1 font-grotesk text-xs">
              {commitments.map((m) => (
                <div key={m.key} className="flex items-center justify-between gap-2">
                  <span className="text-fmmuted">{m.label}</span>
                  {m.count > 0 ? (
                    <span className="text-fmfg">
                      <Money amountTND={m.amountTND} /> <span className="text-fmmuted">· {m.count} fact.</span>
                    </span>
                  ) : (
                    <span className="text-fmmuted">—</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <Card>
        <CardTitle>CA 12 derniers mois — encaissé (rouge) vs facturé (gris)</CardTitle>
        <div className="mt-3">
          <Sparkline series={series} />
        </div>
      </Card>
    </div>
  );
}
