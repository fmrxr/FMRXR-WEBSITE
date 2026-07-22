import Link from "next/link";
import { Card } from "../Card";
import { Stat } from "../Stat";

interface TaskStatsRowProps {
  openCount: number;
  lateCount: number;
  doneCount: number;
  explabOpenCount: number;
}

/** 4 cartes stat — porte la grille g4 de RENDER.taches. */
export function TaskStatsRow({ openCount, lateCount, doneCount, explabOpenCount }: TaskStatsRowProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card>
        <Stat label="Ouvertes" value={openCount} />
      </Card>
      <Card>
        <Stat label="En retard" value={lateCount} tone={lateCount ? "danger" : "default"} />
      </Card>
      <Card>
        <Stat label="Faites" value={doneCount} tone="accent" />
      </Card>
      <Link href="/os/legacy#taches" className="block no-underline">
        <Card>
          <Stat label="EXPLAB ⵣ" value={explabOpenCount} sub="tâches collectif ouvertes" />
        </Card>
      </Link>
    </div>
  );
}
