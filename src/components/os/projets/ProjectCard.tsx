"use client";

import Link from "next/link";
import { Badge } from "../Badge";
import { daysUntil } from "@/lib/os/compute";
import type { OsGraph, OsProject } from "@/lib/os/types";

interface ProjectCardProps {
  project: OsProject;
  graph: Pick<OsGraph, "identities" | "clients" | "deadlines" | "finance" | "quotes" | "assets">;
  now: Date;
}

/** Carte kanban draggable — porte pCard() du monolithe (§Projets). */
export function ProjectCard({ project: p, graph, now }: ProjectCardProps) {
  const client = graph.clients?.find((c) => c.id === p.client);
  const openDeadlines = (graph.deadlines || [])
    .filter((d) => d.project === p.id && !d.done && (daysUntil(d.date, now) ?? -1) >= 0)
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  const lateCount = (graph.deadlines || []).filter((d) => d.project === p.id && !d.done && (daysUntil(d.date, now) ?? 0) < 0).length;
  const linkedDocs = [...(graph.finance || []), ...(graph.quotes || [])].filter((x) => (x as { project?: string }).project === p.id);
  // Montants bruts (sans conversion devise) — comme pCard() dans le monolithe, une méta rapide, pas un état financier.
  const paid = linkedDocs.filter((x) => "status" in x && x.status === "paid").reduce((s, x) => s + (x.amount || 0), 0);
  const due = linkedDocs
    .filter((x) => "status" in x && ["sent", "partial", "late", "disputed"].includes(x.status))
    .reduce((s, x) => s + Math.max(0, (x.amount || 0) - ("advance" in x ? x.advance || 0 : 0)), 0);
  const docsCount = (graph.assets || []).filter((a) => (a as { project?: string }).project === p.id).length;
  const nextDeadlineDays = openDeadlines.length ? daysUntil(openDeadlines[0].date, now) : null;

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", p.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      className={`fm-glass-card cursor-grab rounded-xl p-3 active:cursor-grabbing ${p.priority === "critical" ? "border-[#ff4d5e]/40" : ""}`}
    >
      <div className="font-grotesk text-[13px] font-semibold leading-snug text-fmfg">{p.name}</div>
      <div className="mt-1 font-grotesk text-xs text-fmmuted">
        {p.category || ""}
        {client ? ` · ${client.name}` : ""}
      </div>
      {(p.identity || []).length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {(p.identity || []).map((idId) => {
            const identity = graph.identities.find((i) => i.id === idId);
            return (
              <Badge key={idId} tone={p.priority === "critical" ? "danger" : "default"}>
                {identity?.name ?? idId}
              </Badge>
            );
          })}
        </div>
      )}
      {(nextDeadlineDays !== null || lateCount > 0 || paid > 0 || due > 0 || docsCount > 0) && (
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-fmmuted">
          {nextDeadlineDays !== null && <span className={nextDeadlineDays <= 7 ? "text-[#ff4d5e]" : ""}>◷ J-{nextDeadlineDays}</span>}
          {lateCount > 0 && <span className="text-[#ff4d5e]">⚠ {lateCount} en retard</span>}
          {paid > 0 && <span className="text-fmaccent">✓ {paid.toLocaleString("fr-FR")}</span>}
          {due > 0 && <span className="text-[#d9a441]">◌ {due.toLocaleString("fr-FR")} dû</span>}
          {docsCount > 0 && <span>▤ {docsCount} docs</span>}
        </div>
      )}
      <Link href={`/os/legacy#projets`} className="fm-link mt-2 inline-block font-grotesk text-[10px] text-fmmuted">
        Ouvrir la fiche →
      </Link>
    </div>
  );
}
