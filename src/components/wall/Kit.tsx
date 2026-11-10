"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Download, EyeOff, Images, Loader2, Mail, Minus, Plus, Printer, RotateCcw, RotateCw } from "lucide-react";
import { toPng } from "html-to-image";
import { strToU8, zipSync } from "fflate";
import type { PublicConfig } from "@/lib/wall/config";
import type { WallPost } from "@/lib/wall/types";
import { Card } from "./Card";
import { STRINGS } from "./strings";

// Les exports d'apres la soiree, fabriques dans le navigateur de l'equipe a
// partir des cartes publiees (GET /api/wall/export?format=cards) :
//
//   la planche imprimable : toutes les cartes sur une feuille A3, A2, A1 ou
//     A0, a la charte, imprimee en PDF vectoriel par le navigateur ;
//   les cartes en images : un PNG haute definition par carte, avec le
//     tableau CSV et le JSON, dans un ZIP ;
//   le kit emailing : une image d'en-tete, les cartes les plus aimees
//     detourees, et un bloc HTML pret a coller, dans un ZIP.
//
// Les cartes sont rendues par le meme composant que le mur (Card) : les
// quatre formats, les papiers du client et ses stickers sortent comme en
// salle. Aucune intervention de FMRXR.

type Tab = "print" | "images" | "mail";
type Data = { campaign: { name: string; startsAt: string | null }; config: PublicConfig; posts: WallPost[] };

// Formats ISO A, en paysage (mm).
const SHEETS = { A3: [420, 297], A2: [594, 420], A1: [841, 594], A0: [1189, 841] } as const;
type Sheet = keyof typeof SHEETS;

/** Colonnes pour que toutes les cartes tiennent sur une feuille, au plus large possible. */
function columnsFor(n: number, w: number, h: number) {
  for (let cols = 2; cols <= 14; cols++) {
    const colW = w / cols;
    // une carte fait en moyenne 0,8 fois sa largeur de haut, marges comprises
    if (Math.ceil(n / cols) * colW * 0.86 <= h) return cols;
  }
  return 14; // au-dela, la planche continue sur une page suivante
}

const safeName = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase().slice(0, 32);

