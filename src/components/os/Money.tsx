"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useOs } from "@/lib/os/store";
import type { Currency } from "@/lib/os/types";

const STORAGE_KEY = "fmrxr-disp";
const FALLBACK_RATE = 3.38;

interface DisplayCurrencyValue {
  display: Currency;
  toggle: () => void;
  set: (c: Currency) => void;
  /** Mode présentation (masque les montants pour le partage d'écran) — global, comme togglePrivacy() dans le monolithe. */
  privacy: boolean;
  togglePrivacy: () => void;
}

const DisplayCurrencyContext = createContext<DisplayCurrencyValue | null>(null);

/** Bascule TND/€ persistée en localStorage (même clé que le monolithe : `fmrxr-disp`). */
export function DisplayCurrencyProvider({ children }: { children: ReactNode }) {
  const [display, setDisplay] = useState<Currency>("TND");
  const [privacy, setPrivacy] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // One-time read of a browser-only preference on mount; no SSR value to derive it from,
      // same pattern as src/hooks/use-mobile.ts.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved === "TND" || saved === "EUR") setDisplay(saved);
    } catch {
      // localStorage indisponible (SSR/privé) — reste sur TND
    }
  }, []);

  const set = useCallback((c: Currency) => {
    setDisplay(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(() => set(display === "TND" ? "EUR" : "TND"), [display, set]);
  const togglePrivacy = useCallback(() => setPrivacy((p) => !p), []);

  return (
    <DisplayCurrencyContext.Provider value={{ display, toggle, set, privacy, togglePrivacy }}>{children}</DisplayCurrencyContext.Provider>
  );
}

export function useDisplayCurrency(): DisplayCurrencyValue {
  const ctx = useContext(DisplayCurrencyContext);
  if (!ctx) throw new Error("useDisplayCurrency must be used within <DisplayCurrencyProvider>");
  return ctx;
}

/**
 * `amountTND` doit toujours être déjà consolidé en TND (via compute.ts `toTND`) — la devise
 * d'émission de la facture/du devis source reste la référence ailleurs ; ceci n'est qu'un affichage.
 */
export function Money({ amountTND, className }: { amountTND: number; className?: string }) {
  const { display, privacy } = useDisplayCurrency();
  const { graph } = useOs();
  const rate = graph?.meta?.eur_tnd || FALLBACK_RATE;

  if (privacy) return <span className={className}>••••</span>;

  if (display === "EUR") {
    return <span className={className}>{Math.round(amountTND / rate).toLocaleString("fr-FR")} €</span>;
  }
  return <span className={className}>{Math.round(amountTND).toLocaleString("fr-FR")} TND</span>;
}
