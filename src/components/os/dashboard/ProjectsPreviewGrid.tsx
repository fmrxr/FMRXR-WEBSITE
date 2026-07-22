import { ProjectCard } from "../projets/ProjectCard";
import type { OsGraph, OsProject } from "@/lib/os/types";

interface ProjectsPreviewGridProps {
  projects: OsProject[];
  graph: Pick<OsGraph, "identities" | "clients" | "deadlines" | "finance" | "quotes" | "assets">;
  now: Date;
}

/** Grille des projets actifs — porte la section "Projets en cours" de RENDER.dashboard (réutilise ProjectCard). */
export function ProjectsPreviewGrid({ projects, graph, now }: ProjectsPreviewGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} graph={graph} now={now} />
      ))}
    </div>
  );
}
