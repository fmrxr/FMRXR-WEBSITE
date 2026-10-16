import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { ScrollFilm } from "@/components/site/ScrollFilm";
import { BoothIcon, type BoothIconKind } from "@/components/site/BoothIcon";
import { STYLE_IDS, STYLES } from "@/lib/photobooth/styles";

// Nombre de styles calcule : la page suit la liste (styles.ts).
const STYLE_COUNT = STYLE_IDS.length;

export const metadata: Metadata = {
  title: "AI Photobooth · Branded portraits for events",
  description:
    `FMRXR's AI Photobooth: software that runs on any existing photobooth or an iPhone, gesture-driven, a high-end portrait in under a minute. ${STYLE_COUNT} styles from editorial to tarot cards, your logo on every image, a team gallery, print and QR sharing, image quotas enforced per package.`,
  alternates: { canonical: "/photobooth" },
  openGraph: {
    type: "website",
    url: "/photobooth",
    title: "AI Photobooth · FMRXR//",
    description: "Branded AI portraits for events: gestures, styles, print, QR, package control.",
  },
};

const STEPS: [string, string, BoothIconKind][] = [
  ["Learn by doing", "A ten-second tutorial on the live camera: raise a hand, hold it until the frame fills. Hand tracking runs on the device: nothing is sent.", "hand"],
  ["Solo or group", "One gesture to choose a portrait or a group photo. Every face is kept.", "shot"],
  ["One to three questions", "The mood of the portrait, answered with a gesture or a tap. The frame fills as the guest holds it and shows what it will do.", "questions"],
  ["One photo", "Thumbs up to shoot, thumbs up to confirm, V sign to retake. Nothing leaves the booth before the guest confirms.", "photo"],
  ["Your portrait", "Under a minute: on screen, downloadable, shared by QR code, printed on site.", "portrait"],
];

