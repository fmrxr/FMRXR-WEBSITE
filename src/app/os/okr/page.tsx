"use client";

import { useState } from "react";
import { useOs } from "@/lib/os/store";
import { curQuarter, okrObjectiveProgress } from "@/lib/os/compute";
import { genId } from "@/lib/os/id";
import { OkrSummaryCards } from "@/components/os/okr/OkrSummaryCards";
import { OkrCycleBanner } from "@/components/os/okr/OkrCycleBanner";
import { KpiGrid } from "@/components/os/okr/KpiGrid";
import { capState, draftOkrs, gradeLabel, gradeObjective, isDraft, manualKrs, OKR_RULES, planningState, publishedOkrs } from "@/lib/os/okr";
import { OkrObjectiveCard } from "@/components/os/okr/OkrObjectiveCard";
import { Section } from "@/components/os/Section";

export default function OkrPage() {
  const { graph, loading, error, mutate, logChange } = useOs();
  const [newObjective, setNewObjective] = useState("");
  const [adding, setAdding] = useState(false);
  const [planningOpen, setPlanning] = useState(false);
  const [draftLabel, setDraftLabel] = useState("");

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  const now = new Date();
  const q = curQuarter(now);
  const all = graph.okrs || [];
  const plan = planningState(graph, now);
  const current = publishedOkrs(graph, q);
  const drafts = draftOkrs(graph, plan.nextQuarter);
  const nextPublished = publishedOkrs(graph, plan.nextQuarter);
  const past = all.filter((o) => o.quarter !== q && o.quarter !== plan.nextQuarter);
  const caps = capState(current);
  const manual = manualKrs(current);
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

  function addDraftObjective(text: string) {
    const label = text.trim();
    if (!label) return;
    const id = genId("okr");
    const created = { id, quarter: plan.nextQuarter, objective: label, status: "draft" as const, krs: [] };
    mutate((draft) => {
      draft.okrs = draft.okrs || [];
      draft.okrs.push(created);
    });
    logChange("create", id, `Brouillon d'objectif ${plan.nextQuarter} : ${label}`, { entityType: "okr", snapshot: created });
    setDraftLabel("");
    setPlanning(false);
  }

  function publishObjective(okrId: string) {
    const before = (graph!.okrs || []).find((x) => x.id === okrId);
    if (!before) return;
    mutate((draft) => {
      const o = (draft.okrs || []).find((x) => x.id === okrId);
      if (o) delete o.status;
    });
    logChange("update", okrId, `Objectif publié : ${before.objective}`, {
      entityType: "okr",
      snapshot: { before, after: { ...before, status: undefined } },
    });
  }

  function addCheckin(okrId: string, confidence: 1 | 2 | 3, note: string) {
    const before = (graph!.okrs || []).find((x) => x.id === okrId);
    if (!before) return;
    const entry = { ts: new Date().toISOString(), confidence, note: note || undefined };
    mutate((draft) => {
      const o = (draft.okrs || []).find((x) => x.id === okrId);
      if (!o) return;
      o.checkins = [...(o.checkins || []), entry];
    });
    logChange("update", okrId, `Point de suivi sur « ${before.objective} » : confiance ${confidence}/3${note ? `, ${note}` : ""}`, {
      entityType: "okr",
      snapshot: { before, after: { ...before, checkins: [...(before.checkins || []), entry] } },
    });
  }

  function closeQuarter() {
    if (!confirm(`Noter et clôturer les ${current.length} objectif(s) de ${q} ?`)) return;
    for (const o of current) {
      const grade = gradeObjective(o, graph!, now);
      mutate((draft) => {
        const target = (draft.okrs || []).find((x) => x.id === o.id);
        if (!target) return;
        target.grade = grade;
        target.closed_at = new Date().toISOString().slice(0, 10);
      });
      logChange("update", o.id, `Objectif clôturé : ${o.objective}, note ${grade.toFixed(2)} (${gradeLabel(grade)})`, {
        entityType: "okr",
        snapshot: { before: o, after: { ...o, grade } },
      });
    }
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

      <OkrCycleBanner state={plan} onPlan={() => setPlanning(true)} />

      <OkrSummaryCards
        globalProgress={globalProgress}
        quarterElapsedPct={quarterElapsedPct}
        quarter={q}
        objectiveCount={current.length}
        daysLeft={daysLeft}
      />

      {(caps.overObjectives || caps.krIssues.length > 0 || manual.length > 0) && (
        <div className="rounded-2xl border border-fmborder bg-fmcard/40 px-4 py-3 font-grotesk text-[11px] leading-relaxed text-fmmuted">
          {caps.overObjectives && (
            <p className="text-[#d9a441]">
              {caps.objectives} objectifs ce trimestre, au-delà de {OKR_RULES.maxObjectives}. Passé ce nombre, ce n&apos;est plus
              une liste de priorités mais une liste de tâches : garde les suivants comme candidats pour {plan.nextQuarter}.
            </p>
          )}
          {caps.krIssues.map((issue) => {
            const o = current.find((x) => x.id === issue.id);
            return (
              <p key={issue.id}>
                « {o?.objective} » a {issue.count} résultat{issue.count > 1 ? "s" : ""} clé{issue.count > 1 ? "s" : ""}, c&apos;est{" "}
                {issue.problem}. La fourchette utile va de {OKR_RULES.minKrs} à {OKR_RULES.maxKrs}.
              </p>
            );
          })}
          {manual.length > 0 && (
            <p>
              {manual.length} résultat{manual.length > 1 ? "s" : ""} clé{manual.length > 1 ? "s" : ""} encore tenu
              {manual.length > 1 ? "s" : ""} à la main, donc à risque de périmer : {manual.map((k) => k.label).join(", ")}.
            </p>
          )}
        </div>
      )}

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
              onCheckin={(confidence, note) => addCheckin(o.id, confidence, note)}
            />
          ))
        )}
        {current.length > 0 && plan.windowOpen && (
          <div className="mt-2 flex items-center justify-end">
            <button type="button" onClick={closeQuarter} className="fm-link font-grotesk text-xs text-fmmuted">
              Noter et clôturer {q}
            </button>
          </div>
        )}
      </Section>

      <Section id="okr-next" title={`Prochain trimestre — ${plan.nextQuarter}`}>
        {planningOpen || drafts.length > 0 || nextPublished.length > 0 ? null : (
          <p className="font-grotesk text-sm text-fmmuted">
            Rien de préparé pour {plan.nextQuarter}.{" "}
            <button type="button" onClick={() => setPlanning(true)} className="fm-link text-fmaccent">
              Écrire un premier objectif
            </button>
          </p>
        )}

        {planningOpen && (
          <div className="mb-3 rounded-2xl border border-dashed border-fmborder bg-fmcard/30 p-4">
            <p className="font-grotesk text-[11px] leading-relaxed text-fmmuted">
              Un objectif se formule comme un problème à résoudre, daté sur le trimestre, pas comme une solution déjà
              choisie. Ses résultats clés viendront ensuite, une fois l&apos;objectif arrêté.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <input
                className="min-w-64 flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
                placeholder={`Objectif pour ${plan.nextQuarter}…`}
                value={draftLabel}
                autoFocus
                onChange={(e) => setDraftLabel(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addDraftObjective(draftLabel)}
              />
              <button type="button" className="fm-link font-grotesk text-sm text-fmaccent" onClick={() => addDraftObjective(draftLabel)}>
                Ajouter au brouillon
              </button>
              <button type="button" className="fm-link font-grotesk text-sm text-fmmuted" onClick={() => setPlanning(false)}>
                Annuler
              </button>
            </div>
          </div>
        )}

        {[...drafts, ...nextPublished].map((o) => (
          <OkrObjectiveCard
            key={o.id}
            okr={o}
            graph={graph}
            identityName={graph.identities.find((i) => i.id === o.identity)?.name}
            now={now}
            onAddKr={(label, target, unit) => addKr(o.id, label, target, unit)}
            onSetKrValue={(krId, value) => setKrValue(o.id, krId, value)}
            onDelete={() => deleteObjective(o.id, o.objective)}
            onPublish={isDraft(o) ? () => publishObjective(o.id) : undefined}
          />
        ))}
      </Section>

      <Section id="okr-kpis" title="Indicateurs">
        <KpiGrid kpis={graph.kpis || []} graph={graph} now={now} />
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
