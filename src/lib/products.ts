// Produits FMRXR pour les evenements de marque. Chaque produit a toujours :
//   - sa page « Decouvrir » publique (/<slug>), generee depuis cette fiche ;
//   - son bloc sur /experiences, cache tant qu'on ne l'active pas dans le CMS
//     (/admin/experiences, meme slug) ;
//   - le brief prerempli /start?ref=<slug>.
// Le Photobooth garde sa page historique (/photobooth), faite a la main ; il
// figure ici pour le bloc et le CMS. Textes : uniquement ce que le produit fait
// aujourd'hui. Aucune reference a une licence de jeu video tierce.

import { MEDIA } from "./service-films";

export type ProductSlug = "photobooth" | "live-wall" | "stomp" | "rooftop" | "firefly-garden";

export type Product = {
  slug: ProductSlug;
  name: [string, string]; // deux moities du titre, la seconde en couleur d'accent
  tagline: string;
  intro: string;
  poster: string; // vignette du CMS et visuel du bloc
  demo: { kind: "wall" } | { kind: "game"; src: string } | { kind: "photobooth" } | { kind: "embed"; src: string };
  facts: [string, string][];
  steps?: [string, string][];
  features?: [string, string][];
  specs?: [string, string][];
  faq?: [string, string][];
  // Un film de section, avec ce qu'il montre. Vertical pour un reel.
  // `cuts` porte les montages proposes : un seul, ou plusieurs au choix
  // du visiteur.
  film?: {
    kicker: string;
    title: string;
    body: string;
    label: string;
    aspect?: string;
    items: [string, string][];
    cuts: { id: string; label: string; line: string; src: string; poster: string }[];
  };
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
    facts: [["Your existing booth", "Any screen, camera and printer"], ["Your brand on every image", "Logo, print, QR sharing"], ["Gesture-driven", "FMRXR technologies hand tracking"], ["FR · EN · AR", "Switchable on the booth"]],
  },
  {
    slug: "live-wall",
    name: ["The ", "Wall"],
    tagline: "Your event’s own social network, live on the big screen.",
    intro: "Not posts pulled from Instagram by hashtag: a social network that opens with your event and closes with it. A QR code in the room and every phone becomes a pen. Sweet words, drawings, signatures, photos and your brand stickers land on the giant screen as cards people can like, comment and move around, by touch or with FMRXR technologies hand tracking. Moderated live by your team.",
    poster: "/wall/live-wall-poster.webp",
    demo: { kind: "wall" },
    facts: [["Your event’s social network", "No app, no account, no hashtag"], ["Post, like, comment", "Words, drawings, signatures, photos"], ["Your brand everywhere", "Cards, papers, stickers, logo"], ["Moderated live", "Up to 5 named moderators"]],
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
      ["Hand-tracking option", "FMRXR technologies in front of the giant screen: close your fist to grab a card, open your hand to drop it. Two hands at once."],
      ["FR · EN · AR", "Every guest picks their language; the wall reads right to left in Arabic."],
      ["Sized for crowds", "The wall only sends what changed, and caps sends per guest and per minute."],
      ["Export for social media", "When the show ends, the wall edits its own vertical recap reel. Your team also downloads a print sheet of every card (A3 to A0, vector PDF), a mailing kit, and every card as an image with the full archive. No editing room, no wait."],
    ],
    specs: [["Giant screen", "Any screen or LED wall, a browser in full screen"], ["Guests", "Their own phone, by QR code"], ["Touch", "Optional touch screen"], ["Sensing", "Optional FMRXR technologies hand tracking"]],
    faq: [
      ["How is it different from a social wall?", "Most social walls display posts pulled from Instagram or X by hashtag: guests need an account and a public post, and what shows comes from outside the room. The Wall is a social network of its own, open only for your event. Guests post from their browser without an account, then like, comment and move the cards on the giant screen. Everything stays inside your event and comes back to your team as exports."],
      ["Do guests need an app?", "No. They scan a QR code and write from their browser."],
      ["Can we stop inappropriate messages?", "Yes. Flagged messages wait for your team, photos are validated by hand by default, and any card or comment can be hidden in one tap, from a phone or from the screen."],
      ["Can we use our own stickers and colours?", "Yes. Your logo, your sticker set, your colours and your card format are set per event."],
      ["How is it priced?", "Per event. Tell us your date, audience and screen for a quote."],
      ["What do we get after the event?", "A vertical recap reel for social media, edited by the wall itself; a print sheet of every card from A3 to A0; a mailing kit with a header image, cut-out cards and an HTML block; and every card as a transparent PNG with the spreadsheet of messages. Your team downloads all of it from its control page, without us."],
    ],
    film: {
      kicker: "After the show",
      title: "Export for social media",
      body: "When the night closes, nothing is sent to an editing room. The wall reads back its own evening: it keeps the cards people liked, replays the drawings stroke by stroke, saves the most-liked message for the end, and sets the pace on how much was written. Your team renders it in the browser, in your colours, with the print sheet, the mailing kit and the archive.",
      label: "The Wall recap reel",
      aspect: "aspect-[9/16]",
      // Trois écritures du même contenu. Le mur en choisit une par
      // événement ; ici le visiteur les compare.
      cuts: [
        { id: "fill", label: "Fills up", line: "A wide, still shot. The wall builds itself card after card, faster and faster, and each message comes through the middle big enough to read.", src: `${MEDIA}/live-wall-reel-fill-9x16.mp4`, poster: `${MEDIA}/live-wall-reel-fill-9x16.jpg` },
        { id: "words", label: "The words", line: "Cuts from card to card, close up. Five messages held long enough to be read on a phone, drawings replayed stroke by stroke.", src: `${MEDIA}/live-wall-reel-words-9x16.mp4`, poster: `${MEDIA}/live-wall-reel-words-9x16.jpg` },
        { id: "sweep", label: "One sweep", line: "A single unbroken move across the finished wall. Cards light up just before the camera reaches them.", src: `${MEDIA}/live-wall-reel-sweep-9x16.mp4`, poster: `${MEDIA}/live-wall-reel-sweep-9x16.jpg` },
      ],
      items: [
        ["Reel for social", "Vertical 9:16, 35 s, with square and wide cuts from the same edit."],
        ["Print sheet", "Every published card on one sheet, in your colours: A3, A2, A1 or A0, as a vector PDF for the printer."],
        ["Mailing kit", "Header image, the most-liked cards cut out, and an HTML block to paste into your mailing tool."],
        ["Full archive", "Every card as a transparent PNG, plus every message, like and comment as a spreadsheet and JSON."],
      ],
    },
    closing: "A social network that only exists for your night.",
    seo: {
      title: "The Wall: your event’s own social network, live on the big screen",
      description: "A live social wall that is a social network of its own: guests scan a QR code, post words, drawings, signatures and photos, then like, comment and move cards on the big screen. No app, no hashtag. Moderated live, FR · EN · AR.",
      keywords: ["the wall", "live social wall", "event social network", "live wall", "social wall", "event message wall", "interactive wall", "guestbook wall", "brand activation", "FMRXR"],
    },
  },
  {
    slug: "rooftop",
    name: ["Roof", "top"],
    tagline: "Run across neon rooftops. Collect the logos. Don’t fall.",
    intro: "An interactive LED floor becomes the tops of skyscrapers above a neon city at dusk. The city rolls toward the players like a slow treadmill: they keep stepping from roof to roof to collect your logos and stay above the streets, while a smoked glass over the void clears as the round speeds up.",
    poster: "/games/rooftop-poster.webp",
    demo: { kind: "game", src: "/experience/rooftop?mode=solo&seconds=45" },
    facts: [["Solo, 2v2 or 4 players", "Chosen with your feet"], ["Your logos to collect", "Gold ones are worth triple"], ["A city that rolls", "Keep moving, roof to roof"], ["Read from every side", "Scores face each player"]],
    steps: [
      ["Pick a mode", "Step on SOLO, 2v2 or 4 PLAYERS. In multiplayer, each player or team gets its own zone and colour."],
      ["Keep moving", "The city rolls toward you. Step onto the roofs ahead before yours slides away beneath your feet."],
      ["Collect", "Your logos arrive on the roofs ahead. Chain them to raise the multiplier."],
      ["The final drop", "The pace picks up at the end; when time is up, every free roof collapses and the void opens beneath the players."],
    ],
    features: [
      ["Built for LED floors", "Each 50 cm tile is a roof or a void, matching the floor’s sensor grid."],
      ["A floor-is-lava game", "The most played mechanic on interactive floors, in a skyline your guests will film."],
      ["Depth you can feel", "Towers plunge down to the street; the view shifts gently with the players."],
      ["Daily record", "Best score of the day on the end screen, to keep the queue going."],
    ],
    specs: [["Floor", "Interactive LED floor, 4 × 4 m typical"], ["Sensing", "FMRXR technologies, connected to the floor’s sensors or added"], ["Round", "75 s by default"], ["Players", "1 to 4, or two teams of two"]],
    faq: [
      ["What floor do we need?", "An interactive LED floor rented for the event, 4 × 4 m typical. FMRXR technologies connect its sensors to the game, set up for the model you rent; if the floor has none, FMRXR technologies sensors are added."],
      ["Is it safe?", "The city rolls at a gentle pace, 15 cm/s at the start and never above 45 cm/s, slower than a normal walk, and two roofs are never more than one 50 cm step apart: no jumping. Zones keep players apart."],
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
    specs: [["Floor", "Interactive LED floor, 4 × 4 m typical"], ["Sensing", "FMRXR technologies, connected to the floor’s sensors or added"], ["Round", "75 s by default"], ["Players", "1 to 4"]],
    closing: "A quick, loud game for every passer-by.",
    seo: {
      title: "STOMP: interactive LED floor game for brand events",
      description: "Branded targets rise from a neon city under a glass floor and players stomp them. 1 to 4 players or 2v2, on an interactive LED floor.",
      keywords: ["interactive LED floor game", "stomp game", "brand activation game", "interactive floor", "FMRXR"],
    },
  },
  {
    // Le Jardin des Lucioles : installation de lancement produit sur mur LED.
    // Page faite a la main (FireflyGardenLanding), comme le Live Wall. Le slug
    // n'est pas celui de l'experience jouable (jardin-des-lucioles) : le CMS
    // exige des slugs uniques entre blocs produit et catalogue.
    slug: "firefly-garden",
    name: ["Le Jardin ", "des Lucioles"],
    tagline: "Your product, revealed by light in a garden that wakes up.",
    intro: "A night garden on your LED wall and a single firefly. The guest leads it with a hand to START: your product appears out of the light, opens part by part, closes again and dissolves into a swarm that wakes the garden. Then the garden is theirs to explore.",
    poster: "/garden/reveil.webp",
    demo: { kind: "embed", src: "/experiences/jardin-des-lucioles/index.html" },
    facts: [["A 53.6 s reveal", "From START to the garden awake"], ["34 s exploded view", "Your product, part by part"], ["Hand-driven", "FMRXR technologies hand tracking"], ["Runs in real time", "A browser on your LED wall"]],
    specs: [
      ["Screen", "Panoramic LED wall, tested at 1600 × 600 (2.67:1)"],
      ["Rendering", "Real time, WebGL, in a browser"],
      ["Sensing", "FMRXR technologies hand tracking, three cameras, local, no network"],
      ["Loading", "15 to 20 s, all of it behind the opening screen, before START"],
      ["During the piece", "No file loaded, no shader compiled, no frame above 60 ms over a full sequence"],
      ["Light", "Average luminance under 0.2 in every state, pure white under 0.1 %"],
    ],
    faq: [
      ["Can it reveal our product?", "Yes, that is what it is built for. Your product is modelled in 3D, then the exploded view is written for it: the parts, their order, the labels and the close-ups. The garden around it stays the same."],
      ["What screen does it need?", "A panoramic LED wall driven by a computer with a browser. It was tested at 1600 × 600 pixels (2.67:1); other formats are set up before the event."],
      ["What does the guest have to do?", "Nothing to learn. A guide of three animated pictograms at the bottom of the screen shows the gestures: move the hand, open or close it, close the fist and hold it to click."],
      ["What if nobody is in front of it?", "Nine seconds without a visitor and the garden goes back to sleep on its START screen, ready for the next one."],
      ["Can we try it before booking?", "Yes. The same garden plays in your browser, with the mouse, or with your hand in front of your webcam: the hand tracking runs on your device and no image leaves it."],
      ["How is it priced?", "Per event. Tell us your date, your wall and your product for a quote."],
    ],
    closing: "Your product, the light that wakes the garden.",
    seo: {
      title: "Le Jardin des Lucioles: an interactive LED wall for product launches",
      description: "An interactive LED wall installation for product launches: guests lead a firefly with their hand, your product appears, opens in an exploded view and dissolves into light that wakes a living night garden. Real time, hand tracking.",
      keywords: ["interactive LED wall", "product launch installation", "product reveal", "exploded view", "interactive installation", "hand tracking installation", "brand activation", "immersive garden", "FMRXR"],
    },
  },
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
