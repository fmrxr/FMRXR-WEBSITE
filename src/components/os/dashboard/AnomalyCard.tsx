import { Card, CardTitle } from "../Card";
import type { MonthlyAnomaly } from "@/lib/os/compute";

/** Signal statistique simple (pas de ML) : le mois courant dévie-t-il de la moyenne 6 mois glissante ? */
export function AnomalyCard({ anomaly }: { anomaly: MonthlyAnomaly }) {
  if (!anomaly.isAnomaly) {
    return (
      <Card>
        <CardTitle>Anomalie du mois</CardTitle>
        <p className="mt-2 font-grotesk text-sm text-fmmuted">Rien d&apos;anormal — dans la moyenne des 6 derniers mois.</p>
      </Card>
    );
  }

  const above = anomaly.direction === "above";
  return (
    <Card href="/os/finance">
      <CardTitle>Anomalie du mois</CardTitle>
      <div className={`font-display mt-2 text-xl ${above ? "text-fmaccent" : "text-[#ff4d5e]"}`}>
        {anomaly.deviationPct >= 0 ? "+" : ""}
        {Math.round(anomaly.deviationPct)} %
      </div>
      <p className="mt-1 font-grotesk text-xs text-fmmuted">
        {above ? "Nettement au-dessus" : "Nettement en dessous"} de la moyenne 6 mois glissante.
      </p>
    </Card>
  );
}
