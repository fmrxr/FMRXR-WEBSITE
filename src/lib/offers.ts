// Les offres achetables telles quelles, affichées avec un prix « à partir de »
// en tête de /services. Prix validés par Haïfa le 12/11/2026, chacun tiré d'un
// devis ou d'une facture réels de 2026 :
//   The Wall           7 500 TND HT Tunis, 3 500 € la soirée en Europe (devis I-magine 10/11)
//   Installation LED   7 500 TND (Jardin des Lucioles), Yeux Box acceptée à 8 500
//   Projection mapping 2 000 TND (entre Oudhna 1 000 et Cozybar 3 500)
//   Live A/V           2 000 TND la soirée (montant payé par Calypso)
//   Boucle motion 30 s 2 500 TND (devis Arche)
// Tout le reste (CGI, web, installations d'envergure, photobooth) est sur devis.
// Côté public, les capteurs s'appellent « FMRXR technologies », jamais par leur fournisseur.

export type Offer = {
  slug: string;
  title: string;
  from: string;
  fromNote?: string;
  pitch: string;
  // Les services du catalogue Supabase qui portent cette offre : ils donnent les
  // projets de preuve et le filtre par industrie.
  services: string[];
  media: { src?: string; poster: string };
  demo: { label: string; href: string; play?: string };
  bring: string[];
  provide: string[];
  options: string[];
};

const MEDIA = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media`;
const svc = (slug: string) => ({ src: `${MEDIA}/svc-${slug}.mp4`, poster: `${MEDIA}/svc-${slug}.jpg` });

export const OFFERS: Offer[] = [
  {
    slug: "the-wall",
    title: "The Wall",
    from: "7,500 TND",
    fromNote: "excl. tax, Tunis · €3,500 per night in Europe",
    pitch: "Your event's own social network on the giant screen. Guests scan a QR code and post words, drawings and photos that land live on the wall.",
    services: ["interactive-installation", "brand-activation"],
    media: { poster: "/wall/live-wall-poster.webp" },
    demo: { label: "See how it works", href: "/live-wall" },
    bring: ["The Wall software, set up with your brand", "Show computer", "Operator on the day", "Optional FMRXR technologies hand tracking"],
    provide: ["A screen or LED wall", "Power and a network connection"],
    options: ["Extra day: 800 TND", "Touring outside Tunisia"],
  },
  {
    slug: "interactive-led",
    title: "Interactive LED installation",
    from: "7,500 TND",
    pitch: "An installation that answers the people in front of it: hands, bodies and voices drive the image on your LED surface.",
    services: ["interactive-installation", "real-time-systems"],
    media: { src: "/experiences/_media/jardin-des-lucioles.mp4", poster: "/experiences/_media/jardin-des-lucioles.jpg" },
    demo: { label: "Play one in your browser", href: "/experiences?play=jardin-des-lucioles", play: "jardin-des-lucioles" },
    bring: ["Concept and real-time content", "Integration on site", "Computers and FMRXR technologies sensors", "Operation on opening day"],
    provide: ["The LED surface", "Its structure and power"],
    options: ["LED surface sourced for you, on quote"],
  },
  {
    slug: "projection-mapping",
    title: "Projection mapping",
    from: "2,000 TND",
    pitch: "A facade, a ruin, a set or an object turned into the screen, with content written for that surface and nothing else.",
    services: ["projection-mapping"],
    media: svc("projection-mapping"),
    demo: { label: "Watch Oudhna", href: "/projects/mapping-oudhna" },
    bring: ["Content written for your surface", "Mapping and calibration", "Live operation"],
    provide: ["Projectors", "Access to the surface at night for calibration"],
    options: ["Projectors supplied, on quote"],
  },
  {
    slug: "live-av",
    title: "Live A/V · VJ set",
    from: "2,000 TND",
    fromNote: "per night",
    pitch: "Effet Mère on stage: live visuals that follow the music, played and not pressed play on.",
    services: ["vjing"],
    media: svc("vjing"),
    demo: { label: "Watch 100 Violons", href: "/projects/100-violons" },
    bring: ["Live performer", "VJ rig and real-time content"],
    provide: ["Screens or projectors", "A video input at the stage", "A sound feed"],
    options: ["Visual pack made for the artist's record, reusable on social"],
  },
  {
    slug: "motion-loop",
    title: "Motion loop · 30 s",
    from: "2,500 TND",
    pitch: "A 30 second film built only from your official brand assets, ready for screens, stands and social.",
    services: ["motion-design"],
    media: svc("motion-design"),
    demo: { label: "See the films", href: "/services/motion-design" },
    bring: ["A 30 s loop from your official assets", "16:9 master and a true 9:16 recomposition"],
    provide: ["Logo, fonts and brand guidelines"],
    options: ["Extra lengths and formats"],
  },
];
