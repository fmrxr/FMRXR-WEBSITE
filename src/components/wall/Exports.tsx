"use client";
import { Download, Film } from "lucide-react";

// Ce que la soiree laisse derriere elle : le reel (monteur), l'archive
// (CSV, JSON), puis la planche imprimable, les cartes en images et le kit
// emailing, fabriques par la page /experience/wall/<slug>/kit.

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
          Fabriqués par votre navigateur à partir des cartes publiées, à votre charte. Disponibles
          pendant la soirée et après, autant de fois que vous voulez.
        </p>
        <ul className="grid gap-px overflow-hidden rounded-lg border border-fmborder bg-fmborder sm:grid-cols-3">
          {([
            ["print", "Planche imprimable", "Toutes les cartes sur une feuille A3, A2, A1 ou A0, en PDF vectoriel pour l’imprimeur."],
            ["images", "Cartes en images", "Une image PNG par carte, sur fond transparent, avec le tableau et les données, en ZIP."],
            ["mail", "Kit emailing", "Image d’en-tête, cartes les plus aimées détourées et bloc HTML à coller, en ZIP."],
          ] as const).map(([tab, k, v]) => (
            <li key={k} className="flex flex-col bg-fmbg p-4">
              <p className="fm-display text-[15px] text-fmfg">{k}</p>
              <p className="mt-1 flex-1 text-[12px] leading-relaxed text-fmmuted">{v}</p>
              <a href={`/experience/wall/${slug}/kit?m=${m}&tab=${tab}`} target="_blank" rel="noreferrer"
                className="mt-3 flex min-h-11 w-fit items-center gap-2 rounded-full border border-fmborder px-4 text-sm text-fmfg hover:border-fmaccent/60">
                <Download className="h-4 w-4" /> Ouvrir
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
