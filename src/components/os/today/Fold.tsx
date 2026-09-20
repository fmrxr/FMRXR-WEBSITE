"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { TODAY_COPY } from "@/lib/os/today-copy";

/**
 * Repli de niveau 3 : l'information reste accessible mais cesse de crier. L'état d'ouverture est
 * une préférence locale, sans conséquence si le stockage du navigateur est indisponible.
 */
export function Fold({
  id,
  title,
  summary,
  children,
  defaultOpen = false,
}: {
  id: string;
  title: string;
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const storageKey = `fmrxr-cc-fold-${id}-v1`;
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      // Préférence propre au navigateur, lue une fois au montage.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved === "1" || saved === "0") setOpen(saved === "1");
    } catch {
      // stockage indisponible : on garde l'état par défaut
    }
  }, [storageKey]);

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(storageKey, next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  }, [storageKey]);

  return (
    <section className="rounded-2xl border border-fmborder bg-fmcard/40 px-4 py-3">
      <button type="button" onClick={toggle} aria-expanded={open} className="flex w-full items-center justify-between gap-4 text-left">
        <span className="font-grotesk text-xs text-fmmuted">
          <span aria-hidden="true">{open ? "▾" : "▸"}</span> <span className="text-fmfg">{title}</span>
          {summary ? `, ${summary}` : ""}
        </span>
        <span className="shrink-0 rounded-full border border-fmborder px-2 py-0.5 font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">
          {open ? TODAY_COPY.debt.collapse : TODAY_COPY.debt.expand}
        </span>
      </button>
      {open && <div className="mt-3 border-t border-fmborder pt-3">{children}</div>}
    </section>
  );
}
