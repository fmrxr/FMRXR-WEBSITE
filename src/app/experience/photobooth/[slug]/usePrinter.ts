"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CampaignConfig } from "@/lib/photobooth/config";

// Impression depuis la borne.
// - mode "agent" : l'agent local (tools/photobooth-print-agent) dit si une
//   imprimante est prete et imprime sans dialogue. Seul moyen de detecter une
//   imprimante : une page web n'y a pas acces.
// - mode "browser" : boite d'impression du navigateur (silencieuse si Chrome
//   est lance avec --kiosk-printing), sans detection possible.

export type PrinterState =
  | { kind: "off" }
  | { kind: "checking" }
  | { kind: "browser" }
  | { kind: "ready"; name: string }
  | { kind: "not_ready"; name: string; status: string }
  | { kind: "none" } // agent joint, aucune imprimante par defaut
  | { kind: "no_agent" }; // agent injoignable

type PrintCfg = CampaignConfig["print"];

export function usePrinter(cfg: PrintCfg, watch: boolean) {
  const [state, setState] = useState<PrinterState>(
    !cfg.enabled ? { kind: "off" } : cfg.mode === "browser" ? { kind: "browser" } : { kind: "checking" },
  );
  const [count, setCount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const alive = useRef(true);
  useEffect(() => () => { alive.current = false; }, []);

  const check = useCallback(async () => {
    if (!cfg.enabled || cfg.mode !== "agent") return;
    try {
      const r = await fetch(`${cfg.agentUrl}/status`, { cache: "no-store", signal: AbortSignal.timeout(3000) });
      const j = await r.json();
      const list = (j.printers ?? []) as { name: string; default: boolean; ready: boolean; status: string }[];
      const target = cfg.printer ? list.find((p) => p.name === cfg.printer) : list.find((p) => p.default);
      if (!alive.current) return;
      if (!target) setState({ kind: "none" });
      else if (target.ready) setState({ kind: "ready", name: target.name });
      else setState({ kind: "not_ready", name: target.name, status: target.status });
    } catch {
      if (alive.current) setState({ kind: "no_agent" });
    }
  }, [cfg.enabled, cfg.mode, cfg.agentUrl, cfg.printer]);

  // Verification au chargement puis toutes les 10 s tant que l'ecran le demande.
  useEffect(() => {
    if (!watch || !cfg.enabled || cfg.mode !== "agent") return;
    const first = window.setTimeout(check, 0);
    const id = window.setInterval(check, 10_000);
    return () => { window.clearTimeout(first); window.clearInterval(id); };
  }, [watch, check, cfg.enabled, cfg.mode]);

  const canPrint = cfg.enabled && count < cfg.maxPrints && !busy &&
    (state.kind === "browser" || state.kind === "ready");

  const print = useCallback(async (imageUrl: string, jobBase: string) => {
    if (!canPrint) return;
    setError(null);
    if (cfg.mode === "browser") {
      window.print();
      setCount((n) => n + 1);
      return;
    }
    setBusy(true);
    try {
      const blob = await (await fetch(imageUrl)).blob();
      const dataUrl = await new Promise<string>((ok, ko) => {
        const fr = new FileReader();
        fr.onload = () => ok(String(fr.result));
        fr.onerror = ko;
        fr.readAsDataURL(blob);
      });
      const r = await fetch(`${cfg.agentUrl}/print`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: dataUrl, copies: 1, printer: cfg.printer, paper: cfg.paper, fit: cfg.fit,
          // une impression = un identifiant : un double appui n'imprime pas deux fois
          jobId: `${jobBase}-${count + 1}`,
        }),
        signal: AbortSignal.timeout(120_000),
      });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error ?? "PRINT_FAILED");
      setCount((n) => n + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "PRINT_FAILED");
      check();
    } finally {
      setBusy(false);
    }
  }, [canPrint, cfg, count, check]);

  const reset = useCallback(() => { setCount(0); setError(null); }, []);

  return { state, canPrint, print, busy, count, error, reset, check };
}

export const PAGE_SIZE: Record<CampaignConfig["print"]["paper"], string> = {
  "10x15": "100mm 150mm",
  "13x18": "127mm 178mm",
  A6: "A6",
  A5: "A5",
  A4: "A4",
};
