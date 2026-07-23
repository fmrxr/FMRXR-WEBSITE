import { Card, CardTitle } from "../Card";
import type { PipelineWinRate } from "@/lib/os/compute";

export function PipelineWinRateCard({ winRate }: { winRate: PipelineWinRate }) {
  return (
    <Card href="/os/pipeline">
      <CardTitle>Pipeline win-rate</CardTitle>
      {winRate.winRatePct === null ? (
        <p className="mt-2 font-grotesk text-sm text-fmmuted">Pas encore d&apos;opportunité clôturée.</p>
      ) : (
        <>
          <div className={`font-display mt-2 text-lg md:text-xl ${winRate.winRatePct >= 50 ? "text-fmaccent" : "text-[#d9a441]"}`}>
            {Math.round(winRate.winRatePct)} %
          </div>
          <p className="mt-1 font-grotesk text-xs text-fmmuted">
            {winRate.won} gagnée(s) · {winRate.lost} perdue(s)
          </p>
        </>
      )}
    </Card>
  );
}
