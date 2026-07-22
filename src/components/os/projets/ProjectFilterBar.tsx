"use client";

import { cn } from "@/lib/utils";
import type { OsIdentity } from "@/lib/os/types";

interface ProjectFilterBarProps {
  identities: OsIdentity[];
  query: string;
  onQueryChange: (q: string) => void;
  identityFilter: string;
  onIdentityFilterChange: (id: string) => void;
  onNewProject: () => void;
}

/** Barre de filtre — porte le bandeau de RENDER.projets (recherche + chips identité). */
export function ProjectFilterBar({
  identities,
  query,
  onQueryChange,
  identityFilter,
  onIdentityFilterChange,
  onNewProject,
}: ProjectFilterBarProps) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onNewProject}
        className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-sm text-fmfg hover:border-fmaccent/40"
      >
        + Nouveau projet
      </button>
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value.toLowerCase())}
        placeholder="Filtrer projets, clients…"
        className="w-56 rounded-lg border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
      />
      {identities.map((i) => (
        <button
          key={i.id}
          type="button"
          onClick={() => onIdentityFilterChange(identityFilter === i.id ? "" : i.id)}
          className={cn(
            "rounded-full border px-2.5 py-1 font-grotesk text-xs",
            identityFilter === i.id ? "border-fmaccent/50 text-fmaccent" : "border-fmborder text-fmmuted",
          )}
        >
          {i.name}
        </button>
      ))}
    </div>
  );
}
