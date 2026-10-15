import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/site/PageHero";
import { ExperienceCatalog } from "@/components/site/ExperienceCatalog";
import { PhotoboothCTA } from "@/components/site/PhotoboothCTA";
import { getSiteSettings } from "@/lib/public-data";
import { PHOTOBOOTH_SLUG, isVisible, visibleExperiences } from "@/lib/experiences";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Experiences · Interactive works by FMRXR",
  description:
    "FMRXR's interactive experiences: the AI Photobooth for brand events, and playable web works running live in your browser.",
  alternates: { canonical: "/experiences" },
  openGraph: {
    type: "website",
    url: "/experiences",
    title: "Experiences · FMRXR//",
    description: "Interactive experiences by FMRXR Studio.",
  },
};

export default async function Experiences() {
  // Ce qui s'affiche se règle dans le CMS (/admin/experiences).
  const { experiences_visible: visible = null } = await getSiteSettings();
  const playable = visibleExperiences(visible).length > 0;
  const booth = isVisible(PHOTOBOOTH_SLUG, visible);

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
      {playable && (
        // useSearchParams exige une frontière Suspense pour le prérendu.
        <Suspense>
          <ExperienceCatalog visible={visible} />
        </Suspense>
      )}
      {booth && <PhotoboothCTA index="For your event" source="experiences" />}
    </>
  );
}
