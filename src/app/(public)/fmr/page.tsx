import type { Metadata } from "next";
import { SignalPrices } from "@/components/site/SignalPrices";
import { OFFERS } from "@/lib/offers";

// La page cachée des prix : on y arrive en tapant « fmr » n'importe où, ou par
// appui long sur le // du logo. C'est le seul endroit du site qui affiche un
// prix. Hors index, c'est une surprise, pas une page de plus.
export const metadata: Metadata = {
  title: "fmr",
  robots: { index: false, follow: false },
};

export default function Fmr() {
  return <SignalPrices offers={OFFERS} />;
}
