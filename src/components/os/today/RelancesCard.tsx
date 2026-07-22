import { Card, CardTitle } from "../Card";
import { toTND } from "@/lib/os/compute";
import type { RelanceItem } from "@/lib/os/compute";
import type { OsGraph } from "@/lib/os/types";
import { Money } from "../Money";

function clientName(graph: OsGraph, id?: string) {
  if (!id) return undefined;
  return graph.clients?.find((c) => c.id === id)?.name ?? id;
}

/** Factures sent/partial >14 j + devis sent >10 j (§7.3). */
export function RelancesCard({ items, graph }: { items: RelanceItem[]; graph: OsGraph }) {
  return (
    <Card href="/os/finance">
      <CardTitle>Relances</CardTitle>
      <div className="mt-3 flex flex-col gap-2.5">
        {items.length === 0 && <p className="font-grotesk text-sm text-fmmuted">Rien à relancer.</p>}
        {items.map((it) => (
          <div key={`${it.kind}-${it.id}`} className="font-grotesk text-sm">
            <div className="text-fmfg">
              {it.label}
              {it.client ? ` · ${clientName(graph, it.client)}` : ""}
            </div>
            <div className="text-xs text-fmmuted">
              {it.kind === "invoice" ? "facture" : "devis"} · <Money amountTND={toTND(it.amount, it.currency, graph.meta?.eur_tnd)} /> ·{" "}
              {it.daysSince} j
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
