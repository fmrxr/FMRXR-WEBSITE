import { cn } from "@/lib/utils";

interface StatProps {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  tone?: "default" | "accent" | "warn" | "danger";
}

const TONE_CLASS: Record<NonNullable<StatProps["tone"]>, string> = {
  default: "text-fmfg",
  accent: "text-fmaccent",
  warn: "text-[#d9a441]",
  danger: "text-[#ff4d5e]",
};

export function Stat({ label, value, sub, tone = "default" }: StatProps) {
  return (
    <div>
      <div className="font-grotesk text-xs uppercase tracking-[0.14em] text-fmmuted">{label}</div>
      <div className={cn("font-display mt-1 text-2xl md:text-3xl", TONE_CLASS[tone])}>{value}</div>
      {sub ? <div className="mt-1 text-xs text-fmmuted">{sub}</div> : null}
    </div>
  );
}
