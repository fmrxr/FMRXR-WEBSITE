import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/site/PageHero";
import { ExperienceCatalog } from "@/components/site/ExperienceCatalog";

export const metadata: Metadata = {
  title: "Experiences · Playable web works by FMRXR",
  description:
    "Play FMRXR's web experiences in your browser: RADIANCE hand-tracked light, the ACCESS PROTOCOL game, the SPICY AIRPORT turbofan, Le Son de la Terre in 3D and live shaders from the lab.",
  alternates: { canonical: "/experiences" },
  openGraph: {
    type: "website",
    url: "/experiences",
    title: "Experiences · FMRXR//",
    description: "Playable web works by FMRXR Studio, live in your browser.",
  },
};

export default function Experiences() {
  return (
    <>
      <PageHero
        index="Experiences"
        title="Play the systems"
        intro="Our installations, games and shaders, running live in your browser. Pick one, press play."
      />
      {/* useSearchParams exige une frontière Suspense pour le prérendu. */}
      <Suspense>
        <ExperienceCatalog />
      </Suspense>
    </>
  );
}