// Ce qui est vrai du logiciel aujourd'hui : une page web ouverte par un lien,
// la caméra vue par le navigateur, le toucher en repli des gestes, et
// l'imprimante du poste via l'agent local (ou la boîte d'impression).
const MEDIA = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media`;

const INTEGRATION: [string, string, BoothIconKind][] = [
  ["A link, nothing to install", "The booth runs in Chrome, Edge or Safari, full screen. Open the campaign link on the booth's computer, tablet, iPhone or Android phone and it is live.", "link"],
  ["Your camera, or an iPhone", "The built-in camera, a USB webcam, a DSLR exposed as a webcam, or an iPhone: scan a QR code on the same Wi-Fi and it becomes the booth camera, no app to install.", "camera"],
  ["Your screen and enclosure", "Kiosk, mirror booth, totem, iPad stand: any screen works, touch or not. Guests answer with gestures, or a tap.", "screen"],
  ["Your printer", "A small local agent prints edge to edge on the printer already installed, on Windows, macOS or Linux. Without it, the browser print dialog takes over.", "printer"],
];

const FEATURES: [string, string, boolean?][] = [
  ["Likeness first", "Editorial styles change the light, the set and the colour grade only. The guest's face, pose, gesture and framing stay their own, and a small or soft face is cleaned up, never redrawn."],
  ["Your brand on every image", "Your official logo and ours, on the screen, the download, the shared page and the print. The AI also receives your logo as a reference, so it never invents a fake brand mark."],
  ["A team gallery", "From the booth's first page, a team code opens every portrait of the event: QR, download, reprint, or remove a portrait in one tap.", true],
  ["An iPhone as the camera", "Scan a QR code on the same Wi-Fi and an iPhone streams to the booth, no app. Gestures are read on the phone for an instant response, photos come from its sensor.", true],
  ["Layouts framed on faces", "Cards and Polaroids are cropped around the faces measured at capture, solo or group, never around an empty wall.", true],
  ["Package control", "Each campaign has an image quota, a daily limit and a budget, reserved atomically before every paid request."],
  ["A client space", "Your team follows usage live: portraits made, remaining, period, booth link."],
  ["Print on site", "A local print agent detects the printer and prints 10×15 edge to edge, no dialog."],
  ["Privacy by design", "Gestures and expression are read on the device. Only the confirmed photo is sent to generate the portrait. Removed portraits stop being shared."],
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

      {/* Le film de la borne (BRAND/Motion/fmrxr-photobooth-film) : la facilité,
          les gestes et les styles, sur un modèle fictif passé dans la vraie chaîne. */}
      <section className="mx-auto max-w-[1200px] px-5 md:px-8">
        <ScrollFilm
          src={`${MEDIA}/fmrxr-photobooth-film-16x9.mp4`}
          poster={`${MEDIA}/fmrxr-photobooth-film-poster.jpg`}
          label="FMRXR AI Photobooth in 40 seconds: any booth, three gestures, fourteen styles on one face"
        />
        <p className="mt-3 text-[11px] uppercase tracking-[0.15em] text-fmmuted">Music by Andrii Poradovskyi from Pixabay</p>
      </section>

      <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:mt-16 md:px-8 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">— Integration</p>
        <h2 className="fm-display mt-3 text-[clamp(1.8rem,4vw,3rem)] text-fmfg">Works with the booth you already have</h2>
        <p className="fm-grotesk mt-4 max-w-2xl text-[15px] leading-relaxed text-fmfg/80">
          No new hardware. If your photobooth has a screen, a camera and a browser, it can run FMRXR AI Photobooth.
          Photobooth operators add AI portraits to their existing fleet, brands keep the booth they already rent.
        </p>
        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2 lg:grid-cols-4">
          {INTEGRATION.map(([title, body, icon]) => (
            <div key={title} className="bg-fmbg p-6">
              <BoothIcon kind={icon} />
              <h3 className="fm-display mt-5 text-lg text-fmfg">{title}</h3>
              <p className="fm-grotesk mt-2 text-[14px] leading-relaxed text-fmmuted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">— How it works</p>
        <h2 className="fm-display mt-3 text-[clamp(1.8rem,4vw,3rem)] text-fmfg">Three gestures, one portrait</h2>
        <p className="fm-grotesk mt-4 max-w-2xl text-[15px] leading-relaxed text-fmfg/80">
          No app, no account, no touch needed. Guests raise a hand and the booth guides them, in French, English or Arabic, to a finished portrait in under a minute.
        </p>
        <ol className="mt-8 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(([title, body, icon], i) => (
            <li key={title} className="bg-fmbg p-6">
              <BoothIcon kind={icon} />
              <span className="mt-5 block text-[11px] tracking-[0.1em] text-fmaccent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="fm-display mt-2 text-lg text-fmfg">{title}</h3>
              <p className="fm-grotesk mt-2 text-[14px] leading-relaxed text-fmmuted">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">— Styles</p>
        <h2 className="fm-display mt-3 text-[clamp(1.8rem,4vw,3rem)] text-fmfg">{STYLE_COUNT} styles, activated per client</h2>
        <p className="fm-grotesk mt-4 max-w-2xl text-[15px] leading-relaxed text-fmfg/80">
          Each campaign offers the styles that fit the brand. Guests choose among them at the booth.
          Every image below is a real output of the booth, made from one photo of a fictional model (generated, not a real person).
        </p>
        {[["Editorial · the face stays exact", editorial], ["Transformations · a recognisable likeness, reinterpreted", transform]].map(([label, ids]) => (
          <div key={label as string} className="mt-10">
            <p className="text-[12px] uppercase tracking-[0.12em] text-fmaccent">{label as string}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(ids as typeof STYLE_IDS[number][]).map((id) => (
                <figure key={id} className="fm-glass-card overflow-hidden rounded-xl">
                  {/* Sortie réelle de la borne (pipeline de production) sur un modèle fictif :
                      public/photobooth/styles/<id>.webp, une image par style. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                      src={`/photobooth/styles/${id}.webp`}
                      alt={`${STYLES[id].label.en} style, AI Photobooth output`}
                      loading="lazy"
                      width={600}
                      height={800}
                      className="aspect-[3/4] w-full bg-fmmutedbg object-cover"
                  />
                  <figcaption className="p-5">
                    <p className="fm-display flex items-center gap-2 text-base text-fmfg">
                      {STYLES[id].label.en}
                      {STYLES[id].isNew && (
                        <span className="rounded-full bg-fmaccent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-fmbg">New</span>
                      )}
                    </p>
                    <p className="fm-grotesk mt-2 text-[13px] leading-relaxed text-fmmuted">{STYLES[id].blurb.en}</p>
                    {STYLES[id].layout !== "none" && (
                      <p className="mt-3 text-[10px] uppercase tracking-[0.12em] text-fmfg/60">Branded layout</p>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">— What you get</p>
        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(([title, body, isNew]) => (
            <div key={title} className="bg-fmbg p-6">
              <h3 className="fm-display flex items-center gap-2 text-lg text-fmfg">
                {title}
                {isNew && <span className="rounded-full bg-fmaccent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-fmbg">New</span>}
              </h3>
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
