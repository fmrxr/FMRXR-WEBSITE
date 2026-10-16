import type { Metadata } from "next";
import { social } from "@/lib/seo";
import Link from "next/link";
import { StyleDeck } from "@/components/site/StyleDeck";
import { ScrollFilm } from "@/components/site/ScrollFilm";
import { BoothIcon, type BoothIconKind } from "@/components/site/BoothIcon";
import { STYLE_IDS, STYLES, newFirst } from "@/lib/photobooth/styles";

// Nombre de styles calcule : la page suit la liste (styles.ts).
const STYLE_COUNT = STYLE_IDS.length;

// SEO : les termes que cherchent les organisateurs (AI photo booth, brand
// activation, magazine cover / movie poster / trading card photo booth).
export const metadata: Metadata = {
  title: "AI Photo Booth for Brand Activations & Events",
  description:
    `Turn any photobooth or an iPhone into an AI portrait studio for brand events. Gesture-controlled, your logo on every image, ${STYLE_COUNT} styles, print and QR sharing.`,
  keywords: [
    "AI photo booth", "AI photobooth", "branded photo booth", "brand activation", "event photo booth",
    "magazine cover photo booth", "movie poster photo booth", "trading card photo booth", "instant photo booth",
    "AI portrait", "gesture photo booth", "photobooth Tunisia", "photobooth Paris", "FMRXR",
  ],
  alternates: { canonical: "/photobooth" },
  // Apercu des liens (WhatsApp, LinkedIn) : scripts/photobooth/og.mjs.
  ...social({
    url: "/photobooth",
    title: "AI Photo Booth for Brand Activations · FMRXR//",
    description: "Your guests leave with a portrait signed by your brand, in under a minute. Works with the booth you already have.",
    images: [{ url: "/photobooth/og.jpg", width: 1200, height: 630, alt: "FMRXR AI Photo Booth: tarot, magazine cover and collectible card portraits" }],
  }),
};

// Questions des acheteurs (FAQ visible + donnees structurees FAQPage).
// Uniquement ce que le logiciel fait aujourd'hui.
const FAQ: [string, string][] = [
  ["Does it work with the photobooth we already have?",
    "Yes. Any booth with a screen, a camera and a modern browser (Chrome, Edge or Safari) runs it from a link: kiosk, mirror booth, totem, tablet stand. An iPhone on the same Wi-Fi can also serve as the camera, no app to install."],
  ["How long does a portrait take?",
    "Under a minute from the photo to the finished portrait, shown on screen, downloadable by QR code and printable on site."],
  ["Is our brand on every image?",
    "Yes. Your official logo appears on the screen, the download, the shared page and the print, and the AI receives it as a reference so it never invents a fake brand mark. Styles, titles and texts are set for your campaign."],
  ["Do guests still look like themselves?",
    "In editorial styles, only the light, the set and the colour grade change: the face, the pose and the framing stay the guest's own. Transformation styles reinterpret the guest while keeping a recognisable likeness."],
  ["What happens to guests' photos?",
    "Gestures and expression are read on the device and never sent. Only the photo the guest confirms is sent to generate the portrait. The share link lives 7 days, then our copies, any contact details and the source photo are erased automatically at the end of the retention period you choose (30 days by default). Any portrait can be removed from the gallery in one tap."],
  ["Is it GDPR and AI Act compliant?",
    "Consent is asked in plain words before the camera starts, every portrait carries a discreet AI-generated label and the same mention in its metadata, as the EU AI Act requires for generated content, and data is erased automatically. The marketing sign-up box is never pre-ticked."],
  ["Can we collect leads at the booth?",
    "Yes, with the lead capture option. While the portrait is being created, guests leave the details you choose (name, email, phone, one question of yours) and tick a separate sign-up box if they wish. Your team sees the contacts and the event statistics in the gallery and exports them as CSV."],
  ["How is it priced?",
    "Per event package: a number of portraits, a daily limit and a budget agreed in advance and enforced automatically. No surprise costs. Tell us your date and audience for a quote."],
  ["Which languages do guests see?",
    "French, English and Arabic, switchable on the booth."],
];

