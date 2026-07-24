import { Card, CardTitle } from "../Card";
import { Money } from "../Money";
import { sumsByCurrency } from "@/lib/os/compute";
import type { FinanceOverview } from "@/lib/os/compute";

interface FinanceOverviewCardsProps {
  overview: FinanceOverview;
  now: Date;
  plafondLabel?: string;
}

/** 6 cartes KPI — porte le bloc grid g4 de RENDER.finance. */
export function FinanceOverviewCards({ overview, now, plafondLabel }: FinanceOverviewCardsProps) {
  const plafondColor = overview.plafondPct >= 90 ? "#ff4d5e" : overview.plafondPct >= 70 ? "#d9a441" : "var(--color-fmaccent)";

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-6">
      <Card>
        <CardTitle>Encaissé</CardTitle>
        <div className="font-display mt-2 text-lg text-fmaccent md:text-xl">{sumsByCurrency(overview.cashInItems)}</div>
        <p className="mt-1 font-grotesk text-xs text-fmmuted">
          ≈ <Money amountTND={overview.cashInTND} />
        </p>
      </Card>
      <Card>
        <CardTitle>Reste à encaisser</CardTitle>
        <div className="font-display mt-2 text-lg text-[#d9a441] md:text-xl">{sumsByCurrency(overview.pendingItems)}</div>
        <p className="mt-1 font-grotesk text-xs text-fmmuted">
          {overview.pendingCount} en cours · ≈ <Money amountTND={overview.pendingTND} />
          {overview.noAmountCount ? ` · ${overview.noAmountCount} à compléter` : ""}
        </p>
      </Card>
      <Card>
        <CardTitle>Facturé {now.getFullYear()}</CardTitle>
        <div className="font-display mt-2 text-lg text-fmfg md:text-xl">{sumsByCurrency(overview.yearInvoiceItems)}</div>
        <p className="mt-1 font-grotesk text-xs text-fmmuted">
          {overview.yearInvoiceCount} factures · ≈ <Money amountTND={overview.yearInvoiceTND} />
        </p>
      </Card>
      <Card>
        <CardTitle>Plafond auto-entrepreneur{plafondLabel ? ` — ${plafondLabel}` : ""}</CardTitle>
        <div className="font-display mt-2 text-lg md:text-xl" style={{ color: plafondColor }}>
          {overview.plafondPct.toFixed(1)} %
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-fmmutedbg">
          <div className="h-full rounded-full" style={{ width: `${Math.min(100, overview.plafondPct)}%`, background: plafondColor }} />
        </div>
      </Card>
      <Card>
        <CardTitle>Dépenses {now.getFullYear()}</CardTitle>
        <div className="font-display mt-2 text-lg text-[#ff4d5e] md:text-xl">{sumsByCurrency(overview.expenseItems)}</div>
        <p className="mt-1 font-grotesk text-xs text-fmmuted">
          {overview.expenseCount} dépense(s) · ≈ <Money amountTND={overview.expenseTND} />
          {overview.recurringExpenseTND ? (
            <>
              {" "}
              · récurrent ≈ <Money amountTND={overview.recurringExpenseTND} />
              /mois
            </>
          ) : null}
        </p>
      </Card>
      <Card>
        <CardTitle>Trésorerie nette</CardTitle>
        <div className={`font-display mt-2 text-lg md:text-xl ${overview.netTND >= 0 ? "text-fmaccent" : "text-[#ff4d5e]"}`}>
          <Money amountTND={overview.netTND} />
        </div>
        <p className="mt-1 font-grotesk text-xs text-fmmuted">encaissé − dépenses</p>
      </Card>
    </div>
  );
}
