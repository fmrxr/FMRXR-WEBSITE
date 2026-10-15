import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { campaignAvailability, loadCampaign } from "@/lib/photobooth/server";
import { Booth } from "./Booth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Photobooth",
  robots: { index: false, follow: false },
};

// /experience/photobooth/<slug>?k=<cle> — la borne d'une campagne.
// Sans la bonne cle, la page n'existe pas.
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ k?: string }>;
}) {
  const { slug } = await params;
  const { k } = await searchParams;
  const loaded = await loadCampaign(slug, k ?? null);
  if (!loaded.ok) {
    if (loaded.error === "CONFIG_INVALID") {
      return (
        <main className="fm grid min-h-dvh place-items-center p-8 text-center">
          <p className="fm-grotesk text-fmmuted">Configuration de campagne invalide : {loaded.detail}</p>
        </main>
      );
    }
    notFound();
  }
  return (
    <Booth
      slug={slug}
      accessKey={k!}
      config={loaded.config}
      blocked={campaignAvailability(loaded.campaign)}
    />
  );
}
