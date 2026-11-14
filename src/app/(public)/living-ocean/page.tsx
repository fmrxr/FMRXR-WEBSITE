import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { social } from "@/lib/seo";
import { productBySlug } from "@/lib/products";
import { ProductPage } from "@/components/site/ProductPage";

// Page Decouvrir, generee depuis la fiche produit (src/lib/products.ts).
const product = productBySlug("living-ocean");

export const metadata: Metadata = product?.seo ? {
  title: product.seo.title,
  description: product.seo.description,
  keywords: product.seo.keywords,
  alternates: { canonical: "/living-ocean" },
  ...social({ url: "/living-ocean", title: `${product.name.join("")} · FMRXR//`, description: product.seo.description, images: [{ url: "/living-ocean/og.jpg", width: 1200, height: 630, alt: product.tagline }] }),
} : {};

export default function Page() {
  if (!product) notFound();
  return <ProductPage product={product} />;
}
