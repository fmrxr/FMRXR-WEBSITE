"use client";

import { useState } from "react";
import { Card } from "../Card";
import { Badge } from "../Badge";
import { daysUntil } from "@/lib/os/compute";
import type { OsDeadline, OsGraph } from "@/lib/os/types";

interface DeadlineRowProps {
  deadline: OsDeadline;
  projectName?: string;
  now: Date;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function DeadlineRow({ deadline: d, projectName, now, onToggle, onDelete }: DeadlineRowProps) {
  const n = daysUntil(d.date, now) ?? 0;
  const past = n < 0 || d.done;
  return (
    <div className={`flex flex-col gap-0.5 border-b border-fmborder py-2.5 last:border-0 ${past ? "opacity-60" : ""}`}>
      <div className="flex items-center gap-2 font-mono text-[10.5px] text-fmmuted">
        {new Date(d.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
        {n >= 0 && !d.done && <span>J-{n}</span>}
        {d.done && <Badge tone="accent">fait</Badge>}
        {d.critical && !d.done && <span className="text-[#ff4d5e]">CRITIQUE</span>}
      </div>
      <div className={`font-grotesk text-sm text-fmfg ${d.done ? "line-through opacity-55" : ""}`}>{d.label}</div>
      <div className="flex items-center gap-2 font-grotesk text-[11px] text-fmmuted">
        {projectName ? `${projectName} · ` : ""}
        {d.owner ? `${d.owner} · ` : ""}
        <button type="button" className="underline" onClick={() => onToggle(d.id)}>
          {d.done ? "réouvrir" : "✓ marquer fait"}
        </button>
        <button type="button" onClick={() => onDelete(d.id)} title="Supprimer" className="hover:text-[#ff4d5e]">
          ✕
        </button>
      </div>
    </div>
  );
}

interface DeadlineTimelineProps {
  deadlines: OsDeadline[];
  graph: Pick<OsGraph, "projects" | "identities">;
  now: Date;
  targets: { id: string; name: string }[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: (label: string, date: string, project: string, owner: string, critical: boolean) => void;
}

/** Timeline complète des deadlines + formulaire d'ajout — porte dlItem()/addDl() du monolithe. */
export function DeadlineTimeline({ deadlines, graph, now, targets, onToggle, onDelete, onAdd }: DeadlineTimelineProps) {
  const [adding, setAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [date, setDate] = useState(() => new Date(now.getTime() + 7 * 86_400_000).toISOString().slice(0, 10));
  const [project, setProject] = useState("");
  const [owner, setOwner] = useState("");
  const [critical, setCritical] = useState(false);

  function submit() {
    if (!label.trim() || !date) return;
    onAdd(label.trim(), date, project, owner.trim(), critical);
    setLabel("");
    setOwner("");
    setCritical(false);
    setAdding(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted">Toutes les deadlines</h2>
        <button type="button" className="fm-link font-grotesk text-sm text-fmaccent" onClick={() => setAdding((a) => !a)}>
          + Deadline
        </button>
      </div>

      {adding && (
        <Card>
          <div className="flex flex-wrap items-center gap-2">
            <input
              className="min-w-[200px] flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
              placeholder="ex : Envoyer les stems à…"
              value={label}
              autoFocus
              onChange={(e) => setLabel(e.target.value)}
            />
            <input
              type="date"
              className="rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
              className="w-40 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
              placeholder="Qui"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
            <label className="flex items-center gap-1.5 font-grotesk text-xs text-fmmuted">
              <input type="checkbox" checked={critical} onChange={(e) => setCritical(e.target.checked)} />
              Critique
            </label>
            <button type="button" className="fm-link font-grotesk text-sm text-fmaccent" onClick={submit}>
              Ajouter
            </button>
            <button type="button" className="fm-link font-grotesk text-sm text-fmmuted" onClick={() => setAdding(false)}>
              Annuler
            </button>
          </div>
        </Card>
      )}

      <Card>
        {deadlines.map((d) => (
          <DeadlineRow
            key={d.id}
            deadline={d}
            projectName={graph.projects.find((p) => p.id === d.project)?.name ?? graph.identities.find((i) => i.id === d.project)?.name}
            now={now}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </Card>
    </div>
  );
}
