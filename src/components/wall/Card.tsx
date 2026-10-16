"use client";
import { ArrowBigDown, ArrowBigUp, Bookmark, Heart, MessageCircle, MessageSquare, Send, Share2, ThumbsUp } from "lucide-react";
import type { PublicConfig, Skin, Sticker } from "@/lib/wall/config";
import type { PlacedSticker, WallComment, WallPost } from "@/lib/wall/types";
import { RemoteDrawing } from "./Drawing";
import { ago, type Strings } from "./strings";

// Une carte du mur, dans l'un des quatre formats. Toutes les tailles sont en
// em : le mur fixe la taille de police selon sa largeur, donc la meme carte
// s'affiche a l'identique sur l'ecran geant et sur le mini-mur du telephone.
// Formats « a la maniere de » Instagram, Facebook et Reddit : la grammaire
// (en-tete, actions, fil de commentaires), jamais leurs logos ni leurs noms.

export const ASPECT = { drawing: 1, signature: 2.4 } as const;
export const CARD_EM = 16; // largeur d'une carte, en em

export type CardProps = {
  post: WallPost;
  config: PublicConfig;
  t: Strings;
  asset: (id: string, kind: "strokes" | "photo") => string;
  replay?: boolean;
  compact?: boolean; // mini-mur du telephone : pas de commentaires
  onLike?: () => void;
  onComment?: () => void;
};

export function StickerLayer({ list, byId }: { list: PlacedSticker[]; byId: Map<string, Sticker> }) {
  return (
    <>
      {list.map((s, i) => {
        const st = byId.get(s.id);
        if (!st) return null;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i} src={st.url} alt={st.label} draggable={false}
            className="pointer-events-none absolute select-none drop-shadow-[0_0.15em_0.25em_rgba(0,0,0,0.35)]"
            style={{ left: `${s.x * 100}%`, top: `${s.y * 100}%`, width: `${s.s * 100}%`, transform: `translate(-50%,-50%) rotate(${s.r}deg)` }}
          />
        );
      })}
    </>
  );
}

const initial = (name: string) => (name.trim()[0] ?? "♥").toUpperCase();
const handle = (name: string) => (name.trim() || "guest").toLowerCase().replace(/\s+/g, "_").slice(0, 24);

/** Contenu principal du message (texte, dessin, signature, photo), avec ses stickers. */
function Media({ post, t, asset, replay, byId, skin }: CardProps & { byId: Map<string, Sticker>; skin: Skin }) {
  const square = skin === "instagram";
  let inner: React.ReactNode = null;
  if (post.kind === "photo") {
    // eslint-disable-next-line @next/next/no-img-element
    inner = <img src={asset(post.id, "photo")} alt="" draggable={false} className={`block w-full select-none ${square ? "aspect-square object-cover" : "h-auto"}`} />;
  } else if (post.kind === "drawing") {
    inner = <div className="aspect-square w-full bg-white"><RemoteDrawing url={asset(post.id, "strokes")} aspect={ASPECT.drawing} replay={replay} /></div>;
  } else if (post.kind === "signature") {
    inner = (
      <div className="w-full bg-[#fbf7ee] px-[0.6em] pt-[0.4em] pb-[0.5em]" style={{ aspectRatio: square ? "1" : undefined }}>
        <div className={`w-full ${square ? "flex h-full items-center" : ""}`} style={{ aspectRatio: square ? undefined : `${ASPECT.signature}` }}>
          <div className="w-full" style={{ aspectRatio: `${ASPECT.signature}` }}><RemoteDrawing url={asset(post.id, "strokes")} aspect={ASPECT.signature} replay={replay} /></div>
        </div>
        <div className="mt-[0.2em] border-t border-[#2b2a33]/30 pt-[0.2em] text-[0.55em] uppercase tracking-[0.2em] text-[#2b2a33]/60">
          {t.kinds.signature} {post.author ? `· ${post.author}` : ""}
        </div>
      </div>
    );
  } else if (post.kind === "text" && skin === "instagram") {
    inner = (
      <div className="grid aspect-square w-full place-items-center p-[1.2em] text-center" style={{ background: `linear-gradient(135deg, ${post.color}, #ffffff)` }}>
        <p className="text-[1.25em] font-semibold leading-tight text-[#1b1a22] [overflow-wrap:anywhere]">{post.body}</p>
      </div>
    );
  }
  if (!inner) return null;
  return (
    <div className="relative overflow-hidden">
      {inner}
      <StickerLayer list={post.stickers} byId={byId} />
    </div>
  );
}

