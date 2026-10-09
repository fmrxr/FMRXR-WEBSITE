'use strict';
/* ACCESS PROTOCOL — Cyberpunk Halloween · 42 Marches
   FMRXR Studio for Morninglory Paris. Gameplay inspired by SPACE X WARS (Crash Server).

   Rules (v3, 3 levels: EASY -10% / MEDIUM -20% / HARD -30%):
   - 40-45 s, collect 10 keys. Only KEY_BUDGET real keys ever appear: missing too many = no win.
   - Intrusions must be destroyed. Each one that crosses the screen breaks one of 3 firewalls. 0 firewall = ACCESS DENIED.
   - Armored intrusions (cyan ring) need 2 taps.
   - Corrupted keys (red, "SPICY" label, glitching look-alikes) must NOT be touched: -2 keys.
   - 3 waves: calm -> corrupted keys + armor -> final surge (faster, denser, drifting).
   - Every 5-intrusion combo restores one firewall. */
(() => {

// ---------- tuning ----------
const CFG = {
  SHOTGUN: 'https://fmrxr.com/experiential',
  KEYS_TO_WIN: 10,
  GAME_TIME: 40,            // seconds
  KEY_BUDGET: 12,           // real keys that will appear during a whole round (need 10 of them)
  SHIELDS: 3,               // firewalls: an escaped intrusion breaks one
  CORRUPT_PENALTY: 2,       // keys lost when a corrupted key is touched
  COMBO_SHIELD: 5,          // combo needed to restore one firewall
  POINTS: 100, ARMOR_POINTS: 250,
  KEY_SIZE: 0.21, INTR_SIZE: 0.19,     // sprite width, fraction of the screen width
  MAX_ON_SCREEN: 7,
  WAVES: null,              // set from the chosen level
  // 3 difficulty levels, each unlocks a fixed Shotgun promo code (base64 so it does not show in plain text in the source). Tuned with tools/sim.js, simulated win rate casual / average / good / expert.
  LEVELS: {
    easy: {   // ~36% / 65% / 92% / 98%
      label: 'EASY', discount: 10, GAME_TIME: 45, KEY_BUDGET: 13,
      WAVES: [
        { at: 0,  spawn: 0.95, fall: 4.4, corrupt: 0.08, armored: 0.08, drift: 0 },
        { at: 12, spawn: 0.72, fall: 3.5, corrupt: 0.25, armored: 0.25, drift: 0.02, name: 'WAVE 2', sub: 'CORRUPTED KEYS INCOMING' },
        { at: 28, spawn: 0.55, fall: 2.8, corrupt: 0.35, armored: 0.35, drift: 0.05, name: 'FINAL SURGE', sub: 'EVERYTHING SPEEDS UP' },
      ],
    },
    medium: { // ~9% / 35% / 79% / 96%
      label: 'MEDIUM', discount: 20, GAME_TIME: 40, KEY_BUDGET: 12,
      WAVES: [
        { at: 0,  spawn: 0.85, fall: 4.0, corrupt: 0.1,  armored: 0.1,  drift: 0 },
        { at: 10, spawn: 0.62, fall: 3.1, corrupt: 0.35, armored: 0.35, drift: 0.04, name: 'WAVE 2', sub: 'MORE CORRUPTED KEYS · MORE ARMOR' },
        { at: 24, spawn: 0.45, fall: 2.4, corrupt: 0.45, armored: 0.5,  drift: 0.08, name: 'FINAL SURGE', sub: 'EVERYTHING SPEEDS UP' },
      ],
    },
    hard: {   // ~1% / 10% / 40% / 72%
      label: 'HARD', discount: 30, GAME_TIME: 40, KEY_BUDGET: 11,
      WAVES: [
        { at: 0,  spawn: 0.8,  fall: 3.8, corrupt: 0.12, armored: 0.12, drift: 0.02 },
        { at: 10, spawn: 0.6,  fall: 3.0, corrupt: 0.38, armored: 0.38, drift: 0.06, name: 'WAVE 2', sub: 'MORE CORRUPTED KEYS · MORE ARMOR' },
        { at: 23, spawn: 0.44, fall: 2.4, corrupt: 0.48, armored: 0.5,  drift: 0.1,  name: 'FINAL SURGE', sub: 'EVERYTHING SPEEDS UP' },
      ],
    },
  },
  STORAGE: 'fmrxr_demo_access_protocol',
};
let LEVEL = null;
function setLevel(id) {
  if (!CFG.LEVELS[id]) id = 'medium';
  LEVEL = { id, ...CFG.LEVELS[id] };
  Object.assign(CFG, { GAME_TIME: LEVEL.GAME_TIME, KEY_BUDGET: LEVEL.KEY_BUDGET, WAVES: LEVEL.WAVES });
}
const BEZEL = { h: { desktop: 0.035, mobile: 0.055 }, y: { desktop: 0.13, mobile: 0.275 } };   // logo size and offset under the screen, fractions of its height
const LOGO_SCALE = { p_morninglory: 1.4, p_fmrxr: 1.4 };   // these two wordmarks read small next to the others
const DEBUG = /[?&]debug\b/.test(location.search);

// zones measured on the prepared assets (assets_prets/manifest.json)
const ZONES = {
  screen: {
    desktop: { w: 1920, h: 1080, r: { x: 0.3026, y: 0.1574, w: 0.3943, h: 0.4046 } },
    mobile:  { w: 1080, h: 1920, r: { x: 0.2419, y: 0.3424, w: 0.5162, h: 0.2370 } },
  },
  sign: {
    desktop: { x: 0.6109, y: 0.3009, w: 0.0901, h: 0.0694 },
    mobile:  { x: 0.6037, y: 0.3010, w: 0.2861, h: 0.0698 },
  },
};

const GREEN = '124,255,79', CYAN = '46,242,224', MAG = '255,61,139', GOLD = '255,215,90', ORANGE = '200,116,58', VIOLET = '155,107,255', GREY = '150,170,160', RED = '255,38,58';
const FONT = '"Share Tech Mono", ui-monospace, Menlo, Consolas, monospace';

const $ = (s) => document.querySelector(s);
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const rnd = (a, b) => a + Math.random() * (b - a);
const pad6 = (n) => String(Math.max(0, Math.floor(n))).padStart(6, '0');
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
};
setLevel(store.get('ch42_level'));

// ---------- assets ----------
const IMG = {};
const loadImg = (k, src) => new Promise((res) => {
  const i = new Image();
  i.onload = () => { IMG[k] = i; res(i); };
  i.onerror = () => res(null);
  i.src = src;
});
// corrupted key = same sprite, red cast + torn scanlines (a look-alike the eye must learn to reject)
function corruptCopy(img) {
  const c = document.createElement('canvas');
  c.width = img.naturalWidth; c.height = img.naturalHeight;
  const x = c.getContext('2d');
  x.drawImage(img, 0, 0);
  x.globalCompositeOperation = 'source-atop';
  x.fillStyle = `rgba(${RED},0.72)`; x.fillRect(0, 0, c.width, c.height);
  x.fillStyle = 'rgba(0,0,0,0.45)';
  for (let y = 0; y < c.height; y += 7) x.fillRect(0, y, c.width, 2);
  x.globalCompositeOperation = 'source-over';
  for (let k = 0; k < 4; k++) {           // horizontal tears
    const y = Math.random() * c.height, h = c.height * rnd(0.03, 0.07);
    x.drawImage(c, 0, y, c.width, h, rnd(-0.06, 0.06) * c.width, y, c.width, h);
  }
  return c;
}
Promise.all([
  loadImg('bg_desktop', 'assets/bg_terminal_desktop.jpg'),
  loadImg('bg_mobile', 'assets/bg_terminal_mobile.jpg'),
  loadImg('reticle', 'assets/cursor_reticle.png'),
  loadImg('logo', 'assets/logo_cyberpunk_halloween.png'),
  ...['morninglory', '42marches', 'bae_party', 'fmrxr'].map((n) => loadImg('p_' + n, `assets/logo_${n}.png`)),
  ...[1, 2, 3, 4].map((i) => loadImg('intr' + i, `assets/sprite_intrusion_0${i}.png`)),
  ...[1, 2, 3].map((i) => loadImg('key' + i, `assets/sprite_key_0${i}.png`).then((img) => { if (img) IMG['ckey' + i] = corruptCopy(img); })),
]).then(() => {
  document.querySelectorAll('[data-icon]').forEach((el) => { const u = legendIcon(el.dataset.icon); if (u) el.src = u; });
});

// ---------- sound (original SPACE X WARS music + hit sound, synth blips for the rest) ----------
const Snd = {
  on: true,   // every visit starts with sound ON (the toggle only lasts for the current visit)
  unlocked: false, ctx: null, hitBuf: null, current: null,
  // one continuous track for the whole site: it loops forever and is never restarted or faded out,
  // only its volume changes between menu, game and win video
  track: Object.assign(new Audio('assets/music_cyber_protocol.mp3'), { loop: true, preload: 'auto' }),
  vol: { menu: 0.45, game: 0.6, video: 0.25 },
  init() {
    if (this.unlocked) return;
    this.unlocked = true;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      fetch('assets/hit.mp3').then((r) => r.arrayBuffer())
        .then((b) => new Promise((ok, ko) => this.ctx.decodeAudioData(b, ok, ko)))
        .then((buf) => { this.hitBuf = buf; }).catch(() => {});
    } catch (e) {}
  },
  music(which) {
    if (which) this.current = which;
    if (!this.on || !this.unlocked) return;
    this.track.volume = this.vol[this.current] ?? this.vol.menu;
    if (this.track.paused) this.track.play().catch(() => {});
  },
  hit() {
    if (!this.on || !this.ctx || !this.hitBuf) return;
    const s = this.ctx.createBufferSource(); s.buffer = this.hitBuf;
    s.playbackRate.value = rnd(0.85, 1.2);
    const g = this.ctx.createGain(); g.gain.value = 0.7;
    s.connect(g).connect(this.ctx.destination); s.start();
  },
  tone(freqs, dur, type = 'square', vol = 0.07) {
    if (!this.on || !this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t0 = this.ctx.currentTime;
    freqs.forEach((f, i) => {
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      const st = t0 + i * dur;
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, st);
      g.gain.exponentialRampToValueAtTime(vol, st + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, st + dur);
      o.connect(g).connect(this.ctx.destination); o.start(st); o.stop(st + dur + 0.02);
    });
  },
  key() { this.tone([880, 1320], 0.07, 'square', 0.05); },
  armor() { this.tone([300, 600], 0.05, 'square', 0.05); },
  breach() { this.tone([220, 146], 0.14, 'sawtooth', 0.07); },
  corrupt() { this.tone([180, 120, 90], 0.1, 'sawtooth', 0.08); },
  combo() { this.tone([660, 880, 1175], 0.07, 'triangle', 0.08); },
  wave() { this.tone([392, 523, 392, 523], 0.09, 'square', 0.05); },
  granted() { this.tone([523, 659, 784, 1047], 0.11, 'triangle', 0.09); },
  denied() { this.tone([392, 311, 233], 0.2, 'sawtooth', 0.07); },
  boot() { this.tone([440, 660], 0.06, 'square', 0.05); },
  toggle() {
    this.on = !this.on;
    if (!this.on) this.track.pause();
    else { this.init(); this.music(); }
    $('#btnSound').textContent = this.on ? 'SOUND ON' : 'SOUND OFF';
  },
};
$('#btnSound').textContent = Snd.on ? 'SOUND ON' : 'SOUND OFF';

