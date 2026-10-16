import type { Metadata } from "next";
import { social } from "@/lib/seo";
import { Suspense } from "react";
import { PageHero } from "@/components/site/PageHero";
import { ExperienceCatalog } from "@/components/site/ExperienceCatalog";
import { PhotoboothCTA } from "@/components/site/PhotoboothCTA";
import { ProductCTA } from "@/components/site/ProductCTA";
import { PRODUCTS } from "@/lib/products";
import { getSiteSettings } from "@/lib/public-data";
import { PHOTOBOOTH_SLUG, heroSlug, isVisible, visibleExperiences } from "@/lib/experiences";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Experiences · Interactive works by FMRXR",
  description:
    "FMRXR's interactive experiences: the AI Photobooth for brand events, and playable web works running live in your browser.",
  alternates: { canonical: "/experiences" },
  ...social({
    url: "/experiences",
    title: "Experiences · FMRXR//",
    description: "The AI Photobooth for brand events, and playable web works by FMRXR Studio, running live in your browser.",
    images: [{ url: "/photobooth/og.jpg", width: 1200, height: 630, alt: "FMRXR AI Photo Booth portraits" }],
  }),
};

export default async function Experiences() {
  // Ce qui s'affiche se règle dans le CMS (/admin/experiences).
  const { experiences_visible: visible = null } = await getSiteSettings();
  const playable = visibleExperiences(visible).length > 0;
  // Blocs produits (Photobooth, Live Wall, ROOFTOP, STOMP), chacun active dans
  // le CMS. Celui qui est en hero passe avant le catalogue ; une experience du
  // catalogue en hero s'ouvre, elle, dans le lecteur du haut.
  const hero = heroSlug(visible);
  const blocks = PRODUCTS.filter((p) => isVisible(p.slug, visible)).map((p) => ({
    slug: p.slug,
    node: p.slug === PHOTOBOOTH_SLUG
      ? <PhotoboothCTA key={p.slug} index="For your event" source="experiences" />
      : <ProductCTA key={p.slug} product={p} index="For your event" source="experiences" />,
  }));
  const first = blocks.find((b) => b.slug === hero);

  return (
    <>
      {playable ? (
        <PageHero
          index="Experiences"
          title="Play the systems"
          intro="Our installations, games and shaders, running live in your browser. Pick one, press play."
        />
      ) : (
        <PageHero
          index="Experiences"
          title="Experiences for your event"
          intro="Interactive systems we bring to brand activations, launches and festivals, run under live conditions."
        />
      )}
      {first?.node}
      {playable && (
        // useSearchParams exige une frontière Suspense pour le prérendu.
        <Suspense>
          <ExperienceCatalog visible={visible} />
        </Suspense>
      )}
      {blocks.filter((b) => b !== first).map((b) => b.node)}
    </>
  );
}
