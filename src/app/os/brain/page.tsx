"use client";

import { useCallback, useMemo, useState } from "react";
import { useOs } from "@/lib/os/store";
import { GRAPH_TYPE_COLORS, GRAPH_TYPE_LABELS, graphAnalytics, graphEdges, graphEntities, graphEntitiesWithHistory, loadHistoricalEdges } from "@/lib/os/compute";
import type { GraphEntity, GraphEntityType } from "@/lib/os/compute";
import { GraphCanvas } from "@/components/os/brain/GraphCanvas";
import { EntityDrawer } from "@/components/os/brain/EntityDrawer";
import { AskPanel } from "@/components/os/brain/AskPanel";

const DEFAULT_TYPES: GraphEntityType[] = ["identity", "project", "person", "client", "invoice", "quote"];

export default function BrainPage() {
  const { graph, loading, error } = useOs();
  const [search, setSearch] = useState("");
  const [activeTypes, setActiveTypes] = useState<Set<GraphEntityType>>(new Set(DEFAULT_TYPES));
  const [showArchived, setShowArchived] = useState(false);
  // Sédiment (F1.1) visible par défaut — "l'OS ne devrait plus oublier visuellement" est le
  // comportement attendu, pas une option qu'il faut aller chercher.
  const [showHistory, setShowHistory] = useState(true);
  const [reseedSignal, setReseedSignal] = useState(0);
  const [openEntity, setOpenEntity] = useState<GraphEntity | null>(null);
  const [stats, setStats] = useState({ nodes: 0, edges: 0, derived: 0 });
  const [showAsk, setShowAsk] = useState(false);
  const [askQuestion, setAskQuestion] = useState<string | null>(null);

  const entities = useMemo(() => {
    if (!graph) return [];
    const base = showHistory ? graphEntitiesWithHistory(graph) : graphEntities(graph);
    return base.filter((e) => {
      if (!activeTypes.has(e.type)) return false;
      if (e.type === "project" && e.status === "archived" && !showArchived) return false;
      return true;
    });
  }, [graph, activeTypes, showArchived, showHistory]);

  const edges = useMemo(() => {
    if (!graph) return [];
    const direct = graphEdges(graph, entities);
    if (!showHistory) return direct;
    const visibleIds = new Set(entities.map((e) => e.id));
    return [...direct, ...loadHistoricalEdges(graph, visibleIds)];
  }, [graph, entities, showHistory]);

  const ghostCount = useMemo(() => entities.filter((e) => e.state === "ghost").length, [entities]);

  // F4 — quelques stats actionnables dérivées du graphe visible actuel (dépend donc des filtres actifs).
  const analytics = useMemo(() => (graph ? graphAnalytics(graph, entities, edges) : null), [graph, entities, edges]);

  const onStats = useCallback((nodes: number, edgeCount: number, derived: number) => setStats({ nodes, edges: edgeCount, derived }), []);

  const handleOpenEntity = useCallback((id: string) => setOpenEntity(entities.find((e) => e.id === id) ?? null), [entities]);

  const handleExplainEntity = useCallback((entity: GraphEntity) => {
    setShowAsk(true);
    setAskQuestion(
      `Explique-moi ce que je devrais savoir sur "${entity.name}" (id ${entity.id}) : son état actuel, ses liens (client, projets, factures…), son historique récent, et tout point d'attention éventuel.`,
    );
  }, []);

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  function toggleType(t: GraphEntityType) {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  return (
    <div className="fm-rise flex h-[calc(100vh-160px)] min-h-[420px] flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          className="min-w-[180px] flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          placeholder="Chercher dans le graphe…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {GRAPH_TYPE_LABELS.map(([t, label]) => {
          const active = activeTypes.has(t);
          return (
            <button
              key={t}
              type="button"
              onClick={() => toggleType(t)}
              style={active ? { borderColor: GRAPH_TYPE_COLORS[t] } : undefined}
              className={`rounded-full border px-3 py-1 font-grotesk text-xs ${active ? "text-fmfg" : "border-fmborder text-fmmuted"}`}
            >
              {label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setShowArchived((a) => !a)}
          className={`rounded-full border px-3 py-1 font-grotesk text-xs ${showArchived ? "border-fmaccent text-fmaccent" : "border-fmborder text-fmmuted"}`}
        >
          Archives
        </button>
        <button
          type="button"
          onClick={() => setShowHistory((h) => !h)}
          title="Nœuds fantômes — entités supprimées, reconstruites depuis leur dernier état connu"
          className={`rounded-full border px-3 py-1 font-grotesk text-xs ${showHistory ? "border-fmaccent text-fmaccent" : "border-fmborder text-fmmuted"}`}
        >
          Historique
        </button>
        <button
          type="button"
          onClick={() => setReseedSignal((s) => s + 1)}
          className="rounded-full border border-fmborder px-3 py-1 font-grotesk text-xs text-fmmuted hover:border-fmaccent/40"
        >
          ↺ Réorganiser
        </button>
        <button
          type="button"
          onClick={() => setShowAsk((s) => !s)}
          className={`rounded-full border px-3 py-1 font-grotesk text-xs ${showAsk ? "border-fmaccent text-fmaccent" : "border-fmborder text-fmmuted"}`}
        >
          ✦ Demander à l&apos;IA
        </button>
        <span className="flex-1" />
        <span className="font-grotesk text-xs text-fmmuted">
          {stats.nodes} nœuds · {stats.edges} liens ({stats.derived} inférés){ghostCount > 0 ? ` · ${ghostCount} fantômes` : ""}
        </span>
      </div>

      {analytics && (analytics.isolatedCount > 0 || analytics.busiest || analytics.projectsWithoutInvoice > 0) && (
        <p className="font-grotesk text-[11px] text-fmmuted">
          {analytics.isolatedCount > 0 && <>{analytics.isolatedCount} nœud{analytics.isolatedCount > 1 ? "s" : ""} isolé{analytics.isolatedCount > 1 ? "s" : ""}</>}
          {analytics.busiest && (
            <>
              {analytics.isolatedCount > 0 ? " · " : ""}
              plus connecté :{" "}
              <button type="button" onClick={() => handleOpenEntity(analytics.busiest!.id)} className="fm-link text-fmaccent">
                {analytics.busiest.name}
              </button>{" "}
              ({analytics.busiest.degree})
            </>
          )}
          {analytics.projectsWithoutInvoice > 0 && (
            <>
              {analytics.isolatedCount > 0 || analytics.busiest ? " · " : ""}
              {analytics.projectsWithoutInvoice} projet{analytics.projectsWithoutInvoice > 1 ? "s" : ""} actif{analytics.projectsWithoutInvoice > 1 ? "s" : ""} sans facture/devis lié
            </>
          )}
        </p>
      )}

      {showAsk && (
        <AskPanel
          onOpenEntity={handleOpenEntity}
          externalQuestion={askQuestion}
          onExternalQuestionHandled={() => setAskQuestion(null)}
        />
      )}

      <div className="fm-glass-card min-h-0 flex-1 overflow-hidden rounded-2xl">
        <GraphCanvas entities={entities} edges={edges} search={search} reseedSignal={reseedSignal} onOpenEntity={handleOpenEntity} onStats={onStats} />
      </div>

      <p className="font-grotesk text-[10.5px] text-fmmuted">
        Molette : zoom · glisser le fond : déplacer · glisser un nœud : réorganiser · survol : voisins en surbrillance · clic : ouvrir la fiche · double-clic : recentrer.
      </p>

      <EntityDrawer graph={graph} entity={openEntity} entities={entities} edges={edges} onOpenEntity={handleOpenEntity} onClose={() => setOpenEntity(null)} onExplain={handleExplainEntity} />
    </div>
  );
}
