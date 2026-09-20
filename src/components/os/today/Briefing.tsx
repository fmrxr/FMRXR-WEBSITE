import Link from "next/link";
import type { BriefingLine, NextAction } from "@/lib/os/today";
import { TODAY_COPY } from "@/lib/os/today-copy";
import { MoneyText } from "./MoneyText";
import { TONE_STYLE } from "./tone";

/**
 * Zone 1 : le résumé du jour, en tête de la pyramide inversée. Une ligne par règle satisfaite,
 * jamais de ligne de remplissage. La ligne d'action suit, quand il y a une action à poser.
 */
export function Briefing({ lines, action }: { lines: BriefingLine[]; action: NextAction | null }) {
  return (
    <section className="fm-glass-card rounded-2xl border border-fmborder p-5 md:p-7">
      <h2 className="font-grotesk text-[10px] uppercase tracking-[0.16em] text-fmmuted">{TODAY_COPY.briefingTitle}</h2>

      {lines.length === 0 ? (
        <p className="mt-3 font-grotesk text-sm text-fmmuted">{TODAY_COPY.briefingEmpty}</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2.5">
          {lines.map((line) => {
            const style = TONE_STYLE[line.tone];
            return (
              <li key={line.id} className="flex items-baseline gap-2.5">
                <span
                  className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`}
                  aria-hidden="true"
                />
                <Link href={line.href} className="font-grotesk text-sm leading-relaxed text-fmfg no-underline hover:text-fmaccent">
                  <span className="sr-only">{style.word} : </span>
                  <MoneyText text={line.text} amountTND={line.money} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {action && (
        <div className="mt-5 flex items-end justify-between gap-5 border-t border-fmborder pt-4">
          <div>
            <div className="font-grotesk text-[10px] uppercase tracking-[0.16em] text-fmmuted">
              {TODAY_COPY.nextActionTitle}
            </div>
            <p className="mt-1.5 font-display text-base text-fmfg md:text-lg">{action.label}</p>
            {action.reason && <p className="mt-1 font-grotesk text-xs text-fmmuted">{action.reason}</p>}
          </div>
          <Link href={action.href} className="fm-link shrink-0 font-grotesk text-sm text-fmaccent">
            {TODAY_COPY.openLink} →
          </Link>
        </div>
      )}
    </section>
  );
}
