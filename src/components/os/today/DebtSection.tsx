"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { DebtItem } from "@/lib/os/today";
import { TODAY_COPY } from "@/lib/os/today-copy";

const STORAGE_KEY = "fmrxr-today-debt-open-v1";

/**
 * Zone 3 : les retards, repliés par défaut et triés par enjeu. Ils ne disparaissent pas, ils
 * cessent seulement de crier. L'état d'ouverture est une préférence locale, sans conséquence si
 * le stockage est indisponible.
 */
export function DebtSection({ items, fossilCount }: { items: DebtItem[]; fossilCount: number }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      // Préférence propre au navigateur, lue une fois au montage (même schéma que Money.tsx).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (localStorage.getItem(STORAGE_KEY) === "1") setOpen(true);
    } catch {
      // stockage indisponible : la section reste repliée
    }
  }, []);

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  if (items.length === 0) {
    return (
      <section className="rounded-2xl border border-fmborder bg-fmcard/40 px-4 py-3">
        <p className="font-grotesk text-xs text-fmmuted">{TODAY_COPY.debt.empty}</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-fmborder bg-fmcard/40 px-4 py-3">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-grotesk text-xs text-fmmuted">
          <span aria-hidden="true">{open ? "▾" : "▸"}</span>{" "}
          <span className="text-fmfg">{TODAY_COPY.debt.title}</span>
          {", "}
          {TODAY_COPY.debt.summary(items.length, fossilCount)}
        </span>
        <span className="shrink-0 rounded-full border border-fmborder px-2 py-0.5 font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">
          {open ? TODAY_COPY.debt.collapse : TODAY_COPY.debt.expand}
        </span>
      </button>

      {open && (
        <ul className="mt-3 flex flex-col gap-2 border-t border-fmborder pt-3">
          {items.map((item) => (
            <li key={`${item.kind}:${item.id}`} className="font-grotesk text-xs leading-snug">
              <Link
                href={item.kind === "deadline" ? "/os/agenda" : "/os/taches"}
                className="text-fmfg no-underline hover:text-fmaccent"
              >
                {item.label}
              </Link>
              <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[10px] text-fmmuted">
                <span>{TODAY_COPY.debt.age(item.daysOverdue)}</span>
                {item.project && <span>{item.project}</span>}
                {item.fossil && (
                  <span
                    title={TODAY_COPY.debt.fossilHint}
                    className="rounded-full border border-fmborder px-1.5 py-px uppercase tracking-[0.1em]"
                  >
                    {TODAY_COPY.debt.fossilTag}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
