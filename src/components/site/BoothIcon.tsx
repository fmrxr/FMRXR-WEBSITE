import s from "./BoothIcon.module.css";

// Icônes animées de la page /photobooth (intégration et étapes) : le trait
// en encre, ce qui bouge en vert. CSS seule, sans JS ; immobiles quand le
// visiteur demande moins de mouvement.
export type BoothIconKind =
  | "link" | "camera" | "screen" | "printer"
  | "hand" | "shot" | "questions" | "photo" | "portrait";

export function BoothIcon({ kind }: { kind: BoothIconKind }) {
  return (
    <svg viewBox="0 0 64 64" className={s.icon} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {kind === "link" && (
        <>
          {/* une fenêtre de navigateur ; le lien se tape dans la barre, puis la page s'allume */}
          <rect x="8" y="12" width="48" height="38" rx="3" />
          <line x1="8" y1="21" x2="56" y2="21" />
          <circle cx="13" cy="16.5" r="1" />
          <circle cx="17" cy="16.5" r="1" />
          <line x1="23" y1="16.5" x2="50" y2="16.5" className={s.type} />
          <rect x="14" y="27" width="36" height="17" rx="1.5" className={s.page} />
        </>
      )}
      {kind === "camera" && (
        <>
          {/* un téléphone, son objectif qui fait le point, le témoin qui clignote */}
          <rect x="20" y="6" width="24" height="52" rx="5" />
          <line x1="29" y1="52" x2="35" y2="52" />
          <circle cx="32" cy="22" r="7" />
          <circle cx="32" cy="22" r="3.5" className={s.focus} />
          <circle cx="38.5" cy="12" r="1.3" className={s.rec} />
        </>
      )}
      {kind === "screen" && (
        <>
          {/* un écran sur pied ; un geste devant lui fait des ondes */}
          <rect x="10" y="8" width="44" height="32" rx="2" />
          <line x1="32" y1="40" x2="32" y2="54" />
          <line x1="22" y1="56" x2="42" y2="56" />
          <circle cx="32" cy="24" r="4" className={s.wave} />
          <circle cx="32" cy="24" r="4" className={`${s.wave} ${s.late}`} />
          <circle cx="32" cy="24" r="1.6" className={s.dot} />
        </>
      )}
      {kind === "printer" && (
        <>
          {/* l'imprimante ; le tirage sort de la fente, encore et encore */}
          <defs>
            <clipPath id="booth-icon-slot"><rect x="0" y="34" width="64" height="30" /></clipPath>
          </defs>
          <rect x="18" y="8" width="28" height="12" rx="1" />
          <rect x="8" y="20" width="48" height="20" rx="3" />
          <line x1="16" y1="34" x2="48" y2="34" />
          <circle cx="49" cy="26" r="1.2" className={s.rec} />
          <g clipPath="url(#booth-icon-slot)">
            <g className={s.print}>
              <rect x="21" y="34" width="22" height="22" rx="1" className={s.paper} />
              <rect x="24" y="37" width="16" height="13" rx="0.5" className={s.photo} />
            </g>
          </g>
        </>
      )}
      {kind === "hand" && (
        <>
          {/* une main ouverte levée ; l'anneau de détection se remplit */}
          <path d="M24 44V24a3 3 0 0 1 6 0v12V16a3 3 0 0 1 6 0v20V19a3 3 0 0 1 6 0v19M24 36v-6a3 3 0 0 0-6 0v10c0 9 6 16 14 16s12-6 12-14V26a3 3 0 0 0-6 0" />
          <circle cx="32" cy="32" r="29" className={s.ring} />
        </>
      )}
      {kind === "shot" && (
        <>
          {/* une silhouette, puis trois : portrait ou groupe */}
          <g className={s.solo}>
            <circle cx="32" cy="22" r="7" />
            <path d="M18 52c0-9 6-15 14-15s14 6 14 15" />
          </g>
          <g className={s.group}>
            <circle cx="32" cy="20" r="6" />
            <path d="M21 48c0-8 5-13 11-13s11 5 11 13" />
            <circle cx="15" cy="26" r="5" />
            <path d="M5 50c0-7 4-11 10-11 3 0 5 1 7 3" />
            <circle cx="49" cy="26" r="5" />
            <path d="M59 50c0-7-4-11-10-11-3 0-5 1-7 3" />
          </g>
        </>
      )}
      {kind === "questions" && (
        <>
          {/* trois questions, trois réponses qui se cochent l'une après l'autre */}
          {[16, 32, 48].map((y, i) => (
            <g key={y}>
              <rect x="8" y={y - 6} width="12" height="12" rx="2" />
              <path d={`M10.5 ${y}l2.5 2.5 4.5-5`} className={`${s.tick} ${[s.t1, s.t2, s.t3][i]}`} />
              <line x1="26" y1={y} x2={[52, 46, 56][i]} y2={y} />
            </g>
          ))}
        </>
      )}
      {kind === "photo" && (
        <>
          {/* le compte à rebours qui se vide, puis l'éclair */}
          <circle cx="32" cy="32" r="22" />
          <circle cx="32" cy="32" r="22" className={s.count} transform="rotate(-90 32 32)" />
          <circle cx="32" cy="32" r="7" />
          <circle cx="32" cy="32" r="28" className={s.flash} />
        </>
      )}
      {kind === "portrait" && (
        <>
          {/* le portrait apparaît dans son cadre, avec son code QR */}
          <rect x="10" y="6" width="32" height="44" rx="2" />
          <g className={s.reveal}>
            <circle cx="26" cy="22" r="6" />
            <path d="M15 42c0-7 5-11 11-11s11 4 11 11" />
          </g>
          <g className={s.qr}>
            <rect x="40" y="38" width="16" height="16" rx="1" />
            <rect x="43" y="41" width="4" height="4" />
            <rect x="49" y="47" width="4" height="4" />
            <line x1="49" y1="42" x2="53" y2="42" />
            <line x1="43" y1="50" x2="46" y2="50" />
          </g>
        </>
      )}
    </svg>
  );
}
