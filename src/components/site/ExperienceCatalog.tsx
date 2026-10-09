"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ProjectRow } from "@/components/site/ProjectRow";
import { CardFilm } from "@/components/site/CardFilm";
import { track } from "@/lib/track";
import { allowFor, experiencesByRow, featuredExperience, findExperience, type Experience } from "@/lib/experiences";

// Le catalogue de /experiences, à la manière d'un service de streaming : un
// grand lecteur en haut, des rangées dessous. Cliquer une carte la charge dans
// le lecteur, sans changer de page.
//
// Rien ne démarre seul. Le lecteur montre d'abord une affiche, l'expérience
// n'est montée qu'au clic sur Play : une page de catalogue qui ouvrirait la
// caméra, lancerait du son ou chargerait 25 Mo de 3D à l'arrivée serait une
// faute. Et une seule expérience vit à la fois : changer de sélection démonte
// l'iframe, ce qui coupe caméra, son et WebGL.

const NEEDS: Record<string, string> = { camera: "Camera", microphone: "Microphone", sound: "Sound on" };

// Écran étroit ou pointeur grossier : les expériences pensées pour la souris
// et le grand écran y affichent un message plutôt que de démarrer mal.
function useSmallScreen() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const on = () => setSmall(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return small;
}

export function ExperienceCatalog() {
  const params = useSearchParams();
  const router = useRouter();
  const [current, setCurrent] = useState<Experience>(() => findExperience(params.get("play")) ?? featuredExperience());
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const small = useSmallScreen();
  const blocked = !!current.desktopOnly && small;

  // Retour arrière du navigateur : l'URL fait foi.
  useEffect(() => {
    const e = findExperience(params.get("play"));
    if (e && e.slug !== current.slug) {
      setCurrent(e);
      setPlaying(false);
    }
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  function select(e: Experience) {
    setCurrent(e);
    setPlaying(false);
    router.replace(`?play=${e.slug}`, { scroll: false });
    frame.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    track("experience_select", { experience: e.slug });
  }

  function play() {
    setPlaying(true);
    track("experience_play", { experience: current.slug });
  }

  return (
    <>
      <section className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div ref={frame} className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-fmborder bg-black sm:aspect-video">
          {playing ? (
            <iframe
              key={current.slug}
              src={current.entry}
              title={current.title}
              allow={allowFor(current)}
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <>
              {current.preview ? (
                <CardFilm
                  key={current.slug}
                  src={current.preview}
                  poster={current.poster}
                  className="absolute inset-0 h-full w-full object-cover opacity-75"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-75" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-10">
                <p className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">
                  {current.year} · {current.credits[0]}
                </p>
                <h2 className="fm-display mt-2 text-[clamp(2rem,6vw,4.5rem)] text-fmfg">{current.title}</h2>
                <p className="fm-grotesk mt-3 max-w-xl text-sm text-fmfg/85 md:text-base">{current.pitch}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {blocked ? (
                    <span className="rounded-full border border-fmborder px-5 py-3 text-[11px] uppercase tracking-[0.15em] text-fmmuted">
                      Best experienced on a computer
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={play}
                      className="rounded-full bg-fmaccent px-7 py-3 text-[12px] font-bold uppercase tracking-[0.15em] text-fmbg transition hover:brightness-110"
                    >
                      ▶ Play
                    </button>
                  )}
                  {current.requires.map((r) => (
                    <span key={r} className="rounded-full border border-fmborder px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-fmmuted">
                      {NEEDS[r]}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3 text-[11px] uppercase tracking-[0.15em] text-fmmuted">
          <span className="min-w-0">{current.title} · {current.credits.join(" · ")}</span>
          <span className="flex flex-wrap gap-4">
            {playing && (
              <>
                <button type="button" onClick={() => frame.current?.requestFullscreen?.()} className="uppercase hover:text-fmaccent">
                  Fullscreen
                </button>
                <button type="button" onClick={() => setPlaying(false)} className="uppercase hover:text-fmaccent">
                  Stop
                </button>
              </>
            )}
            <Link href={`/projects/${current.project}`} className="hover:text-fmaccent">
              View the project →
            </Link>
            <a href={current.entry} target="_blank" rel="noopener" className="hover:text-fmaccent">
              Open alone ↗
            </a>
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] space-y-12 px-5 pb-24 pt-10 md:px-8">
        {experiencesByRow().map((row) => (
          <div key={row.id}>
            <h3 className="mb-4 text-[11px] uppercase tracking-[0.15em] text-fmmuted">— {row.label}</h3>
            <ProjectRow>
              {row.items.map((e) => (
                <button
                  key={e.slug}
                  type="button"
                  onClick={() => select(e)}
                  aria-current={e.slug === current.slug}
                  className={`fm-glass-card group block w-[78vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-xl text-left sm:w-72 ${
                    e.slug === current.slug ? "ring-1 ring-fmaccent" : ""
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    {e.preview ? (
                      <CardFilm
                        src={e.preview}
                        poster={e.poster}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={e.poster} alt="" loading="lazy" draggable={false} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="fm-display text-lg text-fmfg">{e.title}</p>
                    <p className="fm-grotesk mt-1 line-clamp-2 text-sm text-fmmuted">{e.pitch}</p>
                  </div>
                </button>
              ))}
            </ProjectRow>
          </div>
        ))}
      </section>
    </>
  );
}
