"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PublicConfig } from "@/lib/wall/config";
import type { MyPending, Pos, WallPost } from "@/lib/wall/types";

// Etat du mur, relu toutes les 2 s (telephones et ecran). Un deplacement en
// cours sur cet appareil n'est jamais ecrase par une lecture plus ancienne.

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
  const seen = useRef<Set<string> | null>(null);
  const local = useRef(new Map<string, { pos: Pos; until: number }>()); // deplacements locaux recents
  const q = keyQuery(keys);

  const load = useCallback(async () => {
    try {
      const r = await fetch(`/api/wall/feed?slug=${encodeURIComponent(slug)}&${q}${session ? `&session=${session}` : ""}`, { cache: "no-store" });
      const j = await r.json();
      if (!j.ok) return;
      const now = Date.now();
      const posts: WallPost[] = j.posts.map((p: WallPost) => {
        const l = local.current.get(p.id);
        return l && l.until > now ? { ...p, pos: l.pos } : p;
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

  /** Deplacement : visible tout de suite ici, envoye au serveur au lacher. */
  const move = useCallback((id: string, pos: Pos, commit: boolean) => {
    local.current.set(id, { pos, until: Date.now() + 6000 });
    setFeed((f) => f && { ...f, posts: f.posts.map((p) => (p.id === id ? { ...p, pos } : p)) });
    if (!commit) return;
    void fetch("/api/wall/move", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, ...keys, session, postId: id, x: pos.x, y: pos.y, r: pos.r }),
    }).then(() => undefined, () => undefined);
  }, [slug, keys, session]);

  const like = useCallback(async (id: string) => {
    setFeed((f) => f && { ...f, posts: f.posts.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p)) });
    const r = await fetch("/api/wall/like", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, ...keys, session, postId: id }),
    }).then((x) => x.json()).catch(() => null);
    if (r?.ok) setFeed((f) => f && { ...f, posts: f.posts.map((p) => (p.id === id ? { ...p, liked: r.liked, likes: r.likes } : p)) });
  }, [slug, keys, session]);

  return { feed, fresh, reload: load, move, like };
}
