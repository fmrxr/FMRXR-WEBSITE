"use client";

import { useEffect, useState } from "react";

const KHOJ_URL = "http://127.0.0.1:42110";

async function fetchOnline(): Promise<boolean> {
  try {
    // Khoj n'envoie pas d'en-têtes CORS — on ne peut pas lire la réponse, seulement constater
    // qu'elle arrive (mode "no-cors"). Une erreur ici veut dire "port fermé", pas "réponse invalide".
    await fetch(`${KHOJ_URL}/`, { mode: "no-cors", cache: "no-store", signal: AbortSignal.timeout(1500) });
    return true;
  } catch {
    return false;
  }
}

type LaunchState = "idle" | "launching" | "launched" | string;

async function launchKhoj(): Promise<LaunchState> {
  try {
    const r = await fetch("/api/os/khoj/launch", { method: "POST" });
    const j = await r.json();
    if (!r.ok) return j.error || `erreur ${r.status}`;
    return "launched";
  } catch (e) {
    return (e as Error).message;
  }
}

/** Carte "Brain externe" — démarre et ouvre le serveur Khoj local (khoj/start-khoj.bat, port 42110). */
export function KhojLocalCard() {
  const [online, setOnline] = useState<boolean | "loading">("loading");
  const [launchState, setLaunchState] = useState<LaunchState>("idle");

  function refresh() {
    setOnline("loading");
    fetchOnline().then(setOnline);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function launch() {
    setLaunchState("launching");
    const result = await launchKhoj();
    setLaunchState(result);
    if (result === "launched") {
      // Premier démarrage : Khoj charge ses modèles d'embedding avant d'écouter — laisser le temps.
      setTimeout(refresh, 6000);
    }
  }

  return (
    <div className="fm-glass-card rounded-2xl p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="font-grotesk text-sm font-semibold text-fmfg">Khoj — second cerveau local</div>
        <div className="flex items-center gap-2">
          {online !== true && (
            <button
              type="button"
              onClick={launch}
              disabled={launchState === "launching"}
              className="rounded-lg border border-fmaccent/40 px-3 py-1.5 font-grotesk text-xs text-fmaccent hover:bg-fmaccent/10 disabled:opacity-50"
            >
              {launchState === "launching" ? "Lancement…" : "▶ Lancer Khoj"}
            </button>
          )}
          <a
            href={KHOJ_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-fmaccent/40 px-3 py-1.5 font-grotesk text-xs text-fmaccent hover:bg-fmaccent/10"
          >
            ⚡ Ouvrir Khoj
          </a>
          <button type="button" onClick={refresh} className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-xs text-fmmuted hover:border-fmaccent/40">
            ↺ Rafraîchir
          </button>
        </div>
      </div>

      {launchState === "launched" && (
        <p className="mt-2 font-grotesk text-xs text-fmaccent">▶ Lancé — une fenêtre console s&apos;ouvre sur ce poste (chargement des modèles puis démarrage, patiente quelques secondes).</p>
      )}
      {launchState !== "idle" && launchState !== "launching" && launchState !== "launched" && (
        <p className="mt-2 font-grotesk text-xs text-[#ff4d5e]">✗ Échec du lancement — {launchState}</p>
      )}

      <div className="mt-2.5 font-grotesk text-xs">
        {online === "loading" ? (
          <span className="text-fmmuted">Vérification…</span>
        ) : online ? (
          <span className="text-fmaccent">● En ligne — {KHOJ_URL}</span>
        ) : (
          <span className="text-[#ff4d5e]">⚫ Hors ligne — clique &laquo;&nbsp;Lancer Khoj&nbsp;&raquo;</span>
        )}
      </div>

      <p className="mt-2 font-grotesk text-[10.5px] text-fmmuted">
        Premier lancement : Khoj demande de créer un compte admin (email + mot de passe) puis de choisir un modèle de
        chat (une clé API Anthropic/OpenAI/Gemini peut être renseignée à cette étape). Statut et lancement accessibles
        uniquement depuis ce poste — l&apos;app hébergée ne peut ni voir ni démarrer le serveur local à distance.
      </p>
    </div>
  );
}
