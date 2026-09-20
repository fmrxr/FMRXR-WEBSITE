import Link from "next/link";
import type { OkrStrip } from "@/lib/os/today";
import { TODAY_COPY } from "@/lib/os/today-copy";
import { TONE_STYLE } from "./tone";

const BAR_TONE: Record<string, string> = {
  win: "var(--color-fmaccent)",
  watch: "#d9a441",
  risk: "#ff4d5e",
  info: "var(--color-fmprimary)",
};

/**
 * Bande OKR du Command Center. Le trait vertical marque le temps écoulé du trimestre : une barre
 * qui le dépasse est en avance, sans avoir à faire la soustraction.
 */
export function OkrStripCard({ strip }: { strip: OkrStrip }) {
  const C = TODAY_COPY.okr;

  return (
    <section className="rounded-2xl border border-fmborder bg-fmcard/40 p-4 md:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-grotesk text-[10px] uppercase tracking-[0.16em] text-fmmuted">{C.title(strip.quarter)}</h2>
        <p className="font-grotesk text-[11px] text-fmmuted">
          {C.summary(Math.round(strip.globalPct), Math.round(strip.elapsedPct), strip.daysLeft)}
          {strip.objectives.length > 0 && (
            <span className={strip.pace >= 0 ? "text-fmaccent" : "text-[#d9a441]"}> · {C.pace(Math.round(strip.pace))}</span>
          )}
        </p>
      </div>

      {strip.objectives.length === 0 ? (
        <p className="mt-3 font-grotesk text-sm text-fmmuted">{C.empty(strip.quarter)}</p>
      ) : (
        <div className="mt-3 flex flex-col gap-2.5">
          {strip.objectives.map((o) => (
            <div key={o.id}>
              <div className="flex items-baseline justify-between gap-3 font-grotesk text-xs">
                <span className="text-fmfg">
                  <span className="sr-only">{TONE_STYLE[o.tone].word} : </span>
                  {o.label}
                </span>
                <span className={TONE_STYLE[o.tone].text}>{Math.round(o.pct)} %</span>
              </div>
              <div className="relative mt-1.5 h-1.5 rounded-full bg-fmmutedbg">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${Math.min(100, o.pct)}%`, background: BAR_TONE[o.tone] }}
                />
                <span
                  title={C.paceMarker}
                  className="absolute -top-1 bottom-[-4px] w-px bg-fmmuted/70"
                  style={{ left: `${strip.elapsedPct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-fmborder pt-3">
        {strip.planningDue ? (
          <span className="font-grotesk text-[11px] text-[#d9a441]">{C.planningDue(strip.nextQuarter, strip.daysLeft)}</span>
        ) : (
          <span className="font-grotesk text-[11px] text-fmmuted">{C.planningOk(strip.nextQuarter)}</span>
        )}
        <Link href="/os/okr" className="fm-link font-grotesk text-xs text-fmaccent">
          {strip.planningDue ? C.planLink(strip.nextQuarter) : C.openLink} →
        </Link>
      </div>
    </section>
  );
}
