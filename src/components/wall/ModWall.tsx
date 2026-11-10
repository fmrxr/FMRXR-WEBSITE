"use client";
import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Locale } from "@/lib/wall/config";
import { Board, clampFrac } from "./Board";
import { STRINGS } from "./strings";
import { keyQuery, useWall } from "./useWall";

// Le mur vu par l'equipe du client : toutes les cartes se deplacent et se
// redimensionnent d'ici (poignee de coin a la souris, pincement au doigt),
// sans avoir a passer par l'ecran geant. Ce que l'equipe change ici, la
// salle le voit au tour suivant.

export function ModWall({ slug, m, locale }: { slug: string; m: string; locale: Locale }) {
  const keys = useMemo(() => ({ m }), [m]);
  const { feed, fresh, move, notice } = useWall(slug, keys, null);
  const config = feed?.config;
  const t = STRINGS[config?.defaultLocale ?? locale];
  const posts = useMemo(() => feed?.posts ?? [], [feed]);
  const asset = (id: string, kind: "strokes" | "photo") => `/api/wall/asset/${id}?slug=${slug}&${keyQuery(keys)}&t=${kind}`;
  const [frac, setFrac] = useState(0.13);
  const zoom = (by: number) => setFrac((cur) => clampFrac(cur * by));

  if (!config) return <p className="p-6 text-fmmuted">Chargement…</p>;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2 text-[13px] text-fmmuted">
        <p className="mr-auto">Glissez une carte pour la déplacer, tirez son coin pour l’agrandir. Au doigt : pincez.</p>
        <button onClick={() => zoom(1 / 1.15)} aria-label={t.smaller} className="grid h-11 w-11 place-items-center rounded-full border border-fmborder hover:text-fmfg"><Minus className="h-4 w-4" /></button>
        <button onClick={() => zoom(1.15)} aria-label={t.bigger} className="grid h-11 w-11 place-items-center rounded-full border border-fmborder hover:text-fmfg"><Plus className="h-4 w-4" /></button>
      </div>
      <div className="relative aspect-video overflow-hidden rounded-xl border border-fmborder bg-cover bg-center"
        style={{ backgroundColor: config.background, backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : undefined }}>
        <Board posts={posts} config={config} t={t} asset={asset} fresh={fresh} cardFrac={frac} onCardFrac={(v) => setFrac(clampFrac(v))}
          canMove={() => true} onMove={move} />
        {posts.length === 0 && <p className="absolute inset-0 grid place-items-center text-sm text-fmmuted">{t.empty}</p>}
      </div>
      {notice === "move" && <p className="text-sm text-red-400">Le déplacement n’a pas été enregistré, la carte est revenue à sa place.</p>}
    </div>
  );
}