const STEPS: [string, string, BoothIconKind][] = [
  ["Learn by doing", "A ten-second tutorial on the live camera: raise a hand, hold it until the frame fills. FMRXR technologies hand tracking runs on the device: nothing is sent.", "hand"],
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
  ["A team gallery", "From the booth's first page, a team code opens every portrait of the event: QR, download, reprint, or remove a portrait in one tap."],
  ["An iPhone as the camera", "Scan a QR code on the same Wi-Fi and an iPhone streams to the booth, no app. Gestures are read on the phone for an instant response, photos come from its sensor.", true],
  ["Layouts framed on faces", "Cards and Polaroids are cropped around the faces measured at capture, solo or group, never around an empty wall."],
  ["Package control", "Each campaign has an image quota, a daily limit and a budget, reserved atomically before every paid request."],
  ["A client space", "Your team follows usage live: portraits made, remaining, period, booth link."],
  ["Print on site", "A local print agent detects the printer and prints 10×15 edge to edge, no dialog."],
  ["Privacy by design", "Gestures and expression are read on the device. Only the confirmed photo is sent to generate the portrait. Removed portraits stop being shared."],
  ["Delivered by email", "Guests leave their address while the portrait is being created and walk away: it reaches them as soon as it is ready, and the booth moves on to the next guest. Shorter queues.", true],
  ["A photo check before sending", "Before anything is sent, the booth checks the photo on the device: no face, too far, cut off, too dark, blurry or eyes closed. Guests retake it, and you never pay for an unusable portrait.", true],
  ["Statistics in the gallery", "Portraits made, share page views, downloads, emails sent, favourite styles and peak hours: the post-event report your team opens from the gallery.", true],
  ["Compliance built in", "Plain-words consent before the camera starts, an AI-generated label on every image and in its metadata (EU AI Act), automatic deletion at the end of the retention period.", true],
];

// Options payantes et fonctions a venir (forfait sur devis).
const OPTIONS: [string, string, "option" | "soon"][] = [
  ["Lead capture", "Name, email, phone and one question of yours, asked while the portrait is being created, with a separate sign-up box that is never pre-ticked. Contacts and CSV export in the team gallery.", "option"],
  ["Live wall", "A big screen in the room shows every new portrait the moment it is ready, then cycles through the latest ones, signed with your brand.", "option"],
  ["Animated portrait", "The portrait comes to life as a short video clip, made to be posted as a story or a reel.", "soon"],
];