// ---------- layout ----------
const canvas = $('#c'), ctx = canvas.getContext('2d');
let VW = 0, VH = 0, DPR = 1, layout = 'mobile';

function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  VW = window.innerWidth; VH = window.innerHeight;
  canvas.width = Math.round(VW * DPR); canvas.height = Math.round(VH * DPR);
  layout = VW / VH < 1.05 ? 'mobile' : 'desktop';
  document.body.dataset.layout = layout;
  document.querySelectorAll('.stage').forEach((el) => {
    const src = layout === 'mobile' ? (el.dataset.mob || el.dataset.desk) : el.dataset.desk;
    if (src && el._src !== src) { el.style.backgroundImage = `url("${src}")`; el._src = src; }
  });
  const z = ZONES.sign[layout], sign = $('#sign');
  Object.assign(sign.style, { left: z.x * 100 + '%', top: z.y * 100 + '%', width: z.w * 100 + '%', height: z.h * 100 + '%' });
}

// camera: z=0 -> background "cover", z=1 -> pushed into the terminal screen
function camFor(z) {
  const L = ZONES.screen[layout];
  const ins = 0.012;
  const sr = { x: (L.r.x + ins) * L.w, y: (L.r.y + ins) * L.h, w: (L.r.w - 2 * ins) * L.w, h: (L.r.h - 2 * ins) * L.h };
  const s0 = Math.max(VW / L.w, VH / L.h);
  const tx0 = (VW - L.w * s0) / 2, ty0 = (VH - L.h * s0) / 2;
  const fitW = layout === 'mobile' ? 0.96 : 0.9, fitH = layout === 'mobile' ? 0.62 : 0.8;
  const s1 = Math.max(s0, Math.min((VW * fitW) / sr.w, (VH * fitH) / sr.h));
  let tx1 = VW / 2 - (sr.x + sr.w / 2) * s1;
  let ty1 = VH * (layout === 'mobile' ? 0.47 : 0.5) - (sr.y + sr.h / 2) * s1;
  tx1 = clamp(tx1, VW - L.w * s1, 0); ty1 = clamp(ty1, VH - L.h * s1, 0);
  const e = ease(clamp(z, 0, 1));
  const s = lerp(s0, s1, e), tx = lerp(tx0, tx1, e), ty = lerp(ty0, ty1, e);
  return { s, tx, ty, L, g: { x: sr.x * s + tx, y: sr.y * s + ty, w: sr.w * s, h: sr.h * s } };
}

