"use client";

import { Badge } from "../Badge";
import { oppDeadlineStatus } from "@/lib/os/compute";
import type { OpportunityStatus, OsIdentity, OsOpportunity } from "@/lib/os/types";

const STATUS_LABELS: Record<OpportunityStatus, string> = {
  lead: "piste",
  contact: "contacté",
  proposal: "proposition",
  won: "gagné",
  lost: "perdu",
  expired: "deadline dépassée",
};

interface OpportunityRowProps {
  opportunity: OsOpportunity;
  identities: OsIdentity[];
  now: Date;
  onStatusChange: (id: string, status: OpportunityStatus) => void;
  onDelete: (id: string) => void;
}

/** Ligne d'opportunité — porte oppRow() de RENDER.bdm. */
export function OpportunityRow({ opportunity: o, identities, now, onStatusChange, onDelete }: OpportunityRowProps) {
  const dl = oppDeadlineStatus(o, now);
  const linkColor = dl.status === "expired" ? "text-fmmuted" : dl.status === "urgent" ? "text-[#ff4d5e]" : "text-fmfg";
  const identityName = identities.find((i) => i.id === o.identity)?.name;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-fmborder py-2.5 last:border-0">
      <Badge>{o.type}</Badge>
      <div className="min-w-[160px] flex-1">
        {o.url ? (
          <a
            href={o.url}
            target="_blank"
            rel="noreferrer"
            className={`font-grotesk text-sm underline-offset-2 hover:underline ${linkColor}`}
          >
            {o.name} ↗
          </a>
        ) : (
          <span className={`font-grotesk text-sm ${linkColor}`}>{o.name}</span>
        )}
        {o.notes && <div className="mt-0.5 font-grotesk text-xs text-fmmuted">{o.notes}</div>}
      </div>
      {identityName && <Badge>{identityName}</Badge>}
      {dl.status !== "none" && (
        <Badge tone={dl.status === "urgent" ? "danger" : dl.status === "soon" ? "warn" : "default"}>
          {dl.days != null ? `J-${dl.days}` : o.deadline}
        </Badge>
      )}
      <select
        value={o.status}
        onChange={(e) => onStatusChange(o.id, e.target.value as OpportunityStatus)}
        className="rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
      >
        {Object.entries(STATUS_LABELS).map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
      <button type="button" onClick={() => onDelete(o.id)} className="px-0.5 text-fmmuted hover:text-[#ff4d5e]" title="Retirer">
        ✕
      </button>
    </div>
  );
}
