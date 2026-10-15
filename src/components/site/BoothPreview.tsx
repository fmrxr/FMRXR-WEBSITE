"use client";
import { useEffect, useState } from "react";
import { STYLE_IDS, STYLES } from "@/lib/photobooth/styles";
import s from "./BoothPreview.module.css";

// Apercu anime de la borne pour le bloc « AI Photobooth » : cadre de visee,
// balayage du scan, champ lumineux, geste reconnu (anneau qui se remplit) et
// les noms des styles qui defilent. Aucun visage : pas de portrait reel sur le
// site public. Mouvement reduit : tout reste immobile (CSS) et le defilement
// des styles s'arrete.

const GESTURES = ["✋", "✊", "👍", "✌️"];

export function BoothPreview() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => n + 1), 1800);
    return () => window.clearInterval(id);
  }, []);
  const style = STYLES[STYLE_IDS[i % STYLE_IDS.length]];
  const gesture = GESTURES[i % GESTURES.length];

  return (
    <div className={s.stage} aria-hidden>
      <div className={s.field} />
      <div className={s.frame}>
        <div className={s.scan} />
        <div className={s.silhouette} />
      </div>
      <div className={s.hud}>
        <span className={s.ring}>
          <svg viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="22" className={s.track} />
            <circle key={i} cx="25" cy="25" r="22" className={s.progress} />
          </svg>
          <span key={`g${i}`} className={s.glyph}>{gesture}</span>
        </span>
        <span className={s.label}>
          <span className={s.kicker}>Style</span>
          <span key={`s${i}`} className={s.name}>{style.label.en}</span>
        </span>
      </div>
      <span className={s.rec}>
        <span className={s.dot} /> LIVE · ON-DEVICE
      </span>
    </div>
  );
}
