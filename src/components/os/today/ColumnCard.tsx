import type { ColumnView } from "@/lib/os/today";
import { TODAY_COPY } from "@/lib/os/today-copy";
import { Card, CardTitle } from "../Card";
import { Money } from "../Money";
import { MoneyText } from "./MoneyText";
import { Sparkline7 } from "./Sparkline7";
import { TONE_STYLE } from "./tone";

/**
 * Zone 2 : une colonne métier. Le composant est générique, c'est la ColumnView produite par
 * `columns()` qui décide de tout son contenu.
 */
export function ColumnCard({ col }: { col: ColumnView }) {
  return (
    <Card href={col.href} className="flex flex-col">
      <CardTitle>{col.label}</CardTitle>

      <div className="mt-2 font-display text-2xl tracking-tight text-fmfg">
        {col.format === "money" ? (
          <Money amountTND={col.value} />
        ) : (
          <>
            {col.value.toLocaleString("fr-FR")} <span className="text-sm text-fmmuted">{col.unit}</span>
          </>
        )}
      </div>

      <p className="mt-0.5 font-grotesk text-[11px] text-fmmuted">
        {col.sub}
        {col.delta && (
          <>
            {", "}
            <span className="text-fmaccent">
              <MoneyText text={col.delta} amountTND={col.deltaMoney} />
            </span>
          </>
        )}
      </p>

      <Sparkline7 series={col.series} label={`Activité ${col.label} sur 7 jours`} />

      <div className="mt-3 flex flex-col gap-2 border-t border-fmborder pt-3">
        {col.items.length === 0 && <p className="font-grotesk text-xs text-fmmuted">{TODAY_COPY.columns.empty}</p>}
        {col.items.map((item) => (
          <div key={item.id} className="font-grotesk text-xs leading-snug">
            <div className={TONE_STYLE[item.tone].text === "text-fmprimary" ? "text-fmfg" : TONE_STYLE[item.tone].text}>
              {item.tone === "risk" || item.tone === "watch" ? (
                <span className="sr-only">{TONE_STYLE[item.tone].word} : </span>
              ) : null}
              {item.label}
            </div>
            {item.meta && <div className="mt-0.5 text-[10px] text-fmmuted">{item.meta}</div>}
          </div>
        ))}
      </div>
    </Card>
  );
}
