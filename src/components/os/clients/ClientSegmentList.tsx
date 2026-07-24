import Link from "next/link";
import type { OsClient } from "@/lib/os/types";

/** Clients groupés par segment (chips) — porte la boucle segments de RENDER.crm. */
export function ClientSegmentList({ clients }: { clients: OsClient[] }) {
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
                <Link
                  key={c.id}
                  href="/os/legacy#crm"
                  className="rounded-full border border-fmborder px-3 py-1 font-grotesk text-xs text-fmfg hover:border-fmaccent/40"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
