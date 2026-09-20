import { Card, CardTitle } from "../Card";
import type { BreakEven } from "@/lib/os/compute";
import { Money } from "../Money";

/**
 * Seuil de rentabilité mensuel. Tant que les charges récurrentes ne figuraient pas dans le graphe,
 * le studio paraissait rentable sans compter ce qu'il coûte à faire tourner.
 */
export function BreakEvenCard({ breakEven }: { breakEven: BreakEven }) {
  if (breakEven.monthlyBurnTND <= 0) {
    return (
      <Card>
        <CardTitle>Seuil de rentabilité</CardTitle>
        <p className="mt-2 font-grotesk text-sm text-fmmuted">Aucune charge récurrente déclarée.</p>
      </Card>
    );
  }

  const tone = breakEven.covered ? "text-fmaccent" : "text-[#d9a441]";
  return (
    <Card>
      <CardTitle>Seuil de rentabilité</CardTitle>
      <div className={`font-display mt-2 text-lg md:text-xl ${tone}`}>
        <Money amountTND={breakEven.monthlyBurnTND} />
        <span className="ml-1 font-grotesk text-xs text-fmmuted">par mois à couvrir</span>
      </div>
      <p className="mt-1 font-grotesk text-xs text-fmmuted">
        Revenu mensuel moyen <Money amountTND={breakEven.monthlyRevenueTND} />
        {breakEven.covered ? ", soit une marge de " : ", soit un manque de "}
        <span className={tone}>
          <Money amountTND={Math.abs(breakEven.marginTND)} />
        </span>
      </p>
      {breakEven.runwayMonths !== null && (
        <p className="mt-2 border-t border-fmborder pt-2 font-grotesk text-[11px] text-fmmuted">
          Le revenu déjà engagé couvre{" "}
          <span className="text-fmfg">
            {breakEven.runwayMonths.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} mois
          </span>{" "}
          de charges, sans rien vendre de plus.
        </p>
      )}
    </Card>
  );
}
