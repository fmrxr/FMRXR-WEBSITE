import Link from "next/link";
import type { DashboardAlert } from "@/lib/os/compute";

/** Sortie du moteur d'alertes — porte la boucle `alerts.map(...)` de RENDER.dashboard. */
export function AlertsList({ alerts }: { alerts: DashboardAlert[] }) {
  return (
    <div className="flex flex-col gap-2">
      {alerts.map((a, i) => (
        <Link key={i} href={a.href} className="block no-underline">
          <div className={`fm-glass-card flex items-start gap-3 rounded-xl border p-3 ${a.critical ? "border-[#ff4d5e]/30" : "border-fmborder"}`}>
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${a.critical ? "bg-[#ff4d5e]" : "bg-[#d9a441]"}`} />
            <div>
              <div className="font-grotesk text-sm text-fmfg">{a.title}</div>
              <div className="font-grotesk text-xs text-fmmuted">{a.sub}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
