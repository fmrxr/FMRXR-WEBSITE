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
  "era70", "anime", "popart", "oil", "figurine", "clay", "hero", "cyberpunk", "tarot", "headshot",
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
  /** editorial : decor, lumiere et palette imposes (remplacent ceux de l'ambiance et la direction de decor). */
  set?: string;
  lighting?: string;
  palette?: string;
  /** transform : description de l'oeuvre a produire. */
  transform?: string;
  /** Style recent : badge « Nouveau » sur la page, dans la borne et le CMS. */
  isNew?: boolean;
};

const L = (fr: string, en: string, ar: string): Localized => ({ fr, en, ar });

export const STYLES: Record<StyleId, StyleDef> = {
  mood: {
    id: "mood", family: "editorial", layout: "none",
    label: L("AURA FARMING", "AURA FARMING", "AURA FARMING"),
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
    // « Polaroid » est une marque deposee : le style dit « photo instantanee »,
    // et la description garde « facon Polaroid » (mention descriptive, utile au SEO).
    label: L("Photo instantanée", "Instant photo", "صورة فورية"),
    blurb: L(
      "L'instantané façon Polaroid : cadre blanc, flash doux, signé de votre marque. Fait pour être imprimé, épinglé et posté.",
      "The Polaroid-style instant print: white frame, soft flash, signed with your brand. Made to be printed, pinned and posted.",
      "صورة فورية على طريقة بولارويد: إطار أبيض وفلاش ناعم وتوقيع علامتك. لتُطبع وتُعلّق وتُنشر.",
    ),
    finish: "instant film photograph: on-camera flash look, soft faded instant-film colours, fine grain, slight vignette",
    extra: "Keep the face well inside the centre of the frame.",
  },
  magazine: {
    id: "magazine", family: "editorial", layout: "magazine",
    label: L("Couverture de magazine", "Magazine cover", "غلاف مجلة"),
    blurb: L(
      "Chaque invité en couverture du magazine de votre marque : titre, accroches et date posés par nous, jamais inventés par l'IA.",
      "Every guest on the cover of your brand's magazine: masthead, cover lines and date set by us, never invented by the AI.",
      "كل ضيف على غلاف مجلة علامتك: العنوان والعبارات والتاريخ من تصميمنا، لا من اختراع الذكاء الاصطناعي.",
    ),
    treatment: "a fashion magazine cover photograph",
    extra: "Leave calm, uncluttered background space in the top fifth of the image for the magazine title. No text in the image.",
  },
  poster: {
    id: "poster", family: "editorial", layout: "poster",
    label: L("Affiche de film", "Movie poster", "ملصق فيلم"),
    blurb: L(
      "Votre invité en tête d'affiche du film de la soirée : key art de cinéma, titre et générique à vos couleurs.",
      "Your guest headlines the film of the night: cinema key art, title and credits in your colours.",
      "ضيفك بطل فيلم السهرة: ملصق سينمائي بعنوان وأسماء بألوان علامتك.",
    ),
    treatment: "the key art photograph of a feature film poster",
    extra: "Let the lower quarter of the image fall into dark, calm shadow for the film title. No text in the image.",
  },
  card: {
    id: "card", family: "editorial", layout: "card", isNew: true,
    label: L("Carte à collectionner", "Collectible card", "بطاقة للجمع"),
    blurb: L(
      "Une carte 1/1 dans son boîtier gradé, statistiques tirées des réponses de l'invité. Faite pour être collectionnée et partagée.",
      "A 1/1 trading card in a graded case, its stats drawn from the guest's answers. Built to be collected and shared.",
      "بطاقة فريدة 1/1 في علبة مُقيَّمة، بإحصاءات من إجابات الضيف. لتُجمع وتُشارك.",
    ),
    treatment: "a dynamic, high-energy portrait for a premium collectible card",
    extra: "Keep the face and shoulders centred with some space on all sides. No text in the image.",
  },
  era70: {
    id: "era70", family: "transform", layout: "none", isNew: true,
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
  // Ajoute le 16/10/2026. Un arcane est tire selon l'aura (tarot.ts) et
  // decrit dans le prompt. Aucun jeu existant, ni texte (le modele ecrit mal),
  // ni symbole religieux.
  tarot: {
    id: "tarot", family: "transform", layout: "none", isNew: true,
    label: L("Carte de tarot", "Tarot card", "بطاقة تاروت"),
    blurb: L(
      "Une carte tirée selon votre aura du moment : vous en devenez la figure centrale.",
      "A card drawn from your aura of the moment: you become its central figure.",
      "بطاقة تُسحب حسب هالتك في هذه اللحظة: تصبح شخصيتها المحورية.",
    ),
    transform:
      "an original illustrated tarot card with this person as the central figure of an imaginary major arcana: a full card composition " +
      "framed by an ornate gilded art-nouveau border, fine engraved linework and hatching, celestial motifs (sun rays, moon phases, " +
      "stars and constellations) and botanical ornaments around the figure, rich jewel tones of deep indigo, emerald, oxblood and gold " +
      "leaf on aged parchment, a symmetrical, hieratic composition, an empty decorative banner at the bottom with no letters or numerals, " +
      "no religious symbols",
  },
  // Ajoute le 16/10/2026 : le portrait le plus demande dans les conferences et
  // salons (profil LinkedIn, site d'entreprise). Fond de studio neutre impose :
  // ici le decor artistique de la campagne serait un contresens.
  headshot: {
    id: "headshot", family: "editorial", layout: "none", isNew: true,
    label: L("Portrait professionnel", "Professional headshot", "صورة احترافية"),
    blurb: L(
      "Le portrait studio prêt pour LinkedIn : fond neutre, lumière flatteuse, retouche naturelle. Le cadeau utile des conférences et salons.",
      "The studio headshot ready for LinkedIn: neutral backdrop, flattering light, natural retouch. The useful takeaway at conferences and trade shows.",
      "صورة استوديو جاهزة للينكدإن: خلفية محايدة وإضاءة جميلة وتنقيح طبيعي. الهدية المفيدة في المؤتمرات والمعارض.",
    ),
    treatment: "a professional corporate headshot, the kind used on a LinkedIn profile or a company website",
    set: "a plain, seamless studio backdrop in a soft mid-grey with a gentle gradient, slightly lighter behind the head; nothing else in the background: no props, no furniture, no windows, no plants",
    lighting: "soft, flattering studio light: a large softbox key from slightly above and to one side, gentle fill, a subtle hair light separating the person from the backdrop",
    palette: "soft neutral greys and natural, true skin tones",
    finish: "crisp professional studio photograph: sharp focus on the eyes, natural skin texture with a light, honest retouch, accurate neutral colour, polished but authentic",
    extra: "Business-appropriate and approachable. Keep the person's own clothing. No text.",
  },
};

export const DEFAULT_STYLES: StyleId[] = ["mood"];

/** Styles nouveaux en premier, l'ordre des autres inchange (tri stable). */
export function newFirst<T extends StyleId>(ids: readonly T[]): T[] {
  return [...ids].sort((a, b) => Number(Boolean(STYLES[b].isNew)) - Number(Boolean(STYLES[a].isNew)));
}

export function isStyleId(v: unknown): v is StyleId {
  return typeof v === "string" && (STYLE_IDS as readonly string[]).includes(v);
}
