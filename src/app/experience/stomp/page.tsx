import type { Metadata } from "next";
import { Stomp, type StompSettings } from "./Stomp";

export const metadata: Metadata = {
  title: "STOMP",
  robots: { index: false, follow: false },
};

// /experience/stomp — jeu au sol pour sol LED interactif.
// Reglages par l'URL (le PC du sol garde son lien) :
//   size=4      cote du sol en metres          seconds=75  duree de manche
//   logo=URL    logo de la marque sur les cibles
//   ws=ws://127.0.0.1:7777   relais des capteurs du sol (sinon souris / tactile)
//   px=1024&ox=0&oy=0        zone de pixels du sol LED dans l'image envoyee
//   debug=1     etat, images par seconde, source des appuis
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const q = await searchParams;
  const num = (v: string | undefined, min: number, max: number, def: number | null) => {
    const n = Number(v);
    return v !== undefined && Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : def;
  };
  const logo = q.logo && /^(https:\/\/|\/)/.test(q.logo) ? q.logo : "/wall/stickers/fmrxr/02_mark-circle.webp";
  const ws = q.ws && /^wss?:\/\/(127\.0\.0\.1|localhost)(:\d+)?(\/.*)?$/.test(q.ws) ? q.ws : null;
  const s: StompSettings = {
    size: num(q.size, 2, 12, 4)!,
    seconds: num(q.seconds, 20, 240, 75)!,
    logo, ws,
    px: num(q.px, 200, 8192, null),
    ox: num(q.ox, 0, 8192, null),
    oy: num(q.oy, 0, 8192, null),
    debug: q.debug === "1",
  };
  return <Stomp s={s} />;
}
