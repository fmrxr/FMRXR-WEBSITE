"use client";

import { useEffect, useState } from "react";

const CF_URL = "http://127.0.0.1:5099";
const STEP_NAMES = [
  "",
  "Ingestion",
  "Détection scènes",
  "Filtre qualité",
  "Scoring",
  "Sync BPM",
  "Smart Crop",
  "Prévisualisation LUT",
  "Application LUT",
  "Normalisation audio",
  "Overlay + Export",
];

interface CfStatus {
  running?: boolean;
  done?: boolean;
  error?: string;
  step?: number;
  config_id?: string;
  results?: Record<string, { count?: number }>;
}

async function fetchStatus(): Promise<CfStatus | null> {
  try {
    const r = await fetch(`${CF_URL}/api/status`, { cache: "no-store", signal: AbortSignal.timeout(1500) });
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
}

type LaunchState = "idle" | "launching" | "launched" | string;

async function launchLocalPipeline(): Promise<LaunchState> {
  try {
    const r = await fetch("/api/os/content-factory/launch", { method: "POST" });
    const j = await r.json();
    if (!r.ok) return j.error || `erreur ${r.status}`;
    return "launched";
  } catch (e) {
    return (e as Error).message;
  }
}

/**
 * Statut best-effort du pipeline local (serveur Node sur 127.0.0.1:5099) — porte cfStatus()/
 * refreshCFStatus() du monolithe. Ne fonctionne que si l'app est ouverte depuis le même poste,
 * avec le serveur lancé (CONTENT_FACTORY/launch.bat) ; sinon repli honnête sur "hors ligne".
 */
export function CfLocalInterfaceCard() {
  const [status, setStatus] = useState<CfStatus | null | "loading">("loading");
  const [launchState, setLaunchState] = useState<LaunchState>("idle");

  useEffect(() => {
    let cancelled = false;
    fetchStatus().then((s) => {
      if (!cancelled) setStatus(s);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function refresh() {
    setStatus("loading");
    fetchStatus().then(setStatus);
  }

  async function launch() {
    setLaunchState("launching");
    const result = await launchLocalPipeline();
    setLaunchState(result);
    if (result === "launched") {
      // Le script installe ses dépendances puis démarre le serveur — on laisse le temps de booter
      // avant de vérifier le statut, sans bloquer l'UI (délai fixe, pas un polling serré).
      setTimeout(refresh, 4000);
    }
  }

  const online = status !== "loading" && status !== null;

  return (
    <div className="fm-glass-card rounded-2xl p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="font-grotesk text-sm font-semibold text-fmfg">Interface locale — pipeline vidéo</div>
        <div className="flex items-center gap-2">
          {!online && (
            <button
              type="button"
              onClick={launch}
              disabled={launchState === "launching"}
              className="rounded-lg border border-fmaccent/40 px-3 py-1.5 font-grotesk text-xs text-fmaccent hover:bg-fmaccent/10 disabled:opacity-50"
            >
              {launchState === "launching" ? "Lancement…" : "▶ Lancer launch.bat"}
            </button>
          )}
          <a
            href={CF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-fmaccent/40 px-3 py-1.5 font-grotesk text-xs text-fmaccent hover:bg-fmaccent/10"
          >
            ⚡ Ouvrir l&apos;interface
          </a>
          <button type="button" onClick={refresh} className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-xs text-fmmuted hover:border-fmaccent/40">
            ↺ Rafraîchir
          </button>
        </div>
      </div>

      {launchState === "launched" && (
        <p className="mt-2 font-grotesk text-xs text-fmaccent">▶ Lancé — une fenêtre s&apos;ouvre sur ce poste (installation des dépendances puis démarrage, patiente quelques secondes).</p>
      )}
      {launchState !== "idle" && launchState !== "launching" && launchState !== "launched" && (
        <p className="mt-2 font-grotesk text-xs text-[#ff4d5e]">✗ Échec du lancement — {launchState}</p>
      )}

      <div className="mt-2.5 font-grotesk text-xs">
        {status === "loading" ? (
          <span className="text-fmmuted">Vérification…</span>
        ) : !online ? (
          <span className="text-[#ff4d5e]">⚫ Hors ligne — lance CONTENT_FACTORY/launch.bat sur ce poste</span>
        ) : status.running ? (
          <span className="text-[#d9a441]">
            ⟳ En cours — étape {status.step || 0}/10 : {STEP_NAMES[status.step || 0] || "—"}
            {status.config_id && <span className="ml-1.5 rounded-full border border-fmborder px-1.5 py-0.5 text-[10px] text-fmmuted">{status.config_id}</span>}
          </span>
        ) : status.done && !status.error ? (
          <span className="text-fmaccent">
            ✓ Terminé — {Object.values(status.results || {}).reduce((s, v) => s + (v.count || 0), 0)} clips exportés
          </span>
        ) : status.error ? (
          <span className="text-[#ff4d5e]">✗ Erreur — {status.error.slice(0, 100)}</span>
        ) : (
          <span className="text-fmaccent">● En ligne</span>
        )}
      </div>

      <p className="mt-2 font-grotesk text-[10.5px] text-fmmuted">
        Statut et lancement accessibles uniquement depuis ce poste — l&apos;app hébergée ne peut ni voir ni démarrer le serveur local à distance.
      </p>
    </div>
  );
}
