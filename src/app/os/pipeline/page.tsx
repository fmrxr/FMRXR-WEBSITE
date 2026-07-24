"use client";

import { useState } from "react";
import { useOs } from "@/lib/os/store";
import { bdmSummary, closingSoon, oppDeadlineStatus, relances } from "@/lib/os/compute";
import { PipelineStats } from "@/components/os/pipeline/PipelineStats";
import { OpportunityRow } from "@/components/os/pipeline/OpportunityRow";
import { Section } from "@/components/os/Section";
import type { OpportunityStatus, OpportunityType } from "@/lib/os/types";

const TYPE_OPTIONS: { value: OpportunityType; label: string }[] = [
  { value: "open-call", label: "Open call" },
  { value: "festival", label: "Festival" },
  { value: "brand", label: "Marque / activation" },
  { value: "venue", label: "Venue / club" },
  { value: "grant", label: "Bourse / résidence" },
  { value: "autre", label: "Autre" },
];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export default function PipelinePage() {
  const { graph, loading, error, mutate, logChange } = useOs();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<OpportunityType>("open-call");
  const [identity, setIdentity] = useState("");
  const [deadline, setDeadline] = useState("");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  const now = new Date();
  const opportunities = graph.bdm?.opportunities || [];
  const summary = bdmSummary(opportunities, now);
  const rel = relances(graph, now);
  const closing = closingSoon(opportunities, now);

  const sorted = [...opportunities].sort((a, b) => {
    const aClosed = a.status === "won" || a.status === "lost";
    const bClosed = b.status === "won" || b.status === "lost";
    if (aClosed !== bClosed) return aClosed ? 1 : -1;
    const da = oppDeadlineStatus(a, now).days;
    const db = oppDeadlineStatus(b, now).days;
    if (da == null && db == null) return 0;
    if (da == null) return 1;
    if (db == null) return -1;
    return da - db;
  });

  function addOpportunity() {
    if (!name.trim()) return;
    let id = `opp-${slugify(name)}`;
    let i = 2;
    while (opportunities.find((o) => o.id === id)) id = `opp-${slugify(name).slice(0, 30)}-${i++}`;
    mutate((draft) => {
      draft.bdm = draft.bdm || { opportunities: [] };
      draft.bdm.opportunities.unshift({
        id,
        name: name.trim(),
        type,
        status: "lead",
        ...(identity ? { identity } : {}),
        ...(deadline ? { deadline } : {}),
        ...(url.trim() ? { url: url.trim() } : {}),
        ...(notes.trim() ? { notes: notes.trim() } : {}),
      });
    });
    logChange("create", id, `opportunité BDM : ${name.trim()}`);
    setName("");
    setDeadline("");
    setUrl("");
    setNotes("");
    setCreating(false);
  }

  function setStatus(id: string, status: OpportunityStatus) {
    let oppName = "";
    let oldStatus: OpportunityStatus | null = null;
    mutate((draft) => {
      const o = draft.bdm?.opportunities.find((x) => x.id === id);
      if (!o || o.status === status) return;
      oppName = o.name;
      oldStatus = o.status;
      o.status = status;
    });
    if (oldStatus) logChange("update", id, `opportunité ${oppName} : ${oldStatus} → ${status}`);
  }

  function deleteOpp(id: string) {
    const o = opportunities.find((x) => x.id === id);
    if (!o) return;
    if (!confirm(`Retirer « ${o.name} » du pipeline ?`)) return;
    mutate((draft) => {
      draft.trash = draft.trash || [];
      draft.trash.unshift({ ts: new Date().toISOString(), kind: "opportunity", data: o });
      if (draft.bdm) draft.bdm.opportunities = draft.bdm.opportunities.filter((x) => x.id !== id);
    });
    logChange("delete", id, `opportunité retirée : ${o.name}`);
  }

  return (
    <div className="fm-rise flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span />
        <button
          type="button"
          onClick={() => setCreating((c) => !c)}
          className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-sm text-fmfg hover:border-fmaccent/40"
        >
          + Opportunité
        </button>
      </div>

      {creating && (
        <div className="fm-glass-card flex flex-wrap items-center gap-2 rounded-2xl p-4">
          <input
            className="min-w-[220px] flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder="ex : Open call Fête des Lumières Lyon"
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            value={type}
            onChange={(e) => setType(e.target.value as OpportunityType)}
          >
            {TYPE_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <select
            className="rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
          >
            <option value="">— identité —</option>
            {graph.identities.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <input
            className="w-48 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder="Lien (optionnel)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            className="min-w-[200px] flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder="Notes (optionnel)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button type="button" className="fm-link font-grotesk text-sm text-fmaccent" onClick={addOpportunity}>
            Ajouter au pipeline
          </button>
          <button type="button" className="fm-link font-grotesk text-sm text-fmmuted" onClick={() => setCreating(false)}>
            Annuler
          </button>
        </div>
      )}

      <PipelineStats summary={summary} relancesCount={rel.length} />

      {closing.length > 0 && (
        <Section id="pipeline-closing" title="⏰ Ferme bientôt — agir maintenant">
          <div className="fm-glass-card rounded-2xl px-4">
            {closing.map((o) => (
              <OpportunityRow
                key={o.id}
                opportunity={o}
                identities={graph.identities}
                now={now}
                onStatusChange={setStatus}
                onDelete={deleteOpp}
              />
            ))}
          </div>
        </Section>
      )}

      <Section id="pipeline-all" title={`Toutes les opportunités — ${opportunities.length}`}>
        <div className="fm-glass-card rounded-2xl px-4">
          {sorted.map((o) => (
            <OpportunityRow key={o.id} opportunity={o} identities={graph.identities} now={now} onStatusChange={setStatus} onDelete={deleteOpp} />
          ))}
        </div>
      </Section>
    </div>
  );
}
