import type { Metadata } from "next";
import { social } from "@/lib/seo";
import { Suspense } from "react";
import { PageHero } from "@/components/site/PageHero";
import { ExperienceCatalog } from "@/components/site/ExperienceCatalog";
import { PhotoboothCTA } from "@/components/site/PhotoboothCTA";
import { LiveWallCTA } from "@/components/site/LiveWallCTA";
import { getSiteSettings } from "@/lib/public-data";
import { LIVE_WALL_SLUG, PHOTOBOOTH_SLUG, heroSlug, isVisible, visibleExperiences } from "@/lib/experiences";

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
  const booth = isVisible(PHOTOBOOTH_SLUG, visible);
  // Hero choisi dans le CMS : le Photobooth passe alors avant le catalogue ;
  // une expérience du catalogue s'ouvre, elle, dans le lecteur du haut.
  const hero = heroSlug(visible);
  const boothFirst = booth && hero === PHOTOBOOTH_SLUG;
  const boothBlock = booth && <PhotoboothCTA index="For your event" source="experiences" />;
  const wall = isVisible(LIVE_WALL_SLUG, visible);
  const wallFirst = wall && hero === LIVE_WALL_SLUG;
  const wallBlock = wall && <LiveWallCTA index="For your event" source="experiences" />;

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
      {wallFirst && wallBlock}
      {boothFirst && boothBlock}
      {playable && (
        // useSearchParams exige une frontière Suspense pour le prérendu.
        <Suspense>
          <ExperienceCatalog visible={visible} />
        </Suspense>
      )}
      {!boothFirst && boothBlock}
      {!wallFirst && wallBlock}
    </>
  );
}
