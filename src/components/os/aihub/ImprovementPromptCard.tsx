"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/os/clipboard";
import { graphEntityCount } from "@/lib/os/compute";
import { OS_MODULES } from "@/lib/os/nav";
import type { OsGraph } from "@/lib/os/types";

interface ImprovementPromptCardProps {
  graph: OsGraph;
}

function buildPrompt(graph: OsGraph, request: string): string {
  const openTasks = (graph.tasks || []).filter((t) => !t.done).length;
  const nativeModules = OS_MODULES.filter((m) => m.native).map((m) => m.label);
  const legacyModules = OS_MODULES.filter((m) => !m.native).map((m) => m.label);
  return `Améliore FMRXR OS. Contexte technique : app native fmrxr-web (Next.js 16 / Turbopack / React 19 / TypeScript strict, Tailwind v4) — modules sous src/app/os/*, logique métier pure dans src/lib/os/compute.ts, contrat de données src/lib/os/types.ts. Source de vérité : table Supabase os_graph (JSONB, verrou optimiste sur updated_at) via /api/os/graph. L'ancien monolithe FMRXR_OS.html reste accessible en lecture à /os/legacy le temps de finir la migration.

MA DEMANDE : ${request || "(décris précisément l'amélioration voulue)"}

ÉTAT ACTUEL : ${graphEntityCount(graph)} entités · ${openTasks} tâches ouvertes · ${(graph.finance || []).length} factures · modules natifs : ${nativeModules.join(" · ")} · encore en legacy : ${legacyModules.join(" · ") || "aucun"}.
BACKLOG CONNU : Studio & Assets (aperçus fichiers à repenser en hébergé) · Content Factory (statut pipeline dépend d'un serveur local) · Brain (graphe force-directed, complexité élevée).`;
}

/** Générateur de prompt d'amélioration — porte osImprovePrompt() de RENDER.aihub, adapté à l'architecture native. */
export function ImprovementPromptCard({ graph }: ImprovementPromptCardProps) {
  const [request, setRequest] = useState("");
  const [copied, setCopied] = useState(false);

  async function generateAndCopy() {
    const prompt = buildPrompt(graph, request.trim());
    if (await copyToClipboard(prompt)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <div className="fm-glass-card rounded-2xl p-5">
      <p className="mb-2.5 font-grotesk text-xs text-fmmuted">
        Décris une amélioration, un bug ou une idée → le bouton génère un <b className="text-fmfg">prompt complet avec tout le contexte
        technique</b> (architecture, état, backlog) à coller dans le chat Claude. Zéro contexte à réexpliquer.
      </p>
      <textarea
        className="mb-2.5 w-full rounded border border-fmborder bg-fmmutedbg px-3 py-2 font-grotesk text-sm text-fmfg"
        rows={3}
        placeholder="ex : ajoute un mode sombre/clair · les vignettes PDF sont lentes · je veux exporter le pipeline BDM en CSV…"
        value={request}
        onChange={(e) => setRequest(e.target.value)}
      />
      <button
        type="button"
        onClick={generateAndCopy}
        className="rounded-lg border border-fmaccent/40 px-4 py-1.5 font-grotesk text-sm text-fmaccent hover:bg-fmaccent/10"
      >
        {copied ? "copié ✓ — colle dans Claude" : "⚡ Générer & copier le prompt"}
      </button>
    </div>
  );
}
