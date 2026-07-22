import { Card } from "../Card";
import type { OsLogEntry } from "@/lib/os/types";

const ACTION_LABEL: Record<string, string> = { create: "création", delete: "suppression", update: "modification" };

/** Dernières entrées du journal — porte la section "Activité récente" de RENDER.dashboard. */
export function RecentActivity({ log }: { log: OsLogEntry[] }) {
  return (
    <Card>
      {log.slice(0, 8).map((l, i) => (
        <div key={i} className="flex items-start gap-3 border-b border-fmborder py-2 last:border-0">
          <span className="w-32 shrink-0 font-mono text-[10px] text-fmmuted">
            {new Date(l.ts).toLocaleString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
          </span>
          <span className="font-grotesk text-xs text-fmfg">
            <b>{ACTION_LABEL[l.action] ?? l.action}</b> · {l.entity} — {l.detail}
            {!l.synced && <span className="ml-2 text-[#d9a441]">non sync</span>}
          </span>
        </div>
      ))}
    </Card>
  );
}
