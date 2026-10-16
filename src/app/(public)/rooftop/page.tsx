import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { social } from "@/lib/seo";
import { productBySlug } from "@/lib/products";
import { ProductPage } from "@/components/site/ProductPage";

// Page Decouvrir, generee depuis la fiche produit (src/lib/products.ts).
const product = productBySlug("rooftop");

export const metadata: Metadata = product?.seo ? {
  title: product.seo.title,
  description: product.seo.description,
  keywords: product.seo.keywords,
  alternates: { canonical: "/rooftop" },
  ...social({ url: "/rooftop", title: `${product.name.join("")} · FMRXR//`, description: product.seo.description, images: [{ url: product.poster, width: 1024, height: 1024, alt: product.tagline }] }),
} : {};

export default function Page() {
  if (!product) notFound();
  return <ProductPage product={product} />;
}
