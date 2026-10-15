import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { STYLE_IDS, STYLES } from "@/lib/photobooth/styles";

export const metadata: Metadata = {
  title: "AI Photobooth · Branded portraits for events",
  description:
    "FMRXR's AI Photobooth: software that runs on any existing photobooth, gesture-driven, three questions, a high-end portrait in under a minute. 14 styles from editorial to magazine covers and film posters, your logo on every image, print and QR sharing, image quotas enforced per package.",
  alternates: { canonical: "/photobooth" },
  openGraph: {
    type: "website",
    url: "/photobooth",
    title: "AI Photobooth · FMRXR//",
    description: "Branded AI portraits for events: gestures, styles, print, QR, package control.",
  },
};

const STEPS: [string, string][] = [
  ["Raise a hand", "The camera starts only after consent. Hand tracking runs on the device: nothing is sent."],
  ["Solo or group", "One gesture to choose a portrait or a group photo. Every face is kept."],
  ["Three questions", "Energy, visual world, style: answered with a gesture, or a tap."],
  ["One photo", "A countdown, a preview, and an explicit confirmation before anything leaves the booth."],
  ["Your portrait", "Under a minute: on screen, downloadable, shared by QR code, printed on site."],
];

// Ce qui est vrai du logiciel aujourd'hui : une page web ouverte par un lien,
// la caméra vue par le navigateur, le toucher en repli des gestes, et
// l'imprimante du poste via l'agent local (ou la boîte d'impression).
const INTEGRATION: [string, string][] = [
  ["A link, nothing to install", "The booth runs in Chrome, Edge or Safari, full screen. Open the campaign link on the booth's computer or tablet and it is live."],
  ["Your camera", "Built-in camera, USB webcam, or a DSLR or mirrorless camera exposed as a webcam with its maker's utility."],
  ["Your screen and enclosure", "Kiosk, mirror booth, totem, iPad stand: any screen works, touch or not. Guests answer with gestures, or a tap."],
  ["Your printer", "A small local agent prints edge to edge on the printer already installed, on Windows, macOS or Linux. Without it, the browser print dialog takes over."],
];

const FEATURES: [string, string][] = [
  ["Likeness first", "Editorial styles edit light, set and colour grade only. The face, pose and framing stay the guest's own."],
  ["Your brand on every image", "Your official logo and ours, on the screen, the download, the shared page and the print."],
  ["Package control", "Each campaign has an image quota, a daily limit and a budget, reserved atomically before every paid request."],
  ["A client space", "Your team follows usage live: portraits made, remaining, period, booth link."],
  ["Print on site", "A local print agent detects the printer and prints 10×15 edge to edge, no dialog."],
  ["Privacy by design", "Gestures and expression are read on the device. Only the confirmed photo is sent to generate the portrait."],
];

export default function Photobooth() {
  const editorial = STYLE_IDS.filter((id) => STYLES[id].family === "editorial");
  const transform = STYLE_IDS.filter((id) => STYLES[id].family === "transform");
  return (
    <>
      <PageHero
        index="New · FMRXR Experience"
        title="AI Photobooth"
        intro="Your guests, portrayed by your brand. AI portrait software that turns any existing photobooth into a high-end portrait studio, driven by three gestures, built for brand activations, launches and festivals."
      />

      <section className="mx-auto flex max-w-[1200px] flex-wrap gap-3 px-5 md:px-8">
        <Link href="/start?ref=photobooth" data-cta="photobooth-page-start" className="rounded-full bg-fmfg px-6 py-3 text-sm font-semibold text-fmbg transition hover:bg-fmaccent">
          Book it for your event
        </Link>
        <Link href="/experiences" data-cta="photobooth-page-experiences" className="rounded-full border border-fmborder px-6 py-3 text-sm text-fmfg/85 transition hover:border-fmfg/50">
          Other experiences
        </Link>
      </section>

      <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:mt-16 md:px-8 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">— Integration</p>
        <h2 className="fm-display mt-3 text-[clamp(1.8rem,4vw,3rem)] text-fmfg">Works with the booth you already have</h2>
        <p className="fm-grotesk mt-4 max-w-2xl text-[15px] leading-relaxed text-fmfg/80">
          No new hardware. If your photobooth has a screen, a camera and a browser, it can run FMRXR AI Photobooth.
          Photobooth operators add AI portraits to their existing fleet, brands keep the booth they already rent.
        </p>
        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2 lg:grid-cols-4">
          {INTEGRATION.map(([title, body]) => (
            <div key={title} className="bg-fmbg p-6">
              <h3 className="fm-display text-lg text-fmfg">{title}</h3>
              <p className="fm-grotesk mt-2 text-[14px] leading-relaxed text-fmmuted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">— How it works</p>
        <ol className="mt-8 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(([title, body], i) => (
            <li key={title} className="bg-fmbg p-6">
              <span className="text-[11px] tracking-[0.1em] text-fmaccent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="fm-display mt-3 text-lg text-fmfg">{title}</h3>
              <p className="fm-grotesk mt-2 text-[14px] leading-relaxed text-fmmuted">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">— Styles</p>
        <h2 className="fm-display mt-3 text-[clamp(1.8rem,4vw,3rem)] text-fmfg">14 styles, activated per client</h2>
        <p className="fm-grotesk mt-4 max-w-2xl text-[15px] leading-relaxed text-fmfg/80">
          Each campaign offers the styles that fit the brand. Guests choose among them at the booth.
        </p>
        {[["Editorial · the face stays exact", editorial], ["Transformations · a recognisable likeness, reinterpreted", transform]].map(([label, ids]) => (
          <div key={label as string} className="mt-10">
            <p className="text-[12px] uppercase tracking-[0.12em] text-fmaccent">{label as string}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(ids as typeof STYLE_IDS[number][]).map((id) => (
                <div key={id} className="fm-glass-card rounded-xl p-5">
                  <p className="fm-display text-base text-fmfg">{STYLES[id].label.en}</p>
                  <p className="fm-grotesk mt-2 text-[13px] leading-relaxed text-fmmuted">{STYLES[id].blurb.en}</p>
                  {STYLES[id].layout !== "none" && (
                    <p className="mt-3 text-[10px] uppercase tracking-[0.12em] text-fmfg/60">Branded layout</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">— What you get</p>
        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(([title, body]) => (
            <div key={title} className="bg-fmbg p-6">
              <h3 className="fm-display text-lg text-fmfg">{title}</h3>
              <p className="fm-grotesk mt-2 text-[14px] leading-relaxed text-fmmuted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-24 text-center md:px-8 md:py-32">
        <h2 className="fm-display text-[clamp(2rem,5vw,3.6rem)] text-fmfg">Bring it to your next event.</h2>
        <p className="fm-grotesk mx-auto mt-4 max-w-xl text-[15px] text-fmfg/80">
          Tell us the date, the venue, the audience and the booth you use. We set up your styles, your package and your branding.
        </p>
        <Link href="/start?ref=photobooth" data-cta="photobooth-page-bottom" className="mt-8 inline-block rounded-full bg-fmfg px-7 py-3.5 text-sm font-semibold text-fmbg transition hover:bg-fmaccent">
          Start a project
        </Link>
      </section>
    </>
  );
}
