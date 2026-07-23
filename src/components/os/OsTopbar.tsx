"use client";

import { usePathname } from "next/navigation";
import { moduleByHref } from "@/lib/os/nav";
import { useOs } from "@/lib/os/store";
import { useDisplayCurrency } from "./Money";

interface OsTopbarProps {
  onOpenNav: () => void;
}

export function OsTopbar({ onOpenNav }: OsTopbarProps) {
  const pathname = usePathname();
  const mod = moduleByHref(pathname);
  const { loading, saving, error, lastSavedAt, conflict, resolveConflictKeepMine, resolveConflictTakeRemote } = useOs();
  const { display, toggle } = useDisplayCurrency();

  return (
    <header className="fm-glass-card flex items-center justify-between gap-3 rounded-none border-x-0 border-t-0 px-4 py-3 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button type="button" onClick={onOpenNav} aria-label="Ouvrir le menu" className="shrink-0 font-grotesk text-lg text-fmfg md:hidden">
          ☰
        </button>
        <div className="truncate font-grotesk text-sm text-fmmuted">
          {mod ? (
            <>
              <span className="hidden sm:inline">{mod.group}</span>
              <span className="mx-1.5 hidden text-fmborder sm:inline">/</span>
              <span className="text-fmfg">{mod.label}</span>
            </>
          ) : (
            <span className="text-fmfg">FMRXR OS</span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 md:gap-4">
        {conflict ? (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-[#ff4d5e]/40 px-3 py-1 font-grotesk text-xs text-[#ff4d5e]">
            <span className="hidden sm:inline">Conflit de sauvegarde — modifié ailleurs</span>
            <span className="sm:hidden">Conflit</span>
            <button type="button" onClick={resolveConflictTakeRemote} className="underline">
              reprendre le distant
            </button>
            <button type="button" onClick={() => void resolveConflictKeepMine()} className="underline">
              écraser
            </button>
          </div>
        ) : (
          <span className="hidden font-grotesk text-xs text-fmmuted sm:inline">
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

        <span className="hidden font-grotesk text-xs text-fmmuted lg:inline">Tous les businesses</span>

        <button
          type="button"
          disabled
          title="Recherche — bientôt"
          className="hidden rounded-lg border border-fmborder px-2 py-1 font-grotesk text-xs text-fmmuted opacity-50 md:inline-flex"
        >
          ⌘K
        </button>
      </div>
    </header>
  );
}
