import { Card, CardTitle } from "../Card";
import { Stat } from "../Stat";

interface AgendaOverviewProps {
  now: Date;
  upcomingCount: number;
  upcomingCriticalCount: number;
  calSyncDate: string | null;
}

/** Aujourd'hui · deadlines à venir · état sync Calendar — porte la grille g3 de RENDER.agenda. */
export function AgendaOverview({ now, upcomingCount, upcomingCriticalCount, calSyncDate }: AgendaOverviewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <CardTitle>Aujourd&apos;hui</CardTitle>
        <div className="mt-2 font-display text-lg capitalize text-fmfg">
          {now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
        </div>
      </Card>
      <Card>
        <CardTitle>Deadlines à venir</CardTitle>
        <Stat label="" value={upcomingCount} sub={`dont ${upcomingCriticalCount} critiques`} />
      </Card>
      <Card>
        <CardTitle>Sync Google Calendar</CardTitle>
        <p className="mt-2 font-grotesk text-xs text-fmmuted">
          <b className="text-fmfg">OS → Calendar</b> : auto 08h15.
          <br />
          <b className="text-fmfg">Calendar → OS</b> : au même passage, les dates déplacées sont reportées ici.
          <br />
          {calSyncDate ? (
            <span className="text-fmaccent">✓ dernier passage {new Date(calSyncDate).toLocaleDateString("fr-FR")}</span>
          ) : (
            <span className="text-[#d9a441]">aucun passage enregistré</span>
          )}
        </p>
      </Card>
    </div>
  );
}
