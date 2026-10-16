"use client";
import { useState } from "react";
import { DEFAULT_CONFIG, publicConfig, SKINS, type Skin } from "@/lib/wall/config";
import type { Pos, WallPost } from "@/lib/wall/types";
import { Board } from "@/components/wall/Board";
import { STRINGS } from "@/components/wall/strings";

// Mini-mur de demonstration pour la vitrine : de vraies cartes du Live Wall,
// deplacables, dans les quatre formats. Tout reste dans la page (aucun appel
// serveur) : les dessins sont passes en data: URL.

const HEART = [{ c: "#e64f6a", w: 30, p: [500, 300, 420, 200, 300, 220, 260, 350, 350, 520, 500, 700, 650, 520, 740, 350, 700, 220, 580, 200, 500, 300] }];
const SIGN = [{ c: "#1b1a22", w: 10, p: [60, 600, 120, 300, 180, 700, 240, 350, 300, 650, 380, 400, 460, 600, 560, 380, 640, 560, 760, 420, 900, 500] }];

const at = new Date(Date.UTC(2026, 9, 16, 12, 0)).toISOString();
const post = (id: string, p: Partial<WallPost>, pos: Pos): WallPost => ({
  id, kind: "text", author: "", body: "", color: "#fff4b8", stickers: [], likes: 0, liked: false,
  pos, pinned: false, hasStrokes: false, hasPhoto: false, mine: false, at, rev: at,
  comments: [], commentCount: 0, ...p,
});

const INITIAL: WallPost[] = [
  post("d1", { author: "Yasmine", body: "Best launch night of the year, see you next season!", color: "#ffd6e0", likes: 24,
    stickers: [{ id: "live", x: 0.86, y: 0.16, s: 0.26, r: 8 }],
    comments: [{ id: "c1", author: "Karim", body: "Agreed, what a vibe", sticker: null, at }], commentCount: 3 }, { x: 0.36, y: 0.32, r: -4, z: 5 }),
  post("d2", { kind: "drawing", author: "Ines", body: "For you", hasStrokes: true, likes: 12,
    stickers: [{ id: "mark-circle", x: 0.82, y: 0.82, s: 0.24, r: -10 }] }, { x: 0.15, y: 0.55, r: 3, z: 4 }),
  post("d3", { kind: "signature", author: "Karim", hasStrokes: true, likes: 7 }, { x: 0.63, y: 0.24, r: 2, z: 3 }),
  post("d4", { author: "Sami", body: "We want the same wall at our wedding", color: "#d5e4ff", likes: 9 }, { x: 0.58, y: 0.7, r: -5, z: 6 }),
  post("d5", { kind: "sticker", stickers: [{ id: "emotional-data", x: 0.5, y: 0.5, s: 0.6, r: 0 }] }, { x: 0.86, y: 0.52, r: 6, z: 2 }),
  post("d6", { author: "Lina", body: "Merci pour cette soirée magique", color: "#cdeccf", likes: 15 }, { x: 0.36, y: 0.8, r: 4, z: 1 }),
];

const LABEL: Record<Skin, string> = { memory: "Memory", instagram: "Insta-style", facebook: "Feed-style", reddit: "Forum-style" };
const json = (v: unknown) => `data:application/json,${encodeURIComponent(JSON.stringify(v))}`;

export function LiveWallDemo() {
  const [skin, setSkin] = useState<Skin>("memory");
  const [posts, setPosts] = useState(INITIAL);
  const config = { ...publicConfig({ ...DEFAULT_CONFIG, brandName: "yourbrand" }), skin };
  const t = STRINGS.en;
  const asset = (id: string) => json(id === "d3" ? SIGN : HEART);
  const top = posts.reduce((m, p) => Math.max(m, p.pos.z), 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-fmborder bg-[#0d0c14]">
        <Board
          posts={posts} config={config} t={t} asset={asset} fresh={[]} cardFrac={0.24}
          canMove={() => true}
          onMove={(id, pos) => setPosts((list) => list.map((p) => (p.id === id ? { ...p, pos: { ...pos, z: top + 1 } } : p)))}
          onLike={(p) => setPosts((list) => list.map((x) => (x.id === p.id ? { ...x, liked: !x.liked, likes: x.likes + (x.liked ? -1 : 1) } : x)))}
        />
        <p className="pointer-events-none absolute bottom-2 left-3 text-[11px] text-fmmuted">Drag the cards · tap a heart</p>
      </div>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Card format">
        {SKINS.map((s) => (
          <button key={s} role="radio" aria-checked={skin === s} onClick={() => setSkin(s)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${skin === s ? "border-fmaccent bg-fmaccent text-black" : "border-fmborder text-fmfg/80 hover:border-fmfg/40"}`}>
            {LABEL[s]}
          </button>
        ))}
      </div>
    </div>
  );
}
