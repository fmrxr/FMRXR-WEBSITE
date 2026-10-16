"use client";
import { useEffect, useMemo, useState } from "react";
import { Camera, Check, Hourglass, Send } from "lucide-react";
import type { Kind, Locale, PublicConfig } from "@/lib/wall/config";
import type { PlacedSticker, Stroke, WallPost } from "@/lib/wall/types";
import { Board } from "@/components/wall/Board";
import { ASPECT, Card } from "@/components/wall/Card";
import { StrokesSvg } from "@/components/wall/Drawing";
import { DrawPad } from "@/components/wall/DrawPad";
import { StickerStage, StickerTray } from "@/components/wall/StickerStage";
import { STRINGS } from "@/components/wall/strings";
import { keyQuery, sessionId, useWall } from "@/components/wall/useWall";

// Telephone de l'invite : ecrire au mur (mot doux, dessin, signature, photo,
// sticker), puis voir le mur en direct, deplacer sa carte, liker, commenter.

const KIND_ORDER: Kind[] = ["text", "drawing", "signature", "photo", "sticker"];

export function Guest({ slug, k, initial }: { slug: string; k: string; initial: PublicConfig }) {
  const [session, setSession] = useState<string | null>(null);
  // localStorage n'existe qu'au navigateur : lu apres le montage.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setSession(sessionId(slug)); }, [slug]);
  const keys = useMemo(() => ({ k }), [k]);
  const { feed, fresh, move, like, reload } = useWall(slug, keys, session);
  const config = feed?.config ?? initial;
  const [locale, setLocale] = useState<Locale>(initial.defaultLocale);
  const t = STRINGS[locale];
  const [tab, setTab] = useState<"write" | "wall">("write");
  const [open, setOpen] = useState<string | null>(null);
  const asset = (id: string, kind: "strokes" | "photo") => `/api/wall/asset/${id}?slug=${slug}&${keyQuery(keys)}&t=${kind}`;
  const posts = feed?.posts ?? [];
  const openPost = posts.find((p) => p.id === open) ?? null;

  return (
    <main dir={locale === "ar" ? "rtl" : "ltr"} className="fm min-h-dvh pb-24" style={{ background: config.background }}>
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-fmborder bg-black/40 px-4 py-3 backdrop-blur">
        {config.clientLogoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={config.clientLogoUrl} alt="" className="h-8 rounded bg-white object-contain p-1" />
        )}
        <p className="fm-display min-w-0 flex-1 truncate text-lg">{config.title[locale]}</p>
        {config.locales.length > 1 && (
          <div className="flex gap-1" dir="ltr">
            {config.locales.map((l) => (
              <button key={l} onClick={() => setLocale(l)} className={`rounded-full px-2 py-0.5 text-[11px] uppercase ${l === locale ? "bg-fmfg text-fmbg" : "text-fmmuted"}`}>{l}</button>
            ))}
          </div>
        )}
      </header>

      {feed?.closed ? (
        <p className="px-6 py-16 text-center text-fmmuted">{t.errors[feed.closed] ?? t.errors.generic}</p>
      ) : tab === "write" ? (
        <Compose slug={slug} k={k} session={session} config={config} locale={locale} onSent={() => void reload()} onSeeWall={() => setTab("wall")} />
      ) : (
        <WallTab
          posts={posts} config={config} t={t} asset={asset} fresh={fresh} mine={feed?.mine ?? []}
          onMove={move} onLike={(p) => void like(p.id)} onOpen={(p) => setOpen(p.id)}
        />
      )}

      {openPost && session && (
        <CommentSheet post={openPost} config={config} t={t} asset={asset} slug={slug} k={k} session={session}
          onLike={() => void like(openPost.id)} onClose={() => setOpen(null)} onSent={() => void reload()} />
      )}

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-fmborder bg-black/70 backdrop-blur">
        {(["write", "wall"] as const).map((x) => (
          <button key={x} onClick={() => setTab(x)} className={`py-4 text-sm font-semibold ${tab === x ? "text-fmfg" : "text-fmmuted"}`}>
            {x === "write" ? t.write : `${t.wall}${posts.length ? ` · ${posts.length}` : ""}`}
          </button>
        ))}
      </nav>
    </main>
  );
}

