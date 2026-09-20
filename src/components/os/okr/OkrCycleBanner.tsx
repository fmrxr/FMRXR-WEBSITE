import type { PlanningState } from "@/lib/os/okr";
import { OKR_RULES } from "@/lib/os/okr";

const PHASES: Array<{ id: PlanningState["phase"]; label: string; detail: string }> = [
  { id: "planification", label: "Planifier", detail: "avant que le trimestre commence" },
  { id: "suivi", label: "Suivre", detail: "point hebdomadaire, confiance et note" },
  { id: "cloture", label: "Noter et reporter", detail: "à la fin du trimestre" },
];

/**
 * Le cycle, rendu visible. Sans repère de phase, la planification du trimestre suivant se
 * découvre le jour où il a déjà commencé.
 */
export function OkrCycleBanner({ state, onPlan }: { state: PlanningState; onPlan: () => void }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-fmborder">
      <div className="flex flex-col sm:flex-row">
        {PHASES.map((p) => {
          const active = p.id === state.phase;
          return (
            <div
              key={p.id}
              className={`flex-1 border-b border-fmborder px-4 py-2.5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 ${active ? "bg-fmcard" : ""}`}
            >
              <div className={`font-grotesk text-xs ${active ? "text-fmaccent" : "text-fmmuted"}`}>{p.label}</div>
              <div className="font-grotesk text-[10.5px] text-fmmuted">{p.detail}</div>
            </div>
          );
        })}
      </div>

      {state.windowOpen && state.nextPublishedCount === 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-fmborder bg-[#d9a441]/5 px-4 py-2.5">
          <span className="font-grotesk text-xs text-[#d9a441]">
            {state.nextQuarter} n&apos;a aucun objectif publié et il reste {state.daysLeft} jours.
            {state.draftCount > 0
              ? ` ${state.draftCount} brouillon${state.draftCount > 1 ? "s" : ""} en cours.`
              : ` La fenêtre de planification s'ouvre à ${OKR_RULES.planningWindowDays} jours de la fin.`}
          </span>
          <button
            type="button"
            onClick={onPlan}
            className="rounded-lg border border-[#d9a441]/40 px-3 py-1 font-grotesk text-xs text-[#d9a441] hover:border-[#d9a441]"
          >
            Préparer le {state.nextQuarter}
          </button>
        </div>
      )}
    </div>
  );
}
