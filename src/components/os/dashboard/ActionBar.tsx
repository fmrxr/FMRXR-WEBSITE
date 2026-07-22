"use client";

import Link from "next/link";
import { useDisplayCurrency } from "../Money";

const linkClass = "rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-sm text-fmfg hover:border-fmaccent/40";

/** Barre d'actions — porte la rangée de boutons de RENDER.dashboard. */
export function ActionBar({ journalUnsynced }: { journalUnsynced: boolean }) {
  const { privacy, togglePrivacy } = useDisplayCurrency();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link href="/os/projets" className={linkClass}>
        + Projet
      </Link>
      <Link href="/os/legacy#finance" className={`${linkClass} text-fmmuted`}>
        + Facture
      </Link>
      <Link href="/os/legacy#finance" className={`${linkClass} text-fmmuted`}>
        + Devis
      </Link>
      <Link href="/os/legacy#crm" className={`${linkClass} text-fmmuted`}>
        + Client
      </Link>
      <button type="button" onClick={togglePrivacy} className={`${linkClass} text-fmmuted`}>
        {privacy ? "🔓 Afficher les montants" : "🔒 Présentation"}
      </button>
      <span className="flex-1" />
      {journalUnsynced ? (
        <span className="rounded-full border border-[#d9a441]/40 px-2.5 py-1 font-grotesk text-xs text-[#d9a441]">
          journal à synchroniser
        </span>
      ) : (
        <span className="rounded-full border border-fmaccent/40 px-2.5 py-1 font-grotesk text-xs text-fmaccent">mémoire Claude à jour</span>
      )}
    </div>
  );
}
