// Produits FMRXR pour les evenements de marque. Chaque produit a toujours :
//   - sa page « Decouvrir » publique (/<slug>), generee depuis cette fiche ;
//   - son bloc sur /experiences, cache tant qu'on ne l'active pas dans le CMS
//     (/admin/experiences, meme slug) ;
//   - le brief prerempli /start?ref=<slug>.
// Le Photobooth garde sa page historique (/photobooth), faite a la main ; il
// figure ici pour le bloc et le CMS. Textes : uniquement ce que le produit fait
// aujourd'hui. Aucune reference a une licence de jeu video tierce.

export type ProductSlug = "photobooth" | "live-wall" | "stomp" | "rooftop";

export type Product = {
  slug: ProductSlug;
  name: [string, string]; // deux moities du titre, la seconde en couleur d'accent
  tagline: string;
  intro: string;
  poster: string; // vignette du CMS et visuel du bloc
  demo: { kind: "wall" } | { kind: "game"; src: string } | { kind: "photobooth" };
  facts: [string, string][];
  steps?: [string, string][];
  features?: [string, string][];
  specs?: [string, string][];
  faq?: [string, string][];
  closing?: string;
  seo?: { title: string; description: string; keywords: string[] };
};

export const PRODUCTS: Product[] = [
  {
    slug: "photobooth",
    name: ["AI Photo", "booth"],
    tagline: "Your guests, portrayed by your brand.",
    intro: "Runs on the booth you already have, or an iPhone. Guests answer with gestures and get a high-end portrait in under a minute, signed with your logo, printed on site and shared by QR code.",
    poster: "/photobooth/hero-photobooth.webp",
    demo: { kind: "photobooth" },
    facts: [["Your existing booth", "Any screen, camera and printer"], ["Your brand on every image", "Logo, print, QR sharing"], ["Gesture-driven", "Hand tracking on the device"], ["FR · EN · AR", "Switchable on the booth"]],
  },
  {
    slug: "live-wall",
    name: ["Live", "Wall"],
    tagline: "Your guests write to your brand, live on the big screen.",
    intro: "A QR code in the room and every phone becomes a pen. Sweet words, drawings, signatures, photos and your brand stickers land on the giant screen as cards people can like, comment and move around, by touch or with a hand-tracking camera. Moderated live by your team.",
    poster: "/wall/live-wall-poster.webp",
    demo: { kind: "wall" },
    facts: [["From every phone", "Words, drawings, signatures, photos"], ["4 card formats", "Memory notes or social-feed styles"], ["Your brand stickers", "On messages and as reactions"], ["Moderated live", "Up to 5 named moderators"]],
    steps: [
      ["Scan", "Guests scan the QR code shown on the wall and on the tables. No app, no account."],
      ["Write, draw, sign", "A sweet word, a drawing, a signature or a photo, decorated with your brand stickers."],
      ["Land on the wall", "The card arrives on the giant screen with an animation; drawings replay stroke by stroke."],
      ["Play together", "Likes, comments, sticker reactions. Guests move their own card from their phone, or anyone moves cards on a touch screen."],
    ],
    features: [
      ["Four card formats", "Memory notes and polaroids, or layouts in the spirit of photo feeds, timelines and forums. No third-party logos."],
      ["Brand sticker set", "Upload your stickers: guests place them on their messages and use them as reactions."],
      ["Live moderation", "Automatic filter for insults, links and phone numbers in French, English, Derja and Arabic; photos validated by hand by default. Up to five named moderators, on their phone or right on the screen, every action signed."],
      ["Hand-tracking option", "A camera in front of the giant screen: close your fist to grab a card, open your hand to drop it. Two hands at once."],
      ["FR · EN · AR", "Every guest picks their language; the wall reads right to left in Arabic."],
      ["Sized for crowds", "The wall only sends what changed, and caps sends per guest and per minute."],
    ],
    specs: [["Giant screen", "Any screen or LED wall, a browser in full screen"], ["Guests", "Their own phone, by QR code"], ["Touch", "Optional touch screen"], ["Camera", "Optional webcam for hand tracking"]],
    faq: [
      ["Do guests need an app?", "No. They scan a QR code and write from their browser."],
      ["Can we stop inappropriate messages?", "Yes. Flagged messages wait for your team, photos are validated by hand by default, and any card or comment can be hidden in one tap, from a phone or from the screen."],
      ["Can we use our own stickers and colours?", "Yes. Your logo, your sticker set, your colours and your card format are set per event."],
      ["How is it priced?", "Per event. Tell us your date, audience and screen for a quote."],
    ],
    closing: "Every guest leaves a word on your brand.",
    seo: {
      title: "Live Wall for Events: messages, drawings and photos on the big screen",
      description: "Guests scan a QR code and send sweet words, drawings, signatures and photos to a live, interactive wall with your brand stickers. Moderated live, FR · EN · AR.",
      keywords: ["live wall", "social wall", "event message wall", "interactive wall", "guestbook wall", "brand activation", "FMRXR"],
    },
  },
  {
    slug: "rooftop",
    name: ["Roof", "top"],
    tagline: "Run across neon rooftops. Collect the logos. Don’t fall.",
    intro: "An interactive LED floor becomes the tops of skyscrapers above a neon city at dusk. Players walk from roof to roof to collect your logos while the city sinks and rises beneath them, and a smoked glass over the void clears as the round speeds up.",
    poster: "/games/rooftop-poster.webp",
    demo: { kind: "game", src: "/experience/rooftop?mode=solo&seconds=45" },
    facts: [["Solo, 2v2 or 4 players", "Chosen with your feet"], ["Your logos to collect", "Gold ones are worth triple"], ["A city that moves", "Roofs collapse, others rise"], ["Read from every side", "Scores face each player"]],
    steps: [
      ["Pick a mode", "Step on SOLO, 2v2 or 4 PLAYERS. In multiplayer, each player or team gets its own zone and colour."],
      ["Collect", "Walk onto the roofs carrying your logo. Chain them to raise the multiplier."],
      ["Watch your step", "Stepping into the void, or staying on a roof that flashes red before collapsing, costs points."],
      ["The final drop", "When time is up, every free roof collapses and the void opens beneath the players."],
    ],
    features: [
      ["Built for LED floors", "Each 50 cm tile is a roof or a void, matching the floor’s sensor grid."],
      ["A floor-is-lava game", "The most played mechanic on interactive floors, in a skyline your guests will film."],
      ["Depth you can feel", "Towers plunge down to the street; the view shifts gently with the players."],
      ["Daily record", "Best score of the day on the end screen, to keep the queue going."],
    ],
    specs: [["Floor", "Interactive LED floor, 4 × 4 m typical"], ["Input", "Floor sensors via a local relay set up per model, or touch"], ["Round", "75 s by default"], ["Players", "1 to 4, or two teams of two"]],
    faq: [
      ["What floor do we need?", "An interactive LED floor rented for the event, 4 × 4 m typical. We connect its sensors to the game with a small local relay set up for the model you rent; without sensors, a LiDAR or an infrared camera can be added."],
      ["Is it safe?", "Difficulty comes from choices, not running speed: roofs warn 1.6 seconds before collapsing, and zones keep players apart."],
      ["Can it carry our brand?", "Yes: your logo on every collectible, and your colours on the scores and screens."],
    ],
    closing: "Your logo, thirty floors above the city.",
    seo: {
      title: "ROOFTOP: interactive LED floor game for brand events",
      description: "A floor-is-lava game on an interactive LED floor: players run across neon rooftops, collect your logos and avoid the void. Solo, 2v2 or 4 players.",
      keywords: ["interactive LED floor game", "floor is lava game", "brand activation game", "interactive floor", "event game", "FMRXR"],
    },
  },
  {
    slug: "stomp",
    name: ["Stomp", ""],
    tagline: "Your logos rise from a neon city. Stomp them.",
    intro: "On an interactive LED floor, branded targets rise from a city thirty floors below a frosted glass floor. Players stomp them before they sink back; the glass clears as the round speeds up.",
    poster: "/games/stomp-poster.webp",
    demo: { kind: "game", src: "/experience/stomp?seconds=45" },
    facts: [["1 to 4 players", "Or two teams of two"], ["Your logo on every target", "Gold ×3, red to avoid"], ["Combos up to ×4", "Chain the stomps"], ["Frosted glass", "Clears as the round speeds up"]],
    steps: [
      ["Join", "Step on your colour, or on Teams for 2v2."],
      ["Stomp", "Hit your targets in your zone before they sink. Gold is worth triple, red costs points."],
      ["Reveal", "At the end the glass turns clear and the city opens beneath the players."],
    ],
    specs: [["Floor", "Interactive LED floor, 4 × 4 m typical"], ["Input", "Floor sensors via a local relay set up per model, or touch"], ["Round", "75 s by default"], ["Players", "1 to 4"]],
    closing: "A quick, loud game for every passer-by.",
    seo: {
      title: "STOMP: interactive LED floor game for brand events",
      description: "Branded targets rise from a neon city under a glass floor and players stomp them. 1 to 4 players or 2v2, on an interactive LED floor.",
      keywords: ["interactive LED floor game", "stomp game", "brand activation game", "interactive floor", "FMRXR"],
    },
  },
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
