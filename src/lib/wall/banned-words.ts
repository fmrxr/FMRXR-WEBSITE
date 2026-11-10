// Base de mots du filtre du Live Wall : francais, anglais, arabe et derja
// tunisienne (en lettres arabes et en arabizi, avec les chiffres 3, 5, 7, 9).
//
// Deux niveaux, lus par lib/wall/moderation.ts :
//   BLOCK : sans ambiguite (insultes, injures sexuelles, injures racistes,
//           homophobes, appels a la haine). Le message n'est pas publie, il
//           part dans « Masqués », ou l'equipe peut le repecher.
//   DOUBT : un mot qui a aussi un sens innocent (« chatte », « bite », « con »,
//           « kalb »), ou un juron leger. Le message attend l'equipe.
//
// Une entree terminee par * couvre toutes les formes qui commencent ainsi
// (pluriels, feminins, conjugaisons) : « encul* » prend enculé, enculés,
// enculer. Sans *, le mot doit etre entier. Les expressions de plusieurs
// mots se cherchent telles quelles dans le texte normalise.
//
// Pieges deja evites, a ne pas reintroduire : « retard » (francais : en
// retard, retire des deux listes), « Nik » (prenom), « negro* » (le cocktail negroni), « zamal* »
// (le club Zamalek), « tahan* » (le prenom Tahani), « wtf » (exclamation),
// « niqu* » (niquel), « sale » (trop courant, et trop proche de « salle »).
//
// Le moteur ajoute de lui-meme les variantes d'ecriture : lettres repetees,
// lettres separees par des points ou des espaces, chiffres a la place des
// lettres, caracteres masques (* #), variantes de l'alif et de la hamza,
// signes diacritiques arabes. Inutile donc d'ecrire ici « fuuuck » ou
// « f.u.c.k ».
//
// Ajouter un mot : le mettre dans la bonne langue et le bon niveau, puis
// `npm test` (src/test/wall-filter.test.ts) pour verifier qu'il ne bloque
// pas une phrase de remerciement ordinaire.

export const BLOCK: string[] = [
  // ---- francais ----
  "connard*", "connasse*", "conasse*", "salope*", "salopard*", "salaud*", "pute", "putes", "putain de ta*",
  "encul*", "niquer", "nique", "niquez", "niquee", "niques", "ntm", "nique ta mere", "ta mere la", "fdp", "fils de pute", "batard*",
  "pede", "pedes", "pd", "tapette*", "tarlouze*", "tafiole*", "gouine*", "petasse*", "poufiasse*", "pouffiasse*",
  "catin*", "garce*", "enfoire*", "branleur*", "branleuse*", "suceur*", "suceuse*", "bouffon de ta*",
  "negro", "negros", "negre", "negres", "negresse*", "bougnoul*", "youpin*", "bicot*", "chinetoque*", "bamboula*", "travelo*",
  "pedophile*", "pedo", "nazi*", "heil hitler", "sieg heil", "sale arabe*", "sale noir*", "sale juif*",
  "sale race", "va te faire foutre", "nique sa mere", "nique ta race", "fils de chienne",
  // ---- anglais ----
  "fuck*", "motherfuck*", "mofo", "fck", "fuk", "fuq", "stfu", "gtfo",
  "bitch*", "biatch*", "bastard*", "cunt*", "asshole*", "arsehole*", "slut*", "whore*", "skank*",
  "nigger*", "nigga*", "faggot*", "fag", "fags", "tranny", "trannies", "dyke*",
  "twat*", "wanker*", "cocksucker*", "dickhead*", "shithead*", "bullshit", "jackass*", "dumbass*",
  "chink*", "spic", "spics", "kike*", "wetback*", "coon", "coons", "gook*", "paki", "pakis", "raghead*",
  "rapist*", "pedophile*", "paedophile*", "kys", "kill yourself", "kill urself", "go die", "heil", "kkk",
  "white power", "son of a bitch",
  // ---- derja tunisienne, en arabizi ----
  "zebi", "zebbi", "zabi", "zebby", "zeby", "zebek", "zebkom", "zab", "zeb", "zboub*",
  "zok", "zokk", "zokom*", "zokomek", "zok omek", "zokk omek", "zoukom*",
  "nayek", "nayk", "nikomek", "nikomk", "niklek", "nikmok", "naykek", "naykomek", "nayek omek", "manyouk*", "mnayek*", "minyouk*",
  "miboun*", "mibouna*", "maboun*",
  "9a7ba*", "ka7ba*", "qa7ba*", "g7ba", "kahba*", "qahba*", "gahba*", "9ahba*", "9a7boun*",
  "charmouta*", "sharmouta*", "charmota*",
  "zamel*", "zemel*", "zamal", "zwamel",
  "ta7an", "ta7ana", "tahan", "9wed", "9awed*", "9awad*", "gawed*", "kawed*", "kawad*", "9ouwad*",
  "3asba*", "asba omek", "7assoun omek",
  "omek el kahba", "omek kahba", "bouk el kalb", "ya ben el kahba", "ben el kahba", "wled el kahba", "weld el kahba",
  "ya9ra3", "ya9re3", "nayek rab*", "nayek din*", "yel3an rab*", "yel3an din*", "nal3an din*",
  // ---- arabe et derja, en lettres arabes ----
  "زبي", "زبك", "زبكم", "زب", "زك", "زكمك", "زك امك", "نيك", "نيكمك", "نيك امك", "نايك", "منيوك*", "ميبون*", "مبون*",
  "قحبه*", "كحبه*", "قحاب", "شرموطه*", "شراميط", "عاهره*", "عاهرات", "زامل*", "زوامل", "لوطي*",
  "طحان", "قواد*", "عرص*", "كس امك", "كسمك", "كس", "طيز*", "يلعن دين*", "يلعن رب*", "ولد القحبه", "ابن القحبه",
  "ابن الكلب", "يا ابن الكلب", "ابن الحرام", "حرامي ابن", "نيك رب*", "خول", "متناك*",
  // ---- emoji ----
  "🖕",
];

