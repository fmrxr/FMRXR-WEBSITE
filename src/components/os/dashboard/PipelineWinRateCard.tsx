import { Card, CardTitle } from "../Card";
import type { PipelineWinRate } from "@/lib/os/compute";

/**
 * Taux de conversion, et à côté les opportunités dont la date est passée sans décision. Ce second
 * nombre n'entre pas dans le taux : c'est une file d'attente à trancher, pas une série de défaites.
 */
export function PipelineWinRateCard({ winRate }: { winRate: PipelineWinRate }) {
  return (
    <Card href="/os/pipeline">
      <CardTitle>Taux de conversion</CardTitle>
      {winRate.winRatePct === null ? (
        <p className="mt-2 font-grotesk text-sm text-fmmuted">Aucune opportunité tranchée pour l&apos;instant.</p>
      ) : (
        <>
          <div className={`font-display mt-2 text-lg md:text-xl ${winRate.winRatePct >= 50 ? "text-fmaccent" : "text-[#d9a441]"}`}>
            {Math.round(winRate.winRatePct)} %
          </div>
          <p className="mt-1 font-grotesk text-xs text-fmmuted">
            {winRate.won} gagnée{winRate.won > 1 ? "s" : ""}, {winRate.lost} perdue{winRate.lost > 1 ? "s" : ""}
          </p>
        </>
      )}
      {winRate.pendingDecision > 0 && (
        <p className="mt-2 border-t border-fmborder pt-2 font-grotesk text-xs text-[#d9a441]">
          {winRate.pendingDecision} à trancher
          <span className="mt-0.5 block text-[10px] text-fmmuted">
            date passée sans décision, hors du calcul tant que ce n&apos;est pas tranché
          </span>
        </p>
      )}
    </Card>
  );
}
