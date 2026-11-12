import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { social } from "@/lib/seo";
import { productBySlug } from "@/lib/products";
import { LiveWallLanding } from "@/components/site/LiveWallLanding";

// Page de vente du Live Wall, faite a la main (LiveWallLanding) sur la fiche
// produit (src/lib/products.ts) : film, boucles filmees dans la vraie app, FAQ.
const product = productBySlug("live-wall");

export const metadata: Metadata = product?.seo ? {
  title: product.seo.title,
  description: product.seo.description,
  keywords: product.seo.keywords,
  alternates: { canonical: "/live-wall" },
  ...social({ url: "/live-wall", title: `${product.name.join("")} · FMRXR//`, description: product.seo.description, images: [{ url: "/wall/the-wall-og.jpg", width: 1200, height: 630, alt: product.tagline }] }),
} : {};

export default function Page() {
  if (!product) notFound();
  return <LiveWallLanding product={product} />;
}