function download(bytes: Uint8Array | Blob, name: string, type = "application/zip") {
  const blob = bytes instanceof Blob ? bytes : new Blob([bytes as BlobPart], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

const dataUrlBytes = (d: string) => {
  const b = atob(d.split(",")[1]);
  const out = new Uint8Array(b.length);
  for (let i = 0; i < b.length; i++) out[i] = b.charCodeAt(i);
  return out;
};

/** Attend que les images et les dessins d'un noeud soient prets, avant de le photographier. */
async function settle(el: HTMLElement) {
  await document.fonts.ready;
  const imgs = [...el.querySelectorAll("img")];
  await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
  // les dessins chargent leurs traits a part (RemoteDrawing)
  const t0 = Date.now();
  while (Date.now() - t0 < 4000 && [...el.querySelectorAll("[data-drawing-loading]")].length) await new Promise((r) => setTimeout(r, 80));
  await new Promise((r) => setTimeout(r, 120));
}

export function Kit({ slug, m, initialTab }: { slug: string; m: string; initialTab: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/wall/export?slug=${slug}&m=${m}&format=cards`, { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => (j.ok ? setData(j) : setError("Accès refusé : ce lien d’équipe n’est plus valable.")))
      .catch(() => setError("Chargement impossible, réessayez."));
  }, [slug, m]);

  const asset = useCallback((id: string, kind: "strokes" | "photo") => `/api/wall/asset/${id}?slug=${slug}&m=${m}&t=${kind}`, [slug, m]);
  const tabs: [Tab, string, React.ReactNode][] = [
    ["print", "Planche imprimable", <Printer key="p" className="h-4 w-4" />],
    ["images", "Cartes en images", <Images key="i" className="h-4 w-4" />],
    ["mail", "Kit emailing", <Mail key="m" className="h-4 w-4" />],
  ];

  return (
    <main className="fm fm-canvas min-h-dvh select-none px-4 py-5 print:p-0">
      <div className="relative z-10 mx-auto max-w-6xl print:max-w-none">
        <div className="print:hidden">
          <a href={`/experience/wall/${slug}/moderation?m=${m}`} className="mb-3 inline-flex items-center gap-1.5 text-sm text-fmmuted hover:text-fmfg">
            <ArrowLeft className="h-4 w-4" /> Retour au contrôle du mur
          </a>
          <p className="fm-display text-2xl">{data?.campaign.name ?? "Exports"}</p>
          <p className="mb-5 text-sm text-fmmuted">
            {data ? `${data.posts.length} carte${data.posts.length > 1 ? "s" : ""} publiée${data.posts.length > 1 ? "s" : ""}, rendues comme sur le mur.` : "Chargement des cartes…"}
          </p>
          <nav className="mb-6 flex flex-wrap gap-2 border-b border-fmborder">
            {tabs.map(([id, label, icon]) => (
              <button key={id} onClick={() => setTab(id)}
                className={`relative -mb-px flex min-h-12 items-center gap-2 px-4 text-sm transition ${tab === id ? "border-b-2 border-fmaccent font-semibold text-fmfg" : "text-fmmuted hover:text-fmfg"}`}>
                {icon}{label}
              </button>
            ))}
          </nav>
        </div>
        {error && <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm">{error}</p>}
        {data && tab === "print" && <PrintSheet data={data} asset={asset} slug={slug} />}
        {data && tab === "images" && <CardImages data={data} asset={asset} slug={slug} m={m} />}
        {data && tab === "mail" && <MailKit data={data} asset={asset} slug={slug} />}
      </div>
    </main>
  );
}

type Asset = (id: string, kind: "strokes" | "photo") => string;

// ---------------------------------------------------------------------------
// La planche imprimable : une table de mise en page. Les cartes partent
// d'une mise en page automatique (colonnes, la plus courte d'abord), puis
// l'equipe compose : deplacer, agrandir par le coin, tourner par la
// poignee du haut, passer devant, retirer. Tout est en millimetres de la
// feuille, donc le PDF reprend exactement ce qu'on voit. La composition
// reste dans ce navigateur, une par format.

type Place = { x: number; y: number; s: number; r: number; z: number; off?: boolean }; // mm, centre de la carte
type Layout = Record<string, Place>;
const MM = 96 / 25.4; // px CSS par millimetre

function PrintSheet({ data, asset, slug }: { data: Data; asset: Asset; slug: string }) {
  const { config, posts, campaign } = data;
  const t = STRINGS[config.defaultLocale];
  const [sheet, setSheet] = useState<Sheet>("A2");
  const [w, h] = SHEETS[sheet];
  const pad = Math.round(h * 0.05);
  const head = Math.round(h * 0.11);
  const cards = useMemo(() => posts.filter((p) => p.kind !== "sticker" || p.stickers.length), [posts]);
  const cols = columnsFor(cards.length, w - pad * 2, h - pad * 2 - head);
  const gap = (w - pad * 2) * 0.012;
  const colW = (w - pad * 2 - gap * (cols - 1)) / cols;
  // une carte fait 16 em : a l'echelle 1, elle occupe 92 % d'une colonne
  const em = (colW * 0.92) / 16;
  const key = `fm-kit-sheet-${slug}-${sheet}`;

  // Apercu a l'ecran : la feuille, reduite a la largeur de la page.
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / (w * MM)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);

  // Hauteur reelle de chaque carte, mesuree une fois rendue.
  const nodes = useRef(new Map<string, HTMLDivElement>());
  const [layout, setLayout] = useState<Layout | null>(null);
  const [sel, setSel] = useState<string | null>(null);

  const auto = useCallback((): Layout => {
    const tops: number[] = Array(cols).fill(pad + head);
    const out: Layout = {};
    cards.forEach((p, i) => {
      const el = nodes.current.get(p.id);
      const hmm = el ? el.offsetHeight / MM : colW * 0.8;
      let c = 0;
      for (let k = 1; k < cols; k++) if (tops[k] < tops[c] - 0.5) c = k;
      const top = tops[c] + em * 0.8; // place du scotch
      out[p.id] = { x: pad + c * (colW + gap) + colW / 2, y: top + hmm / 2, s: 1, r: ((i * 37) % 7) - 3, z: i + 1 };
      tops[c] = top + hmm + em * 0.3;
    });
    return out;
  }, [cards, cols, pad, head, colW, gap, em]);

  // Une carte reste entiere dans la feuille : sinon elle est rognee a
  // l'impression, et ses poignees sortent du cadre, hors d'atteinte.
  const fit = useCallback((id: string, p: Place): Place => {
    const el = nodes.current.get(id);
    const cw = 16 * em * p.s, ch = (el ? el.offsetHeight / MM : 16 * em * 0.8) * p.s;
    const s = Math.min(p.s, (w * 0.96) / (16 * em), (h * 0.96) / Math.max(1, ch / p.s)); // jamais plus grande que la feuille
    const k = s / p.s, cw2 = (cw * k) / 2, ch2 = (ch * k) / 2;
    return { ...p, s, x: Math.min(w - cw2, Math.max(cw2, p.x)), y: Math.min(h - ch2, Math.max(ch2, p.y)) };
  }, [em, w, h]);
  // Au changement de format : la composition gardee, sinon la mise en page automatique.
  useEffect(() => {
    let saved: Layout | null = null;
    try { saved = JSON.parse(localStorage.getItem(key) || "null"); } catch { /* stockage refuse */ }
    // juste apres le rendu : les cartes sont dans la page, donc mesurables.
    // Pas de requestAnimationFrame : un onglet en arriere-plan ne le declenche jamais.
    const id = window.setTimeout(() => {
      const base = auto();
      // une carte publiee depuis la derniere composition prend sa place automatique
      const merged: Layout = saved ? { ...base, ...saved } : base;
      for (const id of Object.keys(merged)) merged[id] = fit(id, merged[id]);
      setLayout(merged);
      setSel(null);
    }, 60);
    return () => window.clearTimeout(id);
  }, [key, auto, fit]);

  const save = (next: Layout) => {
    setLayout(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* sans memoire, tant pis */ }
  };
  const topZ = layout ? Math.max(0, ...Object.values(layout).map((p) => p.z)) : 0;

  // Gestes : tout passe par la feuille, en millimetres.
  type Drag = { id: string; mode: "move" | "scale" | "rotate"; x0: number; y0: number; p0: Place; d0: number; a0: number };
  const drag = useRef<Drag | null>(null);
  const toMm = (e: React.PointerEvent) => {
    const r = box.current!.getBoundingClientRect();
    return [(e.clientX - r.left) / (scale * MM), (e.clientY - r.top) / (scale * MM)];
  };
  const begin = (e: React.PointerEvent, id: string, mode: Drag["mode"]) => {
    if (!layout) return;
    e.stopPropagation(); e.preventDefault();
    try { box.current?.setPointerCapture(e.pointerId); } catch { /* sans capture */ }
    const [x, y] = toMm(e);
    const p0 = { ...layout[id], z: topZ + 1 };
    drag.current = { id, mode, x0: x, y0: y, p0, d0: Math.max(4, Math.hypot(x - p0.x, y - p0.y)), a0: Math.atan2(y - p0.y, x - p0.x) };
    setSel(id);
    setLayout({ ...layout, [id]: p0 });
  };
  const moveEv = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || !layout) return;
    const [x, y] = toMm(e);
    let p = d.p0;
    if (d.mode === "move") p = { ...p, x: Math.min(w, Math.max(0, d.p0.x + x - d.x0)), y: Math.min(h, Math.max(0, d.p0.y + y - d.y0)) };
    if (d.mode === "scale") p = { ...p, s: Math.min(4, Math.max(0.3, d.p0.s * (Math.hypot(x - d.p0.x, y - d.p0.y) / d.d0))) };
    if (d.mode === "rotate") {
      let r = d.p0.r + ((Math.atan2(y - d.p0.y, x - d.p0.x) - d.a0) * 180) / Math.PI;
      // aimant a 0 et 90 degres, sauf avec Maj
      if (!e.shiftKey && Math.abs(r - Math.round(r / 90) * 90) < 3) r = Math.round(r / 90) * 90;
      p = { ...p, r };
    }
    setLayout({ ...layout, [d.id]: fit(d.id, p) });
  };
  const end = () => {
    if (drag.current && layout) save(layout);
    drag.current = null;
  };

  const placed = layout ? cards.filter((p) => !layout[p.id]?.off) : cards;
  const removed = layout ? cards.filter((p) => layout[p.id]?.off) : [];

  return (
    <div>
      {/* La feuille d'impression, au format exact, sans marge d'imprimante. */}
      <style>{`
        @page { size: ${w}mm ${h}mm; margin: 0; }
        @media print {
          html, body { background: ${config.background} !important; }
          .fm-canvas::before, .fm-canvas::after { display: none !important; }
          .kit-sheet-frame { height: auto !important; overflow: visible !important; border: 0 !important; }
          .kit-sheet { transform: none !important; }
          .kit-handle { display: none !important; }
          .kit-sel { outline: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>
      <div className="mb-5 flex flex-wrap items-center gap-3 print:hidden">
        <div className="flex gap-1 rounded-full border border-fmborder p-1">
          {(Object.keys(SHEETS) as Sheet[]).map((s) => (
            <button key={s} onClick={() => setSheet(s)}
              className={`min-h-10 rounded-full px-4 text-sm ${sheet === s ? "bg-fmfg font-semibold text-fmbg" : "text-fmmuted hover:text-fmfg"}`}>{s}</button>
          ))}
        </div>
        <button onClick={() => { setSel(null); window.setTimeout(() => window.print(), 50); }} className="flex min-h-12 items-center gap-2 rounded-full bg-fmaccent px-5 font-semibold text-black">
          <Printer className="h-4 w-4" /> Imprimer ou enregistrer en PDF
        </button>
        <button onClick={() => { save(auto()); setSel(null); }} className="flex min-h-12 items-center gap-2 rounded-full border border-fmborder px-4 text-sm text-fmfg hover:border-fmfg/40">
          <RotateCcw className="h-4 w-4" /> Mise en page automatique
        </button>
        {sel && layout && (
          <div className="flex gap-1 rounded-full border border-fmborder p-1">
            {[-15, 15].map((d) => (
              <button key={d} aria-label={d < 0 ? "Tourner à gauche" : "Tourner à droite"}
                onClick={() => save({ ...layout, [sel]: { ...layout[sel], r: layout[sel].r + d } })}
                className="grid min-h-10 min-w-10 place-items-center rounded-full text-fmfg hover:bg-fmfg/10">
                {d < 0 ? <RotateCcw className="h-4 w-4" /> : <RotateCw className="h-4 w-4" />}
              </button>
            ))}
            {[0.85, 1.18].map((k) => (
              <button key={k} aria-label={k < 1 ? "Plus petite" : "Plus grande"}
                onClick={() => save({ ...layout, [sel]: fit(sel, { ...layout[sel], s: layout[sel].s * k }) })}
                className="grid min-h-10 min-w-10 place-items-center rounded-full text-fmfg hover:bg-fmfg/10">
                {k < 1 ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </button>
            ))}
          </div>
        )}
        {sel && layout && (
          <button onClick={() => { save({ ...layout, [sel]: { ...layout[sel], off: true } }); setSel(null); }}
            className="flex min-h-12 items-center gap-2 rounded-full border border-fmborder px-4 text-sm text-fmfg hover:border-red-400/60">
            <EyeOff className="h-4 w-4" /> Retirer cette carte
          </button>
        )}
        <p className="w-full text-[13px] leading-relaxed text-fmmuted">
          Glissez une carte pour la placer, tirez son coin vert pour l’agrandir, tournez-la par la poignée blanche
          (Maj pour tourner librement). {sheet} paysage, {w} × {h} mm. À l’impression : « Enregistrer au format PDF »,
          marges « Aucune », « Graphiques d’arrière-plan » cochés. Le PDF reste vectoriel : il s’imprime net en grand format.
        </p>
        {removed.length > 0 && layout && (
          <div className="flex w-full flex-wrap items-center gap-2 text-[13px] text-fmmuted">
            {removed.length} carte{removed.length > 1 ? "s" : ""} hors de la planche :
            {removed.map((p) => (
              <button key={p.id} onClick={() => save({ ...layout, [p.id]: { ...layout[p.id], off: false, z: topZ + 1 } })}
                className="rounded-full border border-fmborder px-3 py-1 text-fmfg hover:border-fmaccent/60">
                + {(p.body || p.author || p.kind).slice(0, 24)}
              </button>
            ))}
          </div>
        )}
      </div>
      <div ref={box} className="kit-sheet-frame touch-none select-none overflow-hidden rounded-lg border border-fmborder"
        style={{ height: `${h * MM * scale}px` }}
        onPointerMove={moveEv} onPointerUp={end} onPointerCancel={end} onPointerDown={() => setSel(null)}>
        <div className="kit-sheet relative origin-top-left overflow-hidden"
          style={{
            width: `${w}mm`, height: `${h}mm`, transform: `scale(${scale})`,
            backgroundColor: config.background, backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : undefined,
            backgroundSize: "cover", backgroundPosition: "center", color: "#f5f5f8",
          }}>
          <header className="absolute flex items-center justify-between" style={{ left: `${pad}mm`, right: `${pad}mm`, top: `${pad}mm`, height: `${head}mm`, gap: `${pad}mm` }}>
            <div className="flex items-center" style={{ gap: `${pad * 0.6}mm` }}>
              {config.clientLogoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={config.clientLogoUrl} alt="" className="block rounded-[1.2mm] bg-white object-contain" style={{ height: `${head * 0.62}mm`, padding: `${head * 0.1}mm ${head * 0.18}mm` }} />
              )}
              <div>
                <p className="fm-display leading-none" style={{ fontSize: `${head * 0.42}mm` }}>{config.title[config.defaultLocale] || campaign.name}</p>
                <p className="mt-[1.5mm] opacity-70" style={{ fontSize: `${head * 0.17}mm` }}>{campaign.name}{campaign.startsAt ? ` · ${new Date(campaign.startsAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}` : ""}</p>
              </div>
            </div>
            <p className="fm-display text-right leading-none" style={{ fontSize: `${head * 0.3}mm`, color: config.accent }}>{placed.length}<span className="ml-[1.5mm] opacity-80" style={{ fontSize: "0.45em", color: "#f5f5f8" }}>MESSAGES</span></p>
          </header>
          {(layout ? placed : cards).map((p) => {
            const q = layout?.[p.id];
            const on = sel === p.id;
            return (
              <div key={p.id} ref={(el) => { if (el) nodes.current.set(p.id, el); else nodes.current.delete(p.id); }}
                className="absolute left-0 top-0 cursor-grab active:cursor-grabbing"
                style={{
                  fontSize: `${em}mm`,
                  transform: q ? `translate(${q.x}mm, ${q.y}mm) translate(-50%, -50%) rotate(${q.r}deg) scale(${q.s})` : "translate(-9999mm, 0)",
                  zIndex: q ? q.z : 0, visibility: q ? "visible" : "hidden",
                }}
                onPointerDown={(e) => begin(e, p.id, "move")}>
                <div className={on ? "kit-sel rounded-[0.6em] outline outline-[0.15em] outline-offset-[0.3em]" : ""} style={{ outlineColor: config.accent }}>
                  <Card post={p} config={config} t={t} asset={asset} compact />
                </div>
                {on && q && (
                  <>
                    {/* poignees : leur taille compense l'echelle de la carte */}
                    <span className="kit-handle absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize rounded-full border-2 border-white"
                      style={{ width: `${2.4 / q.s}em`, height: `${2.4 / q.s}em`, background: config.accent }}
                      onPointerDown={(e) => begin(e, p.id, "scale")} />
                    {/* rotation : dans le coin haut droit, a l'interieur de la carte,
                        pour rester attrapable meme quand la carte touche le bord */}
                    <span className="kit-handle absolute grid cursor-grab place-items-center rounded-full border-2 border-white bg-white/90 shadow"
                      style={{ top: `${0.5 / q.s}em`, right: `${0.5 / q.s}em`, width: `${2.2 / q.s}em`, height: `${2.2 / q.s}em` }}
                      onPointerDown={(e) => begin(e, p.id, "rotate")}>
                      <RotateCw className="h-1/2 w-1/2 text-black" />
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Rendu d'une carte en PNG : la vraie carte, hors ecran, sur fond transparent.

function Offscreen({ children, refCb }: { children: React.ReactNode; refCb: (el: HTMLDivElement | null) => void }) {
  return (
    <div aria-hidden className="pointer-events-none fixed left-[-10000px] top-0" style={{ width: 2400 }}>
      <div ref={refCb}>{children}</div>
    </div>
  );
}

function useCardShots(data: Data, asset: Asset) {
  const t = STRINGS[data.config.defaultLocale];
  const nodes = useRef(new Map<string, HTMLDivElement>());
  const layer = (
    <Offscreen refCb={() => {}}>
      {data.posts.map((p) => (
        <div key={p.id} ref={(el) => { if (el) nodes.current.set(p.id, el); else nodes.current.delete(p.id); }}
          className="inline-block p-[1.4em]" style={{ fontSize: 26 }}>
          <Card post={p} config={data.config} t={t} asset={asset} compact />
        </div>
      ))}
    </Offscreen>
  );
  const shot = async (id: string, ratio = 2) => {
    const el = nodes.current.get(id);
    if (!el) return null;
    await settle(el);
    return toPng(el, { pixelRatio: ratio, cacheBust: false });
  };
  return { layer, shot };
}

// ---------------------------------------------------------------------------
// Les cartes en images

function CardImages({ data, asset, slug, m }: { data: Data; asset: Asset; slug: string; m: string }) {
  const { layer, shot } = useCardShots(data, asset);
  const [busy, setBusy] = useState<string | null>(null);

  const run = async () => {
    setBusy("0");
    try {
      const files: Record<string, Uint8Array> = {};
      for (let i = 0; i < data.posts.length; i++) {
        const p = data.posts[i];
        setBusy(`${i + 1}/${data.posts.length}`);
        const png = await shot(p.id, 2);
        if (png) files[`cartes/${String(i + 1).padStart(3, "0")}-${p.kind}${p.author ? "-" + safeName(p.author) : ""}.png`] = dataUrlBytes(png);
      }
      setBusy("archive");
      const [csv, json] = await Promise.all(["csv", "json"].map((f) => fetch(`/api/wall/export?slug=${slug}&m=${m}&format=${f}`).then((r) => r.arrayBuffer())));
      files["messages.csv"] = new Uint8Array(csv);
      files["messages.json"] = new Uint8Array(json);
      files["LISEZ-MOI.txt"] = strToU8(
        `${data.campaign.name}\n\nUne image PNG par carte publiée, sur fond transparent, rendue comme sur le mur.\n` +
        `messages.csv : un message par ligne (auteur, heure, mentions j'aime, commentaires), s'ouvre dans Excel.\n` +
        `messages.json : les mêmes données, pour un outil ou un développeur.\n`);
      download(zipSync(files, { level: 0 }), `${safeName(data.campaign.name) || slug}-cartes.zip`);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="rounded-xl border border-fmborder bg-fmcard p-5">
      <h2 className="fm-display text-lg text-fmfg">Toutes les cartes, en images</h2>
      <p className="mb-4 mt-1 max-w-2xl text-[13px] leading-relaxed text-fmmuted">
        Une image PNG haute définition par carte publiée ({data.posts.length}), sur fond transparent et rendue
        exactement comme sur le mur : votre format de carte, vos papiers, vos stickers. Avec le tableau des messages
        (CSV) et les données (JSON), dans un seul fichier ZIP.
      </p>
      <button onClick={run} disabled={!!busy || !data.posts.length}
        className="flex min-h-12 items-center gap-2 rounded-full bg-fmaccent px-5 font-semibold text-black disabled:opacity-60">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {busy ? (busy === "archive" ? "Assemblage du ZIP…" : `Carte ${busy}`) : "Télécharger les cartes (ZIP)"}
      </button>
      {layer}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Le kit emailing

function MailKit({ data, asset, slug }: { data: Data; asset: Asset; slug: string }) {
  const { config, campaign } = data;
  const t = STRINGS[config.defaultLocale];
  // les cartes les plus aimees, celles qui ont fait la soiree
  const top = useMemo(() => [...data.posts].filter((p) => p.kind !== "sticker").sort((a, b) => b.likes - a.likes).slice(0, 12), [data.posts]);
  const { layer, shot } = useCardShots({ ...data, posts: top }, asset);
  const header = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const title = config.title[config.defaultLocale] || campaign.name;

  const run = async () => {
    setBusy("en-tête");
    try {
      const files: Record<string, Uint8Array> = {};
      if (header.current) {
        await settle(header.current);
        files["images/en-tete.png"] = dataUrlBytes(await toPng(header.current, { pixelRatio: 2, cacheBust: false }));
      }
      for (let i = 0; i < top.length; i++) {
        setBusy(`${i + 1}/${top.length}`);
        const png = await shot(top[i].id, 2);
        if (png) files[`images/carte-${String(i + 1).padStart(2, "0")}.png`] = dataUrlBytes(png);
      }
      files["email.html"] = strToU8(emailHtml(title, campaign.name, config, top.length));
      files["LISEZ-MOI.txt"] = strToU8(
        `Kit emailing · ${campaign.name}\n\n` +
        `images/en-tete.png : l'image d'en-tête, 1200 × 400 (affichée en 600 × 200).\n` +
        `images/carte-XX.png : les ${top.length} cartes les plus aimées, détourées sur fond transparent.\n` +
        `email.html : un bloc d'email prêt à coller (tableaux et styles en ligne, compatible Gmail et Outlook).\n\n` +
        `Envoyez d'abord les images dans votre outil d'emailing (Mailchimp, Brevo, Sendinblue…), puis remplacez\n` +
        `dans email.html les chemins « images/... » par les adresses que l'outil vous donne.\n`);
      download(zipSync(files, { level: 0 }), `${safeName(campaign.name) || slug}-kit-emailing.zip`);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-fmborder bg-fmcard p-5">
        <h2 className="fm-display text-lg text-fmfg">Le kit emailing</h2>
        <p className="mb-4 mt-1 max-w-2xl text-[13px] leading-relaxed text-fmmuted">
          De quoi remercier vos invités après la soirée : une image d’en-tête à votre charte, les {top.length} cartes
          les plus aimées détourées, et un bloc d’email prêt à coller dans votre outil. Tout est dans un ZIP.
        </p>
        <button onClick={run} disabled={!!busy || !top.length}
          className="flex min-h-12 items-center gap-2 rounded-full bg-fmaccent px-5 font-semibold text-black disabled:opacity-60">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          {busy ? `Préparation : ${busy}` : "Télécharger le kit (ZIP)"}
        </button>
      </div>
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.16em] text-fmmuted">Aperçu de l’en-tête</p>
        {/* l'en-tete a sa taille reelle (1200 x 400) : c'est ce noeud qui est photographie */}
        <div className="overflow-x-auto rounded-lg border border-fmborder">
          <MailHeader refEl={header} data={data} top={top.slice(0, 3)} title={title} t={t} asset={asset} />
        </div>
      </div>
      {layer}
    </div>
  );
}

function MailHeader({ refEl, data, top, title, t, asset }: {
  refEl: React.RefObject<HTMLDivElement | null>; data: Data; top: WallPost[]; title: string; t: (typeof STRINGS)["fr"]; asset: Asset;
}) {
  const { config, campaign } = data;
  return (
    <div ref={refEl} className="relative overflow-hidden" style={{
      width: 1200, height: 400, backgroundColor: config.background,
      backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : undefined, backgroundSize: "cover", backgroundPosition: "center", color: "#f5f5f8",
    }}>
      <div className="absolute left-[56px] top-1/2 w-[520px] -translate-y-1/2">
        {config.clientLogoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={config.clientLogoUrl} alt="" className="mb-6 h-[54px] w-auto rounded-[8px] bg-white object-contain px-3 py-2" />
        )}
        <p className="fm-display text-[54px] leading-[0.95]">{title}</p>
        <p className="mt-3 text-[20px] opacity-75">{campaign.name} · {data.posts.length} messages</p>
      </div>
      {top.map((p, i) => (
        <div key={p.id} className="absolute" style={{
          // trois cartes de 16 em a 13 px (208 px) : tout tient dans 1200 x 400
          left: [640, 800, 955][i], top: [70, 118, 46][i], fontSize: 13,
          transform: `rotate(${[-6, 4, -2][i]}deg)`,
        }}>
          <Card post={p} config={config} t={t} asset={asset} compact />
        </div>
      ))}
    </div>
  );
}

/** Un bloc d'email sur, en tableaux et styles en ligne (Gmail, Outlook). */
function emailHtml(title: string, event: string, config: PublicConfig, n: number) {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const cell = (i: number) => i < n
    ? `<td width="50%" style="padding:8px;" align="center"><img src="images/carte-${String(i + 1).padStart(2, "0")}.png" width="268" alt="" style="display:block;width:100%;max-width:268px;height:auto;border:0;"></td>`
    : `<td width="50%"></td>`;
  const rows = [0, 2, 4].map((i) => `<tr>${cell(i)}${cell(i + 1)}</tr>`).join("\n          ");
  return `<!-- Kit emailing · ${esc(event)} : remplacez les chemins images/... par les adresses de votre outil d'emailing. -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${config.background};">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
      <tr><td><img src="images/en-tete.png" width="600" alt="${esc(title)}" style="display:block;width:100%;height:auto;border:0;"></td></tr>
      <tr><td style="padding:28px 8px 8px;font-family:Arial,Helvetica,sans-serif;color:#f5f5f8;">
        <h1 style="margin:0 0 12px;font-size:26px;line-height:1.2;">Merci pour vos mots</h1>
        <p style="margin:0;font-size:16px;line-height:1.5;color:#d8d8e0;">Pendant ${esc(event)}, vous avez écrit, dessiné et signé sur le mur. Voici quelques-uns des messages que vous avez préférés.</p>
      </td></tr>
      <tr><td style="padding:12px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${rows}
        </table>
      </td></tr>
      <tr><td style="padding:16px 8px 8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#a9a9b6;" align="center">À très vite.</td></tr>
    </table>
  </td></tr>
</table>
`;
}
