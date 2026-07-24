"use client";

import { useState } from "react";
import { useOs } from "@/lib/os/store";
import { assetClientGroups, assetKindCounts, assetKindGroups } from "@/lib/os/compute";
import { AssetCard } from "@/components/os/studio/AssetCard";
import { AddAssetForm } from "@/components/os/studio/AddAssetForm";
import type { AssetDraft } from "@/components/os/studio/AddAssetForm";
import { ToolsGrid } from "@/components/os/studio/ToolsGrid";
import { Section } from "@/components/os/Section";
import { genId } from "@/lib/os/id";
import type { OsAsset } from "@/lib/os/types";

type FormTarget = "new" | OsAsset | null;
type GroupBy = "kind" | "client";

export default function StudioPage() {
  const { graph, loading, error, mutate, logChange } = useOs();
  const [query, setQuery] = useState("");
  const [activeKind, setActiveKind] = useState<string | null>(null);
  const [groupBy, setGroupBy] = useState<GroupBy>("kind");
  const [formTarget, setFormTarget] = useState<FormTarget>(null);

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  const assets = graph.assets || [];
  const counts = assetKindCounts(assets);
  const kindsPresent = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  const kindGroups = assetKindGroups(assets, query).filter((g) => !activeKind || g.kind === activeKind);
  const clientGroups = assetClientGroups(assets, graph, query);
  const projectName = (id?: string) => (id ? graph.projects.find((p) => p.id === id)?.name : undefined);

  function saveAsset(draft: AssetDraft) {
    if (formTarget === "new") {
      const id = genId("asset");
      const created = { id, type: "asset" as const, ...draft };
      mutate((g) => {
        g.assets = g.assets || [];
        g.assets.push(created);
      });
      logChange("create", id, `asset ajouté : ${draft.name}`, { entityType: "asset", snapshot: created });
    } else if (formTarget) {
      const id = formTarget.id;
      const before = formTarget;
      mutate((g) => {
        const a = (g.assets || []).find((x) => x.id === id);
        if (a) Object.assign(a, draft);
      });
      logChange("update", id, `asset modifié : ${draft.name}`, { entityType: "asset", snapshot: { before, after: { ...before, ...draft } } });
    }
    setFormTarget(null);
  }

  function deleteAsset(id: string) {
    const a = assets.find((x) => x.id === id);
    if (!a) return;
    if (!confirm(`Supprimer l'asset « ${a.name} » ?`)) return;
    mutate((draft) => {
      draft.trash = draft.trash || [];
      draft.trash.unshift({ ts: new Date().toISOString(), kind: "asset", data: a });
      draft.assets = (draft.assets || []).filter((x) => x.id !== id);
    });
    logChange("delete", id, `asset supprimé (→ corbeille) : ${a.name}`, { entityType: "asset", snapshot: a });
  }

  return (
    <div className="fm-rise flex flex-col gap-6">
      {formTarget ? (
        <AddAssetForm
          projects={graph.projects}
          initial={formTarget === "new" ? undefined : formTarget}
          onSave={saveAsset}
          onCancel={() => setFormTarget(null)}
        />
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFormTarget("new")}
            className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-sm text-fmfg hover:border-fmaccent/40"
          >
            + Ajouter
          </button>
          <input
            className="min-w-[200px] flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder="Chercher (nom, fichier, notes)…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center rounded-full border border-fmborder p-0.5">
            <button
              type="button"
              onClick={() => setGroupBy("kind")}
              className={`rounded-full px-2.5 py-1 font-grotesk text-xs ${groupBy === "kind" ? "bg-fmaccent/15 text-fmaccent" : "text-fmmuted"}`}
            >
              Type
            </button>
            <button
              type="button"
              onClick={() => setGroupBy("client")}
              className={`rounded-full px-2.5 py-1 font-grotesk text-xs ${groupBy === "client" ? "bg-fmaccent/15 text-fmaccent" : "text-fmmuted"}`}
            >
              Client
            </button>
          </div>
          {groupBy === "kind" &&
            kindsPresent.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setActiveKind((c) => (c === k ? null : k))}
                className={`rounded-full border px-3 py-1 font-grotesk text-xs ${
                  activeKind === k ? "border-fmaccent text-fmaccent" : "border-fmborder text-fmmuted hover:border-fmaccent/40"
                }`}
              >
                {k} · {counts[k]}
              </button>
            ))}
          <span className="flex-1" />
          <span className="rounded-full border border-fmborder px-2.5 py-1 font-grotesk text-xs text-fmmuted">{assets.length} asset(s)</span>
        </div>
      )}

      {groupBy === "kind"
        ? kindGroups.map((g) => (
            <Section key={String(g.kind)} id={`studio-kind-${g.kind}`} title={`${g.label} — ${g.items.length}`}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((a) => (
                  <AssetCard key={a.id} asset={a} projectName={projectName(a.project)} onEdit={setFormTarget} onDelete={deleteAsset} />
                ))}
              </div>
            </Section>
          ))
        : clientGroups.map((g) => (
            <Section key={g.client} id={`studio-client-${g.client}`} title={`${g.client} — ${g.items.length}`}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((a) => (
                  <AssetCard key={a.id} asset={a} projectName={projectName(a.project)} onEdit={setFormTarget} onDelete={deleteAsset} />
                ))}
              </div>
            </Section>
          ))}

      {assets.length === 0 && <p className="font-grotesk text-sm text-fmmuted">Aucun asset. Clique « + Ajouter ».</p>}

      <Section id="studio-tools" title={`Outils & code — ${(graph.tools || []).filter((t) => t.kind !== "claude-skill").length}`}>
        <ToolsGrid tools={graph.tools || []} />
      </Section>
    </div>
  );
}
