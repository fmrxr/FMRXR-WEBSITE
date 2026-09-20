import { Card, CardTitle } from "../Card";
import { Money } from "../Money";
import type { RunRateProjection } from "@/lib/os/compute";

/** Projection fin d'année = CA facturé YTD + moyenne mensuelle × mois restants. */
export function RunRateProjectionCard({ projection, now }: { projection: RunRateProjection; now: Date }) {
  return (
    <Card href="/os/finance">
      <CardTitle>Projection run-rate {now.getFullYear()}</CardTitle>
      <div className="mt-2 font-display text-lg text-fmfg md:text-xl">
        <Money amountTND={projection.projectedYearEnd} />
      </div>
      <p className="mt-1 font-grotesk text-xs text-fmmuted">
        <Money amountTND={projection.ytdBilled} /> facturés · moyenne <Money amountTND={projection.avgMonthly} />/mois ·{" "}
        {projection.monthsRemaining} mois restants
      </p>
    </Card>
  );
}
