import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { publicConfig } from "@/lib/wall/config";
import { guestPath } from "@/lib/wall/keys";
import { loadWall } from "@/lib/wall/server";
import { Screen } from "./Screen";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Live Wall · écran",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

// /experience/wall/<slug>/ecran?s=<cle ecran> — le grand ecran de la salle.
// Le QR affiche pointe vers la page invite de la meme origine.
export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ s?: string }> }) {
  const { slug } = await params;
  const { s } = await searchParams;
  const loaded = await loadWall(slug, { s });
  if (!loaded.ok || loaded.wall.access !== "screen") notFound();
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "fmrxr.com";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = process.env.WALL_PUBLIC_ORIGIN ?? `${proto}://${host}`;
  const qrSvg = await QRCode.toString(`${origin}${guestPath(slug, loaded.wall.campaign.access_key)}`, { type: "svg", margin: 0, errorCorrectionLevel: "M" });
  return <Screen slug={slug} s={s!} initial={publicConfig(loaded.wall.config)} qrSvg={qrSvg} />;
}
