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
  // Chaque decor est une reference artistique nommee (mouvement, ou artiste
  // disparu : jamais un artiste vivant) et un etalonnage tire des couleurs cles
  // WGSN x Coloro 2028 (hex officiels, coloro.com/key-colors). Jamais un lieu
  // de banque d'images (skyline, carte postale, bureau generique).
  natural: [
    { lighting: "soft north window light from camera left in the manner of Vermeer, a white bounce opening the shadows, gentle wrap on the face", setting: "a quiet room after Vilhelm Hammershøi: bare plaster wall in pale grey-green, an open door onto a second room, a single wooden chair and a ceramic jug catching the light", grade: "muted interior grade of soft Serene Green (#CEE2D7) and warm grey, creamy highlights" },
    { lighting: "warm sun raking across coloured walls, sharp-edged architectural shadows on the backdrop only, soft fill on the face", setting: "a courtyard after Luis Barragán: planes of pink and earth-red plaster, a still water trough, a single tree", grade: "sunlit grade of Radiant Earth (#BA4433) and Flourish Pink (#F18D85), clean warm whites" },
    { lighting: "large diffused skylight, very soft and even, the calm light of a still-life studio", setting: "a studio shelf of matte ceramic vessels in dusty tones after Giorgio Morandi, raw plaster, linen", grade: "chalky still-life grade of sand, putty and Maize (#CFA15B), low contrast" },
    { lighting: "golden late-afternoon light through a wide opening, long soft shadows, warm reflector on the face", setting: "a Japandi interior: oak, washi paper screens, stone and dried grasses, wabi-sabi textures", grade: "warm natural grade of oak, rice paper and Maize (#CFA15B)" },
    { lighting: "soft overcast daylight from a high window, the quiet light of an Irving Penn daylight studio", setting: "a worn studio corner of old plaster and weathered wood, a folded painter's canvas leaning on the wall", grade: "gentle daylight grade, chalk whites, warm skin, a hint of Deep Green (#1C5247) in the shadows" },
  ],
  cinematic: [
    { lighting: "Caravaggesque chiaroscuro: a single warm key high to one side, the background falling into velvet darkness, the face clearly lit", setting: "a dark room where only fragments emerge from the shadow: a draped fabric, a carved table edge", grade: "deep chiaroscuro grade, Russet (#7C3330) and warm amber in rich blacks" },
    { lighting: "late low sunlight through a window in the manner of Edward Hopper, a clean slanting rectangle of light on the wall behind, soft fill on the face", setting: "a spare interior with a bare wall, a window frame and a chair, the solitude of a Hopper painting", grade: "Hopper grade: warm sunlit wall against cool Luminous Blue (#193F8F) shadows" },
    { lighting: "soft key with blurred coloured reflections behind, in the poetic colour of Saul Leiter, layered through glass and mist", setting: "a café window seen through condensation and reflections, shapes of red and blue melting in the glass", grade: "painterly Saul Leiter grade, muted with accents of Radiant Earth (#BA4433) and Offline Blue (#5C85BD)" },
    { lighting: "Rembrandt lighting: warm key at 45 degrees, a small triangle of light on the far cheek, deep but transparent shadows", setting: "a dark-panelled room with an oil-painting depth, a heavy velvet curtain and a brass candle holder", grade: "old-master grade of umber, Russet (#7C3330) and gold" },
    { lighting: "1970s New Hollywood light: warm tungsten practicals in the background, soft natural key on the face, gentle haze", setting: "a lived-in late-night interior with wood panelling, a record player and warm lamps glowing in the depth", grade: "warm 1970s film grade with Deep Green (#1C5247) undertones and soft blacks" },
  ],
  experimental: [
    { lighting: "coloured fluorescent tubes in the manner of Dan Flavin washing the wall behind, a clean neutral key on the face", setting: "a gallery corner where vertical fluorescent tubes in pink, yellow and blue build an architecture of light", grade: "fluorescent gallery grade of Flourish Pink (#F18D85), Positively Yellow (#FFDB39) and Offline Blue (#5C85BD)" },
    { lighting: "immersive monochrome colour light after Carlos Cruz-Diez's Chromosaturation, the face lit cleanly in neutral white", setting: "a chromosaturation room: successive spaces flooded with pure red, green and blue light seen in depth behind", grade: "saturated chromatic grade, pure colour fields, natural skin" },
    { lighting: "soft glowing light from large colour fields, as if lit by a Rothko painting, clean frontal key", setting: "a hushed, dimly lit contemporary gallery, walls of vast soft-edged colour fields in maroon and deep orange", grade: "meditative Rothko grade of Russet (#7C3330), Radiant Earth (#BA4433) and deep plum" },
    { lighting: "graphic flat light, colour gels in primary hues, crisp and even on the face", setting: "a set after the Memphis Group: bold geometric volumes, squiggle patterns, terrazzo and primary colours", grade: "playful Memphis grade of Positively Yellow (#FFDB39), Flourish Pink (#F18D85) and Luminous Blue (#193F8F)" },
    { lighting: "slow generative projections flowing behind, soft frontal fill keeping the face clear", setting: "a video-art installation after Nam June Paik: stacked vintage monitors glowing with abstract colour, cables and light", grade: "electric video grade of Luminous Blue (#193F8F) and Positively Yellow (#FFDB39), natural skin" },
  ],
  metallic: [
    { lighting: "cool specular rim light tracing curved surfaces, soft frontal key, light haze", setting: "a fluid white-and-chrome interior after Zaha Hadid: sweeping curved walls and continuous surfaces receding in depth", grade: "cool silver grade with Peaceful Lilac (#C9C5DF) reflections" },
    { lighting: "even glowing light from curved panels, space-age and soft", setting: "a 1970s space-age lounge after Verner Panton: rounded modular forms, glossy curves and a glowing ceiling", grade: "retro-futurist grade of Peaceful Lilac (#C9C5DF), chrome and Luminous Blue (#193F8F)" },
    { lighting: "liquid chrome reflections moving on the backdrop, crisp specular highlights, clean key on the face", setting: "a sculptural installation of liquid-chrome forms and mirrored ripples", grade: "liquid-chrome grade, graphite and silver with a single Offline Blue (#5C85BD) accent" },
    { lighting: "clean white glowing walls and ceiling, the clinical calm of a 1960s science-fiction set", setting: "a pristine white ceramic corridor with soft rounded edges and recessed light, after the futurism of the late 1960s", grade: "white futurist grade with Peaceful Lilac (#C9C5DF) shadows" },
    { lighting: "low cold key with a single coloured accent light on the backdrop", setting: "a brutalist interior of board-marked concrete and steel, monumental and quiet", grade: "graphite brutalist grade with a restrained Deep Green (#1C5247) accent" },
  ],

  // ---------- Q3 · style ----------
  editorial: [
    { treatment: "a fashion editorial portrait with the quiet intensity of Irving Penn's studio portraits", texture: "fine grain, matte gallery-print finish, true skin texture" },
    { treatment: "a fashion editorial with the graphic directness of Richard Avedon", texture: "crisp and clean, magazine-quality retouch" },
    { treatment: "a fashion editorial with the bold colour and graphic tension of Guy Bourdin", texture: "saturated print finish, glossy highlights" },
    { treatment: "a fashion editorial with the confident, cinematic glamour of Helmut Newton", texture: "polished high-contrast print finish" },
    { treatment: "an intimate art-book portrait in the spirit of Peter Lindbergh's natural light", texture: "soft grain, honest skin, analog warmth" },
  ],
  cinema: [
    { treatment: "a film still with the poetic light of Andrei Tarkovsky", texture: "35mm film stock, soft halation, gentle grain" },
    { treatment: "a film still with the dominant monochrome colour of Krzysztof Kieślowski's Three Colours trilogy", texture: "fine film grain, rich colour print" },
    { treatment: "a still from a 1970s New Hollywood film", texture: "warm film-print look, soft contrast, visible grain" },
    { treatment: "a still from a neo-noir film", texture: "deep blacks, soft-contrast print, fine grain" },
    { treatment: "a still from an auteur melodrama in the saturated style of Rainer Werner Fassbinder", texture: "vivid colour print, subtle halation" },
  ],
  digital: [
    { treatment: "a new-media art portrait where light is the material, in the lineage of the Light and Space movement", texture: "luminous detail, crisp and clean" },
    { treatment: "a generative-art portrait in the lineage of Vera Molnár's computer-drawn geometry", texture: "fine precise light lines in the background, never on the face" },
    { treatment: "a video-art portrait in the spirit of Nam June Paik", texture: "subtle scanline glow in the background only" },
    { treatment: "an immersive installation portrait, the person inside an artwork of light", texture: "soft gradients with sharp light accents" },
    { treatment: "a projection-mapping performance portrait", texture: "projected light textures, refined, never covering the face" },
  ],
  scifi: [
    { treatment: "a production still from a refined science-fiction film with the clinical elegance of late-1960s cinema", texture: "polished surfaces, light volumetric haze" },
    { treatment: "a retro-futurist portrait in the spirit of Syd Mead's visions", texture: "luminous industrial-design finish" },
    { treatment: "a science-fiction still with the colours of Moebius", texture: "clean cinematic finish, soft bloom" },
    { treatment: "a contemplative science-fiction still in the mood of Tarkovsky's Solaris", texture: "soft film grain, quiet light" },
    { treatment: "an architectural science-fiction editorial", texture: "matte ceramic and chrome surfaces behind" },
  ],
};