// ---------- state ----------
const S = {
  mode: 'menu', modeT: 0, cam: 0, time: CFG.GAME_TIME, score: 0, keys: 0, combo: 0, comboT: 0,
  shields: CFG.SHIELDS, keysSpawned: 0, waveIdx: 0, banner: null, reason: null,
  ents: [], parts: [], pops: [], taps: [], spawnT: 0, flash: 0, flashCol: MAG, grid: 0,
  g: { x: 0, y: 0, w: 1, h: 1 }, ptr: { x: 0, y: 0, on: false }, claim: null, winStarted: false,
};
const elapsed = () => CFG.GAME_TIME - S.time;
const wave = () => CFG.WAVES[S.waveIdx];

function showScreen(id) {
  for (const s of ['menu', 'winScreen', 'reward', 'denied']) $('#' + s).hidden = s !== id;
  canvas.hidden = id !== 'canvas';
  document.body.dataset.screen = id;
  $('#btnStaff').hidden = id !== 'menu';
  $('#logoBar').hidden = id === 'reward' || id === 'canvas';   // ticket and in-game screen draw their own logos
  document.body.classList.toggle('playing', id === 'canvas');
  const iv = $('#introVid');
  if (id === 'menu') iv.play().catch(() => {}); else iv.pause();
}

function showMenu() {
  S.mode = 'menu';
  const saved = store.get(CFG.STORAGE);
  $('#btnTicket').hidden = !(saved && saved.code);
  renderLevelUI();
  showScreen('menu');
  Snd.music('menu');
}

function startGame() {
  Snd.init();
  setLevel(LEVEL.id);
  Object.assign(S, {
    mode: 'boot', modeT: 0, cam: 0, time: CFG.GAME_TIME, score: 0, keys: 0, combo: 0, comboT: 0,
    shields: CFG.SHIELDS, keysSpawned: 0, waveIdx: 0, banner: null, reason: null,
    ents: [], parts: [], pops: [], taps: [], spawnT: 0.4, flash: 0, claim: null, winStarted: false,
  });
  showScreen('canvas');
  Snd.music('game'); Snd.boot();
}

// ---------- gameplay ----------
function spawn() {
  if (S.ents.filter((e) => e.fly === null).length >= CFG.MAX_ON_SCREEN) return false;
  const w = wave();
  // real keys are scarce and spread over the round (all of them out by ~90% of the time)
  const expected = CFG.KEY_BUDGET * clamp((elapsed() + 3) / (CFG.GAME_TIME * 0.9), 0, 1);
  const deficit = expected - S.keysSpawned;
  let type;
  if (S.keysSpawned < CFG.KEY_BUDGET && (deficit >= 1 || (deficit > 0 && Math.random() < 0.5))) type = 'key';
  else if (Math.random() < w.corrupt) type = 'corrupt';
  else type = Math.random() < w.armored ? 'armor' : 'intr';
  if (type === 'key') S.keysSpawned++;

  const k = 1 + Math.floor(Math.random() * 3), i = 1 + Math.floor(Math.random() * 4);
  const img = type === 'key' ? IMG['key' + k] : type === 'corrupt' ? IMG['ckey' + k] : IMG['intr' + i];
  if (!img) return true;
  const keyLike = type === 'key' || type === 'corrupt';
  const wn = keyLike ? CFG.KEY_SIZE : CFG.INTR_SIZE * (type === 'armor' ? 1.08 : 1);
  const ar = (img.naturalHeight || img.height) / (img.naturalWidth || img.width);
  const hN = (wn * S.g.w * ar) / S.g.h;
  S.ents.push({
    type, img, wn, ar, hp: type === 'armor' ? 2 : 1, drift: w.drift,
    u: rnd(wn / 2 + w.drift + 0.03, 1 - wn / 2 - w.drift - 0.03), v: -hN / 2 - 0.02,
    vy: ((1 + hN) / w.fall) * rnd(0.85, 1.15),
    rot: rnd(-0.15, 0.15), sw: rnd(0, 6.28), fly: null,
  });
  return true;
}

function entBox(e) {
  const g = S.g, w = e.wn * g.w, h = w * e.ar;
  return { w, h, cx: g.x + (e.u + Math.sin(e.sw) * e.drift) * g.w + Math.sin(e.sw * 3) * g.w * 0.006, cy: g.y + e.v * g.h };
}

function hudMetrics(g) {
  const fs = clamp(g.w * 0.042, 10, 20), pad = g.w * 0.035;
  return { fs, pad, y1: g.y + pad + fs * 0.85, y2: g.y + pad + fs * 2.05 };
}
function pipPos(g, i) {
  const { fs, y2 } = hudMetrics(g);
  const pw = clamp(g.w * 0.034, 7, 18), gap = pw * 0.45, n = CFG.KEYS_TO_WIN;
  const x0 = g.x + g.w / 2 - (n * pw + (n - 1) * gap) / 2;
  return { x: x0 + i * (pw + gap) + pw / 2, y: y2 - fs * 0.35, pw };
}

function burst(x, y, cols, n) {
  const k = S.g.w / 400;
  for (let i = 0; i < n; i++) {
    const a = rnd(0, Math.PI * 2), sp = rnd(60, 320) * k;
    S.parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 60 * k, life: 1, dur: rnd(0.45, 0.95), r: rnd(1.4, 3.8) * k, col: cols[i % cols.length] });
  }
}
const pop = (x, y, text, col, big) => S.pops.push({ x, y, text, col, t: 0, big: !!big });
const buzz = (ms) => { if (navigator.vibrate) navigator.vibrate(ms); };

function collect(e, b) {
  e.fly = 0; e.fx = b.cx; e.fy = b.cy; e.pip = S.keys;
  S.keys++;
  burst(b.cx, b.cy, [GREEN, CYAN], 18);
  pop(b.cx, b.cy - b.h * 0.3, `KEY ${S.keys}/${CFG.KEYS_TO_WIN}`, GREEN);
  Snd.key(); buzz(15);
  if (S.keys >= CFG.KEYS_TO_WIN) win();
}

