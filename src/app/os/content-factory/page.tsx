"use client";

import { useState } from "react";
import { useOs } from "@/lib/os/store";
import { cfSummary } from "@/lib/os/compute";
import { CfBoard } from "@/components/os/content-factory/CfBoard";
import { AddCfBatchForm } from "@/components/os/content-factory/AddCfBatchForm";
import type { CfBatchDraft } from "@/components/os/content-factory/AddCfBatchForm";
import { CfLocalInterfaceCard } from "@/components/os/content-factory/CfLocalInterfaceCard";
import { genId } from "@/lib/os/id";
import type { OsCfBatch } from "@/lib/os/types";

export default function ContentFactoryPage() {
  const { graph, loading, error, mutate, logChange } = useOs();
  const [adding, setAdding] = useState(false);

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  const batches = graph.cf_batches || [];
  const summary = cfSummary(batches);

  function addBatch(draft: CfBatchDraft) {
    const id = genId("cf");
    mutate((g) => {
      g.cf_batches = g.cf_batches || [];
      g.cf_batches.push({ id, stage: "attente", ...draft });
    });
    logChange("create", id, `lot Content Factory ajouté : ${draft.name}`);
    setAdding(false);
  }

  function setStage(id: string, stage: OsCfBatch["stage"]) {
    let name = "";
    let oldStage: OsCfBatch["stage"] | null = null;
    mutate((draft) => {
      const b = (draft.cf_batches || []).find((x) => x.id === id);
      if (!b || b.stage === stage) return;
      name = b.name;
      oldStage = b.stage;
      b.stage = stage;
    });
    if (oldStage) logChange("update", id, `Content Factory — ${name} : ${oldStage} → ${stage}`);
  }

  function deleteBatch(id: string) {
    const b = batches.find((x) => x.id === id);
    if (!b) return;
    if (!confirm(`Retirer le lot « ${b.name} » du pipeline ?`)) return;
    mutate((draft) => {
      draft.trash = draft.trash || [];
      draft.trash.unshift({ ts: new Date().toISOString(), kind: "cf_batch", data: b });
      draft.cf_batches = (draft.cf_batches || []).filter((x) => x.id !== id);
    });
    logChange("delete", id, `lot Content Factory retiré : ${b.name}`);
  }

  return (
    <div className="fm-rise flex flex-col gap-6">
      <CfLocalInterfaceCard />

      {adding ? (
        <AddCfBatchForm projects={graph.projects} onAdd={addBatch} onCancel={() => setAdding(false)} />
      ) : (
        <div className="flex items-center justify-between">
          <h1 className="font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted">
            📦 Lots en production — {summary.doneCount}/{summary.total} livrés
          </h1>
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-sm text-fmfg hover:border-fmaccent/40"
          >
            + Lot
          </button>
        </div>
      )}

      <CfBoard batches={batches} graph={graph} onSetStage={setStage} onDelete={deleteBatch} />

      {batches.length === 0 && <p className="font-grotesk text-sm text-fmmuted">Aucun lot en production. Clique « + Lot ».</p>}
    </div>
  );
}