function Comments({ list, total, t, byId, tone }: { list: WallComment[]; total: number; t: Strings; byId: Map<string, Sticker>; tone: "light" | "fb" | "reddit" }) {
  if (!list.length) return null;
  const shown = list.slice(-3);
  return (
    <div className={`flex flex-col gap-[0.35em] ${tone === "reddit" ? "border-l-2 border-[#d7dadc] pl-[0.6em]" : ""}`}>
      {total > shown.length && <p className="text-[0.62em] text-[#737373]">{total} {t.comments}</p>}
      {shown.map((c) => {
        const st = c.sticker ? byId.get(c.sticker) : null;
        return (
          <div key={c.id} className={tone === "fb" ? "flex items-start gap-[0.35em]" : ""}>
            {tone === "fb" && <Avatar name={c.author} size={1.4} />}
            <div className={tone === "fb" ? "rounded-[0.8em] bg-[#f0f2f5] px-[0.6em] py-[0.3em]" : ""}>
              <span className="text-[0.66em] font-semibold text-[#1b1a22]">{tone === "reddit" ? `u/${handle(c.author)}` : c.author || "guest"} </span>
              {c.body && <span className="text-[0.66em] text-[#262626] [overflow-wrap:anywhere]">{c.body}</span>}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {st && <img src={st.url} alt={st.label} className="mt-[0.15em] block h-[2.2em] w-auto" draggable={false} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Avatar({ name, size = 2, ring }: { name: string; size?: number; ring?: boolean }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-bold text-white"
      style={{
        width: `${size}em`, height: `${size}em`, fontSize: `${size * 0.45}em`,
        background: "linear-gradient(135deg,#6b5bff,#e64f9b)",
        boxShadow: ring ? "0 0 0 0.12em #fff, 0 0 0 0.24em #e1306c" : undefined,
      }}
    >
      <span style={{ fontSize: "1em" }}>{initial(name)}</span>
    </span>
  );
}

export function Card(props: CardProps) {
  const { post, config, t, compact, onLike, onComment } = props;
  const skin = config.skin;
  const byId = new Map(config.stickers.map((s) => [s.id, s]));
  const stop = (fn?: () => void) => (e: React.PointerEvent | React.MouseEvent) => { e.stopPropagation(); fn?.(); };
  const likeBtn = (icon: React.ReactNode, label?: string) => config.likes && (
    <button type="button" onPointerDown={(e) => e.stopPropagation()} onClick={stop(onLike)} className="flex items-center gap-[0.25em]" aria-label={t.like}>
      {icon}{label}
    </button>
  );
  const commentBtn = (icon: React.ReactNode, label?: string) => config.comments && (
    <button type="button" onPointerDown={(e) => e.stopPropagation()} onClick={stop(onComment)} className="flex items-center gap-[0.25em]" aria-label={t.comment}>
      {icon}{label}
    </button>
  );
  const when = ago(post.at, t);

  // Sticker seul : pas de carte, le sticker est colle sur le mur.
  if (post.kind === "sticker") {
    const st = byId.get(post.stickers[0]?.id ?? "");
    return st ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={st.url} alt={st.label} draggable={false} className="block w-[9em] select-none drop-shadow-[0_0.4em_0.6em_rgba(0,0,0,0.45)]" />
    ) : null;
  }

  if (skin === "memory") {
    const paper = post.kind === "text" ? post.color : "#ffffff";
    return (
      <div className="relative w-[16em] rounded-[0.25em] p-[0.7em] text-[#1b1a22] shadow-[0_0.8em_1.6em_-0.6em_rgba(0,0,0,0.6)]" style={{ background: paper }}>
        <span className="absolute -top-[0.55em] left-1/2 h-[1.1em] w-[4.5em] -translate-x-1/2 rotate-[-3deg] bg-white/55 shadow-sm backdrop-blur-[1px]" />
        {post.kind === "text" ? (
          <div className="relative">
            <p className="min-h-[5em] text-[1.3em] font-semibold leading-snug [overflow-wrap:anywhere]">{post.body}</p>
            <StickerLayer list={post.stickers} byId={byId} />
          </div>
        ) : (
          <>
            <Media {...props} byId={byId} skin={skin} />
            {post.body && <p className="mt-[0.5em] text-[0.85em] leading-snug [overflow-wrap:anywhere]">{post.body}</p>}
          </>
        )}
        <div className="mt-[0.6em] flex items-center justify-between text-[0.65em] text-[#1b1a22]/60">
          <span className="font-semibold">{post.kind !== "signature" && post.author ? `— ${post.author}` : ""}</span>
          <span className="flex items-center gap-[0.8em]">
            {likeBtn(<Heart className={`h-[1.3em] w-[1.3em] ${post.liked ? "fill-[#e64f6a] text-[#e64f6a]" : ""}`} />, post.likes ? String(post.likes) : "")}
            {commentBtn(<MessageCircle className="h-[1.3em] w-[1.3em]" />, post.commentCount ? String(post.commentCount) : "")}
          </span>
        </div>
        {!compact && post.comments.length > 0 && <div className="mt-[0.5em] border-t border-black/10 pt-[0.4em]"><Comments list={post.comments} total={post.commentCount} t={t} byId={byId} tone="light" /></div>}
      </div>
    );
  }

  if (skin === "instagram") {
    return (
      <div className="w-[16em] overflow-hidden rounded-[0.6em] border border-[#dbdbdb] bg-white text-[#262626] shadow-[0_0.8em_1.6em_-0.6em_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-[0.5em] px-[0.6em] py-[0.5em]">
          <Avatar name={post.author} size={1.7} ring />
          <span className="text-[0.7em] font-semibold">{handle(post.author)}</span>
          <span className="text-[0.62em] text-[#737373]">· {when}</span>
        </div>
        <Media {...props} byId={byId} skin={skin} />
        <div className="flex items-center gap-[0.7em] px-[0.6em] pt-[0.5em]">
          {likeBtn(<Heart className={`h-[1.25em] w-[1.25em] ${post.liked ? "fill-[#ff3040] text-[#ff3040]" : ""}`} />)}
          {commentBtn(<MessageCircle className="h-[1.25em] w-[1.25em] -scale-x-100" />)}
          <Send className="h-[1.2em] w-[1.2em]" />
          <Bookmark className="ml-auto h-[1.2em] w-[1.2em]" />
        </div>
        <div className="flex flex-col gap-[0.3em] px-[0.6em] pt-[0.3em] pb-[0.6em]">
          {config.likes && post.likes > 0 && <p className="text-[0.68em] font-semibold">{post.likes} {t.like.toLowerCase()}</p>}
          {post.kind !== "text" && post.body && (
            <p className="text-[0.68em] [overflow-wrap:anywhere]"><span className="font-semibold">{handle(post.author)} </span>{post.body}</p>
          )}
          {!compact && <Comments list={post.comments} total={post.commentCount} t={t} byId={byId} tone="light" />}
        </div>
      </div>
    );
  }

  if (skin === "facebook") {
    return (
      <div className="w-[16em] overflow-hidden rounded-[0.6em] bg-white text-[#050505] shadow-[0_0.8em_1.6em_-0.6em_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-[0.5em] px-[0.7em] pt-[0.6em]">
          <Avatar name={post.author} size={2} />
          <div className="leading-tight">
            <p className="text-[0.72em] font-semibold">{post.author || "Guest"}</p>
            <p className="text-[0.58em] text-[#65676b]">{when} · {config.brandName}</p>
          </div>
        </div>
        {post.body && (
          <p className={`px-[0.7em] pt-[0.45em] pb-[0.5em] leading-snug [overflow-wrap:anywhere] ${post.kind === "text" && post.body.length < 60 ? "text-[1.15em] font-semibold" : "text-[0.75em]"}`}>{post.body}</p>
        )}
        {post.kind === "text" ? (post.stickers.length > 0 && <div className="relative h-[5em]"><StickerLayer list={post.stickers} byId={byId} /></div>) : <Media {...props} byId={byId} skin={skin} />}
        {config.likes && post.likes > 0 && (
          <div className="flex items-center gap-[0.3em] px-[0.7em] pt-[0.4em] text-[0.6em] text-[#65676b]">
            <span className="grid h-[1.5em] w-[1.5em] place-items-center rounded-full bg-[#1b74e4]"><ThumbsUp className="h-[0.9em] w-[0.9em] fill-white text-white" /></span>
            {post.likes}
            {post.commentCount > 0 && <span className="ml-auto">{post.commentCount} {post.commentCount > 1 ? t.comments : t.oneComment}</span>}
          </div>
        )}
        <div className="mx-[0.7em] mt-[0.4em] flex justify-around border-t border-[#ced0d4] py-[0.35em] text-[0.66em] font-semibold text-[#65676b]">
          {likeBtn(<ThumbsUp className={`h-[1.3em] w-[1.3em] ${post.liked ? "fill-[#1b74e4] text-[#1b74e4]" : ""}`} />, t.like)}
          {commentBtn(<MessageSquare className="h-[1.3em] w-[1.3em]" />, t.comment)}
          <span className="flex items-center gap-[0.25em]"><Share2 className="h-[1.3em] w-[1.3em]" /></span>
        </div>
        {!compact && post.comments.length > 0 && <div className="px-[0.7em] pb-[0.6em]"><Comments list={post.comments} total={post.commentCount} t={t} byId={byId} tone="fb" /></div>}
      </div>
    );
  }

  // reddit
  return (
    <div className="flex w-[16em] overflow-hidden rounded-[0.4em] border border-[#ccc] bg-white text-[#1c1c1c] shadow-[0_0.8em_1.6em_-0.6em_rgba(0,0,0,0.6)]">
      <div className="flex w-[2.2em] shrink-0 flex-col items-center gap-[0.1em] bg-[#f8f9fa] pt-[0.5em]">
        {likeBtn(<ArrowBigUp className={`h-[1.5em] w-[1.5em] ${post.liked ? "fill-[#ff4500] text-[#ff4500]" : "text-[#878a8c]"}`} />)}
        <span className="text-[0.66em] font-bold">{post.likes}</span>
        <ArrowBigDown className="h-[1.5em] w-[1.5em] text-[#878a8c]" />
      </div>
      <div className="min-w-0 flex-1 p-[0.55em]">
        <p className="text-[0.56em] text-[#787c7e]"><span className="font-bold text-[#1c1c1c]">r/{handle(config.brandName)}</span> · u/{handle(post.author)} · {when}</p>
        {post.body && <p className={`mt-[0.25em] leading-snug [overflow-wrap:anywhere] ${post.kind === "text" ? "text-[0.95em] font-semibold" : "text-[0.72em] font-medium"}`}>{post.body}</p>}
        {post.kind === "text" ? (post.stickers.length > 0 && <div className="relative h-[5em]"><StickerLayer list={post.stickers} byId={byId} /></div>) : <div className="mt-[0.4em] overflow-hidden rounded-[0.3em]"><Media {...props} byId={byId} skin={skin} /></div>}
        <div className="mt-[0.4em] flex items-center gap-[0.8em] text-[0.6em] font-bold text-[#878a8c]">
          {commentBtn(<MessageSquare className="h-[1.3em] w-[1.3em]" />, `${post.commentCount} ${post.commentCount === 1 ? t.oneComment : t.comments}`)}
          <span className="flex items-center gap-[0.25em]"><Share2 className="h-[1.3em] w-[1.3em]" /></span>
        </div>
        {!compact && post.comments.length > 0 && <div className="mt-[0.45em]"><Comments list={post.comments} total={post.commentCount} t={t} byId={byId} tone="reddit" /></div>}
      </div>
    </div>
  );
}
