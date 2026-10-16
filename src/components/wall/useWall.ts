"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PublicConfig } from "@/lib/wall/config";
import type { MyPending, Pos, WallPost } from "@/lib/wall/types";

// Etat du mur, interroge toutes les 2 s (telephones et ecran) avec la version
// deja connue : le serveur ne renvoie tout le mur que s'il a change. Un
// deplacement fait ici reste affiche jusqu'a ce que le serveur le confirme ;
// refuse, la carte revient a sa place et l'erreur est signalee.

export type WallKeys = { k?: string; s?: string; m?: string };
export type Feed = { config: PublicConfig; posts: WallPost[]; mine: MyPending[]; closed: string | null };

const POLL_MS = 2000;

export function keyQuery(keys: WallKeys) {
  return Object.entries(keys).filter(([, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v!)}`).join("&");
}

export function sessionId(scope: string): string {
  const name = `fmrxr-wall-${scope}`;
  try {
    const v = localStorage.getItem(name);
    if (v && /^[A-Za-z0-9_-]{8,80}$/.test(v)) return v;
    const fresh = crypto.randomUUID().replace(/-/g, "");
    localStorage.setItem(name, fresh);
    return fresh;
  } catch {
    return crypto.randomUUID().replace(/-/g, "");
  }
}

export function useWall(slug: string, keys: WallKeys, session: string | null) {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [fresh, setFresh] = useState<string[]>([]); // messages arrives depuis le dernier tour
  const [notice, setNotice] = useState<string | null>(null); // action refusee par le serveur
  const seen = useRef<Set<string> | null>(null);
  const version = useRef<string | null>(null);
  const local = useRef(new Map<string, { pos: Pos; until: number }>()); // deplacements locaux recents
  const q = keyQuery(keys);

  const load = useCallback(async () => {
    try {
      const since = version.current ? `&since=${encodeURIComponent(version.current)}` : "";
      const r = await fetch(`/api/wall/feed?slug=${encodeURIComponent(slug)}&${q}${session ? `&session=${session}` : ""}${since}`, { cache: "no-store" });
      const j = await r.json();
      if (!j.ok || j.same) return;
      version.current = j.version ?? null;
      const now = Date.now();
      const posts: WallPost[] = j.posts.map((p: WallPost) => {
        const l = local.current.get(p.id);
        if (!l) return p;
        // Le serveur a la meme position (ou le delai est passe) : on oublie l'override.
        if (l.until < now || (Math.abs(p.pos.x - l.pos.x) < 0.002 && Math.abs(p.pos.y - l.pos.y) < 0.002)) {
          local.current.delete(p.id);
          return p;
        }
        return { ...p, pos: l.pos };
      });
      const first = seen.current === null;
      const arrived = first ? [] : posts.filter((p) => !seen.current!.has(p.id)).map((p) => p.id);
      seen.current = new Set(posts.map((p) => p.id));
      if (arrived.length) setFresh(arrived);
      setFeed({ config: j.config, posts, mine: j.mine ?? [], closed: j.closed });
    } catch {
      /* reseau : prochain tour */
    }
  }, [slug, q, session]);

  useEffect(() => {
    void load();
    const id = window.setInterval(load, POLL_MS);
    return () => window.clearInterval(id);
  }, [load]);

  /** Relecture complete, sans `since` (apres un refus du serveur). */
  const resync = useCallback(() => { version.current = null; void load(); }, [load]);

  /** Deplacement : visible tout de suite ici, envoye au serveur au lacher. */
  const move = useCallback((id: string, pos: Pos, commit: boolean) => {
    local.current.set(id, { pos, until: Date.now() + 15_000 });
    setFeed((f) => f && { ...f, posts: f.posts.map((p) => (p.id === id ? { ...p, pos } : p)) });
    if (!commit) return;
    void fetch("/api/wall/move", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, ...keys, session, postId: id, x: pos.x, y: pos.y, r: pos.r }),
    }).then((r) => r.ok, () => false).then((ok) => {
      if (ok) return;
      local.current.delete(id);
      setNotice("move");
      resync();
    });
  }, [slug, keys, session, resync]);

  /**
   * Like. `anonymous` : chaque appui compte pour un nouveau like (ecran
   * tactile partage par tout le public), sans retrait au second appui.
   */
  const like = useCallback(async (id: string, anonymous = false) => {
    const who = anonymous ? crypto.randomUUID().replace(/-/g, "") : session;
    setFeed((f) => f && { ...f, posts: f.posts.map((p) => (p.id === id
      ? (anonymous ? { ...p, likes: p.likes + 1 } : { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) })
      : p)) });
    const r = await fetch("/api/wall/like", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, ...keys, session: who, postId: id }),
    }).then((x) => x.json()).catch(() => null);
    if (!r?.ok) { setNotice("like"); return resync(); }
    setFeed((f) => f && { ...f, posts: f.posts.map((p) => (p.id === id ? { ...p, liked: anonymous ? p.liked : r.liked, likes: r.likes } : p)) });
  }, [slug, keys, session, resync]);

  // Le message d'erreur s'efface seul.
  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(null), 4000);
    return () => window.clearTimeout(t);
  }, [notice]);

  return { feed, fresh, reload: resync, move, like, notice };
}
