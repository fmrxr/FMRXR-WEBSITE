import type { Locale } from "@/lib/wall/config";

// Textes de l'interface du Live Wall (telephone et ecran), FR / EN / AR.

const fr = {
  write: "Écrire", wall: "Le mur",
  kinds: { text: "Mot doux", drawing: "Dessin", signature: "Signature", photo: "Photo", sticker: "Sticker" },
  name: "Votre prénom (facultatif)",
  textPh: "Écrivez votre mot…",
  captionPh: "Une légende (facultatif)",
  signHere: "Signez ici",
  drawHere: "Dessinez ici",
  undo: "Annuler", clear: "Effacer",
  takePhoto: "Prendre ou choisir une photo", changePhoto: "Changer de photo",
  stickers: "Stickers", stickersHint: "Touchez un sticker pour l’ajouter, glissez-le pour le placer.",
  pickSticker: "Choisissez un sticker à coller sur le mur",
  bigger: "Plus grand", smaller: "Plus petit", rotate: "Tourner", remove: "Retirer",
  send: "Envoyer sur le mur", sending: "Envoi…",
  sentLive: "C’est sur le mur. Regardez l’écran !",
  sentPending: "Bien reçu. L’équipe le valide, puis il apparaît sur le mur.",
  again: "Envoyer autre chose",
  like: "J’aime", comment: "Commenter", comments: "commentaires", oneComment: "commentaire",
  commentPh: "Votre commentaire…", reply: "Répondre", react: "Réagir avec un sticker",
  moveHint: "Glissez votre carte pour la déplacer sur le mur.",
  yours: "à vous",
  empty: "Le mur attend ses premiers mots.",
  scan: "Scannez pour écrire sur le mur",
  now: "à l’instant", min: "min", h: "h",
  pending: "en attente", hidden: "non publié",
  screen: {
    sensorReady: "Poing fermé pour attraper, main ouverte pour lâcher",
    sensorFailed: "Caméra indisponible", sensorLoading: "Caméra…", fullscreen: "Plein écran",
    moderation: "Modération", hideFromWall: "Masquer du mur", pin: "Épingler", unpin: "Désépingler",
    comments: "Commentaires", removeComment: "Retirer le commentaire", close: "Fermer",
    denied: "Accès de modération refusé : ce lien a peut-être été retiré.", failed: "Action impossible, réessayez.",
    moveRefused: "Déplacement refusé, la carte reprend sa place.", likeRefused: "Like non pris en compte.",
  },
  mod: {
    pending: "En attente", published: "Publiés", hidden: "Masqués", nothing: "Rien ici.", loading: "Chargement…",
    connected: "Connecté·e", publish: "Publier", hide: "Masquer", anon: "anonyme", comments: "Commentaires",
    flagged: "Signalé", hiddenBy: "Masqué par", moderatedBy: "Modéré par", by: "par",
    flags: { mot: "mot signalé", lien: "lien", numero: "numéro", compte: "@compte" } as Record<string, string>,
  },
  errors: {
    COOLDOWN: "Doucement : réessayez dans quelques secondes.",
    SESSION_LIMIT: "Vous avez atteint le nombre de messages pour cet événement.",
    RATE_LIMITED: "Trop d’envois d’un coup, réessayez dans une minute.",
    EMPTY_TEXT: "Écrivez quelques mots.", EMPTY_DRAWING: "Le dessin est vide.", NO_PHOTO: "Ajoutez une photo.",
    NO_STICKER: "Choisissez un sticker.", PHOTO_TOO_LARGE: "Photo trop lourde.", PHOTO_UNREADABLE: "Photo illisible.",
    NOT_STARTED: "Le mur n’est pas encore ouvert.", ENDED: "Le mur est fermé.", SUSPENDED: "Le mur est en pause.",
    generic: "Envoi impossible, réessayez.",
  } as Record<string, string>,
};

type Strings = typeof fr;

const en: Strings = {
  write: "Write", wall: "The wall",
  kinds: { text: "Sweet word", drawing: "Drawing", signature: "Signature", photo: "Photo", sticker: "Sticker" },
  name: "Your first name (optional)",
  textPh: "Write your word…",
  captionPh: "A caption (optional)",
  signHere: "Sign here", drawHere: "Draw here",
  undo: "Undo", clear: "Clear",
  takePhoto: "Take or choose a photo", changePhoto: "Change photo",
  stickers: "Stickers", stickersHint: "Tap a sticker to add it, drag it to place it.",
  pickSticker: "Pick a sticker to put on the wall",
  bigger: "Bigger", smaller: "Smaller", rotate: "Rotate", remove: "Remove",
  send: "Send to the wall", sending: "Sending…",
  sentLive: "It’s on the wall. Look at the screen!",
  sentPending: "Got it. The team checks it, then it shows on the wall.",
  again: "Send something else",
  like: "Like", comment: "Comment", comments: "comments", oneComment: "comment",
  commentPh: "Your comment…", reply: "Reply", react: "React with a sticker",
  moveHint: "Drag your card to move it on the wall.",
  yours: "yours",
  empty: "The wall is waiting for its first words.",
  scan: "Scan to write on the wall",
  now: "just now", min: "min", h: "h",
  pending: "pending", hidden: "not published",
  screen: {
    sensorReady: "Close your fist to grab, open your hand to drop",
    sensorFailed: "Camera unavailable", sensorLoading: "Camera…", fullscreen: "Full screen",
    moderation: "Moderation", hideFromWall: "Hide from the wall", pin: "Pin", unpin: "Unpin",
    comments: "Comments", removeComment: "Remove comment", close: "Close",
    denied: "Moderation access denied: this link may have been revoked.", failed: "Action failed, try again.",
    moveRefused: "Move refused, the card goes back.", likeRefused: "Like not counted.",
  },
  mod: {
    pending: "Pending", published: "Published", hidden: "Hidden", nothing: "Nothing here.", loading: "Loading…",
    connected: "Signed in as", publish: "Publish", hide: "Hide", anon: "anonymous", comments: "Comments",
    flagged: "Flagged", hiddenBy: "Hidden by", moderatedBy: "Moderated by", by: "by",
    flags: { mot: "flagged word", lien: "link", numero: "phone number", compte: "@account" },
  },
  errors: {
    COOLDOWN: "Easy: try again in a few seconds.",
    SESSION_LIMIT: "You reached the message limit for this event.",
    RATE_LIMITED: "Too many sends at once, try again in a minute.",
    EMPTY_TEXT: "Write a few words.", EMPTY_DRAWING: "The drawing is empty.", NO_PHOTO: "Add a photo.",
    NO_STICKER: "Pick a sticker.", PHOTO_TOO_LARGE: "Photo too large.", PHOTO_UNREADABLE: "Photo unreadable.",
    NOT_STARTED: "The wall is not open yet.", ENDED: "The wall is closed.", SUSPENDED: "The wall is paused.",
    generic: "Could not send, try again.",
  },
};

