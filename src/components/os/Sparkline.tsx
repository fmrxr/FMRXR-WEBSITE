import type { MonthlyPoint } from "@/lib/os/compute";

/** Sparkline 12 mois facturé/encaissé — partagé entre Dashboard et Finance. */
export function Sparkline({ series }: { series: MonthlyPoint[] }) {
  const max = Math.max(...series.map((s) => Math.max(s.paid, s.billed)), 1);
  const W = 580;
  const H = 72;
  const bw = W / series.length;
  return (
    <svg viewBox={`0 0 ${W} ${H + 18}`} className="w-full" style={{ height: 96 }}>
      {series.map((s, i) => {
        const hb = Math.max((s.billed / max) * H, s.billed ? 2 : 0);
        const hp = Math.max((s.paid / max) * H, s.paid ? 2 : 0);
        return (
          <g key={s.key}>
            <rect x={i * bw + 5} y={H - hb} width={bw - 14} height={hb} rx={2} fill="rgba(255,255,255,.10)" />
            <rect x={i * bw + 5} y={H - hp} width={bw - 14} height={hp} rx={2} fill="#ff4d5e" />
            <text x={i * bw + bw / 2} y={H + 14} textAnchor="middle" fontSize="9" fill="var(--color-fmmuted)">
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
