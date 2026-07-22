"use client";

import { useState } from "react";
import { Card, CardTitle } from "../Card";
import type { OsGraph } from "@/lib/os/types";

interface NewTaskFormProps {
  targets: { id: string; name: string }[];
  onAdd: (label: string, project: string, owner: string, due: string) => void;
}

/** Formulaire rapide d'ajout — porte le bloc "Nouvelle tâche" de RENDER.taches. */
export function NewTaskForm({ targets, onAdd }: NewTaskFormProps) {
  const [label, setLabel] = useState("");
  const [project, setProject] = useState("");
  const [owner, setOwner] = useState("");
  const [due, setDue] = useState("");

  function submit() {
    if (!label.trim()) return;
    onAdd(label.trim(), project, owner.trim(), due.trim());
    setLabel("");
    setOwner("");
    setDue("");
  }

  return (
    <Card>
      <CardTitle>Nouvelle tâche</CardTitle>
      <div className="mt-3 flex flex-wrap gap-2">
        <input
          className="min-w-[200px] flex-[2] rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          placeholder="Quoi faire…"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        <select
          className="min-w-[160px] rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        >
          <option value="">— général —</option>
          {targets.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <input
          className="w-24 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          placeholder="Qui"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <input
          className="w-32 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          placeholder="AAAA-MM-JJ"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
        <button type="button" className="rounded border border-fmborder px-3 py-1.5 font-grotesk text-sm text-fmfg hover:border-fmaccent/40" onClick={submit}>
          Ajouter
        </button>
      </div>
    </Card>
  );
}

export function buildTaskTargets(graph: Pick<OsGraph, "projects" | "identities">): { id: string; name: string }[] {
  return [
    ...graph.projects.filter((p) => p.status === "active").map((p) => ({ id: p.id, name: p.name })),
    ...graph.identities.map((i) => ({ id: i.id, name: i.name })),
  ];
}
