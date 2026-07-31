import type { OsClient } from "@/lib/os/types";

interface ClientSegmentListProps {
  clients: OsClient[];
  onOpenClient: (id: string) => void;
}

/** Clients groupés par segment (chips) — porte la boucle segments de RENDER.crm. */
export function ClientSegmentList({ clients, onOpenClient }: ClientSegmentListProps) {
  const segments = Array.from(new Set(clients.map((c) => c.segment || "Autre")));

  return (
    <div className="flex flex-col gap-5">
      {segments.map((seg) => (
        <div key={seg}>
          <div className="mb-2 font-grotesk text-[10px] uppercase tracking-[0.14em] text-fmmuted">{seg}</div>
          <div className="flex flex-wrap gap-2">
            {clients
              .filter((c) => (c.segment || "Autre") === seg)
              .map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onOpenClient(c.id)}
                  className="rounded-full border border-fmborder px-3 py-1 font-grotesk text-xs text-fmfg hover:border-fmaccent/40"
                >
                  {c.name}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
