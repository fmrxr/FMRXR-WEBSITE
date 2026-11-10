"use client";
import { useCallback, useEffect, useState } from "react";
import { Check, EyeOff, Pin, PinOff } from "lucide-react";
import type { Locale, Sticker } from "@/lib/wall/config";
import { STRINGS } from "./strings";
import type { PlacedSticker } from "@/lib/wall/types";
import { RemoteDrawing } from "./Drawing";
import { ASPECT, StickerLayer } from "./Card";

// Moderation du mur pour l'equipe, en flux : le plus recent en haut.
//
// Deux regles tenues par tout ce fichier :
//
// 1. LA LISTE NE BOUGE JAMAIS SOUS LE DOIGT. Les messages qui arrivent
//    pendant qu'on modere sont retenus derriere une pastille, pas inseres
//    dans la liste. Sinon une carte se glisse entre le regard et le clic,
//    et on publie ce qu'on voulait masquer.
// 2. UN COMMENTAIRE SE JUGE SOUS SON MESSAGE. Il etait relegue dans une
//    liste a part, en bas : on arbitrait « ecrivez-moi sur wa.me/... »
//    sans voir sous quelle carte il etait pose.

type ModPost = {
  id: string; kind: string; author: string; body: string; color: string; stickers: PlacedSticker[];
  status: "pending" | "approved" | "hidden"; flag: string | null; likes: number; pinned: boolean;
  hasPhoto: boolean; hasStrokes: boolean; created_at: string; moderated_by: string | null;
};
type ModComment = { id: string; post_id: string; author: string; body: string; sticker: string | null; status: string; flag: string | null; created_at: string; moderated_by: string | null };
type Data = { posts: ModPost[]; comments: ModComment[]; by: string | null };
type Filter = "pending" | "approved" | "hidden";

const POLL_MS = 4000;
const STALE_MS = 14000; // au dela, on ne promet plus que l'affichage est a jour
const FRESH_MS = 6000; // duree du liseré sur une carte qu'on vient de decouvrir

const newer = (a: { created_at: string }, b: { created_at: string }) =>
  Date.parse(b.created_at) - Date.parse(a.created_at);

