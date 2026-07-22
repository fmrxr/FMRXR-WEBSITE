"use client";

import { Card, CardTitle } from "../Card";
import { Stat } from "../Stat";
import { useDisplayCurrency } from "../Money";
import { daysUntil, sumsByCurrency } from "@/lib/os/compute";
import type { OsDeadline, OsInvoice, OsProject } from "@/lib/os/types";

interface QuickStatsGridProps {
  nextDeadline: OsDeadline | null;
  criticalProject: OsProject | null;
  criticalProjectNextDeadline: OsDeadline | null;
  activeProjects: OsProject[];
  yearInvoices: OsInvoice[];
  pendingCount: number;
  now: Date;
}

/** Prochaine deadline · projet critique actif · projets actifs · CA facturé — grille g4 du Dashboard. */
export function QuickStatsGrid({
  nextDeadline,
  criticalProject,
  criticalProjectNextDeadline,
  activeProjects,
  yearInvoices,
  pendingCount,
  now,
}: QuickStatsGridProps) {
  const { privacy } = useDisplayCurrency();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card href="/os/agenda">
        <CardTitle>Prochaine deadline</CardTitle>
        {nextDeadline ? (
          <Stat label="" value={`J-${daysUntil(nextDeadline.date, now)}`} tone="danger" sub={nextDeadline.label} />
        ) : (
          <p className="mt-2 font-grotesk text-sm text-fmmuted">—</p>
        )}
      </Card>
      <Card href={criticalProject ? "/os/projets" : undefined}>
        <CardTitle>{criticalProject ? criticalProject.name : "Projet critique"}</CardTitle>
        {criticalProject && criticalProjectNextDeadline ? (
          <Stat label="" value={`J-${daysUntil(criticalProjectNextDeadline.date, now)}`} sub={criticalProjectNextDeadline.label} />
        ) : (
          <p className="mt-2 font-grotesk text-sm text-fmmuted">Aucun projet critique actif.</p>
        )}
      </Card>
      <Card href="/os/projets">
        <CardTitle>Projets actifs</CardTitle>
        <Stat
          label=""
          value={activeProjects.length}
          sub={activeProjects
            .slice(0, 4)
            .map((p) => p.name.split("—")[0].split("×")[0].trim())
            .join(" · ")}
        />
      </Card>
      <Card href="/os/finance">
        <CardTitle>CA facturé {now.getFullYear()}</CardTitle>
        <Stat label="" value={privacy ? "••••" : sumsByCurrency(yearInvoices)} sub={`${yearInvoices.length} factures · ${pendingCount} en attente au total`} />
      </Card>
    </div>
  );
}
