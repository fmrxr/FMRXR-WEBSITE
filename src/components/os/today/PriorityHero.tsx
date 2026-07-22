import Link from "next/link";
import type { FocusToday } from "@/lib/os/compute";
import { daysUntil, restOf, toTND } from "@/lib/os/compute";
import type { OsGraph } from "@/lib/os/types";
import { Money } from "../Money";

function entityName(graph: OsGraph, id?: string) {
  if (!id) return undefined;
  return graph.clients?.find((c) => c.id === id)?.name ?? graph.people?.find((p) => p.id === id)?.name ?? id;
}

/** Hero glass — le point le plus pressant du jour (§7.2) : deadline en retard > tâche urgente > plus gros encaissement. */
export function PriorityHero({ focus, graph }: { focus: FocusToday; graph: OsGraph }) {
  const now = new Date();

  if (focus.deadline) {
    const d = daysUntil(focus.deadline.date, now) ?? 0;
    const overdue = d < 0;
    return (
      <div className={`fm-glass-card rounded-2xl border p-8 ${overdue ? "border-[#ff4d5e]/40" : "border-fmaccent/30"}`}>
        <div className="font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted">🔥 Priorité #1</div>
        <h2 className={`font-display mt-2 text-3xl ${overdue ? "text-[#ff4d5e]" : "text-fmfg"}`}>{focus.deadline.label}</h2>
        <p className="mt-2 font-grotesk text-sm text-fmmuted">
          {overdue ? `En retard de ${Math.abs(d)} j` : d === 0 ? "Aujourd'hui" : `Dans ${d} j`}
          {focus.deadline.project ? ` · ${focus.deadline.project}` : ""}
        </p>
        <Link href="/os/agenda" className="fm-link mt-4 inline-block font-grotesk text-sm text-fmaccent">
          Ouvrir l&apos;agenda →
        </Link>
      </div>
    );
  }

  if (focus.task) {
    const d = daysUntil(focus.task.due, now) ?? 0;
    return (
      <div className="fm-glass-card rounded-2xl border border-fmaccent/30 p-8">
        <div className="font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted">🔥 Priorité #1</div>
        <h2 className="font-display mt-2 text-3xl text-fmfg">{focus.task.label}</h2>
        <p className="mt-2 font-grotesk text-sm text-fmmuted">
          {d < 0 ? `En retard de ${Math.abs(d)} j` : d === 0 ? "Échéance aujourd'hui" : `Échéance dans ${d} j`}
        </p>
        <Link href="/os/taches" className="fm-link mt-4 inline-block font-grotesk text-sm text-fmaccent">
          Ouvrir les tâches →
        </Link>
      </div>
    );
  }

  if (focus.cashInvoice) {
    const amount = toTND(restOf(focus.cashInvoice), focus.cashInvoice.currency, graph.meta?.eur_tnd);
    const client = entityName(graph, focus.cashInvoice.client);
    return (
      <div className="fm-glass-card rounded-2xl border border-fmprimary/30 p-8">
        <div className="font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted">🔥 Priorité #1</div>
        <h2 className="font-display mt-2 text-3xl text-fmfg">
          {focus.cashInvoice.ref || focus.cashInvoice.label || focus.cashInvoice.id}
        </h2>
        <p className="mt-2 font-grotesk text-sm text-fmmuted">
          <Money amountTND={amount} /> en attente{client ? ` · ${client}` : ""}
        </p>
        <Link href="/os/finance" className="fm-link mt-4 inline-block font-grotesk text-sm text-fmaccent">
          Ouvrir la finance →
        </Link>
      </div>
    );
  }

  return (
    <div className="fm-glass-card rounded-2xl p-8">
      <div className="font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted">🔥 Priorité #1</div>
      <h2 className="font-display mt-2 text-2xl text-fmfg">Rien d&apos;urgent — RAS</h2>
    </div>
  );
}
