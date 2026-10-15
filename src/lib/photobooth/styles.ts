import type { Localized } from "./config";

// Styles de rendu du photobooth. Chaque campagne active ceux qu'elle veut
// (CMS) ; le visiteur choisit parmi eux. Tendances relevees le 15/10/2026
// (vendeurs de bornes et presse tech, voir docs/PHOTOBOOTH.md).
//
// Deux familles :
// - « editorial » : le visage reste exact (prompt verrouille : seuls lumiere,
//   decor, etalonnage et finition changent). Certaines ajoutent une mise en
//   page composee par nous apres generation (couverture, affiche, carte,
//   Polaroid) : le texte n'est jamais demande a l'IA, qui le gere mal.
// - « transform » : la personne est reinterpretee (anime, peinture...). La
//   ressemblance reste demandee mais ne peut pas etre exacte : le CMS le dit.
// Ni personnage existant, ni marque, ni celebrite (risque juridique).

export const STYLE_IDS = [
  "mood", "film", "polaroid", "magazine", "poster", "card",
  "era70", "anime", "popart", "oil", "figurine", "clay", "hero", "cyberpunk",
] as const;
export type StyleId = (typeof STYLE_IDS)[number];

export type Layout = "none" | "polaroid" | "magazine" | "poster" | "card";

export type StyleDef = {
  id: StyleId;
  family: "editorial" | "transform";
  layout: Layout;
  label: Localized;
  blurb: Localized;
  /** editorial : traitement et finition imposes (le reste vient de l'ambiance). */
  treatment?: string;
  finish?: string;
  extra?: string;
  /** transform : description de l'oeuvre a produire. */
  transform?: string;
};

const L = (fr: string, en: string, ar: string): Localized => ({ fr, en, ar });

