import { Card } from "../Card";
import type { OsPerson } from "@/lib/os/types";

/** Personnes clés — porte la grille de cartes personnes de RENDER.crm. */
export function PeopleGrid({ people }: { people: OsPerson[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {people.map((p) => (
        <Card key={p.id}>
          <div className="font-grotesk text-sm font-semibold text-fmfg">{p.name}</div>
          {p.role && <div className="mt-1 font-grotesk text-xs text-fmmuted">{p.role}</div>}
          {p.email && <div className="mt-2 font-mono text-[10px] text-fmmuted">{p.email}</div>}
        </Card>
      ))}
    </div>
  );
}
