// Banque de variantes de prompt, par reponse.
//
// Regle de fond (test du 15/10/2026 : visages qui derivent) : un modele
// d'edition redessine le visage des qu'on lui demande de changer la pose, le
// cadrage ou l'objectif. Les variantes ne touchent donc JAMAIS a la pose, a
// l'angle de tete, au cadrage ni a l'optique : seulement a la lumiere, au
// decor, a la tenue, a l'etalonnage et a la finition. Ecrites comme un brief
// de plateau (schema d'eclairage, set, stylisme, etalonnage), en anglais.
//
// Cles par question :
//   energie : atmosphere, expression (nuance seulement), contrast
//   univers : lighting, setting, grade   (la palette affichee reste celle de la reponse)
//   style   : treatment, texture   (la tenue n'est jamais changee : voir mood.ts)
// 5 variantes par reponse : 125 mises en scene par ambiance, 8 000 au total.
// Ni marque, ni texte, ni logo, ni artiste vivant cite.

export type Variant = Record<string, string>;

export const PROMPT_BANK: Record<string, Variant[]> = {
  // ---------- Q1 · energie ----------
  calm: [
    { atmosphere: "quiet, unhurried stillness", expression: "a touch softer and more relaxed", contrast: "low, gentle contrast with open shadows" },
    { atmosphere: "the hush of an early morning", expression: "calm and at ease", contrast: "soft contrast, airy highlights" },
    { atmosphere: "serene, meditative calm", expression: "peaceful, composed", contrast: "low contrast, smooth tonal transitions" },
    { atmosphere: "a contemplative pause", expression: "gentle and thoughtful", contrast: "soft, even contrast" },
    { atmosphere: "light, weightless tranquillity", expression: "quietly confident", contrast: "delicate contrast, luminous mid-tones" },
  ],
  bold: [
    { atmosphere: "charged, magnetic intensity", expression: "a little more direct and confident", contrast: "high contrast, deep blacks" },
    { atmosphere: "electric tension just before a performance", expression: "focused and determined", contrast: "punchy contrast, crisp shadow edges" },
    { atmosphere: "magazine-cover confidence", expression: "self-assured", contrast: "strong contrast, rich saturated darks" },
    { atmosphere: "cinematic drama", expression: "intense, steady", contrast: "dramatic contrast with sculpted shadows" },
    { atmosphere: "spotlight energy, nothing held back", expression: "commanding", contrast: "high contrast, bright specular highlights" },
  ],
  free: [
    { atmosphere: "spontaneous, playful lightness", expression: "a little warmer and more open", contrast: "medium contrast, lively highlights" },
    { atmosphere: "creative studio energy", expression: "curious and animated", contrast: "medium contrast, fresh and bright" },
    { atmosphere: "sunlit, free-spirited improvisation", expression: "easygoing", contrast: "bright, open contrast" },
    { atmosphere: "carefree curiosity", expression: "lively", contrast: "medium-low contrast, glowing skin highlights" },
    { atmosphere: "effortless cool", expression: "relaxed, a hint of mischief", contrast: "natural contrast, clean whites" },
  ],
  mystery: [
    { atmosphere: "nocturnal intrigue, quiet suspense", expression: "a little more enigmatic", contrast: "low-key, deep shadows, restrained highlights" },
    { atmosphere: "noir mystery", expression: "calm and guarded", contrast: "chiaroscuro contrast" },
    { atmosphere: "futuristic solitude", expression: "distant, contemplative", contrast: "low-key with a single bright accent" },
    { atmosphere: "slow, hypnotic calm with a hint of the unknown", expression: "knowing", contrast: "soft low-key contrast" },
    { atmosphere: "otherworldly, suspended in time", expression: "serene and remote", contrast: "hazy low contrast, glowing edges" },
  ],

  // ---------- Q2 · univers ----------
  natural: [
    { lighting: "large north-facing window as key light from camera left, white bounce filling the shadow side, soft wrap on the face", setting: "a linen-toned room with a textured plaster wall, a sheer curtain lifting in the window light, a wooden stool and dried flowers in a stoneware vase", grade: "warm neutral grade, creamy highlights, gentle film-like roll-off" },
    { lighting: "late golden-hour sun filtered through foliage, warm dappled light on the backdrop, soft fill on the face", setting: "a quiet garden courtyard with olive trees, climbing jasmine on old stone walls and a small fountain", grade: "warm amber grade with natural green undertones" },
    { lighting: "big diffused overhead skylight with a soft reflector under the chin, even and luminous", setting: "an airy ceramics studio with raw clay textures and wooden shelves", grade: "soft natural grade, earthy neutrals" },
    { lighting: "low afternoon sidelight with long soft shadows, gentle fill from a white wall", setting: "a sunlit Mediterranean interior with whitewashed walls and terracotta tones", grade: "sun-warmed grade, ochre and sand tones" },
    { lighting: "overcast daylight through a wide doorway, flattering soft key, very gentle falloff", setting: "a seaside terrace of pale limestone with a low whitewashed parapet, potted bougainvillea and the sea stretching to the horizon behind", grade: "muted coastal grade, sand, linen and faded blue" },
  ],
  cinematic: [
    { lighting: "single hard key from a practical lamp at 45 degrees, deep falloff into shadow, faint warm rim on the hair", setting: "a dark wood-panelled room with a glowing lamp far behind", grade: "teal-and-amber cinema grade, rich blacks" },
    { lighting: "soft key from one side, coloured practicals reflecting on wet glass behind", setting: "a high-floor window at night, rain on the glass, the lit city grid and traffic trails spread out below", grade: "deep teal night grade with warm skin tones preserved" },
    { lighting: "warm tungsten pool of light on the face, cool ambient shadow around", setting: "an empty theatre, velvet seats fading into darkness", grade: "warm tungsten against cool shadows, film-print contrast" },
    { lighting: "dramatic rim light through light haze, controlled soft key on the face", setting: "a moody lounge corner in deep teal and oxblood", grade: "oxblood and teal grade, velvety shadows" },
    { lighting: "low sun through window blinds casting soft striped shadows on the backdrop only, clean light on the face", setting: "a vintage office at dusk", grade: "golden dusk grade, nostalgic film tone" },
  ],
  experimental: [
    { lighting: "projection mapping: slow abstract colour fields projected across the backdrop and lightly onto the shoulders, clean neutral key on the face", setting: "a dark immersive projection room", grade: "rich vermilion, saffron and violet projected light, natural skin" },
    { lighting: "two coloured gels, warm orange key and cool blue rim, balanced and subtle on the face", setting: "a seamless backdrop washed with painterly colour", grade: "complementary two-tone grade, refined, not neon" },
    { lighting: "projected generative patterns flowing on the wall behind, soft frontal fill keeping the face clear", setting: "an art installation of light and shadow", grade: "saturated but elegant palette of acid yellow and deep violet" },
    { lighting: "light through coloured translucent acrylic panels, soft coloured shadows on the backdrop", setting: "a gallery installation of translucent colour panels", grade: "gallery colour grade, clean and luminous" },
    { lighting: "prismatic light leaks across the edge of the frame, clean key on the face", setting: "an abstract space of layered textures and torn coloured paper", grade: "warm prismatic accents over a neutral base" },
  ],
  metallic: [
    { lighting: "cool specular rim light on both edges, soft frontal key, light haze", setting: "a minimal brushed-chrome corridor with recessed light lines receding into the distance", grade: "cool silver grade, neutral skin" },
    { lighting: "clean white beauty-dish key with cold blue fill", setting: "a brushed-steel architectural interior with precise lines", grade: "graphite and steel grade, crisp whites" },
    { lighting: "light bounced from mirrored panels, crisp specular highlights", setting: "a gallery of polished metal panels and mirrored columns, reflections repeating into depth", grade: "cool metallic grade with a single green accent" },
    { lighting: "low cold key, one green accent light on the backdrop", setting: "a dark futuristic lab of glass and graphite", grade: "deep graphite grade, restrained green" },
    { lighting: "moonlike silver key, high and soft, cold rim from behind", setting: "a night rooftop terrace with a glass railing, lit glass towers and a skyline behind", grade: "silver night grade, cool but true skin tones" },
  ],

  // ---------- Q3 · style ----------
  editorial: [
    { treatment: "a high-end fashion magazine portrait", texture: "fine grain, matte finish, true skin texture" },
    { treatment: "a clean studio editorial", texture: "soft matte, magazine-quality retouch" },
    { treatment: "a minimalist art-book portrait", texture: "subtle grain, gallery-print finish" },
    { treatment: "a modern editorial cover", texture: "clean, polished print finish" },
    { treatment: "a quiet, intimate editorial", texture: "gentle halation, analog warmth" },
  ],
  cinema: [
    { treatment: "a still frame from an auteur film", texture: "35mm motion-picture film stock, subtle halation" },
    { treatment: "a cinematic character portrait", texture: "fine film grain, gentle anamorphic bokeh in the background" },
    { treatment: "a period film still", texture: "classic film-print look" },
    { treatment: "a neo-noir film still", texture: "soft-contrast print with fine grain" },
    { treatment: "an indie film poster portrait", texture: "high dynamic range cinematic finish" },
  ],
  digital: [
    { treatment: "a new-media art portrait, light used as material", texture: "fine luminous detail, crisp and clean" },
    { treatment: "a generative-art exhibition portrait", texture: "delicate light particles in the air around the subject" },
    { treatment: "a projection-mapping performance portrait", texture: "projected light textures, refined and precise" },
    { treatment: "a digital art gallery portrait", texture: "smooth gradients with sharp light accents" },
    { treatment: "an immersive installation portrait", texture: "subtle data-like light patterns, never covering the face" },
  ],
  scifi: [
    { treatment: "a production still from a refined science-fiction film", texture: "polished surfaces, light volumetric haze" },
    { treatment: "a space-age editorial", texture: "clean high-end cinematic finish" },
    { treatment: "a near-future character portrait", texture: "subtle glass reflections in the background" },
    { treatment: "a sci-fi film poster portrait", texture: "soft bloom, crisp details" },
    { treatment: "an architectural sci-fi editorial", texture: "matte ceramic and chrome surfaces behind" },
  ],
};
