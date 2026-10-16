// Camera iPhone a distance (meme Wi-Fi), sans application.
//
// La borne affiche un QR ; l'iPhone ouvre la page camera dans Safari et envoie
// sa camera a la borne en WebRTC, de pair a pair sur le reseau local : la
// video ne passe par aucun serveur. Seuls quelques messages d'appairage
// (offre, reponse, candidats reseau) transitent par un canal Supabase Realtime
// « broadcast », sans base de donnees, nomme d'apres un code aleatoire de
// 128 bits que seul le QR porte.
//
// Photo : la borne demande a l'iPhone une image de son capteur en pleine
// definition (canal de donnees), plutot qu'une capture du flux compresse.

export const channelName = (pairId: string) => `pb-cam-${pairId}`;

export const ICE_SERVERS: RTCIceServer[] = [{ urls: "stun:stun.l.google.com:19302" }];

export type Facing = "user" | "environment";

/** Messages d'appairage (canal Realtime). */
export type Signal =
  | { t: "hello"; from: "phone" | "booth" }
  | { t: "offer"; sdp: string }
  | { t: "answer"; sdp: string }
  | { t: "ice"; from: "phone" | "booth"; candidate: RTCIceCandidateInit }
  | { t: "facing"; facing: Facing };

/** Messages du canal de donnees (texte) ; la photo suit en morceaux binaires. */
export type Control =
  | { t: "snap"; id: string }
  | { t: "photo-start"; id: string; size: number; mime: string; facing: Facing }
  | { t: "photo-end"; id: string }
  | { t: "photo-error"; id: string };

export const CHUNK = 16 * 1024;

export function newPairId(): string {
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  return Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
}

export const isPairId = (s: string | null | undefined): s is string => !!s && /^[0-9a-f]{32}$/.test(s);