function corrupted(e, b) {
  e.dead = true;
  const lost = Math.min(S.keys, CFG.CORRUPT_PENALTY);
  S.keys -= lost; S.combo = 0; S.flash = 1; S.flashCol = MAG;
  burst(b.cx, b.cy, [MAG, VIOLET], 30);
  pop(b.cx, b.cy, lost ? `CORRUPTED −${lost} KEY${lost > 1 ? 'S' : ''}` : 'CORRUPTED KEY', MAG, true);
  Snd.corrupt(); buzz(90);
}

function armorHit(e, b) {
  e.hp--; e.v -= 0.025;
  burst(b.cx, b.cy, [CYAN], 14);
  pop(b.cx, b.cy - b.h * 0.3, 'ARMOR DOWN', CYAN);
  Snd.armor(); buzz(10);
}

function destroy(e, b) {
  e.dead = true;
  S.combo++; S.comboT = 2.2;
  const pts = (e.type === 'armor' ? CFG.ARMOR_POINTS : CFG.POINTS) * (1 + Math.floor(S.combo / 3));
  S.score += pts;
  burst(b.cx, b.cy, [MAG, ORANGE, VIOLET], 26);
  pop(b.cx, b.cy, '+' + pts, MAG);
  Snd.hit();
  if (S.combo % CFG.COMBO_SHIELD === 0 && S.shields < CFG.SHIELDS) {
    S.shields++; pop(b.cx, b.cy - b.h * 0.5, 'FIREWALL RESTORED', CYAN, true); Snd.combo();
  } else if (S.combo % 3 === 0) { pop(b.cx, b.cy - b.h * 0.45, `COMBO x${S.combo}`, GOLD); Snd.combo(); }
}

function breach(e) {
  const g = S.g;
  S.shields--; S.combo = 0; S.flash = 1; S.flashCol = MAG;
  pop(g.x + e.u * g.w, g.y + g.h * 0.86, S.shields > 0 ? 'FIREWALL −1' : 'FIREWALL BREACHED', MAG, true);
  Snd.breach(); buzz(60);
  if (S.shields <= 0) lose('breach');
}

function win() {
  S.mode = 'granted'; S.modeT = 0; S.flash = 1; S.flashCol = GREEN; S.winStarted = false;
  Snd.granted();
  S.claim = claimCode();
}

function lose(reason) {
  S.mode = 'deniedAnim'; S.modeT = 0; S.flash = 1; S.flashCol = MAG; S.reason = reason;
  Snd.denied();
}

function update(dt) {
  S.modeT += dt;
  S.grid = (S.grid + dt * 0.12) % 1;
  if (S.flash > 0) S.flash = Math.max(0, S.flash - dt * 2.2);
  if (S.banner) { S.banner.t += dt; if (S.banner.t > 2.4) S.banner = null; }

  if (S.mode === 'boot') {
    S.cam = clamp(S.modeT / 1.1, 0, 1);
    if (S.modeT > 3.2) { S.mode = 'play'; S.modeT = 0; }
  } else S.cam = 1;

  if (S.mode === 'play') {
    S.time -= dt;
    if (S.comboT > 0) { S.comboT -= dt; if (S.comboT <= 0) S.combo = 0; }
    let wi = 0;
    CFG.WAVES.forEach((w, i) => { if (elapsed() >= w.at) wi = i; });
    if (wi !== S.waveIdx) { S.waveIdx = wi; if (wave().name) { S.banner = { text: wave().name, sub: wave().sub, t: 0 }; Snd.wave(); } }
    S.spawnT -= dt;
    if (S.spawnT <= 0) S.spawnT = spawn() ? wave().spawn * rnd(0.8, 1.2) : 0.15;
    if (S.time <= 0) { S.time = 0; lose('time'); }
  }

  const slow = S.mode === 'play' ? 1 : 0.25;
  for (const e of S.ents) {
    if (e.fly !== null) { e.fly += dt / 0.4; continue; }
    e.v += e.vy * dt * slow; e.sw += dt * 2;
    const hN = (e.wn * S.g.w * e.ar) / S.g.h;
    if (e.v - hN / 2 > 1 && !e.dead) {
      e.dead = true;
      if (S.mode === 'play') {
        if (e.type === 'intr' || e.type === 'armor') breach(e);
        else if (e.type === 'key') pop(S.g.x + e.u * S.g.w, S.g.y + S.g.h * 0.9, 'KEY LOST', GREY);
      }
    }
  }
  S.ents = S.ents.filter((e) => !e.dead && !(e.fly !== null && e.fly >= 1));

  const grav = 520 * (S.g.w / 400);
  for (const p of S.parts) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += grav * dt; p.vx *= 0.985; p.life -= dt / p.dur; }
  S.parts = S.parts.filter((p) => p.life > 0);
  for (const p of S.pops) p.t += dt / 1.1;
  S.pops = S.pops.filter((p) => p.t < 1);
  for (const t of S.taps) t.t += dt / 0.35;
  S.taps = S.taps.filter((t) => t.t < 1);

  if (S.mode === 'granted' && S.modeT > 1.8 && !S.winStarted) { S.winStarted = true; startWinVideo(); }
  if (S.mode === 'deniedAnim' && S.modeT > 1.6) showDenied();
}

// ---------- drawing ----------
let scanPattern = null;
function getScan() {
  if (scanPattern) return scanPattern;
  const c = document.createElement('canvas'); c.width = 4; c.height = 3;
  const x = c.getContext('2d'); x.fillStyle = 'rgba(0,0,0,0.32)'; x.fillRect(0, 0, 4, 1);
  scanPattern = ctx.createPattern(c, 'repeat');
  return scanPattern;
}
function rr(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

function draw() {
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, VW, VH);
  const bg = IMG['bg_' + layout];
  const cam = camFor(S.cam);
  S.g = cam.g;
  if (bg) ctx.drawImage(bg, cam.tx, cam.ty, cam.L.w * cam.s, cam.L.h * cam.s);
  const g = S.g;

  ctx.save();
  rr(g.x, g.y, g.w, g.h, Math.min(g.w, g.h) * 0.03); ctx.clip();
  const on = S.mode === 'boot' ? clamp((S.modeT - 0.9) / 0.35, 0, 1) : 1;
  ctx.fillStyle = `rgba(2,10,7,${0.5 + 0.45 * on})`; ctx.fillRect(g.x, g.y, g.w, g.h);
  if (on > 0) {
    ctx.globalAlpha = on;
    drawGrid(g); drawWatermark(g); drawEnts(g); drawParts(); drawHUD(g); drawCenter(g); drawPops(g);
    ctx.globalAlpha = 1;
  }
  if (S.flash > 0) { ctx.fillStyle = `rgba(${S.flashCol},${S.flash * 0.28})`; ctx.fillRect(g.x, g.y, g.w, g.h); }
  drawCRT(g);
  ctx.restore();

  drawBezelLogos(g); drawTaps(); drawReticle(g);
}

