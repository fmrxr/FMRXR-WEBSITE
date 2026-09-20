import type { HealthFacet, HealthState } from "@/lib/os/today";
import { TODAY_COPY } from "@/lib/os/today-copy";
import { Badge, type BadgeTone } from "../Badge";

const STATE_TONE: Record<HealthState, BadgeTone> = {
  ok: "accent",
  tendu: "warn",
  critique: "danger",
};

/**
 * Trois états nommés au lieu d'un score sur 100. Chaque pastille porte sa raison en `title`, pour
 * que l'indicateur reste explicable au lieu d'agréger ses composantes dans un nombre opaque.
 */
export function HealthChips({ facets }: { facets: HealthFacet[] }) {
  return (
    <div className="text-right">
      <div className="font-grotesk text-[10px] uppercase tracking-[0.16em] text-fmmuted">{TODAY_COPY.health.label}</div>
      <div className="mt-1.5 flex flex-wrap items-center justify-end gap-1.5">
        {facets.map((f) => (
          <span key={f.id} title={f.reason}>
            <Badge tone={STATE_TONE[f.state]}>
              {f.label} {TODAY_COPY.health.states[f.state]}
            </Badge>
            <span className="sr-only">{f.reason}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