const ar: Strings = {
  write: "اكتب", wall: "الجدار",
  kinds: { text: "كلمة حلوة", drawing: "رسمة", signature: "توقيع", photo: "صورة", sticker: "ملصق" },
  name: "اسمك (اختياري)",
  textPh: "اكتب كلمتك…",
  captionPh: "تعليق على الصورة (اختياري)",
  signHere: "وقّع هنا", drawHere: "ارسم هنا",
  undo: "تراجع", clear: "مسح",
  takePhoto: "التقط أو اختر صورة", changePhoto: "غيّر الصورة",
  stickers: "ملصقات", stickersHint: "المس ملصقًا لإضافته، واسحبه لوضعه.",
  pickSticker: "اختر ملصقًا للجدار",
  bigger: "أكبر", smaller: "أصغر", rotate: "تدوير", remove: "إزالة",
  send: "أرسل إلى الجدار", sending: "جارٍ الإرسال…",
  sentLive: "رسالتك على الجدار. انظر إلى الشاشة!",
  sentPending: "وصلت. سيراجعها الفريق ثم تظهر على الجدار.",
  again: "أرسل شيئًا آخر",
  like: "إعجاب", comment: "تعليق", comments: "تعليقات", oneComment: "تعليق",
  commentPh: "تعليقك…", reply: "رد", react: "تفاعل بملصق",
  moveHint: "اسحب بطاقتك لتحريكها على الجدار.",
  yours: "لك",
  empty: "الجدار ينتظر كلماته الأولى.",
  scan: "امسح الرمز لتكتب على الجدار",
  now: "الآن", min: "د", h: "س",
  pending: "قيد المراجعة", hidden: "غير منشور",
  screen: {
    sensorReady: "اقبض يدك للإمساك، وافتحها للإفلات",
    sensorFailed: "الكاميرا غير متاحة", sensorLoading: "الكاميرا…", fullscreen: "ملء الشاشة",
    moderation: "الإشراف", hideFromWall: "إخفاء من الجدار", pin: "تثبيت", unpin: "إلغاء التثبيت",
    comments: "التعليقات", removeComment: "حذف التعليق", close: "إغلاق",
    denied: "تم رفض صلاحية الإشراف: ربما أُلغي هذا الرابط.", failed: "تعذّر الإجراء، أعد المحاولة.",
    moveRefused: "رُفض النقل، عادت البطاقة إلى مكانها.", likeRefused: "لم يُحتسب الإعجاب.",
  },
  mod: {
    pending: "قيد المراجعة", published: "منشورة", hidden: "مخفية", nothing: "لا شيء هنا.", loading: "جارٍ التحميل…",
    connected: "متصل(ة)", publish: "نشر", hide: "إخفاء", anon: "مجهول", comments: "التعليقات",
    flagged: "مُبلَّغ عنه", hiddenBy: "أخفاه", moderatedBy: "راجعه", by: "بواسطة",
    flags: { mot: "كلمة مبلَّغ عنها", lien: "رابط", numero: "رقم هاتف", compte: "@حساب" },
  },
  errors: {
    COOLDOWN: "على مهلك: أعد المحاولة بعد ثوانٍ.",
    SESSION_LIMIT: "وصلت إلى الحد الأقصى من الرسائل لهذا الحدث.",
    RATE_LIMITED: "إرسال كثير دفعة واحدة، أعد المحاولة بعد دقيقة.",
    EMPTY_TEXT: "اكتب بعض الكلمات.", EMPTY_DRAWING: "الرسمة فارغة.", NO_PHOTO: "أضف صورة.",
    NO_STICKER: "اختر ملصقًا.", PHOTO_TOO_LARGE: "الصورة كبيرة جدًا.", PHOTO_UNREADABLE: "تعذّرت قراءة الصورة.",
    NOT_STARTED: "الجدار لم يُفتح بعد.", ENDED: "الجدار مغلق.", SUSPENDED: "الجدار متوقف مؤقتًا.",
    generic: "تعذّر الإرسال، أعد المحاولة.",
  },
};

export const STRINGS: Record<Locale, Strings> = { fr, en, ar };
export type { Strings };

/** « il y a 3 min », « à l'instant ». */
export function ago(iso: string, t: Strings, now = Date.now()) {
  const s = Math.max(0, (now - Date.parse(iso)) / 1000);
  if (s < 60) return t.now;
  if (s < 3600) return `${Math.floor(s / 60)} ${t.min}`;
  return `${Math.floor(s / 3600)} ${t.h}`;
}
