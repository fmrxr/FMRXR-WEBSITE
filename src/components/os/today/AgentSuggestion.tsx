import { Card, CardTitle } from "../Card";

interface AgentSuggestionProps {
  relancesCount: number;
  closingCount: number;
  tasksCount: number;
}

/** Bloc contextuel — prépare la Phase AI Workforce, bouton stub pour l'instant (§7.4). */
export function AgentSuggestion({ relancesCount, closingCount, tasksCount }: AgentSuggestionProps) {
  const message =
    relancesCount > 0
      ? `${relancesCount} relance(s) en attente — délègue au Pipeline/BDM pour préparer les messages.`
      : closingCount > 0
        ? `${closingCount} opportunité(s) ferment bientôt — prépare les candidatures.`
        : tasksCount > 0
          ? "Rien d'urgent côté finance/pipeline — concentre-toi sur les tâches du jour."
          : "RAS — journée calme.";

  return (
    <Card>
      <CardTitle>Agent conseillé</CardTitle>
      <p className="mt-3 font-grotesk text-sm text-fmfg">{message}</p>
      <button
        type="button"
        disabled
        title="AI Workforce — bientôt (Phase D)"
        className="mt-4 rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-xs text-fmmuted opacity-60"
      >
        Déléguer →
      </button>
    </Card>
  );
}
