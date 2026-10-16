import Link from "next/link";
import { LiveWallDemo } from "./LiveWallDemo";

// Bloc produit « Live Wall » de /experiences, active depuis le CMS
// (/admin/experiences, slug live-wall). Une sortie : le brief prerempli
// (ref=live-wall, ajoute au message de la demande).

export function LiveWallCTA({ index, source }: { index: string; source: string }) {
  return (
    <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
      <div className="fm-glass-card grid items-center gap-10 overflow-hidden rounded-2xl p-6 md:grid-cols-[1fr_1.25fr] md:p-10">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-fmaccent">{index}</p>
          <h2 className="fm-display mt-3 text-[clamp(2.6rem,7vw,5.2rem)] text-fmfg">
            Live <span className="text-fmaccent">Wall</span>
          </h2>
          <p className="fm-display mt-3 text-[clamp(1.1rem,2.2vw,1.6rem)] text-fmfg/80">
            Your guests write to your brand, live on the big screen.
          </p>
          <p className="fm-grotesk mt-5 max-w-xl text-[15px] leading-relaxed text-fmfg/80">
            A QR code in the room, and every phone becomes a pen: sweet words, drawings, signatures, photos and your
            brand stickers land on the giant screen as cards people can like, comment and move around, by touch or
            with a hand-tracking camera. Memory notes or social-feed formats, moderated live by up to five people
            of your team, FR · EN · AR.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/start?ref=live-wall"
              data-cta={`livewall-start-${source}`}
              className="rounded-full bg-fmfg px-6 py-3 text-sm font-semibold text-fmbg transition hover:bg-fmaccent"
            >
              Get a quote for your event
            </Link>
          </div>
        </div>
        <LiveWallDemo />
      </div>
      <ul className="mt-3 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder text-sm sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["From every phone", "Words, drawings, signatures, photos"],
          ["4 card formats", "Memory notes or social-feed styles"],
          ["Your brand stickers", "On messages and as reactions"],
          ["Moderated live", "Up to 5 named moderators, on phone or on screen"],
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
