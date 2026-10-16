import type { Localized } from "./config";
import type { ExpressionId } from "./expression";

// Style « Carte de tarot » : la borne tire un arcane au moment de la photo,
// selon l'aura du visiteur (energie choisie, expression lue sur l'appareil)
// et une part de hasard. Le portrait est genere comme cette carte-la.
//
// Noms d'arcanes traditionnels (domaine public), scenes ecrites pour nous :
// aucun jeu existant reproduit. Ecartes pour une soiree de marque : la Mort,
// le Diable, la Maison-Dieu, le Pendu, le Pape, la Papesse, le Jugement
// (sombres ou religieux). Aucune scene ne demande de texte ni d'autre personne.

export type Arcana = {
  id: string;
  numeral: string;
  name: Localized;
  /** Courte lecture affichee sous le titre. */
  reading: Localized;
  /** Ce que la carte represente autour de la personne (prompt). */
  scene: string;
  /** Affinites : ids de reponses d'energie et lectures d'expression. */
  aura: string[];
};

const L = (fr: string, en: string, ar: string): Localized => ({ fr, en, ar });

export const ARCANA: Arcana[] = [
  {
    id: "fool", numeral: "0", name: L("Le Mat", "The Fool", "الأحمق"),
    reading: L("Un saut vers l'inconnu, le cœur léger.", "A leap into the unknown, with a light heart.", "قفزة نحو المجهول بقلب خفيف."),
    scene: "a carefree wanderer at the edge of a sunlit cliff at dawn, a small white dog at their feet, a bundle tied to a staff, a white rose, wide open sky",
    aura: ["free", "curious", "bright"],
  },
  {
    id: "magician", numeral: "I", name: L("Le Bateleur", "The Magician", "الساحر"),
    reading: L("Tout est entre vos mains : il est temps d'agir.", "Everything is in your hands: time to act.", "كل شيء بين يديك: حان وقت الفعل."),
    scene: "one hand raised to the sky and one pointing to the earth, a table with a cup, a blade, a golden coin and a wand, a loop of light like an infinity sign above the head, red roses and white lilies",
    aura: ["bold", "focused"],
  },
  {
    id: "empress", numeral: "III", name: L("L'Impératrice", "The Empress", "الإمبراطورة"),
    reading: L("Abondance, création, tout fleurit autour de vous.", "Abundance and creation: everything blooms around you.", "وفرة وإبداع: كل شيء يزهر حولك."),
    scene: "seated among ripe golden wheat beside a flowing river, a crown of twelve small stars, pomegranate patterns on the robe, a lush forest behind",
    aura: ["calm", "radiant"],
  },
  {
    id: "emperor", numeral: "IV", name: L("L'Empereur", "The Emperor", "الإمبراطور"),
    reading: L("Structure, assurance, vous tenez le cap.", "Structure and confidence: you hold the course.", "ثبات وثقة: أنت تمسك بالدفة."),
    scene: "seated on a carved stone throne decorated with ram heads, a deep red cloak, an orb and a sceptre, arid mountains under a warm sky",
    aura: ["bold", "focused"],
  },
  {
    id: "lovers", numeral: "VI", name: L("L'Amoureux", "The Lovers", "العشاق"),
    reading: L("Un choix du cœur, une harmonie qui se dessine.", "A choice of the heart, a harmony taking shape.", "اختيار من القلب وانسجام يتشكل."),
    scene: "beneath a radiant sun shaped softly like a heart, a tree of fruit and a tree of small flames on either side, climbing roses, distant mountains in warm light",
    aura: ["radiant", "bright", "free"],
  },
  {
    id: "chariot", numeral: "VII", name: L("Le Chariot", "The Chariot", "العربة"),
    reading: L("Élan, volonté, rien ne vous arrête.", "Drive and willpower: nothing stops you.", "اندفاع وإرادة: لا شيء يوقفك."),
    scene: "standing in a chariot under a canopy of stars, drawn by two calm sphinxes, one black and one white, a walled city and a river behind",
    aura: ["bold", "focused"],
  },
  {
    id: "strength", numeral: "VIII", name: L("La Force", "Strength", "القوة"),
    reading: L("Une force douce, qui apprivoise plutôt qu'elle ne combat.", "A gentle strength that tames rather than fights.", "قوة هادئة تروّض ولا تقاتل."),
    scene: "calmly resting one hand on the mane of a gentle lion, a garland of flowers, a soft loop of light like an infinity sign above the head, green hills",
    aura: ["bold", "radiant", "serene"],
  },
  {
    id: "hermit", numeral: "IX", name: L("L'Hermite", "The Hermit", "الناسك"),
    reading: L("Le temps de la clarté intérieure : la réponse est en vous.", "Time for inner clarity: the answer is within you.", "وقت الصفاء الداخلي: الجواب بداخلك."),
    scene: "standing on a snowy summit at night in a long cloak, holding up a lantern with a glowing star inside, a deep indigo sky",
    aura: ["mystery", "serene", "focused"],
  },
  {
    id: "wheel", numeral: "X", name: L("La Roue de Fortune", "Wheel of Fortune", "عجلة الحظ"),
    reading: L("Le vent tourne en votre faveur.", "The wind is turning in your favour.", "الرياح تدور لصالحك."),
    scene: "a great golden wheel of fortune turning in the clouds behind the person, engraved with alchemical signs, an eagle, a lion and a bull resting on clouds in the corners",
    aura: ["free", "curious", "mystery"],
  },
  {
    id: "justice", numeral: "XI", name: L("La Justice", "Justice", "العدالة"),
    reading: L("Équilibre et vérité : le juste choix s'impose.", "Balance and truth: the right choice becomes clear.", "توازن وحقيقة: الاختيار الصائب يتضح."),
    scene: "seated between two stone pillars before a violet veil, holding golden scales in one hand and an upright sword in the other",
    aura: ["focused", "calm"],
  },
  {
    id: "temperance", numeral: "XIV", name: L("Tempérance", "Temperance", "الاعتدال"),
    reading: L("Harmonie et patience : tout trouve sa juste mesure.", "Harmony and patience: everything finds its measure.", "انسجام وصبر: كل شيء يجد مقداره."),
    scene: "pouring a stream of luminous water between two golden cups, one foot on the shore and one in a clear pool, irises in bloom, a path towards a rising sun",
    aura: ["calm", "serene"],
  },
  {
    id: "star", numeral: "XVII", name: L("L'Étoile", "The Star", "النجمة"),
    reading: L("Espoir et inspiration : votre étoile brille.", "Hope and inspiration: your star is shining.", "أمل وإلهام: نجمتك تتألق."),
    scene: "kneeling beside a clear pool under a great eight-pointed star and seven smaller stars, pouring water from two jugs, an ibis on a tree, a calm night meadow",
    aura: ["calm", "serene", "curious"],
  },
  {
    id: "moon", numeral: "XVIII", name: L("La Lune", "The Moon", "القمر"),
    reading: L("L'intuition vous guide à travers le mystère.", "Intuition guides you through the mystery.", "الحدس يقودك عبر الغموض."),
    scene: "a full moon with a calm face high in the sky, two distant towers, a winding path between them, a wolf and a dog looking up, a crayfish rising from a moonlit pool",
    aura: ["mystery", "serene"],
  },
  {
    id: "sun", numeral: "XIX", name: L("Le Soleil", "The Sun", "الشمس"),
    reading: L("Joie, éclat, réussite : votre lumière rayonne.", "Joy, radiance, success: your light shines.", "فرح وتألق ونجاح: نورك يشع."),
    scene: "a radiant golden sun with a calm face, a field of sunflowers, a white horse, a flowing red banner, clear joyful light",
    aura: ["radiant", "bright", "free"],
  },
  {
    id: "world", numeral: "XXI", name: L("Le Monde", "The World", "العالم"),
    reading: L("Accomplissement : un cycle se referme en beauté.", "Fulfilment: a cycle closes beautifully.", "اكتمال: دورة تنتهي بجمال."),
    scene: "framed by a great laurel wreath tied with red ribbons, an eagle, a lion, a bull and a dove resting on clouds in the four corners, a sky of soft gold",
    aura: ["radiant", "bright", "calm"],
  },
];

/** Hachage FNV-1a 32 bits (meme principe que les graines de mises en scene). */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Tirage d'un arcane. Les cartes accordees a l'aura pesent plus (energie : x3,
 * expression : x2), toutes restent possibles. Meme graine (la photo) = meme
 * carte : une relance ou un double clic ne change pas le tirage.
 */
export function drawArcana(seed: string, energy: string | undefined, expression: ExpressionId | null): Arcana {
  const weights = ARCANA.map((a) => 1 + (energy && a.aura.includes(energy) ? 3 : 0) + (expression && a.aura.includes(expression) ? 2 : 0));
  const total = weights.reduce((s, w) => s + w, 0);
  let r = (hash(`${seed}:tarot`) / 0x100000000) * total;
  for (let i = 0; i < ARCANA.length; i++) {
    r -= weights[i];
    if (r < 0) return ARCANA[i];
  }
  return ARCANA[ARCANA.length - 1];
}

export const arcanaById = (id: string | undefined) => ARCANA.find((a) => a.id === id) ?? null;
