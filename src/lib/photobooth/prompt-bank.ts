// Banque de variantes de prompt, par reponse.
//
// Chaque reponse garde son sens (titre, palette, direction) mais propose
// plusieurs mises en scene. A chaque photo, une variante est tiree par
// reponse : 5 x 5 x 5 = 125 mises en scene par ambiance, 8 000 au total.
// Le tirage est stable pour une meme photo (voir mood.ts).
//
// Cles par question :
//   energie : pose, expression, atmosphere
//   univers : lighting, setting        (la palette reste celle de la reponse)
//   style   : composition, camera, texture, styling
// Ecrit en anglais (langue des modeles). Ni marque, ni texte, ni logo.

export type Variant = Record<string, string>;

export const PROMPT_BANK: Record<string, Variant[]> = {
  // ---------- Q1 · energie ----------
  calm: [
    { pose: "shoulders relaxed, body turned three-quarters, chin slightly lowered", expression: "soft, composed gaze just past the lens", atmosphere: "stillness of an early morning, unhurried and quiet" },
    { pose: "seated, leaning lightly on one forearm, head tilted a few degrees", expression: "calm half-smile, relaxed eyes", atmosphere: "a hushed, contemplative pause, like a held breath" },
    { pose: "standing straight, hands loosely clasped at the waist", expression: "serene, gentle eye contact", atmosphere: "minimal and airy, open space around the subject" },
    { pose: "face turned toward the light in three-quarter view", expression: "peaceful, eyes lowered in thought", atmosphere: "meditative calm, soft and weightless" },
    { pose: "one hand resting near the collarbone, relaxed fingers", expression: "quiet confidence, faint warmth in the eyes", atmosphere: "gentle late-afternoon ease" },
  ],
  bold: [
    { pose: "square to the camera, shoulders back, chin up", expression: "intense, unblinking gaze into the lens", atmosphere: "electric tension just before a performance" },
    { pose: "leaning forward toward the camera, forearms on the knees", expression: "focused, determined look", atmosphere: "raw energy, cinematic charge" },
    { pose: "arms crossed, weight on one hip", expression: "self-assured, slightly defiant", atmosphere: "magazine-cover attitude, high-stakes confidence" },
    { pose: "head turning over the shoulder, caught mid-motion", expression: "fierce, magnetic glance", atmosphere: "momentum and drama, air in motion" },
    { pose: "hand framing the jawline, elbow raised", expression: "commanding, steady stare", atmosphere: "spotlight intensity, nothing held back" },
  ],
  free: [
    { pose: "candid mid-laugh, head tilted back slightly", expression: "genuine open smile", atmosphere: "spontaneous joy, playful lightness" },
    { pose: "hands in motion near the face, fingers spread expressively", expression: "curious, animated eyes", atmosphere: "creative studio energy, ideas in the air" },
    { pose: "relaxed asymmetric posture, one shoulder raised", expression: "easygoing grin", atmosphere: "free-spirited, sunlit improvisation" },
    { pose: "looking up and away, as if noticing something delightful", expression: "wonder, lively eyes", atmosphere: "dreamy, carefree curiosity" },
    { pose: "leaning against a wall, body loose and unposed", expression: "relaxed, mischievous smile", atmosphere: "effortless cool, nothing staged" },
  ],
  mystery: [
    { pose: "face partly turned away, eyes coming back to the lens", expression: "enigmatic, unreadable gaze", atmosphere: "nocturnal intrigue, quiet suspense" },
    { pose: "perfectly still, half of the face in shadow", expression: "calm, guarded stare", atmosphere: "noir mystery, secrets left unspoken" },
    { pose: "silhouetted edge, light catching only the eyes and a cheekbone", expression: "distant, contemplative", atmosphere: "futuristic solitude, a signal from elsewhere" },
    { pose: "chin resting on the back of the hand", expression: "knowing, subtle smile", atmosphere: "slow, hypnotic calm with a hint of the unknown" },
    { pose: "seen through a translucent veil of haze", expression: "serene and remote", atmosphere: "otherworldly, suspended in time" },
  ],

  // ---------- Q2 · univers ----------
  natural: [
    { lighting: "soft north-facing window light, gentle wrap, low contrast", setting: "a linen-toned room with a plaster wall and a sheer curtain" },
    { lighting: "golden-hour sun filtered through leaves, dappled warm highlights", setting: "a quiet garden courtyard with softly blurred greenery" },
    { lighting: "large diffused skylight, even and luminous", setting: "an airy ceramic studio with raw clay textures" },
    { lighting: "late-afternoon side light, long soft shadows", setting: "a sunlit Mediterranean interior with whitewashed walls" },
    { lighting: "overcast daylight, creamy and flattering", setting: "a seaside terrace of sand-coloured stone" },
  ],
  cinematic: [
    { lighting: "single hard key light from the side, deep shadow falloff", setting: "a dark wood-panelled room, one lamp glowing in the background" },
    { lighting: "neon practicals reflecting on wet surfaces, low-key exposure", setting: "a rain-soaked night street with distant bokeh lights" },
    { lighting: "warm tungsten pool of light against cool ambient shadow", setting: "an empty theatre with velvet seats fading into darkness" },
    { lighting: "dramatic rim light through smoky haze", setting: "a moody lounge corner in deep teal and oxblood" },
    { lighting: "low sun through blinds casting striped shadows", setting: "a vintage office at dusk, still and cinematic" },
  ],
  experimental: [
    { lighting: "two crossing gels, vermilion and electric blue, on the face", setting: "a seamless backdrop splashed with painterly colour fields" },
    { lighting: "projected light patterns falling across the skin", setting: "an immersive projection room of flowing generative graphics" },
    { lighting: "hard flash with saturated coloured shadows", setting: "a set of bold geometric paper sculptures" },
    { lighting: "magenta and ultraviolet glow, luminous accents", setting: "a gallery installation of translucent coloured acrylic panels" },
    { lighting: "prismatic light leaks and soft lens flares", setting: "an abstract space of layered textures and torn coloured paper" },
  ],
  metallic: [
    { lighting: "cool specular rim light with soft haze", setting: "a minimal chrome corridor with a reflective floor" },
    { lighting: "clean white key light with cold blue fill", setting: "a brushed-steel architectural interior with precise lines" },
    { lighting: "light bounced from mirrored panels, crisp highlights", setting: "a room of polished metal surfaces and soft reflections" },
    { lighting: "low cold light with a single green accent", setting: "a dark futuristic lab of glass and graphite" },
    { lighting: "moonlit silver light, high contrast", setting: "a night rooftop with glass towers and a cold skyline" },
  ],

  // ---------- Q3 · style ----------
  editorial: [
    { composition: "centered head-and-shoulders portrait, generous negative space above", camera: "85mm, f/2.8, eye level", texture: "fine film grain, matte finish", styling: "minimal tailored clothing in neutral tones" },
    { composition: "rule-of-thirds framing against a clean backdrop", camera: "100mm, f/4, slightly above eye level", texture: "soft matte, high-end magazine retouch", styling: "crisp white shirt, understated jewellery" },
    { composition: "tight close-up from the forehead to the chin", camera: "105mm, shallow depth of field", texture: "true-to-life skin texture, subtle grain", styling: "simple knit in a muted tone" },
    { composition: "waist-up portrait with strong vertical lines", camera: "70mm, f/3.5", texture: "clean, gallery-print finish", styling: "monochrome structured jacket" },
    { composition: "seated portrait with negative space to one side", camera: "85mm, f/2, low angle", texture: "gentle halation, analog warmth", styling: "relaxed linen layers" },
  ],
  cinema: [
    { composition: "anamorphic medium close-up, subject on the left third", camera: "50mm anamorphic, shallow depth, oval bokeh", texture: "35mm film stock, subtle halation", styling: "dark long overcoat" },
    { composition: "environmental framing with layered foreground depth", camera: "40mm, f/1.8", texture: "cinematic colour grade, fine grain", styling: "vintage leather jacket" },
    { composition: "wide portrait, subject small within a grand space", camera: "35mm, deep focus", texture: "classic motion-picture film look", styling: "elegant evening attire" },
    { composition: "symmetrical frame, subject centered in a doorway", camera: "32mm, f/2.8", texture: "soft-contrast print, film grain", styling: "classic tailored suit" },
    { composition: "low-angle hero shot", camera: "28mm, f/4", texture: "high dynamic range cinematic grade", styling: "textured knit and scarf" },
  ],
  digital: [
    { composition: "subject embedded in flowing generative light forms", camera: "50mm, crisp focus on the face", texture: "fine digital patterns, restrained glitch accents", styling: "sleek black garment" },
    { composition: "face framed by layered translucent shapes", camera: "65mm, f/2.8", texture: "particle dust and data-like grain", styling: "iridescent fabric" },
    { composition: "split composition, half photographic, half generative abstraction", camera: "50mm", texture: "painterly digital brushwork", styling: "graphic patterned top" },
    { composition: "portrait inside a ring of light trails", camera: "35mm, long-exposure feel", texture: "smooth gradients with sharp light streaks", styling: "minimal technical wear" },
    { composition: "fragmented mosaic background echoing the silhouette", camera: "85mm", texture: "refined pixel-sorted accents", styling: "bold colour-block outfit" },
  ],
  scifi: [
    { composition: "symmetrical architectural frame, subject centered", camera: "65mm, controlled perspective", texture: "polished surfaces, volumetric haze", styling: "structured futuristic collar" },
    { composition: "subject before a vast window onto a planetary horizon", camera: "35mm, wide", texture: "clean high-end CGI finish", styling: "sleek minimal flight jacket" },
    { composition: "close portrait with holographic interface reflections on the face", camera: "85mm", texture: "subtle scanlines and glass reflections", styling: "metallic high-neck top" },
    { composition: "subject standing in a long luminous tunnel", camera: "24mm, one-point perspective", texture: "soft bloom, crisp details", styling: "monochrome utility suit" },
    { composition: "three-quarter portrait framed by floating geometric modules", camera: "50mm, f/2", texture: "matte ceramic and chrome surfaces", styling: "refined architectural garment" },
  ],
};