export const STYLES: Record<StyleId, StyleDef> = {
  mood: {
    id: "mood", family: "editorial", layout: "none",
    label: L("Mood Portrait", "Mood Portrait", "بورتريه المزاج"),
    blurb: L("Portrait éditorial composé à partir de vos choix.", "Editorial portrait composed from your choices.", "بورتريه تحريري من اختياراتك."),
  },
  film: {
    id: "film", family: "editorial", layout: "none",
    label: L("Film argentique", "Analog film", "فيلم تناظري"),
    blurb: L("Grain, fuites de lumière, couleurs passées : l'imperfection du vrai film.", "Grain, light leaks, faded colours: the imperfection of real film.", "حبيبات وتسرّب ضوء وألوان باهتة."),
    finish: "imperfect analog film photograph: visible film grain, soft light leaks at the edges, slightly faded colours, gentle softness, the look of a real 35mm print, not a polished digital image",
  },
  polaroid: {
    id: "polaroid", family: "editorial", layout: "polaroid",
    label: L("Polaroid", "Polaroid", "بولارويد"),
    blurb: L("Instantané au cadre blanc, couleurs douces et flash.", "Instant photo in a white frame, soft colours and flash.", "صورة فورية بإطار أبيض."),
    finish: "instant film photograph: on-camera flash look, soft faded instant-film colours, fine grain, slight vignette",
    extra: "Keep the face well inside the centre of the frame.",
  },
  magazine: {
    id: "magazine", family: "editorial", layout: "magazine",
    label: L("Couverture magazine", "Magazine cover", "غلاف مجلة"),
    blurb: L("Votre portrait en une, titre et accroches compris.", "Your portrait on the cover, masthead and lines included.", "صورتك على غلاف مجلة."),
    treatment: "a fashion magazine cover photograph",
    extra: "Leave calm, uncluttered background space in the top fifth of the image for the magazine title. No text in the image.",
  },
  poster: {
    id: "poster", family: "editorial", layout: "poster",
    label: L("Affiche de film", "Movie poster", "ملصق فيلم"),
    blurb: L("L'affiche du film dont vous êtes le personnage.", "The poster of the film you star in.", "ملصق فيلم أنت بطله."),
    treatment: "the key art photograph of a feature film poster",
    extra: "Let the lower quarter of the image fall into dark, calm shadow for the film title. No text in the image.",
  },
  card: {
    id: "card", family: "editorial", layout: "card",
    label: L("Carte à collectionner", "Collectible card", "بطاقة للجمع"),
    blurb: L("Votre carte, avec les stats de votre ambiance.", "Your card, with your mood as stats.", "بطاقتك مع إحصاءات مزاجك."),
    treatment: "a dynamic, high-energy portrait for a premium collectible card",
    extra: "Keep the face and shoulders centred with some space on all sides. No text in the image.",
  },
  era70: {
    id: "era70", family: "transform", layout: "none",
    label: L("Voyage dans le temps · 70s", "Time travel · 70s", "رحلة عبر الزمن · السبعينيات"),
    blurb: L("Vous, photographié dans les années 70.", "You, photographed in the 1970s.", "أنت في السبعينيات."),
    transform: "a 1970s photograph of this person: period hairstyle details and clothing of the 1970s, a 1970s interior, warm faded Kodachrome-like colours and film grain",
  },
  anime: {
    id: "anime", family: "transform", layout: "none",
    label: L("Anime", "Anime", "أنمي"),
    blurb: L("Vous, en personnage d'animation japonaise.", "You, as a Japanese animation character.", "أنت كشخصية أنمي."),
    transform: "a high-quality Japanese anime illustration of this person, clean line art, cel shading, expressive but faithful features, detailed painted background",
  },
  popart: {
    id: "popart", family: "transform", layout: "none",
    label: L("Pop art", "Pop art", "بوب آرت"),
    blurb: L("Couleurs franches et trames de BD.", "Bold colours and comic halftones.", "ألوان جريئة ونقاط قصص مصورة."),
    transform: "a pop art comic-book portrait of this person: bold black outlines, flat saturated colours, halftone dot shading",
  },
  oil: {
    id: "oil", family: "transform", layout: "none",
    label: L("Peinture à l'huile", "Oil painting", "لوحة زيتية"),
    blurb: L("Un portrait de maître, coups de pinceau visibles.", "An old-master portrait with visible brushwork.", "بورتريه بأسلوب الرسامين الكبار."),
    transform: "a classical oil painting portrait of this person in the old-master tradition: visible brushstrokes, canvas texture, chiaroscuro light",
  },
  figurine: {
    id: "figurine", family: "transform", layout: "none",
    label: L("Figurine 3D", "3D figurine", "مجسّم ثلاثي الأبعاد"),
    blurb: L("Vous, en figurine de collection dans sa boîte.", "You, as a boxed collectible figure.", "أنت كمجسّم في علبته."),
    transform: "a premium 3D collectible vinyl figurine of this person, standing inside a clear plastic window box with a plain, unbranded package design, studio product lighting",
  },
  clay: {
    id: "clay", family: "transform", layout: "none",
    label: L("Pâte à modeler", "Claymation", "صلصال"),
    blurb: L("Vous, en personnage d'animation en volume.", "You, as a stop-motion clay character.", "أنت كشخصية من الصلصال."),
    transform: "a stop-motion claymation character of this person: handmade clay texture with fingerprints, miniature set, soft studio light",
  },
  hero: {
    id: "hero", family: "transform", layout: "none",
    label: L("Super-héros", "Superhero", "بطل خارق"),
    blurb: L("Vous, héros d'un film d'action original.", "You, as the hero of an original action film.", "أنت بطل فيلم حركة."),
    transform: "an original superhero of this person: an original costume with no existing emblem or logo, cinematic action-film lighting, dramatic sky behind",
  },
  cyberpunk: {
    id: "cyberpunk", family: "transform", layout: "none",
    label: L("Cyberpunk", "Cyberpunk", "سايبربانك"),
    blurb: L("Vous, dans une mégapole du futur.", "You, in a megacity of the future.", "أنت في مدينة المستقبل."),
    transform: "a cyberpunk portrait of this person in a rain-soaked futuristic megacity at night, subtle tech accessories, reflections of city lights",
  },
};

export const DEFAULT_STYLES: StyleId[] = ["mood"];

export function isStyleId(v: unknown): v is StyleId {
  return typeof v === "string" && (STYLE_IDS as readonly string[]).includes(v);
}