// partner logos, small and centered on the bottom bezel of the terminal screen
function drawBezelLogos(g) {
  const keys = ['p_morninglory', 'p_42marches', 'p_bae_party', 'p_fmrxr'].filter((k) => IMG[k]);
  if (!keys.length) return;
  const h = clamp(g.h * BEZEL.h[layout], 8, 18), gap = h * 1.1;
  const hs = keys.map((k) => h * (LOGO_SCALE[k] || 1));
  const ws = keys.map((k, i) => (IMG[k].naturalWidth / IMG[k].naturalHeight) * hs[i]);
  let x = g.x + g.w / 2 - (ws.reduce((a, b) => a + b, 0) + gap * (keys.length - 1)) / 2;
  const cy = g.y + g.h + g.h * BEZEL.y[layout];
  ctx.save(); ctx.globalAlpha = 0.55;
  keys.forEach((k, i) => { ctx.drawImage(IMG[k], x, cy - hs[i] / 2, ws[i], hs[i]); x += ws[i] + gap; });
  ctx.restore();
}

function drawGrid(g) {
  const sp = g.w / 10;
  ctx.strokeStyle = `rgba(${GREEN},0.06)`; ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = g.x + sp; x < g.x + g.w; x += sp) { ctx.moveTo(x, g.y); ctx.lineTo(x, g.y + g.h); }
  for (let y = g.y + S.grid * sp; y < g.y + g.h; y += sp) { ctx.moveTo(g.x, y); ctx.lineTo(g.x + g.w, y); }
  ctx.stroke();
}

// event logo burned into the CRT like a screen watermark: faint, breathing, glitching now and then,
// dimmed behind wave banners so it never competes with gameplay
function drawWatermark(g) {
  const L = IMG.logo;
  if (!L || S.mode === 'boot') return;
  const w = g.w * 0.6, h = (w * L.naturalHeight) / L.naturalWidth;
  const x = g.x + (g.w - w) / 2, y = g.y + g.h * 0.54 - h / 2;
  let a = 0.12 + 0.035 * Math.sin(performance.now() / 900);
  if (S.banner) a *= 0.15;
  if (S.mode === 'granted' || S.mode === 'deniedAnim') a *= 0.3;
  ctx.save();
  ctx.globalAlpha *= a; ctx.globalCompositeOperation = 'lighter';
  if (performance.now() % 3400 > 150) ctx.drawImage(L, x, y, w, h);
  else {
    const n = 7, sh = L.naturalHeight / n;
    for (let i = 0; i < n; i++) {
      const dx = Math.random() < 0.4 ? rnd(-0.07, 0.07) * w : 0;
      ctx.drawImage(L, 0, i * sh, L.naturalWidth, sh, x + dx, y + (h * i) / n, w, h / n);
    }
  }
  ctx.restore();
}

// visual language, drawn around a sprite centred on (0,0) in a w x h box:
//   key     = green halo            -> TAP
//   intr    = gold lock-on brackets -> TAP (armor: + cyan ring, 2 taps)
//   corrupt = red tint + pulsing red glow + SPICY label -> NEVER TAP
function drawCueBack(c, type, w, h, t) {
  if (type !== 'key' && type !== 'corrupt') return;
  const r = Math.max(w, h) * 0.62;
  const pulse = type === 'corrupt' ? 0.55 + 0.45 * Math.abs(Math.sin(t * 6)) : 0.75 + 0.25 * Math.sin(t * 3);
  const col = type === 'key' ? GREEN : RED;
  const gr = c.createRadialGradient(0, 0, r * 0.15, 0, 0, r);
  gr.addColorStop(0, `rgba(${col},${0.38 * pulse})`); gr.addColorStop(1, `rgba(${col},0)`);
  c.fillStyle = gr; c.beginPath(); c.arc(0, 0, r, 0, Math.PI * 2); c.fill();
}
function drawCueFront(c, type, w, h, t, hp) {
  if (type === 'intr' || type === 'armor') {
    const bw = w * 0.56, bh = h * 0.56, L = Math.min(w, h) * 0.2, o = 1 + 0.04 * Math.sin(t * 5);
    c.strokeStyle = `rgba(${GOLD},0.9)`; c.lineWidth = Math.max(2, w * 0.03); c.lineCap = 'square';
    c.beginPath();
    for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
      const x = sx * bw * o, y = sy * bh * o;
      c.moveTo(x, y - sy * L); c.lineTo(x, y); c.lineTo(x - sx * L, y);
    }
    c.stroke();
    if (type === 'armor' && hp > 1) {   // armor ring: needs 2 taps
      const r = Math.max(w, h) * 0.5;
      c.strokeStyle = `rgba(${CYAN},0.9)`; c.lineWidth = Math.max(1.5, w * 0.025);
      c.setLineDash([r * 0.5, r * 0.22]); c.lineDashOffset = -t * 1.6 * r;
      c.beginPath(); c.arc(0, 0, r, 0, Math.PI * 2); c.stroke(); c.setLineDash([]);
    }
  }
}

