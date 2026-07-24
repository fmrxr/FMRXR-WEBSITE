"use client";

import { useState } from "react";
import { useOs } from "@/lib/os/store";
import { curQuarter, okrObjectiveProgress } from "@/lib/os/compute";
import { genId } from "@/lib/os/id";
import { OkrSummaryCards } from "@/components/os/okr/OkrSummaryCards";
import { OkrObjectiveCard } from "@/components/os/okr/OkrObjectiveCard";
import { Section } from "@/components/os/Section";

export default function OkrPage() {
  const { graph, loading, error, mutate, logChange } = useOs();
  const [newObjective, setNewObjective] = useState("");
  const [adding, setAdding] = useState(false);

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  const now = new Date();
  const q = curQuarter(now);
  const all = graph.okrs || [];
  const current = all.filter((o) => o.quarter === q);
  const past = all.filter((o) => o.quarter !== q);
  const globalProgress = current.length
    ? current.reduce((s, o) => s + okrObjectiveProgress(o, graph, now), 0) / current.length
    : 0;

  const qi = Math.floor(now.getMonth() / 3);
  const qs = new Date(now.getFullYear(), qi * 3, 1);
  const qe = new Date(now.getFullYear(), qi * 3 + 3, 0);
  const quarterElapsedPct = Math.min(100, ((now.getTime() - qs.getTime()) / (qe.getTime() - qs.getTime())) * 100);
  const daysLeft = Math.max(0, Math.ceil((qe.getTime() - now.getTime()) / 86_400_000));

  function addObjective() {
    if (!newObjective.trim()) return;
    const id = genId("okr");
    const created = { id, quarter: q, objective: newObjective.trim(), krs: [] };
    mutate((draft) => {
      draft.okrs = draft.okrs || [];
      draft.okrs.push(created);
    });
    logChange("create", id, `OKR créé : ${newObjective.trim()}`, { entityType: "okr", snapshot: created });
    setNewObjective("");
    setAdding(false);
  }

  function addKr(okrId: string, label: string, target: number, unit: string) {
    const krId = genId("kr");
    const before = (graph!.okrs || []).find((x) => x.id === okrId);
    if (!before) return;
    const kr = { id: krId, label, target, value: 0, unit };
    mutate((draft) => {
      const o = (draft.okrs || []).find((x) => x.id === okrId);
      if (!o) return;
      o.krs = o.krs || [];
      o.krs.push(kr);
    });
    logChange("update", okrId, `KR ajouté : ${label}`, { entityType: "okr", snapshot: { before, after: { ...before, krs: [...before.krs, kr] } } });
  }

  function setKrValue(okrId: string, krId: string, value: number) {
    const before = (graph!.okrs || []).find((x) => x.id === okrId);
    const beforeKr = before?.krs.find((k) => k.id === krId);
    if (!before || !beforeKr) return;
    mutate((draft) => {
      const o = (draft.okrs || []).find((x) => x.id === okrId);
      const kr = o?.krs.find((k) => k.id === krId);
      if (kr) kr.value = value;
    });
    const after = { ...before, krs: before.krs.map((k) => (k.id === krId ? { ...k, value } : k)) };
    logChange("update", okrId, `OKR — ${beforeKr.label} : ${beforeKr.value} → ${value}`, { entityType: "okr", snapshot: { before, after } });
  }

  function deleteObjective(okrId: string, objective: string) {
    if (!confirm(`Supprimer l'objectif « ${objective} » et ses résultats clés ?`)) return;
    const o = (graph!.okrs || []).find((x) => x.id === okrId);
    mutate((draft) => {
      draft.okrs = (draft.okrs || []).filter((x) => x.id !== okrId);
    });
    logChange("delete", okrId, `OKR supprimé : ${objective}`, { entityType: "okr", snapshot: o });
  }

  return (
    <div className="fm-rise flex flex-col gap-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          {adding ? (
            <div className="flex items-center gap-2">
              <input
                className="w-72 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
                placeholder="Nouvel objectif trimestriel…"
                value={newObjective}
                autoFocus
                onChange={(e) => setNewObjective(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addObjective()}
              />
              <button type="button" className="fm-link font-grotesk text-sm text-fmaccent" onClick={addObjective}>
                Ajouter
              </button>
              <button type="button" className="fm-link font-grotesk text-sm text-fmmuted" onClick={() => setAdding(false)}>
                Annuler
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-sm text-fmfg hover:border-fmaccent/40"
              onClick={() => setAdding(true)}
            >
              + Objectif
            </button>
          )}
        </div>
        <span className="font-grotesk text-sm text-fmmuted">Trimestre {q}</span>
      </header>

      <OkrSummaryCards
        globalProgress={globalProgress}
        quarterElapsedPct={quarterElapsedPct}
        quarter={q}
        objectiveCount={current.length}
        daysLeft={daysLeft}
      />

      <Section id="okr-current" title={`Objectifs — ${q}`}>
        {current.length === 0 ? (
          <p className="font-grotesk text-sm text-fmmuted">Aucun objectif ce trimestre. Clique « + Objectif ».</p>
        ) : (
          current.map((o) => (
            <OkrObjectiveCard
              key={o.id}
              okr={o}
              graph={graph}
              identityName={graph.identities.find((i) => i.id === o.identity)?.name}
              now={now}
              onAddKr={(label, target, unit) => addKr(o.id, label, target, unit)}
              onSetKrValue={(krId, value) => setKrValue(o.id, krId, value)}
              onDelete={() => deleteObjective(o.id, o.objective)}
            />
          ))
        )}
      </Section>

      {past.length > 0 && (
        <Section id="okr-past" title="Trimestres précédents">
          {past.map((o) => (
            <OkrObjectiveCard
              key={o.id}
              okr={o}
              graph={graph}
              identityName={graph.identities.find((i) => i.id === o.identity)?.name}
              now={now}
              onAddKr={(label, target, unit) => addKr(o.id, label, target, unit)}
              onSetKrValue={(krId, value) => setKrValue(o.id, krId, value)}
              onDelete={() => deleteObjective(o.id, o.objective)}
            />
          ))}
        </Section>
      )}
    </div>
  );
}
