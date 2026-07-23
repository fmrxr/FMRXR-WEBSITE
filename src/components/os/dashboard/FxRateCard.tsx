"use client";

import { useEffect, useState } from "react";
import { Card, CardTitle } from "../Card";
import { useOs } from "@/lib/os/store";

interface LiveRate {
  rate: number;
  asOf: string | null;
}

/** Taux marché EUR→TND en direct (API publique) vs taux configuré — jamais appliqué automatiquement. */
export function FxRateCard() {
  const { graph, mutate, logChange } = useOs();
  const [live, setLive] = useState<LiveRate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/os/fx-rate")
      .then((r) => r.json())
      .then((json: { rate?: number; asOf?: string | null; error?: string }) => {
        if (cancelled) return;
        if (json.error || typeof json.rate !== "number") setError(json.error ?? "réponse invalide");
        else setLive({ rate: json.rate, asOf: json.asOf ?? null });
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!graph) return null;
  const configured = graph.meta?.eur_tnd ?? 3.38;
  const deltaPct = live ? ((live.rate - configured) / configured) * 100 : null;

  function applyLiveRate() {
    if (!live) return;
    const old = configured;
    mutate((draft) => {
      draft.meta = draft.meta || {};
      draft.meta.eur_tnd = live.rate;
    });
    logChange("update", "meta", `taux EUR→TND : ${old} → ${live.rate} (aligné sur le taux marché)`);
  }

  return (
    <Card>
      <CardTitle>Taux EUR → TND</CardTitle>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-display text-xl text-fmfg md:text-2xl">{configured.toFixed(3)}</span>
        <span className="font-grotesk text-xs text-fmmuted">configuré · fait foi sur les factures</span>
      </div>
      <div className="mt-2 font-grotesk text-xs text-fmmuted">
        {loading ? (
          "chargement du taux marché…"
        ) : error ? (
          `taux marché indisponible (${error})`
        ) : live ? (
          <>
            marché : <span className="text-fmfg">{live.rate.toFixed(3)}</span>{" "}
            {deltaPct !== null && (
              <span className={Math.abs(deltaPct) < 1 ? "text-fmmuted" : deltaPct > 0 ? "text-[#d9a441]" : "text-fmprimary"}>
                ({deltaPct >= 0 ? "+" : ""}
                {deltaPct.toFixed(1)}%)
              </span>
            )}
          </>
        ) : null}
      </div>
      {live && Math.abs(deltaPct ?? 0) >= 1 && (
        <button
          type="button"
          onClick={applyLiveRate}
          className="mt-3 rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-xs text-fmfg hover:border-fmaccent/40"
        >
          Mettre à jour vers {live.rate.toFixed(3)}
        </button>
      )}
    </Card>
  );
}
