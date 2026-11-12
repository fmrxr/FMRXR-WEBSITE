import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { social } from "@/lib/seo";
import { productBySlug } from "@/lib/products";
import { FireflyGardenLanding } from "@/components/site/FireflyGardenLanding";

// Page de vente du Jardin des Lucioles, faite a la main (FireflyGardenLanding)
// sur la fiche produit (src/lib/products.ts), sur le modele du Live Wall.
const product = productBySlug("firefly-garden");

export const metadata: Metadata = product?.seo ? {
  title: product.seo.title,
  description: product.seo.description,
  keywords: product.seo.keywords,
  alternates: { canonical: "/firefly-garden" },
  ...social({ url: "/firefly-garden", title: `${product.name.join("")} · FMRXR//`, description: product.seo.description, images: [{ url: "/garden/og.jpg", width: 1200, height: 630, alt: product.tagline }] }),
} : {};

export default function Page() {
  if (!product) notFound();
  return <FireflyGardenLanding product={product} />;
}
