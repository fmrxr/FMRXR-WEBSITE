"use client";
import { useTransition } from "react";
import { markCollabSeen } from "./actions";

export function SeenButton({ count }: { count: number }) {
  const [pending, start] = useTransition();
  if (count === 0) return null;
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => markCollabSeen())}
      className="shrink-0 rounded-full border border-fmborder px-3 py-1 font-grotesk text-[11px] uppercase tracking-[0.1em] text-fmmuted transition-colors hover:border-fmaccent/50 hover:text-fmaccent disabled:opacity-40"
    >
      {pending ? "…" : "Tout marquer comme lu"}
    </button>
  );
}
