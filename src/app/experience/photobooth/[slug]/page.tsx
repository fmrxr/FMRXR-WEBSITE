import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { campaignAvailability, loadCampaign } from "@/lib/photobooth/server";
import { Booth } from "./Booth";

export const dynamic = "force-dynamic";

// Une seule lecture de la campagne pour les metadonnees et la page.
const getCampaign = cache(loadCampaign);

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ k?: string }> };

/**
 * Apercu du lien partage (WhatsApp, Instagram...) : titre, accroche et image
 * de la campagne, au lieu de ceux de la page d'accueil. Lien prive : jamais
 * indexe par les moteurs de recherche.
 */
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { k } = await searchParams;
  const robots = { index: false, follow: false };
  const loaded = await getCampaign(slug, k ?? null);
  if (!loaded.ok) return { title: "Photobooth", robots };
  const c = loaded.config;
  const loc = c.defaultLocale;
  const title = `${c.title[loc]} · ${loaded.campaign.client_name}`;
  const description = c.intro[loc];
  const key = encodeURIComponent(k!);
  const url = `/experience/photobooth/${slug}?k=${key}`;
  const image = { url: `/api/photobooth/og/${slug}?k=${key}`, width: 1200, height: 630, alt: title };
  return {
    title: { absolute: `${title} · FMRXR//` },
    description,
    robots,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "FMRXR Studio", title, description, url, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

// /experience/photobooth/<slug>?k=<cle> — la borne d'une campagne.
// Sans la bonne cle, la page n'existe pas.
export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { k } = await searchParams;
  const loaded = await getCampaign(slug, k ?? null);
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
