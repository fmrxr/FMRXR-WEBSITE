import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import type { Zone } from "@/lib/stomp/game";
import { CELL, type Building, type Logo } from "@/lib/rooftop/game";
import { buildCity, buildingMaterial, CITY_DEPTH, DEFAULT_PALETTE } from "@/components/stomp/city";

// Moteur de rendu ROOFTOP.
//
// Le sol est cale sur le haut des gratte-ciel : chaque toit affleure le sol
// reel (y = 0), son immeuble plonge jusqu'a la ville neon. Entre les toits,
// le vide : on voit les rues trente etages plus bas. Un verre depoli couvre
// les vides au depart et s'eclaircit pendant la manche.
//
// Meme camera que STOMP : projection decentree (Kooima). Le plan y = 0 reste
// cale au pixel sur le sol LED quand l'oeil bouge, seule la profondeur glisse
// en parallaxe. Les toits, a y = 0, ne bougent donc jamais sous les pieds.

const EYE_HEIGHT = 8;
const SIDE_HEX = ["#ff2d95", "#19e6d6", "#ff8a3d", "#a66bff", "#b9a6e8"];

function roofMaterial(style: number, w: number, h: number) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uStyle: { value: style }, uDim: { value: new THREE.Vector2(w, h) }, uWarn: { value: 0 }, uTime: { value: 0 },
      uTrim: { value: new THREE.Color(SIDE_HEX[Math.floor(style * 2)]) },
    },
    vertexShader: /* glsl */ `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: /* glsl */ `
      uniform float uStyle; uniform vec2 uDim; uniform float uWarn; uniform float uTime; uniform vec3 uTrim;
      varying vec2 vUv;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
      void main() {
        vec2 m = vUv * uDim; // en cases de 50 cm
        // Gravier sombre : une surface, pas un trou.
        // Lisibilite : un toit est TOUJOURS plus clair et plus chaud que le vide
        // (le sombre se lit comme un trou). Beton clair, gravier, acrotere blanc.
        float g = hash(floor(m * 40.0)) * 0.06;
        // Beton chaud eclaire par le couchant (plus clair cote soleil), ombre
        // portee au pied de l'acrotere : un volume, pas un aplat.
        vec3 col = mix(vec3(0.26, 0.2, 0.24), vec3(0.42, 0.3, 0.27), vUv.x) + g;
        float e = min(min(m.x, uDim.x - m.x), min(m.y, uDim.y - m.y));
        col *= 0.72 + 0.28 * smoothstep(0.05, 0.22, e);
        col = mix(col, vec3(0.95, 0.86, 0.8), 1.0 - smoothstep(0.035, 0.055, e));
        col += uTrim * (1.0 - smoothstep(0.0, 0.025, abs(e - 0.07))) * 1.8;
        vec2 c = m - uDim * 0.5;
        float big = min(uDim.x, uDim.y);
        if (uStyle < 0.18 && big >= 1.5) {
          // Piscine turquoise.
          vec2 d = abs(c) - (uDim * 0.5 - 0.25);
          float pool = step(max(d.x, d.y), 0.0);
          float ripple = 0.08 * sin(m.x * 18.0 + uTime * 2.0) * sin(m.y * 14.0 - uTime * 1.6);
          col = mix(col, vec3(0.05, 0.75, 0.95) + ripple, pool);
        } else if (uStyle < 0.36 && big >= 1.5) {
          // Heliport : cercle et croix de balisage.
          float r = length(c);
          col += vec3(1.4, 1.2, 0.4) * (1.0 - smoothstep(0.0, 0.025, abs(r - big * 0.32)));
          col += vec3(1.4, 1.2, 0.4) * step(abs(c.x), 0.03) * step(abs(c.y), big * 0.18) * 0.8;
        } else if (uStyle < 0.5) {
          // Climatiseurs et sorties : blocs plus clairs.
          vec2 cell = floor(m * 2.0);
          float box = step(0.75, hash(cell + uStyle * 9.0)) * step(0.15, fract(m.x * 2.0)) * step(fract(m.x * 2.0), 0.85) * step(0.15, fract(m.y * 2.0)) * step(fract(m.y * 2.0), 0.85);
          col = mix(col, vec3(0.32, 0.3, 0.36), box);
        } else if (uStyle < 0.62) {
          // Toit-terrasse vegetalise.
          col = mix(col, vec3(0.05, 0.22, 0.12) + g, step(0.12, e));
        }
        // Avertissement : le toit va s'effondrer. Bordure rouge qui clignote, fissures.
        float blink = 0.5 + 0.5 * sin(uTime * (10.0 + uWarn * 14.0));
        col += vec3(2.4, 0.1, 0.15) * uWarn * blink * (1.0 - smoothstep(0.0, 0.12, e));
        float crack = step(0.985 - uWarn * 0.03, hash(floor(m * 22.0)));
        col = mix(col, vec3(0.9, 0.1, 0.15), crack * uWarn);
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
}