export function Moderation({ slug, m, stickers, compact, locale = "fr" }: { slug: string; m: string; stickers: Sticker[]; compact?: boolean; locale?: Locale }) {
  const t = STRINGS[locale];
  const L = t.mod;
  const FLAG = L.flags;
  const byId = new Map(stickers.map((s) => [s.id, s]));
  const asset = (id: string, k: "strokes" | "photo") => `/api/wall/asset/${id}?slug=${slug}&m=${m}&t=${k}`;

  // `shown` est ce qu'on regarde, `latest` ce que le serveur a de plus
  // frais. Les deux ne se rejoignent que sur une action, ou sur la
  // pastille : c'est ce decalage qui empeche la liste de sauter.
  const [shown, setShown] = useState<Data | null>(null);
  const [latest, setLatest] = useState<Data | null>(null);
  const [filter, setFilter] = useState<Filter>("pending");
  const [error, setError] = useState<string | null>(null);
  const [at, setAt] = useState<number | null>(null); // date du dernier echange reussi
  const [now, setNow] = useState(() => Date.now());
  const [fresh, setFresh] = useState<Set<string>>(new Set());

  // Ce qui est affiche FAIT foi sur ce qui est connu. Une premiere version
  // gardait les identifiants dans une reference mutee depuis le `setState` :
  // l'effet de bord passait a cote du rendu et la retenue ne s'engageait
  // jamais, les cartes s'inseraient quand meme.
  const idsOf = (d: Data) => new Set([...d.posts.map((p) => p.id), ...d.comments.map((c) => c.id)]);

  const load = useCallback(async (adopt = false) => {
    const r = await fetch(`/api/wall/moderation?slug=${slug}&m=${m}`, { cache: "no-store" })
      .then((x) => x.json()).catch(() => null);
    if (!r?.ok) return;
    const d: Data = { posts: r.posts, comments: r.comments, by: r.by };
    setAt(Date.now());
    setLatest(d);
    setShown((prev) => {
      // Premier chargement, ou rien de neuf : on adopte. Sinon on garde
      // l'affichage tel quel et la pastille annonce les arrivees.
      if (!prev || adopt) return d;
      const seen = idsOf(prev);
      const hasNew = [...d.posts, ...d.comments].some((x) => !seen.has(x.id));
      return hasNew ? prev : d;
    });
  }, [slug, m]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
    const poll = window.setInterval(() => void load(), POLL_MS);
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    return () => { window.clearInterval(poll); window.clearInterval(tick); };
  }, [load]);

  const act = async (target: "post" | "comment", id: string, action: string) => {
    const r = await fetch("/api/wall/moderation", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, m, target, id, action }),
    }).catch(() => null);
    setError(r?.ok ? null : r?.status === 404 ? t.screen.denied : t.screen.failed);
    // Une action de l'equipe prend effet tout de suite : ici la liste a le
    // droit de changer, puisque c'est elle qui l'a demande.
    void load(true);
  };

  if (!shown) return <p className="p-6 text-fmmuted">{L.loading}</p>;

  const source = latest ?? shown;
  const seen = idsOf(shown);
  const held = [...source.posts, ...source.comments].filter((x) => !seen.has(x.id));
  const reveal = () => {
    const ids = new Set(held.map((x) => x.id));
    setShown(source);
    setFresh(ids);
    window.setTimeout(() => setFresh(new Set()), FRESH_MS);
  };

  // Compteurs : toujours ceux du serveur, meme quand l'affichage est en
  // retard. Le chiffre de la pastille dit ce qui attend vraiment.
  const count = (s: Filter) =>
    source.posts.filter((p) => p.status === s).length + source.comments.filter((c) => c.status === s).length;

  // Le flux liste ce qu'il y a a faire : les messages de l'etat choisi, et
  // ceux d'un autre etat qui portent un commentaire de cet etat la.
  const commentsOf = (id: string) => shown.comments.filter((c) => c.post_id === id && c.status === filter);
  const posts = shown.posts.filter((p) => p.status === filter);
  const carriers = shown.posts.filter((p) => p.status !== filter && commentsOf(p.id).length > 0);
  const feed = [...posts, ...carriers].sort(newer);
  const orphans = shown.comments.filter(
    (c) => c.status === filter && !shown.posts.some((p) => p.id === c.post_id),
  );

  const stale = at !== null && now - at > STALE_MS;

  return (
    <div className="flex flex-col gap-3">
      {error && <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm">{error}</p>}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        {shown.by && <span className="text-fmmuted">{L.connected} : <span className="text-fmfg">{shown.by}</span></span>}
        {/* Fraicheur : sans ce temoin, une coupure reseau laisse la page
            afficher d'anciennes donnees sans jamais le dire. */}
        <span className={stale ? "text-amber-400" : "text-fmmuted"}>
          <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle ${stale ? "bg-amber-400" : "bg-fmaccent animate-pulse"}`} />
          {stale
            ? `${L.stale} · ${L.ago} ${Math.round((now - (at ?? now)) / 1000)}${L.sec}`
            : L.live}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["pending", "approved", "hidden"] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`rounded-full border px-3 py-1.5 text-sm ${filter === s ? "border-fmfg bg-fmfg text-fmbg" : "border-fmborder"}`}>
            {s === "pending" ? L.pending : s === "approved" ? L.published : L.hidden} · {count(s)}
          </button>
        ))}
      </div>

      {held.length > 0 && (
        <button onClick={reveal}
          className="sticky top-2 z-20 flex items-center justify-center gap-2 rounded-full border border-fmaccent/60 bg-fmaccent px-4 py-2.5 text-sm font-semibold text-black shadow-lg">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-black/70" />
          {held.length} {held.length > 1 ? L.newMany : L.newOnes} · {L.show}
        </button>
      )}

      {feed.length === 0 && orphans.length === 0 && <p className="text-sm text-fmmuted">{L.nothing}</p>}

      <div className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-[repeat(auto-fill,minmax(260px,1fr))]"}`}>
        {feed.map((p) => {
          const mine = p.status === filter;
          const cs = commentsOf(p.id);
          return (
            <div key={p.id}
              className={`flex flex-col overflow-hidden rounded-xl border bg-fmcard transition ${
                fresh.has(p.id) ? "border-fmaccent" : "border-fmborder"}`}>
              <div className="relative">
                {p.kind === "photo" && p.hasPhoto && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={asset(p.id, "photo")} alt="" className="block w-full" />
                )}
                {(p.kind === "drawing" || p.kind === "signature") && (
                  <div className="bg-white" style={{ aspectRatio: `${p.kind === "drawing" ? ASPECT.drawing : ASPECT.signature}` }}>
                    <RemoteDrawing url={asset(p.id, "strokes")} aspect={p.kind === "drawing" ? ASPECT.drawing : ASPECT.signature} />
                  </div>
                )}
                {p.kind === "text" && <div className="min-h-24 p-4 text-lg font-semibold text-[#1b1a22]" style={{ background: p.color }}>{p.body}</div>}
                {p.kind === "sticker" && <div className="relative h-32 bg-fmmutedbg"><StickerLayer list={p.stickers} byId={byId} /></div>}
                {p.kind !== "sticker" && <StickerLayer list={p.stickers} byId={byId} />}
              </div>

              <div className="flex flex-1 flex-col gap-1 p-3 text-sm">
                {p.kind !== "text" && p.body && <p className="[overflow-wrap:anywhere]">{p.body}</p>}
                <p className="text-xs text-fmmuted">
                  {p.author || L.anon} · {t.kinds[p.kind as keyof typeof t.kinds] ?? p.kind} ·{" "}
                  {new Date(p.created_at).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })} · {p.likes} ♥
                </p>
                {p.flag && <p className="text-xs text-amber-400">{L.flagged} : {FLAG[p.flag] ?? p.flag}</p>}
                {p.moderated_by && <p className="text-xs text-fmmuted">{p.status === "hidden" ? L.hiddenBy : L.moderatedBy} {p.moderated_by}</p>}

                {/* Le message n'est la que pour porter ses commentaires :
                    on ne propose pas de le re-moderer, on dit son etat. */}
                {mine ? (
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {p.status !== "approved" && <Btn onClick={() => act("post", p.id, "approve")} icon={<Check className="h-4 w-4" />} label={L.publish} primary />}
                    {p.status !== "hidden" && <Btn onClick={() => act("post", p.id, "hide")} icon={<EyeOff className="h-4 w-4" />} label={L.hide} />}
                    {p.status === "approved" && (p.pinned
                      ? <Btn onClick={() => act("post", p.id, "unpin")} icon={<PinOff className="h-4 w-4" />} label={t.screen.unpin} />
                      : <Btn onClick={() => act("post", p.id, "pin")} icon={<Pin className="h-4 w-4" />} label={t.screen.pin} />)}
                  </div>
                ) : (
                  <p className="pt-1 text-[11px] uppercase tracking-[0.14em] text-fmmuted">
                    {p.status === "approved" ? L.published : p.status === "hidden" ? L.hidden : L.pending}
                  </p>
                )}

                {cs.length > 0 && (
                  <div className="mt-2 flex flex-col gap-2 border-t border-fmborder pt-2">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-fmmuted">{L.comments} · {L.onPost}</p>
                    {cs.map((c) => <CommentRow key={c.id} c={c} L={L} FLAG={FLAG} byId={byId} act={act} fresh={fresh.has(c.id)} />)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Filet : un commentaire dont le message a disparu reste jugeable. */}
      {orphans.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-fmmuted">{L.comments}</p>
          {orphans.map((c) => <CommentRow key={c.id} c={c} L={L} FLAG={FLAG} byId={byId} act={act} fresh={fresh.has(c.id)} />)}
        </div>
      )}
    </div>
  );
}

function CommentRow({ c, L, FLAG, byId, act, fresh }: {
  c: ModComment; L: (typeof STRINGS)["fr"]["mod"]; FLAG: Record<string, string>;
  byId: Map<string, Sticker>; act: (t: "post" | "comment", id: string, a: string) => void; fresh: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 rounded-lg border bg-fmbg/40 p-2.5 text-sm ${fresh ? "border-fmaccent" : "border-fmborder"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {c.sticker && byId.get(c.sticker) && <img src={byId.get(c.sticker)!.url} alt="" className="h-9 w-9 shrink-0 object-contain" />}
      <div className="min-w-0 flex-1">
        <p className="[overflow-wrap:anywhere]">{c.body}</p>
        <p className="text-xs text-fmmuted">
          {c.author || L.anon}
          {c.flag ? <span className="text-amber-400"> · {L.flagged} : {FLAG[c.flag] ?? c.flag}</span> : ""}
          {c.moderated_by ? ` · ${L.by} ${c.moderated_by}` : ""}
        </p>
      </div>
      <div className="flex shrink-0 gap-1.5">
        {c.status !== "approved" && <Btn onClick={() => act("comment", c.id, "approve")} icon={<Check className="h-4 w-4" />} label={L.publish} primary />}
        {c.status !== "hidden" && <Btn onClick={() => act("comment", c.id, "hide")} icon={<EyeOff className="h-4 w-4" />} label={L.hide} />}
      </div>
    </div>
  );
}

function Btn({ onClick, icon, label, primary }: { onClick: () => void; icon: React.ReactNode; label: string; primary?: boolean }) {
  return (
    <button onClick={onClick}
      className={`flex min-h-11 items-center gap-1.5 rounded-full px-4 text-xs font-medium ${
        primary ? "bg-fmaccent font-semibold text-black" : "border border-fmborder text-fmfg"}`}>
      {icon}{label}
    </button>
  );
}
