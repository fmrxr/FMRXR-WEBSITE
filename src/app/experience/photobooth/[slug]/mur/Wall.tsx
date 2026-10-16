"use client";
import { useEffect, useRef, useState } from "react";

// Mur en direct : le portrait du moment en grand, les precedents en mosaique.
// Un nouveau portrait passe aussitot au premier plan ; sinon le grand format
// fait defiler les huit derniers. Interroge le serveur toutes les 8 s.

type Item = { id: string; at: string; title: Record<string, string> | null };

const POLL_MS = 8000;
const CYCLE_MS = 7000;
const NEW_MS = 12000;

const LINE: Record<string, string> = {
  fr: "Votre portrait vous attend à la borne",
  en: "Your portrait is waiting at the booth",
  ar: "البورتريه الخاص بك في انتظارك عند الجهاز",
};

export function Wall({ slug, galleryKey, title, clientLogoUrl, locale }: { slug: string; galleryKey: string; title: string; clientLogoUrl: string; locale: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [featured, setFeatured] = useState(0);
  const [freshId, setFreshId] = useState<string | null>(null);
  const seen = useRef<Set<string> | null>(null);
  const holdUntil = useRef(0);

  const img = (id: string, w?: number) =>
    `/api/photobooth/client-image/${id}?g=${encodeURIComponent(galleryKey)}${w ? `&w=${w}` : ""}`;

  useEffect(() => {
    let stop = false;
    const tick = async () => {
      try {
        const r = await fetch(`/api/photobooth/wall?slug=${encodeURIComponent(slug)}&g=${encodeURIComponent(galleryKey)}`, { cache: "no-store" });
        const j = await r.json();
        if (!stop && j.ok) {
          const list: Item[] = j.items;
          // Au premier chargement, rien n'est « nouveau ».
          const first = seen.current === null;
          const fresh = first ? null : list.find((i) => !seen.current!.has(i.id)) ?? null;
          seen.current = new Set(list.map((i) => i.id));
          setItems(list);
          if (fresh) {
            setFeatured(0);
            setFreshId(fresh.id);
            holdUntil.current = Date.now() + NEW_MS;
          }
        }
      } catch {
        /* reseau : prochain tour */
      }
    };
    void tick();
    const id = window.setInterval(tick, POLL_MS);
    return () => { stop = true; window.clearInterval(id); };
  }, [slug, galleryKey]);

  // Defilement du grand format, en pause pendant qu'un nouveau portrait s'affiche.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() < holdUntil.current) return;
      setFreshId(null);
      setFeatured((f) => (items.length ? (f + 1) % Math.min(8, items.length) : 0));
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [items.length]);

  const main = items[featured] ?? null;
  const grid = items.filter((_, i) => i !== featured).slice(0, 12);

  return (
    <main className="fm fixed inset-0 grid grid-rows-[auto_1fr_auto] overflow-hidden bg-[#08070d] text-fmfg">
      <header className="flex items-center justify-between gap-6 px-[3vw] py-[2vh]">
        <div className="flex items-center gap-4">
          {clientLogoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={clientLogoUrl} alt="" className="h-[5vh] rounded-md bg-white object-contain p-1.5" />
          )}
          <p className="fm-display text-[3.2vh] tracking-[0.04em]">{title}</p>
        </div>
        <button
          onClick={() => document.documentElement.requestFullscreen?.().catch(() => undefined)}
          className="rounded-full border border-fmborder px-4 py-1.5 text-xs text-fmmuted hover:text-fmfg"
        >
          Plein écran
        </button>
      </header>

      {items.length === 0 ? (
        <div className="grid place-items-center">
          <p className="fm-display text-[5vh] text-fmfg/80">{LINE[locale] ?? LINE.fr}</p>
        </div>
      ) : (
        <div className="grid min-h-0 grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-[2vw] px-[3vw]">
          <div className="relative grid min-h-0 place-items-center">
            {main && (
              <figure key={main.id} className="relative flex h-full max-h-full min-h-0 flex-col items-center justify-center gap-[1.5vh] fm-wall-in">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img(main.id)} alt="" className="max-h-[72vh] min-h-0 rounded-2xl object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]" />
                <figcaption className="flex items-center gap-3">
                  {freshId === main.id && <span className="fm-new">New</span>}
                  <span className="fm-display text-[3vh]">{main.title?.[locale] ?? main.title?.fr ?? ""}</span>
                </figcaption>
              </figure>
            )}
          </div>
          <div className="grid min-h-0 grid-cols-3 grid-rows-4 gap-[1vw] py-[1vh]">
            {grid.map((it) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={it.id} src={img(it.id, 480)} alt="" className="h-full w-full min-h-0 rounded-lg object-cover opacity-90" />
            ))}
          </div>
        </div>
      )}

      <footer className="flex items-center justify-between px-[3vw] py-[2vh] text-[1.6vh] text-fmmuted">
        <span>{LINE[locale] ?? LINE.fr}</span>
        <span className="fm-display text-fmfg" dir="ltr">FMRXR<span className="text-fmaccent">{"//"}</span> <span className="font-sans text-fmmuted">AI Photobooth</span></span>
      </footer>
      <style>{`.fm-wall-in { animation: fmWallIn 900ms cubic-bezier(.2,.7,.2,1); }
        @keyframes fmWallIn { from { opacity: 0; transform: scale(.97); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .fm-wall-in { animation: none; } }`}</style>
    </main>
  );
}
