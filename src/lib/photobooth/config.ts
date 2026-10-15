import { z } from "zod";
import { PROMPT_BANK } from "./prompt-bank";
import { DEFAULT_STYLES, STYLE_IDS } from "./styles";

// Configuration d'une campagne photobooth. Tout ce qui est texte, question,
// ambiance ou reglage de modele vit ici et peut etre surcharge par campagne
// (colonne photobooth_campaigns.config), sans toucher au code.

export const LOCALES = ["fr", "en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const GESTURES = ["open_palm", "fist", "thumb_up", "peace"] as const;
export type Gesture = (typeof GESTURES)[number];

const localized = z.object({ fr: z.string(), en: z.string(), ar: z.string() });
export type Localized = z.infer<typeof localized>;

// Chaque reponse apporte des fragments au profil d'ambiance. Le moteur les
// assemble de facon deterministe (voir mood.ts).
const optionSchema = z.object({
  id: z.string().regex(/^[a-z0-9_]+$/),
  gesture: z.enum(GESTURES),
  label: localized,
  title: localized.optional(), // mot qui entre dans le titre de l'ambiance
  palette: z.array(z.string().regex(/^#[0-9a-fA-F]{6}$/)).max(5).optional(),
  fragments: z.record(z.string(), z.string()), // lighting, atmosphere, texture...
  // Banque de mises en scene : une variante tiree par photo (voir mood.ts).
  // Absente = banque par defaut de cette reponse (prompt-bank.ts) ; [] = aucune.
  variants: z.array(z.record(z.string(), z.string())).max(50).optional(), // 50 : grands evenements (IQOS, 300 a 500 invites)
});

const questionSchema = z.object({
  id: z.string().regex(/^[a-z0-9_]+$/),
  prompt: localized,
  options: z.array(optionSchema).min(2).max(4),
});

export const MODELS = ["flare", "sunburst", "grok", "qwen"] as const;
export type ModelKey = (typeof MODELS)[number];

// Impression : "browser" = boite d'impression du navigateur (ou silencieuse
// en Chrome --kiosk-printing), aucune detection possible depuis une page web ;
// "agent" = agent local sur le PC de la borne (tools/photobooth-print-agent),
// qui detecte l'imprimante et imprime sans dialogue.
export const PAPERS = ["10x15", "13x18", "A6", "A5", "A4"] as const;
const printSchema = z.object({
  enabled: z.boolean(),
  mode: z.enum(["browser", "agent"]),
  agentUrl: z.string().regex(/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/, "agentUrl : http://127.0.0.1:<port> uniquement"),
  printer: z.string().max(200), // vide = imprimante par defaut
  paper: z.enum(PAPERS),
  fit: z.enum(["cover", "contain"]),
  maxPrints: z.number().int().min(1).max(10), // par portrait
});

export const campaignConfigSchema = z.object({
  title: localized,
  intro: localized,
  privacy: localized,
  quotaMessage: localized,
  locales: z.array(z.enum(LOCALES)).min(1),
  defaultLocale: z.enum(LOCALES),
  clientLogoUrl: z.string().url().or(z.literal("")),
  // 1 a 3 questions de 2 a 4 reponses (ex. IQOS : une seule question, deux ambiances).
  questions: z.array(questionSchema).min(1).max(3),
  // Direction visuelle commune a toutes les images de la campagne.
  styleBrief: z.string().max(1500),
  negative: z.string().max(800),
  // Remplace la consigne de decor generique (SET_DEPTH, mood.ts) : une campagne
  // de marque construit un monde de studio, pas un lieu reel.
  setDirection: z.string().max(800).optional(),
  // "medium" (defaut) : recul de camera, decor plus present, le corps sous le
  // cadre est invente. "keep" : cadre et pose d'origine intouches (IQOS).
  framing: z.enum(["medium", "keep"]).optional(),
  // Images officielles de la marque (logo...), envoyees au modele comme images
  // de reference 2, 3... pour qu'il n'invente jamais une fausse identite de marque.
  brandReferences: z.array(z.string().url()).max(3).optional(),
  model: z.enum(MODELS),
  resolution: z.enum(["1k", "2k", "4k"]),
  quality: z.enum(["low", "medium", "high", "xhigh", "max"]),
  aspectRatio: z.enum(["3:4", "2:3", "1:1", "9:16", "4:3"]), // ratios communs aux quatre modeles (4:3 : groupe en paysage),
  countdownSeconds: z.number().int().min(0).max(10),
  shareEnabled: z.boolean(), // QR de partage sur l'ecran resultat
  promptVariety: z.boolean(), // une variante de mise en scene tiree par photo
  // Styles proposes au visiteur pour cette campagne (styles.ts). Un seul = pas d'ecran de choix.
  styles: z.array(z.enum(STYLE_IDS)).min(1).max(STYLE_IDS.length),
  // Reconnaissance des gestes (calibrage : voir gestures.ts). Le seuil est le
  // score minimal du modele officiel ; le maintien, le temps pendant lequel le
  // geste doit etre tenu avant d'etre accepte.
  gestureMinScore: z.number().min(0.35).max(0.95),
  gestureHoldMs: z.number().int().min(300).max(3000),
  print: printSchema,
  maxUploadBytes: z.number().int().min(200_000).max(8_000_000),
});
export type CampaignConfig = z.infer<typeof campaignConfigSchema>;

const L = (fr: string, en: string, ar: string): Localized => ({ fr, en, ar });

const withBank = (qs: CampaignConfig["questions"]): CampaignConfig["questions"] =>
  qs.map((q) => ({ ...q, options: q.options.map((o) => ({ ...o, variants: PROMPT_BANK[o.id] ?? [] })) }));

export const DEFAULT_CONFIG: CampaignConfig = {
  title: L("Mood Portrait", "Mood Portrait", "بورتريه المزاج"),
  intro: L(
    "Trois gestes, une photo. Le système compose un portrait éditorial à partir de vos choix.",
    "Three gestures, one photo. The system composes an editorial portrait from your choices.",
    "ثلاث إشارات وصورة واحدة. يركّب النظام بورتريه تحريرياً انطلاقاً من اختياراتك.",
  ),
  privacy: L(
    "La caméra ne s'active qu'après votre accord. Vos gestes et votre expression sont lus sur cet appareil, rien n'en est envoyé ni enregistré. Seule la photo que vous confirmez est transmise à notre fournisseur d'images (Higgsfield) pour générer le portrait, qui reste accessible 7 jours à l'organisateur (partage, impression).",
    "The camera only starts after you agree. Your gestures and expression are read on this device, nothing of them is sent or stored. Only the photo you confirm is sent to our image provider (Higgsfield) to generate the portrait, which the organiser can access for 7 days (sharing, printing).",
    "لا تعمل الكاميرا إلا بعد موافقتك. تُقرأ إشاراتك وتعبيرك على هذا الجهاز ولا يُرسل منها شيء ولا يُحفظ. الصورة التي تؤكّدها فقط تُرسل إلى مزوّد الصور (Higgsfield) لتوليد البورتريه، ويبقى متاحاً للمنظّم 7 أيام (المشاركة والطباعة).",
  ),
  quotaMessage: L(
    "Cette expérience a atteint son nombre de portraits disponibles. Merci d'être passé·e.",
    "This experience has reached its number of available portraits. Thank you for stopping by.",
    "بلغت هذه التجربة الحدّ الأقصى من البورتريهات المتاحة. شكراً لزيارتك.",
  ),
  locales: ["fr", "en", "ar"],
  defaultLocale: "fr",
  clientLogoUrl: "",
  questions: withBank([
    {
      id: "energy",
      prompt: L("Quelle énergie voulez-vous exprimer ?", "What energy do you want to express?", "ما الطاقة التي تريد التعبير عنها؟"),
      options: [
        {
          id: "calm", gesture: "open_palm",
          label: L("Calme et minimale", "Calm and minimal", "هادئة وبسيطة"),
          title: L("Calme", "Still", "سكون"),
          fragments: { atmosphere: "serene, quiet, unhurried presence", expression: "relaxed, composed expression" },
        },
        {
          id: "bold", gesture: "fist",
          label: L("Audacieuse et intense", "Bold and intense", "جريئة ومكثّفة"),
          title: L("Intense", "Bold", "جرأة"),
          fragments: { atmosphere: "charged, confident, magnetic intensity", expression: "direct, confident gaze" },
        },
        {
          id: "free", gesture: "thumb_up",
          label: L("Libre et créative", "Free and creative", "حرّة ومبدعة"),
          title: L("Libre", "Free", "حرية"),
          fragments: { atmosphere: "playful, open, spontaneous energy", expression: "natural, lively expression" },
        },
        {
          id: "mystery", gesture: "peace",
          label: L("Futuriste et mystérieuse", "Futuristic and mysterious", "مستقبلية وغامضة"),
          title: L("Énigme", "Enigma", "لغز"),
          fragments: { atmosphere: "enigmatic, nocturnal, quietly futuristic mood", expression: "calm, enigmatic expression" },
        },
      ],
    },
    {
      id: "world",
      prompt: L("Quelle atmosphère visuelle vous attire ?", "Which visual atmosphere appeals to you?", "أيّ أجواء بصرية تجذبك؟"),
      options: [
        {
          id: "natural", gesture: "open_palm",
          label: L("Lumière douce, tons naturels", "Soft light, natural tones", "ضوء ناعم وألوان طبيعية"),
          palette: ["#efe6da", "#c9b49a", "#8a7a66", "#3e3a34"],
          fragments: { lighting: "soft diffused window light, gentle falloff", palette: "warm sand, linen, muted ochre" },
        },
        {
          id: "cinematic", gesture: "fist",
          label: L("Couleurs profondes, contraste cinéma", "Deep colours, cinematic contrast", "ألوان عميقة وتباين سينمائي"),
          palette: ["#0e1a2b", "#3b1f2b", "#b8743a", "#f1d3a6"],
          fragments: { lighting: "low-key cinematic lighting, single motivated key light, deep shadows", palette: "deep teal, oxblood, amber highlights" },
        },
        {
          id: "experimental", gesture: "thumb_up",
          label: L("Couleurs expérimentales, textures", "Experimental colours, textures", "ألوان تجريبية وملمس فني"),
          palette: ["#ff4f2e", "#ffd23f", "#2ec4b6", "#3a0ca3"],
          fragments: { lighting: "coloured gel lighting, two contrasting sources", palette: "saturated vermilion, acid yellow, deep violet" },
        },
        {
          id: "metallic", gesture: "peace",
          label: L("Reflets métalliques, futurisme", "Metallic reflections, futurism", "انعكاسات معدنية ومستقبلية"),
          palette: ["#0b0c10", "#5c6773", "#c0c7d1", "#7bef7b"],
          fragments: { lighting: "cool specular rim light, reflective surfaces, soft haze", palette: "graphite, brushed silver, a single cold green accent" },
        },
      ],
    },
    {
      id: "style",
      prompt: L("Quel style de portrait choisiriez-vous ?", "Which portrait style would you choose?", "أيّ أسلوب بورتريه تختار؟"),
      options: [
        {
          id: "editorial", gesture: "open_palm",
          label: L("Éditorial minimal", "Minimal editorial", "تحريري بسيط"),
          title: L("éditorial", "Editorial", "تحريري"),
          fragments: { treatment: "a high-end editorial portrait", texture: "fine film grain, matte finish" },
        },
        {
          id: "cinema", gesture: "fist",
          label: L("Portrait cinéma", "Cinematic portrait", "بورتريه سينمائي"),
          title: L("cinéma", "Cinema", "سينما"),
          fragments: { treatment: "a still frame from a film", texture: "35mm film texture, subtle halation" },
        },
        {
          id: "digital", gesture: "thumb_up",
          label: L("Art numérique expérimental", "Experimental digital art", "فن رقمي تجريبي"),
          title: L("génératif", "Generative", "توليدي"),
          fragments: { treatment: "a new-media art portrait, light used as material", texture: "refined luminous detail" },
        },
        {
          id: "scifi", gesture: "peace",
          label: L("Science-fiction raffinée", "Refined science fiction", "خيال علمي راقٍ"),
          title: L("orbital", "Orbital", "مداري"),
          fragments: { treatment: "a production still from a refined science-fiction film", texture: "polished surfaces, light volumetric haze" },
        },
      ],
    },
  ]),
  styleBrief:
    "High-end editorial portrait photography for a premium brand campaign. Professional retouching, true-to-life skin texture, precise colour grading, magazine-cover quality.",
  negative:
    "text, letters, logos, watermark, extra people, distorted hands, plastic skin, cartoon or illustration look, cheap neon effects",
  model: "flare",
  resolution: "2k",
  quality: "high",
  aspectRatio: "3:4",
  countdownSeconds: 3,
  shareEnabled: true,
  promptVariety: true,
  styles: DEFAULT_STYLES,
  gestureMinScore: 0.5,
  gestureHoldMs: 900,
  print: {
    enabled: false,
    mode: "agent",
    agentUrl: "http://127.0.0.1:7341",
    printer: "",
    paper: "10x15",
    fit: "cover",
    maxPrints: 1,
  },
  maxUploadBytes: 4_000_000,
};

/** Reglages automatiques : modele, rendu, calibrage des gestes, variete. */
export const AUTOMATIC = ["model", "resolution", "quality", "gestureMinScore", "gestureHoldMs", "promptVariety"] as const;

/**
 * Fusionne la surcharge de campagne avec la configuration par defaut puis
 * valide le tout. Une surcharge invalide renvoie une erreur lisible plutot
 * qu'une borne qui casse en plein evenement.
 */
export function resolveConfig(override: unknown):
  | { ok: true; config: CampaignConfig }
  | { ok: false; error: string } {
  const o = (override && typeof override === "object" ? override : {}) as Record<string, unknown>;
  const merged = {
    ...DEFAULT_CONFIG,
    ...o,
    print: { ...DEFAULT_CONFIG.print, ...((o.print && typeof o.print === "object" ? o.print : {}) as object) },
    // Automatique, jamais par campagne : une valeur enregistree est ignoree,
    // ainsi une amelioration du modele ou du calibrage profite a toutes.
    ...Object.fromEntries(AUTOMATIC.map((k) => [k, DEFAULT_CONFIG[k]])),
  };
  const parsed = campaignConfigSchema.safeParse(merged);
  if (!parsed.success) {
    const i = parsed.error.issues[0];
    return { ok: false, error: `${i.path.join(".")}: ${i.message}` };
  }
  const c = parsed.data;
  for (const q of c.questions) {
    const g = new Set(q.options.map((o) => o.gesture));
    if (g.size !== q.options.length) return { ok: false, error: `questions.${q.id}: chaque reponse doit avoir un geste different` };
  }
  if (!c.locales.includes(c.defaultLocale)) {
    return { ok: false, error: "defaultLocale doit faire partie de locales" };
  }
  return { ok: true, config: c };
}
