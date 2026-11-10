"use client";
import { Clock, Download, Film } from "lucide-react";

// Ce que la soiree laisse derriere elle. L'archive se telecharge tout de
// suite, puisqu'elle n'est que la mise en forme de ce que le mur a deja.
// Les trois autres livrables s'assemblent a partir des memes donnees et ne
// sont pas encore fabriques par la plateforme : on le dit, plutot que de
// poser un bouton qui ne rendrait rien.

export function Exports({ slug, m, eventName, eventDate }: {
  slug: string; m: string; eventName: string; eventDate: string;
}) {
  const href = (format: string) => `/api/wall/export?slug=${slug}&m=${m}&format=${format}`;

  // Le reel s'ouvre deja habille : le logo, les couleurs et le nom de
  // l'evenement viennent de la charte, pas d'une saisie a refaire.
  // Le lien ne porte que l'evenement : le monteur va chercher la charte
  // lui-meme, donc le logo et les couleurs sont toujours les derniers
  // enregistres, meme si on les change apres avoir ouvert cette page.
  const reel = `/wall-reel/index.html?${new URLSearchParams({
    slug, m, title: eventName, date: eventDate, place: "", closing: "MERCI À TOUS",
  })}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-fmborder bg-fmcard p-4">
        <h2 className="fm-display text-lg text-fmfg">Reel pour les réseaux</h2>
        <p className="mb-4 mt-1 text-[13px] leading-relaxed text-fmmuted">
          Votre mur monté en vidéo verticale, à votre charte. Le logo, les couleurs et
          le nom de l’événement sont déjà posés ; sur place vous choisissez le montage
          et vous ajustez les textes.
        </p>
        <a href={reel} target="_blank" rel="noreferrer"
          className="flex min-h-12 w-fit items-center gap-2 rounded-full bg-fmaccent px-5 font-semibold text-black">
          <Film className="h-4 w-4" /> Ouvrir le monteur
        </a>
      </div>

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
          Le mur relit sa soirée et assemble ces pièces tout seul, à partir des mêmes
          messages. Elles arrivent ici une fois l’événement clos.
        </p>
        <ul className="grid gap-px overflow-hidden rounded-lg border border-fmborder bg-fmborder sm:grid-cols-2">
          {[
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
