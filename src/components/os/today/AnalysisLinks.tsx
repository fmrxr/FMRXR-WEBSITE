import Link from "next/link";
import { TODAY_COPY } from "@/lib/os/today-copy";

function monthLabel(key: string | null): string | null {
  if (!key) return null;
  const [y, m] = key.split("-").map(Number);
  if (!y || !m) return null;
  return new Date(y, m - 1, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

/**
 * Renvois vers l'analyse, qui vit dans ses modules métier plutôt qu'en double ici. Chaque renvoi
 * porte le seul chiffre qui décide d'y aller ou non, pour éviter un lien aveugle.
 */
export function AnalysisLinks({
  horizonMonth,
  pendingDecision,
}: {
  horizonMonth: string | null;
  pendingDecision: number;
}) {
  const label = monthLabel(horizonMonth);
  return (
    <section className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-fmborder bg-fmcard/40 px-4 py-3 font-grotesk text-xs">
      <span className="text-fmmuted">{TODAY_COPY.analysis.title}</span>
      <Link href="/os/finance#finance-analyse" className="text-fmfg no-underline hover:text-fmaccent">
        {label ? TODAY_COPY.analysis.finance(label) : TODAY_COPY.analysis.financePlain}
      </Link>
      <Link href="/os/pipeline" className="text-fmfg no-underline hover:text-fmaccent">
        {pendingDecision > 0 ? TODAY_COPY.analysis.pipeline(pendingDecision) : TODAY_COPY.analysis.pipelinePlain}
      </Link>
      <Link href="/os/okr" className="text-fmfg no-underline hover:text-fmaccent">
        {TODAY_COPY.analysis.kpis}
      </Link>
    </section>
  );
}