function Compose({ slug, k, session, config, locale, onSent, onSeeWall }: {
  slug: string; k: string; session: string | null; config: PublicConfig; locale: Locale; onSent: () => void; onSeeWall: () => void;
}) {
  const t = STRINGS[locale];
  const kinds = KIND_ORDER.filter((x) => config.kinds[x] && (x !== "sticker" || config.stickers.length > 0));
  const [kind, setKind] = useState<Kind>(kinds[0] ?? "text");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState(config.palette[0]);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [stickers, setStickers] = useState<PlacedSticker[]>([]);
  const [solo, setSolo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<"approved" | "pending" | null>(null);

  // localStorage n'existe qu'au navigateur : lu apres le montage.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { try { setAuthor(localStorage.getItem("fmrxr-wall-name") ?? ""); } catch { /* prive */ } }, []);
  useEffect(() => () => { if (photoUrl) URL.revokeObjectURL(photoUrl); }, [photoUrl]);

  const reset = () => { setBody(""); setStrokes([]); setPhoto(null); setPhotoUrl(null); setStickers([]); setSolo(null); setError(null); setDone(null); };
  const pickKind = (x: Kind) => { setKind(x); setStrokes([]); setStickers([]); setError(null); };

  const ready = kind === "text" ? body.trim().length > 0
    : kind === "drawing" || kind === "signature" ? strokes.length > 0
    : kind === "photo" ? Boolean(photo) : Boolean(solo);

  const send = async () => {
    if (!session || busy || !ready) return;
    setBusy(true); setError(null);
    try { localStorage.setItem("fmrxr-wall-name", author); } catch { /* prive */ }
    const f = new FormData();
    f.set("slug", slug); f.set("k", k); f.set("session", session); f.set("kind", kind);
    f.set("author", author); f.set("body", body); f.set("color", color);
    if (kind === "drawing" || kind === "signature") f.set("strokes", JSON.stringify(strokes));
    f.set("stickers", JSON.stringify(kind === "sticker" ? [{ id: solo, x: 0.5, y: 0.5, s: 0.6, r: 0 }] : stickers));
    if (photo) f.set("photo", photo);
    const r = await fetch("/api/wall/post", { method: "POST", body: f }).then((x) => x.json()).catch(() => null);
    setBusy(false);
    if (!r?.ok) return setError(t.errors[r?.error] ?? t.errors.generic);
    setDone(r.status);
    onSent();
  };

  if (done) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-5 px-6 py-16 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full" style={{ background: config.accent }}>
          {done === "approved" ? <Check className="h-8 w-8 text-black" /> : <Hourglass className="h-8 w-8 text-black" />}
        </span>
        <p className="fm-display text-2xl">{done === "approved" ? t.sentLive : t.sentPending}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="rounded-full border border-fmborder px-5 py-2.5 text-sm">{t.again}</button>
          <button onClick={onSeeWall} className="rounded-full px-5 py-2.5 text-sm font-semibold text-black" style={{ background: config.accent }}>{t.wall}</button>
        </div>
      </div>
    );
  }

  // Apercu sur lequel on pose les stickers (le dessin est fige pendant ce temps).
  const preview = kind === "text" ? (
    <div className="min-h-40 rounded-xl p-5 text-[#1b1a22] shadow-lg" style={{ background: color }}>
      <p className="text-xl font-semibold leading-snug [overflow-wrap:anywhere]">{body || t.textPh}</p>
    </div>
  ) : kind === "drawing" ? (
    <div className="aspect-square overflow-hidden rounded-xl bg-white"><StrokesSvg strokes={strokes} aspect={ASPECT.drawing} /></div>
  ) : kind === "signature" ? (
    <div className="overflow-hidden rounded-xl bg-[#fbf7ee]" style={{ aspectRatio: `${ASPECT.signature}` }}><StrokesSvg strokes={strokes} aspect={ASPECT.signature} /></div>
  ) : photoUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={photoUrl} alt="" className="block w-full rounded-xl" draggable={false} />
  ) : null;

  const withStickers = config.stickersEnabled && config.stickers.length > 0 && kind !== "sticker" && ready;

  return (
    <div className="mx-auto flex max-w-md flex-col gap-5 px-4 py-5">
      <p className="fm-display text-2xl leading-tight">{config.prompt[locale]}</p>

      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {kinds.map((x) => (
          <button key={x} onClick={() => pickKind(x)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm ${kind === x ? "border-transparent font-semibold text-black" : "border-fmborder text-fmfg"}`}
            style={kind === x ? { background: config.accent } : undefined}>
            {t.kinds[x]}
          </button>
        ))}
      </div>

      {kind === "text" && (
        <div className="flex flex-col gap-3">
          <textarea value={body} onChange={(e) => setBody(e.target.value.slice(0, config.maxChars))} rows={4} placeholder={t.textPh}
            className="w-full rounded-xl border border-fmborder bg-fmmutedbg p-4 text-lg outline-none focus:border-fmfg/40" />
          <div className="flex items-center gap-2">
            {config.palette.map((c) => (
              <button key={c} onClick={() => setColor(c)} aria-label={c} className={`h-8 w-8 rounded-full border-2 ${color === c ? "border-fmfg" : "border-transparent"}`} style={{ background: c }} />
            ))}
            <span className="ml-auto text-xs text-fmmuted">{body.length}/{config.maxChars}</span>
          </div>
        </div>
      )}
      {(kind === "drawing" || kind === "signature") && (
        <DrawPad aspect={kind === "drawing" ? ASPECT.drawing : ASPECT.signature} signature={kind === "signature"} t={t} value={strokes} onChange={setStrokes} />
      )}
      {kind === "photo" && (
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-fmborder px-4 py-6 text-sm">
          <Camera className="h-5 w-5" />{photo ? t.changePhoto : t.takePhoto}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            setPhoto(f); setStickers([]);
            setPhotoUrl(f ? URL.createObjectURL(f) : null);
          }} />
        </label>
      )}
      {(kind === "photo" || kind === "drawing") && (
        <input value={body} onChange={(e) => setBody(e.target.value.slice(0, config.maxChars))} placeholder={t.captionPh}
          className="w-full rounded-xl border border-fmborder bg-fmmutedbg px-4 py-3 outline-none focus:border-fmfg/40" />
      )}
      {kind === "sticker" && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-fmmuted">{t.pickSticker}</p>
          <StickerTray stickers={config.stickers} onPick={setSolo} selected={solo} />
          {solo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={config.stickers.find((s) => s.id === solo)?.url} alt="" className="mx-auto w-48 drop-shadow-xl" />
          )}
        </div>
      )}

      {withStickers && preview && (
        <StickerStage value={stickers} onChange={setStickers} stickers={config.stickers} max={config.maxStickersPerPost} t={t}>
          {preview}
        </StickerStage>
      )}

      <input value={author} onChange={(e) => setAuthor(e.target.value.slice(0, 40))} placeholder={t.name}
        className="w-full rounded-xl border border-fmborder bg-fmmutedbg px-4 py-3 outline-none focus:border-fmfg/40" />

      {error && <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm">{error}</p>}
      <button onClick={send} disabled={!ready || busy || !session}
        className="flex items-center justify-center gap-2 rounded-full py-4 text-base font-semibold text-black disabled:opacity-40" style={{ background: config.accent }}>
        <Send className="h-4 w-4" />{busy ? t.sending : t.send}
      </button>
    </div>
  );
}

function WallTab({ posts, config, t, asset, fresh, mine, onMove, onLike, onOpen }: {
  posts: WallPost[]; config: PublicConfig; t: (typeof STRINGS)["fr"]; asset: (id: string, k: "strokes" | "photo") => string;
  fresh: string[]; mine: { id: string; status: string }[];
  onMove: Parameters<typeof Board>[0]["onMove"]; onLike: (p: WallPost) => void; onOpen: (p: WallPost) => void;
}) {
  const pending = mine.filter((m) => m.status !== "approved");
  return (
    <div className="flex flex-col gap-5 py-4">
      <div className="px-4">
        <div className="relative aspect-video overflow-hidden rounded-xl border border-fmborder" style={{ background: config.background }}>
          <Board posts={posts} config={config} t={t} asset={asset} fresh={fresh} compact cardFrac={0.15}
            canMove={(p) => config.guestMove && p.mine} onMove={onMove} onOpen={onOpen} />
          {posts.length === 0 && <p className="absolute inset-0 grid place-items-center text-sm text-fmmuted">{t.empty}</p>}
        </div>
        {config.guestMove && posts.some((p) => p.mine) && <p className="mt-2 text-xs text-fmmuted">{t.moveHint}</p>}
        {pending.length > 0 && (
          <p className="mt-2 text-xs text-fmmuted">{pending.length} · {pending.some((m) => m.status === "pending") ? t.pending : t.hidden}</p>
        )}
      </div>
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-5 px-4" style={{ fontSize: "20px" }}>
        {posts.filter((p) => p.kind !== "sticker").map((p) => (
          <div key={p.id} className="relative">
            {p.mine && <span className="absolute -top-2 right-2 z-10 rounded-full px-2 py-0.5 text-[11px] font-semibold text-black" style={{ background: config.accent }}>{t.yours}</span>}
            <Card post={p} config={config} t={t} asset={asset} onLike={() => onLike(p)} onComment={() => onOpen(p)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CommentSheet({ post, config, t, asset, slug, k, session, onLike, onClose, onSent }: {
  post: WallPost; config: PublicConfig; t: (typeof STRINGS)["fr"]; asset: (id: string, k: "strokes" | "photo") => string;
  slug: string; k: string; session: string; onLike: () => void; onClose: () => void; onSent: () => void;
}) {
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const send = async (sticker: string | null) => {
    if (busy || (!body.trim() && !sticker)) return;
    setBusy(true);
    let author = "";
    try { author = localStorage.getItem("fmrxr-wall-name") ?? ""; } catch { /* prive */ }
    const r = await fetch("/api/wall/comment", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, k, session, postId: post.id, author, body: sticker ? "" : body, sticker }),
    }).then((x) => x.json()).catch(() => null);
    setBusy(false);
    if (!r?.ok) return setNote(t.errors[r?.error] ?? t.errors.generic);
    if (!sticker) setBody("");
    setNote(r.status === "pending" ? t.sentPending : null);
    onSent();
  };
  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="mt-auto max-h-[92dvh] overflow-y-auto rounded-t-3xl border-t border-fmborder bg-fmbg p-4 pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-fmfg/20" />
        <div className="flex justify-center" style={{ fontSize: "20px" }}>
          <Card post={post} config={config} t={t} asset={asset} onLike={onLike} />
        </div>
        {config.comments && (
          <div className="mx-auto mt-5 flex max-w-md flex-col gap-3">
            {config.stickers.length > 0 && (
              <div>
                <p className="mb-2 text-xs text-fmmuted">{t.react}</p>
                <StickerTray stickers={config.stickers} onPick={(id) => void send(id)} disabled={busy} />
              </div>
            )}
            <div className="flex gap-2">
              <input value={body} onChange={(e) => setBody(e.target.value.slice(0, 280))} placeholder={t.commentPh}
                onKeyDown={(e) => e.key === "Enter" && void send(null)}
                className="min-w-0 flex-1 rounded-full border border-fmborder bg-fmmutedbg px-4 py-3 outline-none" />
              <button onClick={() => void send(null)} disabled={busy || !body.trim()} className="rounded-full px-4 font-semibold text-black disabled:opacity-40" style={{ background: config.accent }}>
                <Send className="h-4 w-4" />
              </button>
            </div>
            {note && <p className="text-xs text-fmmuted">{note}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
