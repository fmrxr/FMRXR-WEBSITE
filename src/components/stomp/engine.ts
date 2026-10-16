import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import type { Kind, Target } from "@/lib/stomp/game";
import { buildCity, CITY_DEPTH, DEFAULT_PALETTE } from "./city";

// Moteur de rendu STOMP.
//
// Le sol LED est une fenetre : le verre (y = 0) est cale exactement sur le
// carre de l'ecran, quoi qu'il arrive. La camera regarde a la verticale avec
// une projection decentree (Kooima) : quand l'oeil se deplace, le verre ne
// bouge pas d'un pixel (les cibles restent sous les pieds) mais la ville, en
// dessous, glisse en parallaxe. C'est ce decalage qui donne la profondeur.
//
// Rendu en deux temps : la ville dans une texture HDR, puis le verre, qui la
// lit en la floutant selon `frost` (depoli -> transparent), puis les cibles
// et les effets par-dessus, puis le halo (bloom) sur le tout.

const EYE_HEIGHT = 8; // hauteur de l'oeil virtuel au-dessus du verre, pour un sol de 4 m

type Ripple = { x: number; z: number; t: number; strength: number };

export type EngineOptions = { size: number; logoUrl?: string; palette?: typeof DEFAULT_PALETTE };

const KIND_COLORS: Record<Kind, { rim: THREE.Color; core: THREE.Color }> = {
  brand: { rim: new THREE.Color(3.2, 0.35, 1.5), core: new THREE.Color(0.15, 2.2, 2.0) },
  gold: { rim: new THREE.Color(3.2, 2.0, 0.35), core: new THREE.Color(2.6, 1.6, 0.3) },
  hazard: { rim: new THREE.Color(3.4, 0.25, 0.25), core: new THREE.Color(0.08, 0.02, 0.03) },
};

export class StompEngine {
  readonly renderer: THREE.WebGLRenderer;
  private size: number;
  private camera = new THREE.PerspectiveCamera();
  private eye = new THREE.Vector3(0, EYE_HEIGHT, 0);
  private eyeTarget = new THREE.Vector2();
  private city: ReturnType<typeof buildCity>;
  private cityRT: THREE.WebGLRenderTarget;
  private top = new THREE.Scene();
  private glass: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  private composer: EffectComposer;
  private bloom: UnrealBloomPass;
  private targets = new Map<number, THREE.Group>();
  private ripples: Ripple[] = [];
  private bursts: { points: THREE.Points; vel: Float32Array; born: number }[] = [];
  private shocks: { mesh: THREE.Mesh; born: number; color: THREE.Color }[] = [];
  private logo: THREE.Texture | null = null;
  private hazardTex: THREE.Texture;
  private time = 0;
  private shake = 0;
  frost = 0;