export const DOUBT: string[] = [
  // ---- francais : double sens, ou juron leger ----
  "con", "cons", "conne", "connes", "connerie*", "bite", "bites", "chatte", "couille*", "cul", "culs", "queue",
  "merde*", "merdique*", "putain", "bordel", "baise*", "baiser", "suce", "sucer", "branle*", "trainee", "nichon*",
  "abruti*", "debile*", "cretin*", "idiot*", "imbecile*", "gogol*", "mongol*", "bouffon*", "boloss*", "bolos",
  "tg", "ta gueule", "ferme ta gueule", "ferme la", "degage", "casse toi", "va te faire", "creve", "crever",
  "viol", "violer", "violeur*", "suicide*", "terroriste*", "hitler", "mort aux", "a mort", "raton*", "bride*",
  "gros porc", "grosse vache", "ordure*", "racaille*",
  // ---- anglais ----
  "shit*", "dick", "dicks", "cock", "cocks", "pussy", "pussies", "ass", "arse", "hoe", "hoes", "prick*",
  "bollock*", "douche*", "jerk*", "moron*", "idiot*", "stupid", "loser*", "sucks", "suck it", "screw you",
  "damn", "dammit", "goddamn*", "crap*", "piss*", "boob*", "tits", "titties", "nude*", "naked", "sex", "sexy",
  "porn*", "rape", "kill", "die", "hate you", "nazi", "terrorist*", "retarded", "dumb", "wtf",
  // ---- derja, arabizi : insultes legeres ou mots a double sens ----
  "nik", "bhim", "bhayem", "7mar", "hmar", "kalb", "kelb", "kleb", "5anzir", "khanzir", "hallouf", "7allouf",
  "msatek", "mestek", "mahboul", "ma7boul", "tfou", "5ra", "khra", "5raa", "zebla", "wsakh", "wesekh",
  "omek", "ommek", "bouk", "ras omek", "rkhis", "9lil tarbiya", "9alil tarbiya", "hayawen", "7ayawen",
  "behi barra", "barra rawa7", "mrid", "majnoun", "bghal", "beghel", "tchich", "chlaka",
  // ---- arabe : insultes legeres, double sens ----
  "حمار", "كلب", "كلاب", "حيوان", "خنزير", "حقير", "وسخ", "خرا", "زبله", "مسطك", "مهبول", "مجنون", "تفو",
  "يلعن", "لعنه", "ملعون", "غبي", "اغبى", "امك", "بوك", "قليل التربيه", "قليل الحيا", "يا حيوان",
  "جنس", "سكس", "عاري*", "نيج", "بزاز", "قتل", "موت", "ارهابي*", "انتحار",
  // ---- emoji ----
  "🍆", "🍑", "💦", "🤬",
];

// Mots courants qu'une ressemblance ou une recherche dans un mot plus long
// attraperait a tort. Ils ne sont jamais juges « proches » d'un mot de la
// base : seule une correspondance exacte les retiendrait.
export const SAFE: string[] = [
  "niquel", "niquels", "salle", "salles", "unique", "uniques", "technique", "techniques", "musique", "musiques",
  "magique", "magiques", "critique", "pratique", "tunique", "depute", "deputes", "deputee", "repute", "reputee", "reputes",
  "computer", "connu", "connue", "connus", "conte", "mere", "meres", "passe", "classe", "assez", "basse", "masse",
  "chatelain", "bitter", "cocktail", "cocktails", "scunthorpe", "assassin", "classic", "classique",
];
