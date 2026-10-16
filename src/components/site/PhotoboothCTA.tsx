import Link from "next/link";
import { StyleDeck } from "./StyleDeck";
import { STYLE_IDS, STYLES, newFirst } from "@/lib/photobooth/styles";

// Appel a l'action « AI Photobooth », pose sur l'accueil et sur /experiences.
// Deux sorties : la page vitrine, et le formulaire de brief prerempli
// (ref=photobooth, ajoute au message de la demande).

export function PhotoboothCTA({ index, source }: { index: string; source: string }) {
  return (
    <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
      <div className="fm-glass-card grid items-center gap-10 overflow-hidden rounded-2xl p-6 md:grid-cols-[1.3fr_1fr] md:p-10">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-fmaccent">{index}</p>
          <h2 className="fm-display mt-3 text-[clamp(2.6rem,7vw,5.2rem)] text-fmfg">
            AI Photo<span className="text-fmaccent">booth</span>
          </h2>
          <p className="fm-display mt-3 text-[clamp(1.1rem,2.2vw,1.6rem)] text-fmfg/80">
            Your guests, portrayed by your brand.
          </p>
          <p className="fm-grotesk mt-5 max-w-xl text-[15px] leading-relaxed text-fmfg/80">
            Runs on the booth you already have, or an iPhone: a link opens it on your screen, with your camera and
            your printer. Guests answer with gestures and get a high-end portrait in under a minute: editorial looks,
            magazine covers, movie posters, collectible cards, tarot cards or full transformations, signed with your
            logo, printed on site and shared by QR code. Every image is counted against your package, never beyond it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/photobooth"
              data-cta={`photobooth-discover-${source}`}
              className="rounded-full bg-fmfg px-6 py-3 text-sm font-semibold text-fmbg transition hover:bg-fmaccent"
            >
              Discover the photobooth
            </Link>
            <Link
              href="/start?ref=photobooth"
              data-cta={`photobooth-start-${source}`}
              className="rounded-full border border-fmborder px-6 py-3 text-sm text-fmfg/85 transition hover:border-fmfg/50"
            >
              Get a quote for your event
            </Link>
          </div>
        </div>
        {/* Paquet des vraies sorties de la borne, styles nouveaux d'abord (comme /photobooth). */}
        <StyleDeck items={newFirst(STYLE_IDS).map((id) => ({ id, label: STYLES[id].label.en, isNew: STYLES[id].isNew }))} />
      </div>
      <ul className="mt-3 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder text-sm sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Your existing booth", "Any screen, camera and printer, nothing to install"],
          [`${STYLE_IDS.length} styles`, "Activated per client from the CMS"],
          ["Your brand on every image", "Logo, print, QR sharing"],
          ["Gesture-driven", "Hand tracking on the device, FR · EN · AR"],
        ].map(([k, v]) => (
          <li key={k} className="bg-fmbg p-4">
            <p className="fm-display text-sm text-fmfg">{k}</p>
            <p className="fm-grotesk mt-1 text-[13px] text-fmmuted">{v}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