/** Verre depoli sur les vides + limites des zones de chaque camp. */
function overlayMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uFrost: { value: 0.85 }, uTime: { value: 0 }, uSize: { value: 4 },
      uZones: { value: Array.from({ length: 4 }, () => new THREE.Vector4()) },
      uZoneColors: { value: Array.from({ length: 4 }, () => new THREE.Color()) },
      uZoneCount: { value: 0 }, uZoneTint: { value: 0 },
    },
    vertexShader: /* glsl */ `varying vec2 vPos; void main() { vPos = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: /* glsl */ `
      uniform float uFrost; uniform float uTime; uniform float uSize;
      uniform vec4 uZones[4]; uniform vec3 uZoneColors[4]; uniform int uZoneCount; uniform float uZoneTint;
      varying vec2 vPos;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
      void main() {
        vec2 w = vec2(vPos.x, -vPos.y);
        // Verre fume sombre : depoli, il assombrit le vide (un trou reste sombre,
        // jamais plus clair qu'un toit) ; clair, il laisse voir la ville en entier.
        float grain = hash(floor(vPos * 160.0) + floor(uTime * 6.0));
        vec3 col = vec3(0.05, 0.035, 0.09) + vec3(0.06, 0.05, 0.09) * grain;
        float a = uFrost * 0.88;
        // Joints des dalles de verre.
        vec2 cell = abs(fract(w / 0.5) - 0.5);
        float seam = (1.0 - smoothstep(0.0, 0.015, 0.5 - max(cell.x, cell.y))) * (0.1 + uFrost * 0.2);
        col += vec3(0.5, 0.45, 0.65) * seam;
        a += seam;
        vec3 add = vec3(0.0);
        for (int i = 0; i < 4; i++) {
          if (i >= uZoneCount) break;
          vec4 z = uZones[i];
          if (w.x < z.x || w.x > z.y || w.y < z.z || w.y > z.w) continue;
          float d = min(min(w.x - z.x, z.y - w.x), min(w.y - z.z, z.w - w.y));
          float inner = step(0.01, min(abs(abs(w.x) - uSize * 0.5), abs(abs(w.y) - uSize * 0.5)));
          add += uZoneColors[i] * (1.0 - smoothstep(0.0, 0.03, d)) * inner * 2.0;
          col = mix(col, uZoneColors[i], uZoneTint * 0.5);
          a = max(a, uZoneTint * 0.3);
        }
        gl_FragColor = vec4(col + add, clamp(a + length(add), 0.0, 1.0));
      }`,
  });
}

type RoofMesh = { group: THREE.Group; roof: THREE.ShaderMaterial; b: Building };

export class RooftopEngine {
  readonly renderer: THREE.WebGLRenderer;
  private size: number;
  private camera = new THREE.PerspectiveCamera();
  private eye = new THREE.Vector3(0, EYE_HEIGHT, 0);
  private eyeTarget = new THREE.Vector2();
  private scene: THREE.Scene;
  private city: ReturnType<typeof buildCity>;
  private composer: EffectComposer;
  private bloom: UnrealBloomPass;
  private bodyMat = buildingMaterial(DEFAULT_PALETTE);
  private roofs = new Map<number, RoofMesh>();
  private coins = new Map<number, THREE.Group>();
  private overlay: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  private fx: { obj: THREE.Object3D; born: number; life: number; update: (k: number, dt: number) => void }[] = [];
  private logoTex: THREE.Texture | null = null;
  private ownerColors = SIDE_HEX.map((h) => new THREE.Color(h));
  private time = 0;
  private shake = 0;
  frost = 0;

  constructor(canvas: HTMLCanvasElement, opts: { size: number; logoUrl?: string }) {
    this.size = opts.size;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.9;

    // La ville du fond : celle de STOMP, ses tours restent loin sous les toits.
    this.city = buildCity(DEFAULT_PALETTE);
    this.scene = this.city.scene;
    this.scene.add(new THREE.HemisphereLight(0xffd0f0, 0x200030, 1.1));

    this.overlay = new THREE.Mesh(new THREE.PlaneGeometry(this.size, this.size), overlayMaterial());
    this.overlay.rotation.x = -Math.PI / 2;
    this.overlay.position.y = -0.03; // sous les toits : il ne recouvre que les vides
    this.overlay.renderOrder = 2;
    this.scene.add(this.overlay);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.6, 0.45, 1.05);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());

    if (opts.logoUrl) new THREE.TextureLoader().load(opts.logoUrl, (t) => { t.colorSpace = THREE.SRGBColorSpace; this.logoTex = t; });
  }

  resize(px: number) {
    this.renderer.setSize(px, px, false);
    const real = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    this.composer.setSize(px, px);
    this.bloom.resolution.set(real.x / 2, real.y / 2);
  }

  lookFrom(points: { x: number; z: number }[]) {
    if (points.length) {
      this.eyeTarget.set(points.reduce((s, p) => s + p.x, 0) / points.length * 0.9, points.reduce((s, p) => s + p.z, 0) / points.length * 0.9);
    } else this.eyeTarget.set(0, 0);
  }

  setOwnerColors(colors: string[]) { this.ownerColors = colors.map((h) => new THREE.Color(h)); for (const [, g] of this.coins) this.scene.remove(g); this.coins.clear(); }

  setZones(zones: Zone[], colors: string[], tint: number) {
    const u = this.overlay.material.uniforms;
    u.uZoneCount.value = zones.length > 1 ? Math.min(4, zones.length) : 0;
    zones.slice(0, 4).forEach((z, i) => { u.uZones.value[i].set(z.x0, z.x1, z.z0, z.z1); u.uZoneColors.value[i].set(colors[i] ?? "#fff"); });
    u.uZoneTint.value = tint;
  }

  private updateCamera() {
    const driftX = Math.sin(this.time * 0.13) * 0.5, driftZ = Math.cos(this.time * 0.1) * 0.4;
    this.eye.x += (this.eyeTarget.x + driftX - this.eye.x) * 0.035;
    this.eye.z += (this.eyeTarget.y + driftZ - this.eye.z) * 0.035;
    const sx = this.shake ? (Math.random() - 0.5) * this.shake : 0, sz = this.shake ? (Math.random() - 0.5) * this.shake : 0;
    const e = new THREE.Vector3(this.eye.x + sx, EYE_HEIGHT * (this.size / 4), this.eye.z + sz);
    const cam = this.camera;
    cam.position.copy(e);
    cam.up.set(0, 0, -1);
    cam.lookAt(e.x, 0, e.z);
    const n = 0.1, f = 400, h = e.y, half = this.size / 2;
    cam.projectionMatrix.makePerspective((-half - e.x) * n / h, (half - e.x) * n / h, (half + e.z) * n / h, (-half + e.z) * n / h, n, f);
    cam.projectionMatrixInverse.copy(cam.projectionMatrix).invert();
    cam.updateMatrixWorld();
  }

  // --- Immeubles ------------------------------------------------------------

  private makeRoof(b: Building): RoofMesh {
    const W = b.w * CELL - 0.04, H = b.h * CELL - 0.04; // 2 cm de jour : on voit ou finit un toit
    const depth = CITY_DEPTH - 1;
    const group = new THREE.Group();
    const bodyGeo = new THREE.BoxGeometry(W, depth, H);
    bodyGeo.translate(0, -depth / 2 - 0.002, 0);
    const seed = new Float32Array([b.style]);
    bodyGeo.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seed, 1));
    const body = new THREE.InstancedMesh(bodyGeo, this.bodyMat, 1);
    body.setMatrixAt(0, new THREE.Matrix4());
    group.add(body);
    const roof = roofMaterial(b.style, b.w, b.h);
    const cap = new THREE.Mesh(new THREE.PlaneGeometry(W, H), roof);
    cap.rotation.x = -Math.PI / 2;
    group.add(cap);
    const x = -this.size / 2 + (b.c0 + b.w / 2) * CELL, z = -this.size / 2 + (b.r0 + b.h / 2) * CELL;
    group.position.set(x, 0, z);
    this.scene.add(group);
    return { group, roof, b };
  }

  syncCity(buildings: Building[], now: number, timing: { warn: number; sink: number; rise: number }) {
    const seen = new Set<number>();
    for (const b of buildings) {
      seen.add(b.id);
      let m = this.roofs.get(b.id);
      if (!m) { m = this.makeRoof(b); this.roofs.set(b.id, m); }
      m.b = b;
      const age = now - b.since;
      m.roof.uniforms.uTime.value = this.time;
      m.roof.uniforms.uWarn.value = b.state === "warning" ? Math.min(1, age / timing.warn) : 0;
      if (b.state === "sinking") {
        const k = Math.min(1, age / timing.sink);
        m.group.position.y = -k * k * 14; // il plonge en accelerant
      } else if (b.state === "rising") {
        const k = Math.min(1, age / timing.rise);
        m.group.position.y = -(1 - (1 - (1 - k) * (1 - k))) * 10;
      } else if (b.state === "gone") {
        m.group.visible = false;
      } else m.group.position.y = 0;
    }
    for (const [id, m] of this.roofs) {
      if (seen.has(id)) continue;
      this.scene.remove(m.group);
      m.group.traverse((o) => { const mm = o as THREE.Mesh; mm.geometry?.dispose(); if (mm.material !== this.bodyMat) (mm.material as THREE.Material | undefined)?.dispose?.(); });
      this.roofs.delete(id);
    }
  }

  // --- Logos ----------------------------------------------------------------

  private makeCoin(l: Logo) {
    const g = new THREE.Group();
    const color = l.kind === "gold" ? new THREE.Color(3, 2, 0.4) : this.ownerColors[l.owner].clone().multiplyScalar(2.6);
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.04, 40), new THREE.MeshStandardMaterial({ color: 0x14051e, emissive: color, emissiveIntensity: 0.2, metalness: 0.7, roughness: 0.3 }));
    g.add(disc);
    for (const side of [1, -1]) {
      const face = new THREE.Mesh(new THREE.CircleGeometry(0.14, 40), new THREE.MeshBasicMaterial({ map: this.logoTex, color: this.logoTex ? 0xffffff : color, transparent: true }));
      face.rotation.x = -Math.PI / 2 * side;
      face.position.y = 0.021 * side;
      g.add(face);
    }
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.012, 8, 48), new THREE.MeshBasicMaterial({ color, toneMapped: false }));
    rim.rotation.x = Math.PI / 2;
    g.add(rim);
    // Halo au sol : on repere le logo meme de loin.
    const halo = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.24, 48), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, toneMapped: false, side: THREE.DoubleSide }));
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = -0.11;
    halo.name = "halo";
    g.add(halo);
    const p = { x: -this.size / 2 + (l.c + 0.5) * CELL, z: -this.size / 2 + (l.r + 0.5) * CELL };
    g.position.set(p.x, 0.12, p.z);
    this.scene.add(g);
    return g;
  }

  syncLogos(logos: Logo[], now: number) {
    const seen = new Set<number>();
    for (const l of logos) {
      seen.add(l.id);
      let g = this.coins.get(l.id);
      if (!g) { g = this.makeCoin(l); this.coins.set(l.id, g); }
      const age = now - l.bornAt;
      if (l.takenAt !== null) {
        // Ramasse : il saute un peu, tourne vite et s'evanouit sur place
        // (s'il montait vers l'oeil, il finirait par couvrir tout le sol).
        const k = Math.min(1, (now - l.takenAt) / 0.45);
        g.position.y = 0.12 + Math.sin(k * Math.PI) * 0.35;
        g.scale.setScalar(Math.max(0.01, 1 + k * 0.3 - k * k * 1.2));
        g.rotation.y += 0.5;
        g.traverse((o) => { const m = (o as THREE.Mesh).material as (THREE.Material & { opacity: number }) | undefined; if (m) { m.transparent = true; m.opacity = Math.max(0, 1 - k); } });
      } else if (l.gone) {
        g.visible = false;
      } else {
        const appear = Math.min(1, age / 0.35);
        g.scale.setScalar(appear * (1 + Math.sin(now * 5) * 0.03));
        g.rotation.y = now * 2.2 + l.id;
        g.position.y = 0.12 + Math.sin(now * 3 + l.id) * 0.02;
        // Les dernieres secondes, le logo clignote : il va disparaitre.
        const left = l.life - age;
        g.visible = left > 1 || Math.sin(now * 20) > -0.3;
        const halo = g.getObjectByName("halo") as THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>;
        halo.scale.setScalar(1 + (Math.sin(now * 4) + 1) * 0.08);
      }
    }
    for (const [id, g] of this.coins) {
      if (seen.has(id)) continue;
      this.scene.remove(g);
      g.traverse((o) => { const m = o as THREE.Mesh; m.geometry?.dispose(); (m.material as THREE.Material | undefined)?.dispose?.(); });
      this.coins.delete(id);
    }
  }

  // --- Effets ---------------------------------------------------------------

  private burst(x: number, z: number, color: THREE.Color, n: number, down: boolean) {
    const pos = new Float32Array(n * 3), vel = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, s = 0.8 + Math.random() * 2.2;
      pos.set([x + (Math.random() - 0.5) * 0.3, 0.05, z + (Math.random() - 0.5) * 0.3], i * 3);
      vel.set([Math.cos(a) * s, down ? -2 - Math.random() * 6 : 1.5 + Math.random() * 3, Math.sin(a) * s], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color, size: down ? 0.08 : 0.06, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
    this.scene.add(pts);
    this.fx.push({ obj: pts, born: this.time, life: 1, update: (k, dt) => {
      const p = geo.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < n; i++) {
        vel[i * 3 + 1] -= (down ? 4 : 9) * dt;
        p.setXYZ(i, p.getX(i) + vel[i * 3] * dt, p.getY(i) + vel[i * 3 + 1] * dt, p.getZ(i) + vel[i * 3 + 2] * dt);
      }
      p.needsUpdate = true;
      (pts.material as THREE.PointsMaterial).opacity = 1 - k;
    } });
  }

  collect(x: number, z: number, gold: boolean, owner: number) {
    this.burst(x, z, gold ? new THREE.Color(3, 2, 0.4) : this.ownerColors[owner].clone().multiplyScalar(2.4), gold ? 110 : 60, false);
    this.shake = gold ? 0.1 : 0.04;
  }

  /** Chute : eclats de verre rouge qui tombent dans le vide, anneau d'alerte. */
  fall(x: number, z: number) {
    this.burst(x, z, new THREE.Color(3, 0.3, 0.35), 90, true);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.18, 0.25, 4, 1, Math.PI / 4), new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 0.2, 0.25), transparent: true, toneMapped: false, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, 0.02, z);
    this.scene.add(ring);
    this.fx.push({ obj: ring, born: this.time, life: 0.6, update: (k) => { ring.scale.setScalar(1 + k * 2); (ring.material as THREE.MeshBasicMaterial).opacity = 1 - k; } });
    this.shake = 0.22;
  }

  render(dt: number) {
    this.time += dt;
    this.updateCamera();
    this.city.update(dt, this.time);
    const u = this.overlay.material.uniforms;
    u.uFrost.value = this.frost;
    u.uTime.value = this.time;
    u.uSize.value = this.size;
    this.bodyMat.uniforms.uTime.value = this.time;
    for (const e of [...this.fx]) {
      const k = (this.time - e.born) / e.life;
      if (k >= 1) {
        this.scene.remove(e.obj);
        e.obj.traverse((o) => { const m = o as THREE.Mesh; m.geometry?.dispose(); (m.material as THREE.Material | undefined)?.dispose?.(); });
        this.fx.splice(this.fx.indexOf(e), 1);
      } else e.update(k, dt);
    }
    this.shake *= Math.pow(0.02, dt);
    if (this.shake < 0.002) this.shake = 0;
    this.composer.render(dt);
  }

  dispose() { this.renderer.dispose(); this.composer.dispose(); }
}

export { SIDE_HEX };
