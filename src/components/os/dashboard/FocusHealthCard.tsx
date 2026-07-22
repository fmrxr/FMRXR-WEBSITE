import Link from "next/link";
import { Stat } from "../Stat";
import { Money } from "../Money";
import { daysUntil, restOf, toTND } from "@/lib/os/compute";
import type { FocusToday } from "@/lib/os/compute";
import type { OsGraph } from "@/lib/os/types";

function healthTone(score: number): "accent" | "warn" | "danger" {
  if (score >= 70) return "accent";
  if (score >= 45) return "warn";
  return "danger";
}

/** Business Health + Focus du jour — porte le bandeau hero de RENDER.dashboard. */
export function FocusHealthCard({ health, focus, graph, now }: { health: number; focus: FocusToday; graph: OsGraph; now: Date }) {
  const hasFocus = focus.deadline || focus.cashInvoice || focus.task;
  return (
    <div className={`fm-glass-card rounded-2xl border p-6 ${focus.overdue ? "border-[#ff4d5e]/40" : "border-fmborder"}`}>
      <div className="flex flex-wrap gap-8">
        <Stat label="Business Health" value={`${health}/100`} tone={healthTone(health)} />
        <div className="min-w-[260px] flex-1">
          <div className="font-grotesk text-xs uppercase tracking-[0.14em] text-fmmuted">🎯 Focus du jour</div>
          {!hasFocus ? (
            <p className="mt-2 font-grotesk text-sm text-fmmuted">RAS — rien d&apos;urgent.</p>
          ) : (
            <div className="mt-2 flex flex-col gap-1.5">
              {focus.deadline && (
                <Link href="/os/agenda" className="fm-link font-grotesk text-sm text-fmfg">
                  {focus.overdue ? <span className="text-[#ff4d5e]">⚠ EN RETARD : </span> : "◷ "}
                  {focus.deadline.label}
                  {(daysUntil(focus.deadline.date, now) ?? 0) >= 0 ? ` · J-${daysUntil(focus.deadline.date, now)}` : ""}
                </Link>
              )}
              {focus.cashInvoice && (
                <Link href="/os/finance" className="fm-link font-grotesk text-sm text-fmfg">
                  💰 <Money amountTND={toTND(restOf(focus.cashInvoice), focus.cashInvoice.currency, graph.meta?.eur_tnd)} /> à encaisser —{" "}
                  {focus.cashInvoice.ref || focus.cashInvoice.id}
                </Link>
              )}
              {focus.task && (
                <Link href="/os/taches" className="fm-link font-grotesk text-sm text-fmfg">
                  ☐ {focus.task.label}
                  {focus.task.due ? ` · J-${Math.max(0, daysUntil(focus.task.due, now) ?? 0)}` : ""}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
