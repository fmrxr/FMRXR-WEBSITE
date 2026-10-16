import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadCampaign } from "@/lib/photobooth/server";
import { isPairId } from "@/lib/photobooth/remote-camera";
import { RemoteCamera } from "./RemoteCamera";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Caméra de la borne",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

// /experience/photobooth/<slug>/camera?k=<cle borne>&p=<code d'appairage>
// Ouverte sur l'iPhone en scannant le QR de la borne. Meme regle que la borne :
// sans la bonne cle, la page n'existe pas.
export default async function CameraPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ k?: string; p?: string }>;
}) {
  const { slug } = await params;
  const { k, p } = await searchParams;
  const loaded = await loadCampaign(slug, k ?? null);
  if (!loaded.ok || !isPairId(p)) notFound();
  return <RemoteCamera pairId={p} campaign={loaded.config.title[loaded.config.defaultLocale]} minScore={loaded.config.gestureMinScore} />;
}
