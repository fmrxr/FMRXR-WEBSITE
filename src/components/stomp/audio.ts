// Sons de STOMP, synthetises en direct (WebAudio) : aucun fichier, aucune
// musique sous droits. Courts et graves pour percer le bruit d'un evenement ;
// chaque evenement a aussi son signal visuel, le son n'est jamais seul.

export class StompAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private pulse: number | null = null;

  /** A appeler sur un premier geste (les navigateurs bloquent le son avant). */
  unlock() {
    if (this.ctx) { void this.ctx.resume(); return; }
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.5;
    const comp = this.ctx.createDynamicsCompressor();
    this.master.connect(comp).connect(this.ctx.destination);
  }

  private tone(freq: number, dur: number, type: OscillatorType, gain: number, when = 0, slideTo?: number) {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime + when;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  /** Touche : la note monte avec le combo. */
  hit(combo: number) {
    const step = Math.min(combo, 12);
    const f = 220 * Math.pow(2, step / 12);
    this.tone(f, 0.16, "square", 0.25);
    this.tone(f * 2, 0.12, "triangle", 0.18, 0.02);
    this.tone(70, 0.18, "sine", 0.6, 0, 40); // coup sourd « dans le sol »
  }

  gold() { [0, 4, 7, 12].forEach((n, i) => this.tone(440 * Math.pow(2, n / 12), 0.18, "triangle", 0.22, i * 0.06)); }
  hazard() { this.tone(110, 0.35, "sawtooth", 0.3, 0, 55); this.tone(116, 0.35, "sawtooth", 0.25); }
  tick(final = false) { this.tone(final ? 880 : 440, final ? 0.4 : 0.12, "square", 0.22); }
  freeze() { this.tone(1800, 0.6, "sine", 0.08, 0, 600); }
  shatter() { for (let i = 0; i < 6; i++) this.tone(1200 + Math.random() * 2400, 0.25, "triangle", 0.08, i * 0.03, 300); this.tone(60, 0.8, "sine", 0.5, 0, 30); }

  /** Battement de basse pendant la manche, qui accelere avec le jeu. */
  startPulse(bpm: () => number) {
    this.stopPulse();
    const beat = () => {
      this.tone(55, 0.22, "sine", 0.45, 0, 45);
      this.pulse = window.setTimeout(beat, 60_000 / bpm());
    };
    beat();
  }
  stopPulse() { if (this.pulse) window.clearTimeout(this.pulse); this.pulse = null; }
}
