import type { QuotaLevel } from "@/lib/photobooth/quota";

const STATUS: Record<string, [string, string]> = {
  draft: ["Brouillon", "bg-muted text-muted-foreground"],
  active: ["Active", "bg-fmaccent/20 text-fmaccent"],
  suspended: ["Suspendue", "bg-amber-500/20 text-amber-300"],
  ended: ["Terminée", "bg-muted text-muted-foreground"],
};

export function StatusBadge({ status }: { status: string }) {
  const [label, cls] = STATUS[status] ?? [status, "bg-muted"];
  return <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wide ${cls}`}>{label}</span>;
}

const BAR: Record<QuotaLevel, string> = {
  ok: "bg-fmaccent",
  warning: "bg-amber-400",
  critical: "bg-orange-500",
  blocked: "bg-red-500",
};

export function QuotaBar({ q, quota }: { q: { used: number; remaining: number; pct: number; level: QuotaLevel }; quota: number }) {
  return (
    <div className="mt-3">
      <div className="flex items-baseline justify-between text-sm">
        <span><strong>{q.used}</strong> / {quota} images</span>
        <span className={q.level === "ok" ? "text-muted-foreground" : "font-medium"}>
          {q.level === "blocked" ? "Quota atteint, génération bloquée" : `${q.remaining} restantes · ${q.pct.toFixed(1)} %`}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className={`h-full ${BAR[q.level]}`} style={{ width: `${q.pct}%` }} />
      </div>
    </div>
  );
}