function drawEnts(g) {
  const t = performance.now() / 1000;
  for (const e of S.ents) {
    const b = entBox(e);
    let cx = b.cx, cy = b.cy, sc = 1, a = 1;
    const live = e.fly === null;
    if (!live) {
      const k = ease(clamp(e.fly, 0, 1)), tp = pipPos(g, e.pip);
      cx = lerp(e.fx, tp.x, k); cy = lerp(e.fy, tp.y, k); sc = lerp(1, 0.12, k); a = 1 - 0.4 * k;
    }
    if (e.type === 'corrupt') { cx += rnd(-2.5, 2.5); if (Math.random() < 0.08) a *= 0.5; }
    ctx.save();
    ctx.globalAlpha *= a;
    ctx.translate(cx, cy);
    if (live) drawCueBack(ctx, e.type, b.w, b.h, t);
    ctx.save();
    ctx.rotate(e.rot + Math.sin(e.sw) * 0.08);
    ctx.drawImage(e.img, (-b.w / 2) * sc, (-b.h / 2) * sc, b.w * sc, b.h * sc);
    if (e.type !== 'key' && live && Math.random() < 0.1) {   // glitch split
      ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha *= 0.35;
      ctx.drawImage(e.img, -b.w / 2 + rnd(-6, 6), -b.h / 2, b.w, b.h);
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.restore();
    if (live) drawCueFront(ctx, e.type, b.w, b.h, t, e.hp);
    if (live && e.type === 'corrupt') {
      const fs = clamp(g.w * 0.03, 9, 14);
      ctx.font = `${fs}px ${FONT}`; ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(-fs * 1.9, b.h * 0.5, fs * 3.8, fs * 1.35);
      ctx.fillStyle = `rgb(${RED})`; ctx.fillText('SPICY', 0, b.h * 0.5 + fs * 1.02);
    }
    ctx.restore();
  }
}

// legend icons for the menu, drawn with the same cues as in game
function legendIcon(type) {
  const img = type === 'key' ? IMG.key1 : type === 'corrupt' ? IMG.ckey1 : IMG.intr1;
  if (!img) return null;
  const S2 = 128, c = document.createElement('canvas'); c.width = c.height = S2;
  const x = c.getContext('2d');
  const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
  const f = (S2 * 0.78) / Math.max(iw, ih), w = iw * f, h = ih * f;
  x.translate(S2 / 2, S2 / 2);
  drawCueBack(x, type, w, h, 0.26);
  x.drawImage(img, -w / 2, -h / 2, w, h);
  drawCueFront(x, type, w, h, 0.26, 1);
  return c.toDataURL();
}

function drawParts() {
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (const p of S.parts) {
    ctx.fillStyle = `rgba(${p.col},${clamp(p.life, 0, 1)})`;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

function drawHUD(g) {
  const { fs, pad, y1, y2 } = hudMetrics(g);
  const band = ctx.createLinearGradient(0, g.y, 0, g.y + pad + fs * 3);
  band.addColorStop(0, 'rgba(2,10,7,0.85)'); band.addColorStop(1, 'rgba(2,10,7,0)');
  ctx.fillStyle = band; ctx.fillRect(g.x, g.y, g.w, pad + fs * 3);

  ctx.font = `${fs}px ${FONT}`; ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = `rgb(${GREEN})`; ctx.textAlign = 'left';
  ctx.fillText('SCORE ' + pad6(S.score), g.x + pad, y1);
  const low = S.mode === 'play' && S.time < 10 && S.time % 0.5 < 0.25;
  ctx.fillStyle = `rgb(${low ? MAG : GREEN})`; ctx.textAlign = 'right';
  ctx.fillText('TIME ' + String(Math.ceil(S.time)).padStart(2, '0'), g.x + g.w - pad, y1);

  // firewalls
  ctx.font = `${fs * 0.72}px ${FONT}`; ctx.textAlign = 'left';
  ctx.fillStyle = `rgba(${CYAN},0.85)`;
  ctx.fillText('FW', g.x + pad, y2);
  for (let i = 0; i < CFG.SHIELDS; i++) {
    const x = g.x + pad + fs * 1.5 + i * fs * 0.72, w = fs * 0.46, h = fs * 0.72;
    ctx.fillStyle = i < S.shields ? `rgb(${CYAN})` : 'rgba(0,0,0,0)';
    ctx.strokeStyle = i < S.shields ? `rgb(${CYAN})` : `rgba(${MAG},0.8)`; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.rect(x, y2 - h * 0.85, w, h); ctx.fill(); ctx.stroke();
  }

  // key pips
  for (let i = 0; i < CFG.KEYS_TO_WIN; i++) {
    const p = pipPos(g, i), h = p.pw * 0.62;
    ctx.fillStyle = i < S.keys ? `rgb(${GREEN})` : `rgba(${GREEN},0.12)`;
    ctx.strokeStyle = `rgba(${GREEN},0.6)`; ctx.lineWidth = 1;
    rr(p.x - p.pw / 2, p.y - h / 2, p.pw, h, 2); ctx.fill(); ctx.stroke();
  }
  const lastPip = pipPos(g, CFG.KEYS_TO_WIN - 1);
  ctx.font = `${fs * 0.72}px ${FONT}`; ctx.textAlign = 'left'; ctx.fillStyle = `rgba(${GREEN},0.75)`;
  ctx.fillText(`${S.keys}/${CFG.KEYS_TO_WIN}`, lastPip.x + lastPip.pw, lastPip.y + fs * 0.25);

  // footer
  const yb = g.y + g.h - pad * 0.9;
  ctx.font = `${fs * 0.72}px ${FONT}`;
  ctx.textAlign = 'left'; ctx.fillStyle = `rgba(${GREEN},0.45)`;
  const dots = '.'.repeat(1 + (Math.floor(performance.now() / 400) % 3));
  ctx.fillText(`${LEVEL.label} −${LEVEL.discount}%` + dots, g.x + pad, yb);
  const left = CFG.KEY_BUDGET - S.keysSpawned;
  ctx.textAlign = 'center'; ctx.fillStyle = `rgba(${left <= 3 ? MAG : GREEN},0.7)`;
  ctx.fillText(`KEYS IN STREAM ${left}`, g.x + g.w * 0.62, yb);
  if (S.combo >= 2 && S.mode === 'play') {
    ctx.textAlign = 'right'; ctx.fillStyle = `rgb(${GOLD})`;
    ctx.fillText('x' + S.combo, g.x + g.w - pad, yb);
  }
  if (DEBUG) {
    ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText(`W${S.waveIdx + 1} spawned ${S.keysSpawned}/${CFG.KEY_BUDGET} ents ${S.ents.length}`, g.x + pad, yb - fs);
  }
}

function centerLines(g, lines) {
  if (!lines.length) return;
  const base = clamp(g.w * 0.07, 16, 44);
  // a line is either text {t, c, s} or an image {img, wf: width as fraction of the screen}
  const sizes = lines.map((l) => (l.img ? g.w * l.wf * (l.img.naturalHeight / l.img.naturalWidth) : base * (l.s || 1)));
  const total = sizes.reduce((a, s) => a + s * 1.35, 0);
  let y = g.y + g.h / 2 - total / 2;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  lines.forEach((l, i) => {
    const fs = sizes[i];
    y += fs * 0.675;
    if (l.img) {
      const w = g.w * l.wf;
      ctx.save(); ctx.globalAlpha *= l.a == null ? 1 : l.a;
      ctx.drawImage(l.img, g.x + g.w / 2 - w / 2, y - fs / 2, w, fs);
      ctx.restore();
    } else {
      ctx.font = `${fs}px ${FONT}`; ctx.fillStyle = `rgba(${l.c},${l.a == null ? 1 : l.a})`;
      ctx.shadowColor = `rgba(${l.c},0.8)`; ctx.shadowBlur = l.glow ? 16 : 0;
      ctx.fillText(l.t, g.x + g.w / 2, y);
    }
    y += fs * 0.675;
  });
  ctx.shadowBlur = 0; ctx.textBaseline = 'alphabetic';
}

function drawCenter(g) {
  const t = S.modeT;
  if (S.mode === 'boot') {
    const L = [];
    if (t > 0.95) L.push(IMG.logo ? { img: IMG.logo, wf: 0.5, a: clamp((t - 0.95) / 0.3, 0, 1) } : { t: 'CYBERPUNK HALLOWEEN', c: CYAN, s: 0.55 });
    if (t > 1.3) L.push({ t: `LEVEL ${LEVEL.label} · −${LEVEL.discount}% ON YOUR TICKET`, c: GOLD, s: 0.45 });
    if (t > 1.7) L.push({ t: `COLLECT ${CFG.KEYS_TO_WIN} KEYS`, c: GREEN, s: 0.75, glow: true });
    if (t > 2.1) L.push({ t: `ONLY ${CFG.KEY_BUDGET} WILL APPEAR`, c: GREEN, s: 0.42 });
    if (t > 2.4) L.push({ t: `${CFG.SHIELDS} BREACHES = ACCESS DENIED`, c: MAG, s: 0.42 });
    if (t > 2.7) L.push({ t: `RED KEYS: NEVER TOUCH (−${CFG.CORRUPT_PENALTY} KEYS)`, c: RED, s: 0.42 });
    centerLines(g, L);
  } else if (S.mode === 'play') {
    if (t < 1.1) centerLines(g, [{ t: 'GO', c: GREEN, s: 1.2, glow: true, a: 1 - t / 1.1 }]);
    if (S.banner) {
      const bt = S.banner.t, a = bt < 0.2 ? bt / 0.2 : bt > 1.9 ? Math.max(0, (2.4 - bt) / 0.5) : 1;
      if (!(bt < 0.6 && Math.floor(bt * 10) % 2)) {
        centerLines(g, [{ t: S.banner.text, c: MAG, s: 0.95, glow: true, a }, { t: S.banner.sub, c: GOLD, s: 0.4, a }]);
      }
    }
  } else if (S.mode === 'granted') {
    const blink = t < 0.6 && Math.floor(t * 10) % 2;
    if (!blink) centerLines(g, [
      ...(IMG.logo ? [{ img: IMG.logo, wf: 0.4 }] : []),
      { t: 'ACCESS GRANTED', c: GREEN, s: 1, glow: true }, { t: `KEYS ${S.keys}/${CFG.KEYS_TO_WIN}`, c: GREEN, s: 0.5 },
    ]);
  } else if (S.mode === 'deniedAnim') {
    centerLines(g, [{ t: 'ACCESS DENIED', c: MAG, s: 1, glow: true }, { t: S.reason === 'breach' ? 'FIREWALL BREACHED' : 'TIME OUT', c: MAG, s: 0.5 }]);
  }
}

function drawPops(g) {
  const fs = clamp(g.w * 0.045, 11, 22);
  ctx.textAlign = 'center';
  for (const p of S.pops) {
    ctx.font = `${fs * (p.big ? 1.3 : 1)}px ${FONT}`;
    ctx.fillStyle = `rgba(${p.col},${1 - p.t})`;
    ctx.fillText(p.text, p.x, p.y - p.t * fs * 2.4);
  }
}

function drawCRT(g) {
  ctx.fillStyle = getScan(); ctx.fillRect(g.x, g.y, g.w, g.h);
  const vg = ctx.createRadialGradient(g.x + g.w / 2, g.y + g.h / 2, Math.min(g.w, g.h) * 0.3, g.x + g.w / 2, g.y + g.h / 2, Math.max(g.w, g.h) * 0.75);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = vg; ctx.fillRect(g.x, g.y, g.w, g.h);
  const gl = ctx.createLinearGradient(g.x, g.y, g.x + g.w * 0.6, g.y + g.h * 0.6);
  gl.addColorStop(0, 'rgba(255,255,255,0.05)'); gl.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gl; ctx.fillRect(g.x, g.y, g.w, g.h);
  ctx.fillStyle = `rgba(${GREEN},${rnd(0, 0.022)})`; ctx.fillRect(g.x, g.y, g.w, g.h);
}

function drawTaps() {
  for (const t of S.taps) {
    ctx.strokeStyle = `rgba(${GREEN},${1 - t.t})`; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(t.x, t.y, 8 + t.t * 34, 0, Math.PI * 2); ctx.stroke();
  }
}

function drawReticle(g) {
  const r = IMG.reticle;
  if (!r || !S.ptr.on || (S.mode !== 'play' && S.mode !== 'boot')) return;
  const { x, y } = S.ptr;
  if (x < g.x || x > g.x + g.w || y < g.y || y > g.y + g.h) return;
  const s = clamp(g.w * 0.11, 40, 96);
  ctx.save(); ctx.translate(x, y); ctx.rotate(performance.now() / 2400);
  ctx.drawImage(r, -s / 2, -s / 2, s, s); ctx.restore();
}

// ---------- input ----------
canvas.addEventListener('pointerdown', (ev) => {
  Snd.init();
  const x = ev.clientX, y = ev.clientY;
  S.ptr = { x, y, on: ev.pointerType === 'mouse' };
  if (S.mode !== 'play') return;
  S.taps.push({ x, y, t: 0 });
  for (let i = S.ents.length - 1; i >= 0; i--) {
    const e = S.ents[i];
    if (e.fly !== null || e.dead) continue;
    const b = entBox(e);
    // forgiving hitboxes on what you should touch, tight ones on the trap
    const padHit = e.type === 'corrupt' ? Math.max(2, b.w * 0.02) : e.type === 'key' ? Math.max(12, b.w * 0.1) : Math.max(10, b.w * 0.08);
    if (Math.abs(x - b.cx) <= b.w / 2 + padHit && Math.abs(y - b.cy) <= b.h / 2 + padHit) {
      if (e.type === 'key') collect(e, b);
      else if (e.type === 'corrupt') corrupted(e, b);
      else if (e.type === 'armor' && e.hp > 1) armorHit(e, b);
      else destroy(e, b);
      return;
    }
  }
});
canvas.addEventListener('pointermove', (ev) => { S.ptr.x = ev.clientX; S.ptr.y = ev.clientY; S.ptr.on = ev.pointerType === 'mouse'; });
canvas.addEventListener('pointerleave', () => { S.ptr.on = false; });
// menu music: starts as soon as the browser allows it (autoplay if permitted, otherwise on the first touch, click or key)
const unlockMusic = () => { if (!Snd.unlocked) { Snd.init(); if (S.mode === 'menu') Snd.music('menu'); } };
['pointerdown', 'touchstart', 'keydown'].forEach((t) => document.addEventListener(t, unlockMusic, { passive: true }));
document.addEventListener('keydown', (ev) => {
  if (S.mode === 'menu' && (ev.key === 'Enter' || ev.key === ' ' || ev.key.toLowerCase() === 'r')) { ev.preventDefault(); startGame(); }
  if (S.mode === 'denied' && ev.key.toLowerCase() === 'r') startGame();
});

// ---------- end screens ----------
function startWinVideo() {
  const v = $('#winVid');
  showScreen('winScreen');
  S.mode = 'winvid';
  v.currentTime = 0; v.muted = !Snd.on; Snd.music('video');
  const p = v.play();
  if (p) p.catch(() => { v.muted = true; v.play().catch(() => showReward()); });
  setTimeout(() => { if (S.mode === 'winvid') $('#btnSkip').hidden = false; }, 1200);
  // never leave the player on a black screen: if the video has not really started after 3 s, go to the ticket
  setTimeout(() => { if (S.mode === 'winvid' && v.currentTime < 0.2) showReward(); }, 3000);
}
$('#winVid').addEventListener('error', () => { if (S.mode === 'winvid') showReward(); });
$('#winVid').addEventListener('ended', () => showReward());
$('#btnSkip').addEventListener('click', () => { $('#winVid').pause(); showReward(); });

function showReward() {
  if (S.mode === 'reward') return;
  S.mode = 'reward';
  $('#btnSkip').hidden = true;
  showScreen('reward');
  Snd.music('menu');
  renderTicket(null);
  renderTicket(S.claim || store.get(CFG.STORAGE));
}

function renderTicket(t) {
  const box = $('#qr'), code = $('#codeText'), msg = $('#rewardMsg');
  msg.textContent = '';
  if (!t || !t.code) { box.innerHTML = ''; code.textContent = ''; return; }
  $('#tOff').innerHTML = `−${t.discount}<small>%</small>`;
  box.innerHTML = `<div class="promo"><span>ACCESS GRANTED</span><b>PORTFOLIO DEMO</b><span>NO TICKET IS ISSUED</span></div>`;
  code.textContent = '';
  if (t.note) msg.textContent = t.note;
  $('#btnCopy').textContent = 'COPY CODE';
  $('#btnCopy').onclick = async () => {
    try { await navigator.clipboard.writeText(t.code); $('#btnCopy').textContent = 'CODE COPIED ✓'; }
    catch (e) { msg.textContent = `YOUR CODE: ${t.code}`; }
  };
}

function showDenied() {
  S.mode = 'denied';
  $('#dKeys').textContent = `${S.keys}/${CFG.KEYS_TO_WIN}`;
  $('#dScore').textContent = pad6(S.score);
  $('#dReason').textContent = S.reason === 'breach'
    ? `FIREWALL BREACHED: ${CFG.SHIELDS} INTRUSIONS GOT THROUGH.`
    : `TIME OUT. ${CFG.KEY_BUDGET - S.keys > 0 ? 'THE STREAM RAN DRY.' : ''}`;
  $('#dNeed').textContent = `YOU NEED ${CFG.KEYS_TO_WIN} KEYS TO UNLOCK YOUR −${LEVEL.discount}%.`;
  showScreen('denied');
  Snd.music('menu');
}

// ---------- promo code (fixed Shotgun code per level) ----------
// the ticket shows the code of the level just won; VIEW MY TICKET keeps the best one won on this device
function claimCode() {
  const t = { code: 'DEMO', discount: LEVEL.discount, level: LEVEL.id, ts: Date.now() };
  const saved = store.get(CFG.STORAGE);
  if (!saved || !saved.code || (saved.discount || 0) < t.discount) store.set(CFG.STORAGE, t);
  const note = saved && saved.discount > t.discount ? `YOU ALSO UNLOCKED −${saved.discount}% EARLIER: ${saved.code}` : '';
  return { ...t, note };
}

// ---------- share ----------
async function share() {
  const data = { title: 'ACCESS PROTOCOL · Cyberpunk Halloween', text: 'Collect 10 keys, win up to −30% on your ticket. 31 October · 42 Marches.', url: location.origin + location.pathname };
  try {
    if (navigator.share) await navigator.share(data);
    else { await navigator.clipboard.writeText(data.url); const m = $('#rewardMsg'); if (m) m.textContent = 'LINK COPIED'; }
  } catch (e) {}
}

// ---------- level picker + menu rules ----------
function renderLevelUI() {
  document.querySelectorAll('[data-level]').forEach((b) => {
    const on = b.dataset.level === LEVEL.id;
    b.classList.toggle('on', on); b.setAttribute('aria-checked', on ? 'true' : 'false');
  });
  $('#rTime').textContent = LEVEL.GAME_TIME;
  $('#rBudget').textContent = LEVEL.KEY_BUDGET;
  $('#rOff').textContent = `−${LEVEL.discount}%`;
}
document.querySelectorAll('[data-level]').forEach((b) => b.addEventListener('click', () => {
  setLevel(b.dataset.level); store.set('ch42_level', LEVEL.id); renderLevelUI(); Snd.init(); Snd.boot();
}));

// ---------- buttons ----------
$('#btnStart').addEventListener('click', startGame);
$('#btnAgain').addEventListener('click', startGame);
$('#btnAgain2').addEventListener('click', startGame);
$('#btnMenu').addEventListener('click', showMenu);
$('#btnTicket').addEventListener('click', () => { S.claim = store.get(CFG.STORAGE); S.mode = 'menu'; showReward(); });
$('#btnSound').addEventListener('click', () => Snd.toggle());
$('#btnShare1').addEventListener('click', share);
$('#btnShare2').addEventListener('click', share);

document.addEventListener('visibilitychange', () => {
  if (document.hidden) Snd.track.pause();
  else Snd.music();
  if (!document.hidden && S.mode === 'menu') $('#introVid').play().catch(() => {});   // phones pause videos in background tabs
});

// ---------- loop ----------
window.addEventListener('resize', resize);
resize();
showMenu();
Snd.track.volume = Snd.vol.menu;
Snd.track.play().then(() => { if (!Snd.unlocked) { Snd.init(); Snd.current = 'menu'; } }).catch(() => {});
let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  if (!canvas.hidden) { update(dt); draw(); }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// test hooks (e.g. __ch42.win()) — local previews only, never on the public site
if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
  window.__ch42 = { S, CFG, Snd, setLevel, level: () => LEVEL, win: () => { S.keys = CFG.KEYS_TO_WIN; win(); }, lose: (r) => lose(r || 'time') };
}
})();
