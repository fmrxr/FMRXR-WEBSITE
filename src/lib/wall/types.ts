// Types partages entre le serveur, les telephones et l'ecran.
import type { Kind } from "./config";

/** Trait de dessin : couleur, epaisseur (millieme de largeur), points a plat x,y en 0..1000. */
export type Stroke = { c: string; w: number; p: number[] };

/** Sticker pose sur une carte : position en 0..1 de la carte, taille en part de largeur, rotation en degres. */
export type PlacedSticker = { id: string; x: number; y: number; s: number; r: number };

/** Position sur le mur : x, y en 0..1 (centre de la carte), rotation, ordre d'empilement. */
export type Pos = { x: number; y: number; r: number; z: number };

export type WallComment = { id: string; author: string; body: string; sticker: string | null; at: string };

export type WallPost = {
  id: string;
  kind: Kind;
  author: string;
  body: string;
  color: string;
  stickers: PlacedSticker[];
  likes: number;
  liked: boolean;
  pos: Pos;
  pinned: boolean;
  hasStrokes: boolean;
  hasPhoto: boolean;
  mine: boolean;
  at: string;
  rev: string;
  comments: WallComment[];
  commentCount: number;
};

export type MyPending = { id: string; kind: Kind; status: "pending" | "approved" | "hidden"; at: string };