  constructor(canvas: HTMLCanvasElement, opts: EngineOptions) {
    this.size = opts.size;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.85;

    this.city = buildCity(opts.palette ?? DEFAULT_PALETTE);
    this.cityRT = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType });

    this.glass = new THREE.Mesh(new THREE.PlaneGeometry(this.size, this.size), this.glassMaterial());
    this.glass.rotation.x = -Math.PI / 2;
    this.top.add(this.glass);
    this.top.add(new THREE.HemisphereLight(0xffd0f0, 0x200030, 1.2));

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.top, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.6, 0.45, 1.05);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());

    this.hazardTex = hazardTexture();
    if (opts.logoUrl) new THREE.TextureLoader().load(opts.logoUrl, (t) => { t.colorSpace = THREE.SRGBColorSpace; this.logo = t; });
  }

  resize(px: number) {
    this.renderer.setSize(px, px, false);
    const real = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    this.cityRT.setSize(real.x, real.y);
    this.composer.setSize(px, px);
    this.bloom.resolution.set(real.x / 2, real.y / 2);
    this.glass.material.uniforms.uRes.value.set(real.x, real.y);
  }

  /** Les joueurs « tirent » l'oeil vers eux : la ville glisse sous leurs pas. */
  lookFrom(points: { x: number; z: number }[]) {
    if (points.length) {
      const cx = points.reduce((s, p) => s + p.x, 0) / points.length;
      const cz = points.reduce((s, p) => s + p.z, 0) / points.length;
      this.eyeTarget.set(cx * 0.9, cz * 0.9);
    } else this.eyeTarget.set(0, 0);
  }

  private updateCamera() {
    // Derive lente meme sans joueur : la profondeur se lit en permanence.
    const driftX = Math.sin(this.time * 0.13) * 0.6, driftZ = Math.cos(this.time * 0.1) * 0.5;
    this.eye.x += (this.eyeTarget.x + driftX - this.eye.x) * 0.035;
    this.eye.z += (this.eyeTarget.y + driftZ - this.eye.z) * 0.035;
    const sx = this.shake ? (Math.random() - 0.5) * this.shake : 0;
    const sz = this.shake ? (Math.random() - 0.5) * this.shake : 0;
    const e = new THREE.Vector3(this.eye.x + sx, EYE_HEIGHT * (this.size / 4), this.eye.z + sz);
    const cam = this.camera;
    cam.position.copy(e);
    cam.up.set(0, 0, -1);
    cam.lookAt(e.x, 0, e.z);
    // Projection decentree : les bords du frustum passent par les bords du verre.
    const n = 0.1, f = 400, h = e.y, half = this.size / 2;
    const left = (-half - e.x) * n / h, right = (half - e.x) * n / h;
    const top = (half + e.z) * n / h, bottom = (-half + e.z) * n / h;
    cam.projectionMatrix.makePerspective(left, right, top, bottom, n, f);
    cam.projectionMatrixInverse.copy(cam.projectionMatrix).invert();
    cam.updateMatrixWorld();
  }

  private glassMaterial() {
    return new THREE.ShaderMaterial({
      transparent: false,
      uniforms: {
        uCity: { value: null as THREE.Texture | null },
        uRes: { value: new THREE.Vector2(1, 1) },
        uFrost: { value: 0.9 },
        uTime: { value: 0 },
        uSize: { value: 4 },
        uRipples: { value: Array.from({ length: 8 }, () => new THREE.Vector4(0, 0, -99, 0)) },
        uTint: { value: new THREE.Color("#f3e8ff") },
      },
      vertexShader: /* glsl */ `
        varying vec2 vPos;
        void main() { vPos = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D uCity; uniform vec2 uRes; uniform float uFrost; uniform float uTime; uniform float uSize;
        uniform vec4 uRipples[8]; uniform vec3 uTint;
        varying vec2 vPos;
        float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        void main() {
          vec2 uv = gl_FragCoord.xy / uRes;
          // Ondes de choc dans le verre aux impacts.
          vec2 off = vec2(0.0); float ring = 0.0;
          for (int i = 0; i < 8; i++) {
            vec4 r = uRipples[i];
            float age = uTime - r.z;
            if (age < 0.0 || age > 1.2) continue;
            vec2 d = vPos - vec2(r.x, -r.y);
            float dist = length(d);
            float front = age * 2.4;
            float w = exp(-pow((dist - front) * 7.0, 2.0)) * (1.0 - age / 1.2) * r.w;
            off += normalize(d + 1e-5) * w * 0.012;
            ring += w;
          }
          uv += off;
          // Verre depoli : flou en disque, d'autant plus large que le givre est fort.
          float rad = uFrost * 0.03;
          vec3 acc = vec3(0.0);
          float a = hash(gl_FragCoord.xy) * 6.2831;
          for (int i = 0; i < 16; i++) {
            float fi = float(i);
            float r = sqrt((fi + 0.5) / 16.0) * rad;
            float th = a + fi * 2.39996;
            acc += texture2D(uCity, uv + vec2(cos(th), sin(th)) * r).rgb;
          }
          vec3 col = acc / 16.0;
          // Laiteux + grain quand il est depoli, presque rien quand il est clair.
          float grain = hash(floor(vPos * 180.0) + floor(uTime * 8.0)) - 0.5;
          col = mix(col, uTint * (0.12 + 0.04 * grain), uFrost * 0.45);
          // Joints des dalles de 50 cm (le vrai quadrillage du sol LED) et cadre.
          vec2 cell = abs(fract(vPos / 0.5) - 0.5);
          float seam = 1.0 - smoothstep(0.0, 0.012, 0.5 - max(cell.x, cell.y));
          col += vec3(0.9, 0.85, 1.0) * seam * (0.04 + uFrost * 0.07);
          vec2 e = abs(vPos) / (uSize * 0.5);
          float frame = smoothstep(0.965, 0.995, max(e.x, e.y));
          col += vec3(1.2, 0.3, 0.9) * frame * 1.2;
          // Reflet speculaire qui glisse lentement : du verre, pas un trou.
          float sheen = smoothstep(0.0, 0.25, 1.0 - abs(dot(vPos / uSize, normalize(vec2(1.0, 0.6))) * 2.0 - sin(uTime * 0.15) * 0.8));
          col += vec3(1.0, 0.9, 1.0) * sheen * 0.05;
          col += vec3(1.6, 1.2, 2.2) * ring * 0.9;
          gl_FragColor = vec4(col, 1.0);
        }`,
    });
  }

  // --- Cibles -------------------------------------------------------------

  private makeTarget(kind: Kind, radius: number) {
    const g = new THREE.Group();
    const c = KIND_COLORS[kind];
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius * 0.92, 0.08, 48),
      new THREE.MeshStandardMaterial({ color: kind === "hazard" ? 0x120306 : 0x14051e, emissive: c.rim, emissiveIntensity: 0.18, metalness: 0.6, roughness: 0.3 }),
    );
    g.add(disc);
    const face = new THREE.Mesh(
      new THREE.CircleGeometry(radius * 0.78, 48),
      new THREE.MeshBasicMaterial({ color: kind === "hazard" ? 0xffffff : c.core, map: kind === "hazard" ? this.hazardTex : null, transparent: true, toneMapped: kind === "hazard" }),
    );
    face.rotation.x = -Math.PI / 2;
    face.position.y = 0.045;
    face.name = "face";
    g.add(face);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.98, 0.03, 8, 64), new THREE.MeshBasicMaterial({ color: c.rim, toneMapped: false }));
    rim.rotation.x = -Math.PI / 2;
    rim.position.y = 0.04;
    g.add(rim);
    // Anneau de temps restant, pose sur le verre.
    const timer = new THREE.Mesh(new THREE.RingGeometry(radius * 1.12, radius * 1.22, 64, 1, 0, Math.PI * 2), new THREE.MeshBasicMaterial({ color: c.rim, toneMapped: false, transparent: true, side: THREE.DoubleSide }));
    timer.rotation.x = -Math.PI / 2;
    timer.position.y = 0.005;
    timer.name = "timer";
    g.add(timer);
    // Colonne de lumiere qui monte de la ville.
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.7, radius * 0.25, 30, 24, 1, true),
      new THREE.MeshBasicMaterial({ color: c.rim, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, side: THREE.DoubleSide }),
    );
    beam.position.y = -15;
    beam.name = "beam";
    g.add(beam);
    return g;
  }

  /** Synchronise les cibles affichees avec l'etat du jeu. */
  syncTargets(list: Target[], now: number, riseSeconds: number, radius: number) {
    const seen = new Set<number>();
    for (const t of list) {
      seen.add(t.id);
      let g = this.targets.get(t.id);
      if (!g) {
        g = this.makeTarget(t.kind, radius);
        g.position.set(t.x, -20, t.z);
        this.top.add(g);
        this.targets.set(t.id, g);
      }
      const face = g.getObjectByName("face") as THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>;
      if (t.kind === "brand" && this.logo && face.material.map !== this.logo) { face.material.map = this.logo; face.material.color.set(0xffffff); face.material.needsUpdate = true; }
      const age = now - t.bornAt;
      const timer = g.getObjectByName("timer") as THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>;
      const beam = g.getObjectByName("beam") as THREE.Mesh<THREE.CylinderGeometry, THREE.MeshBasicMaterial>;
      if (t.state === "rising" || t.state === "live") {
        const k = Math.min(1, age / riseSeconds);
        const ease = 1 - Math.pow(1 - k, 3);
        g.position.y = -20 + (20.12) * ease + (t.state === "live" ? Math.sin((now + t.id) * 4) * 0.015 : 0);
        g.scale.setScalar(0.6 + 0.4 * ease);
        if (t.kind !== "hazard") g.rotation.y += 0.01; // la croix interdite reste une croix
        const left = t.state === "live" ? 1 - (age - riseSeconds) / t.life : 1;
        timer.scale.setScalar(1);
        timer.material.opacity = 0.35 + 0.65 * left;
        timer.visible = t.state === "live";
        // Le cercle se referme : on lit le temps restant sans chiffre.
        timer.geometry.dispose();
        timer.geometry = new THREE.RingGeometry(radius * 1.12, radius * 1.22, 48, 1, Math.PI / 2, Math.PI * 2 * Math.max(0.02, left));
        beam.material.opacity = 0.2 * (1 - this.frost * 0.6);
      } else {
        // Touchee ou repartie : elle replonge et s'eteint.
        const since = now - (t.endAt ?? now);
        g.position.y = t.state === "hit" ? 0.12 - since * 3 : -since * 14;
        g.scale.setScalar(Math.max(0.01, (t.state === "hit" ? 1 + since * 2 : 1 - since)));
        g.traverse((o) => { const m = (o as THREE.Mesh).material as THREE.Material & { opacity?: number } | undefined; if (m) { m.transparent = true; m.opacity = Math.max(0, 1 - since * 2.5); } });
      }
    }
    for (const [id, g] of this.targets) {
      if (seen.has(id)) continue;
      this.top.remove(g);
      g.traverse((o) => { const m = o as THREE.Mesh; m.geometry?.dispose(); (m.material as THREE.Material | undefined)?.dispose?.(); });
      this.targets.delete(id);
    }
  }

  // --- Effets -------------------------------------------------------------

  impact(x: number, z: number, kind: Kind) {
    const color = KIND_COLORS[kind].rim;
    this.ripples.push({ x, z, t: this.time, strength: kind === "gold" ? 1.6 : 1 });
    if (this.ripples.length > 8) this.ripples.shift();
    // Gerbe de particules.
    const n = kind === "gold" ? 140 : 80;
    const pos = new Float32Array(n * 3), vel = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, s = 1.2 + Math.random() * 2.6;
      pos.set([x, 0.15, z], i * 3);
      vel.set([Math.cos(a) * s, 1.5 + Math.random() * 3, Math.sin(a) * s], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const points = new THREE.Points(geo, new THREE.PointsMaterial({ color, size: 0.06, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
    this.top.add(points);
    this.bursts.push({ points, vel, born: this.time });
    // Anneau de choc a plat sur le verre.
    const shock = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.26, 64), new THREE.MeshBasicMaterial({ color, transparent: true, toneMapped: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
    shock.rotation.x = -Math.PI / 2;
    shock.position.set(x, 0.01, z);
    this.top.add(shock);
    this.shocks.push({ mesh: shock, born: this.time, color });
    this.shake = kind === "hazard" ? 0.25 : kind === "gold" ? 0.12 : 0.05;
  }

  private updateEffects(dt: number) {
    for (const b of [...this.bursts]) {
      const age = this.time - b.born;
      const p = b.points.geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < p.count; i++) {
        b.vel[i * 3 + 1] -= 9 * dt;
        p.setXYZ(i, p.getX(i) + b.vel[i * 3] * dt, Math.max(0.02, p.getY(i) + b.vel[i * 3 + 1] * dt), p.getZ(i) + b.vel[i * 3 + 2] * dt);
      }
      p.needsUpdate = true;
      (b.points.material as THREE.PointsMaterial).opacity = Math.max(0, 1 - age / 0.9);
      if (age > 0.9) { this.top.remove(b.points); b.points.geometry.dispose(); (b.points.material as THREE.Material).dispose(); this.bursts.splice(this.bursts.indexOf(b), 1); }
    }
    for (const s of [...this.shocks]) {
      const age = this.time - s.born;
      s.mesh.scale.setScalar(1 + age * 9);
      (s.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - age / 0.6);
      if (age > 0.6) { this.top.remove(s.mesh); s.mesh.geometry.dispose(); (s.mesh.material as THREE.Material).dispose(); this.shocks.splice(this.shocks.indexOf(s), 1); }
    }
    this.shake *= Math.pow(0.02, dt);
    if (this.shake < 0.002) this.shake = 0;
  }

  render(dt: number) {
    this.time += dt;
    this.updateCamera();
    this.city.update(dt, this.time);
    this.updateEffects(dt);
    const u = this.glass.material.uniforms;
    u.uFrost.value = this.frost;
    u.uTime.value = this.time;
    u.uSize.value = this.size;
    this.ripples.forEach((r, i) => u.uRipples.value[i].set(r.x, r.z, r.t, r.strength));
    // 1. La ville, dans une texture HDR.
    this.renderer.setRenderTarget(this.cityRT);
    this.renderer.render(this.city.scene, this.camera);
    this.renderer.setRenderTarget(null);
    u.uCity.value = this.cityRT.texture;
    // 2. Verre + cibles + effets, puis halo.
    this.composer.render(dt);
  }

  dispose() {
    this.renderer.dispose();
    this.cityRT.dispose();
    this.composer.dispose();
  }
}

/** Cible interdite : bandes de danger rouge et noir, croix au centre. */
function hazardTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = "#1a0306";
  g.fillRect(0, 0, 256, 256);
  g.strokeStyle = "#ff2a3a";
  g.lineWidth = 34;
  g.lineCap = "round";
  g.beginPath(); g.moveTo(70, 70); g.lineTo(186, 186); g.moveTo(186, 70); g.lineTo(70, 186); g.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export { CITY_DEPTH };
