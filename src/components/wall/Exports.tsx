"use client";
import { Download, Clock } from "lucide-react";

// Ce que la soiree laisse derriere elle. L'archive se telecharge tout de
// suite, puisqu'elle n'est que la mise en forme de ce que le mur a deja.
// Les trois autres livrables s'assemblent a partir des memes donnees et ne
// sont pas encore fabriques par la plateforme : on le dit, plutot que de
// poser un bouton qui ne rendrait rien.

export function Exports({ slug, m }: { slug: string; m: string }) {
  const href = (format: string) => `/api/wall/export?slug=${slug}&m=${m}&format=${format}`;
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-fmborder bg-fmcard p-4">
        <h2 className="fm-display text-lg text-fmfg">L’archive</h2>
        <p className="mb-4 mt-1 text-[13px] leading-relaxed text-fmmuted">
          Tous les messages publiés, avec leur auteur, leur heure, leurs mentions j’aime
          et leurs commentaires. Disponible pendant toute la soirée, et après.
        </p>
        <div className="flex flex-wrap gap-2">
          <a href={href("csv")} download
            className="flex min-h-12 items-center gap-2 rounded-full bg-fmaccent px-5 font-semibold text-black">
            <Download className="h-4 w-4" /> Tableau (CSV)
          </a>
          <a href={href("json")} download
            className="flex min-h-12 items-center gap-2 rounded-full border border-fmborder px-5 text-sm text-fmfg">
            <Download className="h-4 w-4" /> Données (JSON)
          </a>
        </div>
      </div>

      <div className="rounded-xl border border-fmborder bg-fmcard p-4">
        <h2 className="fm-display text-lg text-fmfg">Après l’événement</h2>
        <p className="mb-4 mt-1 text-[13px] leading-relaxed text-fmmuted">
          Le mur relit sa soirée et assemble ces trois pièces tout seul, à partir des
          mêmes messages. Elles arrivent ici une fois l’événement clos.
        </p>
        <ul className="grid gap-px overflow-hidden rounded-lg border border-fmborder bg-fmborder sm:grid-cols-3">
          {[
            ["Reel pour les réseaux", "Vertical 9:16, les dessins rejoués trait par trait, la carte la plus aimée pour finir."],
            ["Fresque imprimable", "Toutes les cartes validées, à votre charte, en grand format et en A3."],
            ["Kit emailing", "Image d’en-tête, cartes détourées et bloc HTML à coller dans votre outil."],
          ].map(([k, v]) => (
            <li key={k} className="bg-fmbg p-4">
              <p className="fm-display text-[15px] text-fmfg">{k}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-fmmuted">{v}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-fmborder px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-fmmuted">
                <Clock className="h-3 w-3" /> à venir
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
