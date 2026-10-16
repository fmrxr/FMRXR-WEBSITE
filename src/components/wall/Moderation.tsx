"use client";
import { useCallback, useEffect, useState } from "react";
import { Check, EyeOff, Pin, PinOff } from "lucide-react";
import type { Locale, Sticker } from "@/lib/wall/config";
import { STRINGS } from "./strings";
import type { PlacedSticker } from "@/lib/wall/types";
import { RemoteDrawing } from "./Drawing";
import { ASPECT, StickerLayer } from "./Card";

// Moderation du mur pour l'equipe : en attente d'abord, puis publies et
// masques. Ouvert depuis un telephone (lien m) ou depuis l'admin.

type ModPost = {
  id: string; kind: string; author: string; body: string; color: string; stickers: PlacedSticker[];
  status: "pending" | "approved" | "hidden"; flag: string | null; likes: number; pinned: boolean;
  hasPhoto: boolean; hasStrokes: boolean; created_at: string; moderated_by: string | null;
};
type ModComment = { id: string; post_id: string; author: string; body: string; sticker: string | null; status: string; flag: string | null; created_at: string; moderated_by: string | null };

const POLL_MS = 4000;

export function Moderation({ slug, m, stickers, compact, locale = "fr" }: { slug: string; m: string; stickers: Sticker[]; compact?: boolean; locale?: Locale }) {
  const t = STRINGS[locale];
  const L = t.mod;
  const FLAG = L.flags;
  const [data, setData] = useState<{ posts: ModPost[]; comments: ModComment[]; by: string | null } | null>(null);
  const [filter, setFilter] = useState<"pending" | "approved" | "hidden">("pending");
  const byId = new Map(stickers.map((s) => [s.id, s]));
  const asset = (id: string, t: "strokes" | "photo") => `/api/wall/asset/${id}?slug=${slug}&m=${m}&t=${t}`;

  const load = useCallback(async () => {
    const r = await fetch(`/api/wall/moderation?slug=${slug}&m=${m}`, { cache: "no-store" }).then((x) => x.json()).catch(() => null);
    if (r?.ok) setData({ posts: r.posts, comments: r.comments, by: r.by });
  }, [slug, m]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
    const id = window.setInterval(load, POLL_MS);
    return () => window.clearInterval(id);
  }, [load]);

  const [error, setError] = useState<string | null>(null);
  const act = async (target: "post" | "comment", id: string, action: string) => {
    const r = await fetch("/api/wall/moderation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, m, target, id, action }) }).catch(() => null);
    setError(r?.ok ? null : r?.status === 404 ? t.screen.denied : t.screen.failed);
    void load();
  };

  if (!data) return <p className="p-6 text-fmmuted">{L.loading}</p>;
  const posts = data.posts.filter((p) => p.status === filter);
  const comments = data.comments.filter((c) => c.status === filter);
  const count = (s: string) => data.posts.filter((p) => p.status === s).length + data.comments.filter((c) => c.status === s).length;

  return (
    <div className="flex flex-col gap-4">
      {error && <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm">{error}</p>}
      {data.by && <p className="text-xs text-fmmuted">{L.connected} : <span className="text-fmfg">{data.by}</span></p>}
      <div className="flex flex-wrap gap-2">
        {(["pending", "approved", "hidden"] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full border px-3 py-1.5 text-sm ${filter === s ? "border-fmfg bg-fmfg text-fmbg" : "border-fmborder"}`}>
            {s === "pending" ? L.pending : s === "approved" ? L.published : L.hidden} · {count(s)}
          </button>
        ))}
      </div>
      {posts.length === 0 && comments.length === 0 && <p className="text-sm text-fmmuted">{L.nothing}</p>}
      <div className={`grid gap-3 ${compact ? "grid-cols-2" : "grid-cols-[repeat(auto-fill,minmax(220px,1fr))]"}`}>
        {posts.map((p) => (
          <div key={p.id} className="flex flex-col overflow-hidden rounded-xl border border-fmborder bg-fmcard">
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
              <p className="text-xs text-fmmuted">{p.author || L.anon} · {t.kinds[p.kind as keyof typeof t.kinds] ?? p.kind} · {new Date(p.created_at).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })} · {p.likes} ♥</p>
              {p.flag && <p className="text-xs text-amber-400">{L.flagged} : {FLAG[p.flag] ?? p.flag}</p>}
              {p.moderated_by && <p className="text-xs text-fmmuted">{p.status === "hidden" ? L.hiddenBy : L.moderatedBy} {p.moderated_by}</p>}
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {p.status !== "approved" && <Btn onClick={() => act("post", p.id, "approve")} icon={<Check className="h-3.5 w-3.5" />} label={L.publish} primary />}
                {p.status !== "hidden" && <Btn onClick={() => act("post", p.id, "hide")} icon={<EyeOff className="h-3.5 w-3.5" />} label={L.hide} />}
                {p.status === "approved" && (p.pinned
                  ? <Btn onClick={() => act("post", p.id, "unpin")} icon={<PinOff className="h-3.5 w-3.5" />} label={t.screen.unpin} />
                  : <Btn onClick={() => act("post", p.id, "pin")} icon={<Pin className="h-3.5 w-3.5" />} label={t.screen.pin} />)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {comments.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-fmmuted">{L.comments}</p>
          {comments.map((c) => {
            const st = c.sticker ? byId.get(c.sticker) : null;
            return (
              <div key={c.id} className="flex items-center gap-3 rounded-lg border border-fmborder bg-fmcard p-3 text-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {st && <img src={st.url} alt="" className="h-10 w-10 object-contain" />}
                <div className="min-w-0 flex-1">
                  <p className="[overflow-wrap:anywhere]">{c.body}</p>
                  <p className="text-xs text-fmmuted">{c.author || L.anon}{c.flag ? ` · ${L.flagged} : ${FLAG[c.flag] ?? c.flag}` : ""}{c.moderated_by ? ` · ${L.by} ${c.moderated_by}` : ""}</p>
                </div>
                {c.status !== "approved" && <Btn onClick={() => act("comment", c.id, "approve")} icon={<Check className="h-3.5 w-3.5" />} label={L.publish} primary />}
                {c.status !== "hidden" && <Btn onClick={() => act("comment", c.id, "hide")} icon={<EyeOff className="h-3.5 w-3.5" />} label={L.hide} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Btn({ onClick, icon, label, primary }: { onClick: () => void; icon: React.ReactNode; label: string; primary?: boolean }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs ${primary ? "bg-fmaccent font-semibold text-black" : "border border-fmborder"}`}>
      {icon}{label}
    </button>
  );
}
