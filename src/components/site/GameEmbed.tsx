"use client";

import { useState } from "react";

// Un projet jouable se montre en le jouant. La page projet embarque donc le jeu
// réel plutôt qu'une captation.
//
// L'iframe n'est pas posée au chargement : tant que le visiteur n'a pas cliqué,
// il n'y a qu'une image. Trois raisons. Le jeu est une application complète,
// l'imposer à quelqu'un qui scrolle coûte cher en bande passante. Il démarre
// sur une bande-son, et un son qui part tout seul dans une page de portfolio
// est une faute. Et un domaine tiers n'a pas à savoir qu'on a ouvert la page
// avant qu'on ait décidé d'y jouer.
export function GameEmbed({
  url,
  poster,
  title,
  label = "Play the game",
}: {
  url: string;
  poster?: string;
  title: string;
  label?: string;
}) {
  const [live, setLive] = useState(false);
  // La caméra et le micro ne sont délégués qu'à nos propres expériences
  // (fmrxr.com/experiences/), jamais à une page tierce.
  const ours = /^(https:\/\/fmrxr\.com)?\/experiences\//.test(url);

  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-fmborder bg-fmbg sm:aspect-[4/3] lg:aspect-video">
      {live ? (
        <iframe
          src={url}
          title={title}
          allow={`fullscreen; autoplay; clipboard-write${ours ? "; camera; microphone" : ""}`}
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLive(true)}
          aria-label={`${label}: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {poster && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-55 transition-opacity duration-500 group-hover:opacity-80"
            />
          )}
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-fmaccent/60 bg-fmbg/70 text-fmaccent backdrop-blur transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="fm-grotesk text-[11px] uppercase tracking-[0.22em] text-fmfg">{label}</span>
          </span>
        </button>
      )}

      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-3 right-3 rounded-full border border-fmborder bg-fmbg/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-fmmuted backdrop-blur transition-colors hover:text-fmfg"
      >
        Open in a new tab ↗
      </a>
    </div>
  );
}
