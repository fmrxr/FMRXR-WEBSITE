import { Card, CardTitle } from "../Card";
import { Stat } from "../Stat";

interface OkrSummaryCardsProps {
  globalProgress: number;
  quarterElapsedPct: number;
  quarter: string;
  objectiveCount: number;
  daysLeft: number;
}

function paceTone(pace: number): "accent" | "warn" | "danger" {
  if (pace >= 0) return "accent";
  if (pace > -15) return "warn";
  return "danger";
}

/** Avancement global · trimestre écoulé · rythme (§10 — RENDER.okr du monolithe). */
export function OkrSummaryCards({ globalProgress, quarterElapsedPct, quarter, objectiveCount, daysLeft }: OkrSummaryCardsProps) {
  const pace = globalProgress - quarterElapsedPct;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <CardTitle>Avancement global</CardTitle>
        <Stat label="" value={`${Math.round(globalProgress)} %`} sub={`moyenne des ${objectiveCount} objectif(s) — ${quarter}`} />
      </Card>
      <Card>
        <CardTitle>Trimestre écoulé</CardTitle>
        <Stat label="" value={`${Math.round(quarterElapsedPct)} %`} sub={`${daysLeft} jours restants`} />
      </Card>
      <Card>
        <CardTitle>Rythme</CardTitle>
        <Stat
          label=""
          value={`${pace >= 0 ? "+" : ""}${Math.round(pace)} pts`}
          tone={paceTone(pace)}
          sub={pace >= 0 ? "en avance sur le calendrier" : pace > -15 ? "léger retard — rattrapable" : "retard net — arbitrer"}
        />
      </Card>
    </div>
  );
}
