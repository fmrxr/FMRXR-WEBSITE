import { cn } from "@/lib/utils";

export type BadgeTone = "default" | "accent" | "primary" | "warn" | "danger";

const TONE_CLASS: Record<BadgeTone, string> = {
  default: "border-fmborder text-fmmuted",
  accent: "border-fmaccent/40 text-fmaccent",
  primary: "border-fmprimary/40 text-fmprimary",
  warn: "border-[#d9a441]/40 text-[#d9a441]",
  danger: "border-[#ff4d5e]/40 text-[#ff4d5e]",
};

export function Badge({ children, tone = "default", className }: { children: React.ReactNode; tone?: BadgeTone; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 font-grotesk text-[10px] uppercase tracking-[0.1em]",
        TONE_CLASS[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