export default function Photobooth() {
  // Styles nouveaux en tete de chaque famille.
  const editorial = newFirst(STYLE_IDS.filter((id) => STYLES[id].family === "editorial"));
  const transform = newFirst(STYLE_IDS.filter((id) => STYLES[id].family === "transform"));
  return (
    <>
      {/* Hero : promesse et appels a l'action a gauche, a droite le paquet des
          vraies sorties de la borne qu'on bat (styles nouveaux d'abord). */}
      <section className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 pb-16 pt-4 md:grid-cols-[1.15fr_0.85fr] md:gap-10 md:px-8 md:pb-24">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">— New · FMRXR Experience</p>
          <h1 className="fm-display mt-3 text-[clamp(2.75rem,8vw,6.25rem)] leading-[0.92] text-fmfg">AI Photo Booth</h1>
          <p className="fm-grotesk mt-6 max-w-xl text-lg leading-relaxed text-fmfg/85 md:text-xl">
            Your guests leave with a portrait signed by your brand, in under a minute.
          </p>
          <p className="fm-grotesk mt-3 max-w-xl text-[15px] leading-relaxed text-fmmuted">
            FMRXR’s AI photo booth turns the booth you already have, or an iPhone, into a portrait studio driven by gestures.
            Built for brand activations, product launches and festivals, and run under live conditions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/start?ref=photobooth" data-cta="photobooth-page-start" className="rounded-full bg-fmfg px-6 py-3 text-sm font-semibold text-fmbg transition hover:bg-fmaccent">
              Get a quote for your event
            </Link>
            <a href="#styles" data-cta="photobooth-page-styles" className="rounded-full border border-fmborder px-6 py-3 text-sm text-fmfg/85 transition hover:border-fmfg/50">
              See the {STYLE_COUNT} styles
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-fmmuted">
            <li><span className="text-fmfg">{STYLE_COUNT}</span> styles</li>
            <li><span className="text-fmfg">&lt; 1 min</span> per portrait</li>
            <li>Your booth or an iPhone</li>
            <li>FR · EN · AR</li>
          </ul>
        </div>
        <StyleDeck items={newFirst(STYLE_IDS).map((id) => ({ id, label: STYLES[id].label.en, isNew: STYLES[id].isNew }))} />
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

      <section id="styles" className="mx-auto max-w-[1200px] scroll-mt-24 border-t border-fmborder px-5 py-20 md:px-8 md:py-24">
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
                        <span className="fm-new">New</span>
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
        {/* Le film de la borne (BRAND/Motion/fmrxr-photobooth-film) : la facilité,
            les gestes et les styles, sur un modèle fictif passé dans la vraie chaîne. */}
        <div className="mt-8">
          <ScrollFilm
            src={`${MEDIA}/fmrxr-photobooth-film-16x9.mp4`}
            poster={`${MEDIA}/fmrxr-photobooth-film-poster.jpg`}
            label={`FMRXR AI Photobooth in 40 seconds: any booth, three gestures, ${STYLE_COUNT} styles on one face`}
          />
          <p className="mt-3 text-[11px] uppercase tracking-[0.15em] text-fmmuted">Music by Andrii Poradovskyi from Pixabay</p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(([title, body, isNew]) => (
            <div key={title} className="bg-fmbg p-6">
              <h3 className="fm-display flex items-center gap-2 text-lg text-fmfg">
                {title}
                {isNew && <span className="fm-new">New</span>}
              </h3>
              <p className="fm-grotesk mt-2 text-[14px] leading-relaxed text-fmmuted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="options" className="mx-auto max-w-[1200px] scroll-mt-24 border-t border-fmborder px-5 py-20 md:px-8 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">— Options</p>
        <h2 className="fm-display mt-3 text-[clamp(1.8rem,4vw,3rem)] text-fmfg">Add to your package</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {OPTIONS.map(([title, body, kind]) => (
            <div key={title} className={`rounded-xl border p-6 ${kind === "soon" ? "border-dashed border-fmborder" : "border-fmborder bg-fmcard/40"}`}>
              <p className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${kind === "soon" ? "border border-fmborder text-fmmuted" : "bg-fmfg text-fmbg"}`}>
                {kind === "soon" ? "Coming soon" : "Option"}
              </p>
              <h3 className="fm-display mt-4 text-lg text-fmfg">{title}</h3>
              <p className="fm-grotesk mt-2 text-[14px] leading-relaxed text-fmmuted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">— Questions</p>
        <h2 className="fm-display mt-3 text-[clamp(1.8rem,4vw,3rem)] text-fmfg">What event teams ask us</h2>
        <div className="mt-8 divide-y divide-fmborder overflow-hidden rounded-xl border border-fmborder">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group bg-fmbg p-6">
              <summary className="fm-display cursor-pointer list-none text-lg text-fmfg marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {q}
                  <span aria-hidden className="text-fmaccent transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="fm-grotesk mt-3 max-w-3xl text-[15px] leading-relaxed text-fmmuted">{a}</p>
            </details>
          ))}
        </div>
        {/* Donnees structurees : FAQ et service, pour les resultats enrichis de Google. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "FMRXR AI Photo Booth",
                serviceType: "AI photo booth for brand activations and events",
                description: "AI portrait software for events: works with any photobooth or an iPhone, gesture-controlled, branded portraits in under a minute, print and QR sharing.",
                url: "https://fmrxr.com/photobooth",
                provider: { "@type": "Organization", name: "FMRXR Studio", url: "https://fmrxr.com" },
                areaServed: ["Tunisia", "France", "Europe", "Middle East and North Africa"],
                availableLanguage: ["French", "English", "Arabic"],
              },
            ]),
          }}
        />
      </section>

      <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-24 text-center md:px-8 md:py-32">
        <h2 className="fm-display text-[clamp(2rem,5vw,3.6rem)] text-fmfg">Your brand, in every guest’s camera roll.</h2>
        <p className="fm-grotesk mx-auto mt-4 max-w-xl text-[15px] text-fmfg/80">
          Send us the date, the venue, the audience and the booth you use. We set your styles, your package and your branding,
          from brief to opening night.
        </p>
        <Link href="/start?ref=photobooth" data-cta="photobooth-page-bottom" className="mt-8 inline-block rounded-full bg-fmfg px-7 py-3.5 text-sm font-semibold text-fmbg transition hover:bg-fmaccent">
          Get a quote
        </Link>
      </section>
    </>
  );
}
