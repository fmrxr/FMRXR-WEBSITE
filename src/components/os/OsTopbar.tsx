"use client";

import { usePathname } from "next/navigation";
import { moduleByHref } from "@/lib/os/nav";
import { useOs } from "@/lib/os/store";
import { useDisplayCurrency } from "./Money";

export function OsTopbar() {
  const pathname = usePathname();
  const mod = moduleByHref(pathname);
  const { loading, saving, error, lastSavedAt, conflict, resolveConflictKeepMine, resolveConflictTakeRemote } = useOs();
  const { display, toggle } = useDisplayCurrency();

  return (
    <header className="fm-glass-card flex items-center justify-between rounded-none border-x-0 border-t-0 px-6 py-3">
      <div className="font-grotesk text-sm text-fmmuted">
        {mod ? (
          <>
            <span>{mod.group}</span>
            <span className="mx-1.5 text-fmborder">/</span>
            <span className="text-fmfg">{mod.label}</span>
          </>
        ) : (
          <span className="text-fmfg">FMRXR OS</span>
        )}
      </div>

      <div className="flex items-center gap-4">
        {conflict ? (
          <div className="flex items-center gap-2 rounded-full border border-[#ff4d5e]/40 px-3 py-1 font-grotesk text-xs text-[#ff4d5e]">
            <span>Conflit de sauvegarde — modifié ailleurs</span>
            <button type="button" onClick={resolveConflictTakeRemote} className="underline">
              reprendre le distant
            </button>
            <button type="button" onClick={() => void resolveConflictKeepMine()} className="underline">
              écraser avec le mien
            </button>
          </div>
        ) : (
          <span className="font-grotesk text-xs text-fmmuted">
            {loading
              ? "chargement…"
              : saving
                ? "sauvegarde…"
                : error
                  ? <span className="text-[#ff4d5e]">{error}</span>
                  : lastSavedAt
                    ? `sauvegardé ${new Date(lastSavedAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
                    : "—"}
          </span>
        )}

        <button type="button" onClick={toggle} className="fm-link font-grotesk text-xs text-fmmuted" title="Bascule devise d'affichage">
          {display}
        </button>

        <span className="font-grotesk text-xs text-fmmuted">Tous les businesses</span>

        <button
          type="button"
          disabled
          title="Recherche — bientôt"
          className="rounded-lg border border-fmborder px-2 py-1 font-grotesk text-xs text-fmmuted opacity-50"
        >
          ⌘K
        </button>
      </div>
    </header>
  );
}
