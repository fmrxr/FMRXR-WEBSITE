"use client";

import { useState } from "react";
import { useOs } from "@/lib/os/store";
import { KanbanBoard } from "@/components/os/projets/KanbanBoard";
import { ProjectFilterBar } from "@/components/os/projets/ProjectFilterBar";
import { genId } from "@/lib/os/id";
import type { ProjectStatus } from "@/lib/os/types";

export default function ProjetsPage() {
  const { graph, loading, error, mutate, logChange } = useOs();
  const [query, setQuery] = useState("");
  const [identityFilter, setIdentityFilter] = useState("");
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [client, setClient] = useState("");
  const [identity, setIdentity] = useState<string[]>([]);

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  const now = new Date();

  const filtered = graph.projects.filter((p) => {
    if (identityFilter && !(p.identity || []).includes(identityFilter)) return false;
    if (!query) return true;
    const c = graph.clients?.find((x) => x.id === p.client);
    return `${p.name} ${p.category || ""} ${c?.name || ""}`.toLowerCase().includes(query);
  });

  function dropStatus(projectId: string, status: ProjectStatus) {
    let name = projectId;
    let oldStatus = "";
    mutate((draft) => {
      const p = draft.projects.find((x) => x.id === projectId);
      if (!p || p.status === status) return;
      name = p.name;
      oldStatus = p.status;
      p.status = status;
    });
    if (oldStatus) logChange("update", projectId, `${name} : status ${oldStatus} → ${status} (glissé au kanban)`);
  }

  function createProject() {
    if (!name.trim()) return;
    const id = genId("proj");
    mutate((draft) => {
      draft.projects.push({
        id,
        name: name.trim(),
        type: "project",
        status: "active",
        identity,
        category: category.trim() || undefined,
        client: client || undefined,
      });
    });
    logChange("create", id, `nouveau projet : ${name.trim()}`);
    setName("");
    setCategory("");
    setClient("");
    setIdentity([]);
    setCreating(false);
  }

  return (
    <div className="fm-rise flex flex-col gap-4">
      <ProjectFilterBar
        identities={graph.identities}
        query={query}
        onQueryChange={setQuery}
        identityFilter={identityFilter}
        onIdentityFilterChange={setIdentityFilter}
        onNewProject={() => setCreating((c) => !c)}
      />

      {creating && (
        <div className="fm-glass-card flex flex-wrap items-center gap-2 rounded-2xl p-4">
          <input
            className="min-w-[200px] flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder="Nom du projet"
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-40 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder="Catégorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <select
            className="w-44 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          >
            <option value="">— client —</option>
            {(graph.clients || []).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {graph.identities.map((i) => (
            <label key={i.id} className="flex items-center gap-1.5 font-grotesk text-xs text-fmmuted">
              <input
                type="checkbox"
                checked={identity.includes(i.id)}
                onChange={(e) => setIdentity((prev) => (e.target.checked ? [...prev, i.id] : prev.filter((x) => x !== i.id)))}
              />
              {i.name}
            </label>
          ))}
          <button type="button" className="fm-link font-grotesk text-sm text-fmaccent" onClick={createProject}>
            Créer
          </button>
          <button type="button" className="fm-link font-grotesk text-sm text-fmmuted" onClick={() => setCreating(false)}>
            Annuler
          </button>
        </div>
      )}

      <p className="font-grotesk text-xs text-fmmuted">
        Glisser une carte d&apos;une colonne à l&apos;autre change son statut (enregistré + synchronisé).
      </p>

      <KanbanBoard projects={filtered} graph={graph} now={now} onDropStatus={dropStatus} />
    </div>
  );
}
