import * as THREE from "three";

// La ville neon vue d'en haut, trente etages sous le verre : Miami
// d'aujourd'hui (Art deco, palmiers, ocean, traînees de phares), jamais la
// grille synthwave des annees 80 ni rien qui appartienne a une franchise.
// Tout est procedural et instancie : un seul appel de dessin par famille.

export const CITY_DEPTH = 46; // profondeur du sol de la ville sous le verre (unites = metres virtuels)
const EXTENT = 26; // demi-cote de la ville
const BLOCK = 6; // pas de la grille (ilot + rue)
const STREET = 1.8;

export type CityPalette = { neonA: THREE.Color; neonB: THREE.Color; sunset: THREE.Color; haze: THREE.Color; ocean: THREE.Color };

export const DEFAULT_PALETTE: CityPalette = {
  neonA: new THREE.Color("#ff2d95"), // rose neon
  neonB: new THREE.Color("#19e6d6"), // turquoise
  sunset: new THREE.Color("#ff8a3d"), // lumiere rasante orange
  haze: new THREE.Color("#2a0f45"), // brume violette des profondeurs
  ocean: new THREE.Color("#0b5f7a"),
};

const FOG = /* glsl */ `
uniform vec3 uHaze;
uniform float uDepth;
vec3 applyHaze(vec3 col, float worldY) {
  // Plus c'est profond, plus la brume violette mange la couleur.
  float k = clamp(-worldY / uDepth, 0.0, 1.0);
  return mix(col, uHaze * 0.7, smoothstep(0.2, 1.0, k) * 0.5);
}
`;

const HASH = /* glsl */ `
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
`;

function buildingMaterial(p: CityPalette) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uHaze: { value: p.haze }, uDepth: { value: CITY_DEPTH },
      uSun: { value: p.sunset }, uNeonA: { value: p.neonA }, uNeonB: { value: p.neonB },
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */ `
      attribute float aSeed;
      varying vec3 vWorld; varying vec3 vNormalW; varying vec3 vLocal; varying float vSeed;
      void main() {
        vec4 local = vec4(position, 1.0);
        vec4 world = modelMatrix * instanceMatrix * local;
        vWorld = world.xyz;
        vNormalW = normalize(mat3(modelMatrix * instanceMatrix) * normal);
        vLocal = position; vSeed = aSeed;
        gl_Position = projectionMatrix * viewMatrix * world;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uSun; uniform vec3 uNeonA; uniform vec3 uNeonB; uniform float uTime;
      varying vec3 vWorld; varying vec3 vNormalW; varying vec3 vLocal; varying float vSeed;
      ${FOG}
      ${HASH}
      void main() {
        vec3 base = mix(vec3(0.02, 0.015, 0.04), vec3(0.06, 0.04, 0.09), vSeed);
        // Facades Art deco claires pour une partie des immeubles (beige, rose pale, menthe).
        vec3 deco = vSeed > 0.62 ? mix(vec3(0.85, 0.72, 0.68), vec3(0.62, 0.86, 0.8), fract(vSeed * 7.0)) * 0.12 : base;
        vec3 col = deco;
        float up = vNormalW.y;
        if (up > 0.5) {
          // Toit : sombre, avec un liseré neon sur une partie des immeubles.
          col = deco * 0.6;
          vec2 e = abs(vLocal.xz) * 2.0; // 0 au centre, 1 au bord
          float edge = smoothstep(0.86, 0.97, max(e.x, e.y));
          float neon = step(0.55, fract(vSeed * 13.0));
          vec3 nc = fract(vSeed * 3.0) > 0.5 ? uNeonA : uNeonB;
          col += nc * edge * neon * 3.2;
          // Piscine ou terrasse eclairee sur certains toits.
          float pool = step(0.82, fract(vSeed * 17.0)) * (1.0 - smoothstep(0.25, 0.3, max(e.x, e.y)));
          col = mix(col, vec3(0.1, 0.9, 1.1), pool);
        } else {
          // Facades : soleil couchant rasant d'un cote, fenetres allumees.
          float sun = max(0.0, dot(vNormalW, normalize(vec3(0.8, 0.2, -0.35))));
          col += uSun * sun * 0.16;
          vec2 grid = vec2(abs(vNormalW.x) > 0.5 ? vWorld.z : vWorld.x, vWorld.y) * vec2(2.2, 1.4);
          vec2 cell = floor(grid);
          vec2 f = fract(grid);
          float win = step(0.18, f.x) * step(f.x, 0.82) * step(0.25, f.y) * step(f.y, 0.75);
          float lit = step(0.66, hash(cell + vSeed * 31.0));
          vec3 warm = mix(vec3(1.4, 0.9, 0.5), vec3(0.7, 1.0, 1.5), step(0.8, hash(cell * 1.7)));
          col += warm * win * lit * 0.55;
          // Bandeau neon vertical sur quelques facades (enseignes).
          float sign = step(0.9, fract(vSeed * 29.0)) * (1.0 - smoothstep(0.02, 0.06, abs(fract(grid.x * 0.125) - 0.5)));
          col += (fract(vSeed * 5.0) > 0.5 ? uNeonA : uNeonB) * sign * 2.5 * (0.85 + 0.15 * sin(uTime * 3.0 + vSeed * 40.0));
        }
        gl_FragColor = vec4(applyHaze(col, vWorld.y), 1.0);
      }`,
  });
}

function groundMaterial(p: CityPalette) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uHaze: { value: p.haze }, uDepth: { value: CITY_DEPTH }, uTime: { value: 0 },
      uNeonA: { value: p.neonA }, uNeonB: { value: p.neonB }, uOcean: { value: p.ocean },
      uBlock: { value: BLOCK }, uStreet: { value: STREET }, uShore: { value: EXTENT * 0.45 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vWorld;
      void main() { vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: /* glsl */ `
      uniform float uTime; uniform vec3 uNeonA; uniform vec3 uNeonB; uniform vec3 uOcean;
      uniform float uBlock; uniform float uStreet; uniform float uShore;
      varying vec3 vWorld;
      ${FOG}
      ${HASH}
      void main() {
        vec2 p = vWorld.xz;
        // Rivage en diagonale : ocean d'un cote, plage, puis la ville.
        float shore = p.x + p.y * 0.35 - uShore;
        vec3 col;
        if (shore > 1.6) {
          float wave = sin(p.x * 1.3 + uTime * 0.8) * sin(p.y * 0.9 - uTime * 0.6);
          float glint = step(0.985, hash(floor(p * 3.0) + floor(uTime * 2.0)));
          col = uOcean * (0.3 + 0.1 * wave) + vec3(1.2, 0.8, 0.9) * glint * 0.8;
          col += vec3(0.9, 0.95, 1.0) * (1.0 - smoothstep(1.6, 2.4, shore)) * 0.6; // ecume
        } else if (shore > 0.0) {
          col = vec3(0.22, 0.14, 0.13); // sable au crepuscule
        } else {
          vec2 g = mod(p + uBlock * 0.5, uBlock);
          vec2 d = min(g, uBlock - g);
          float road = step(min(d.x, d.y), uStreet * 0.5);
          col = mix(vec3(0.012, 0.01, 0.02), vec3(0.03, 0.025, 0.05), road);
          // Marquage au sol et bordures neon le long des avenues.
          float lane = road * (1.0 - smoothstep(0.03, 0.07, abs(min(d.x, d.y))));
          col += vec3(0.9, 0.8, 0.5) * lane * step(0.5, fract((d.x < d.y ? p.y : p.x) * 0.6)) * 0.5;
          float curb = (1.0 - smoothstep(0.0, 0.08, abs(min(d.x, d.y) - uStreet * 0.5)));
          col += mix(uNeonA, uNeonB, step(0.5, fract(floor((p.x + p.y) / uBlock) * 0.5))) * curb * 2.2;
        }
        gl_FragColor = vec4(applyHaze(col, vWorld.y), 1.0);
      }`,
  });
}

/** Traînees de phares : petits barreaux lumineux qui filent le long des rues. */
function makeTraffic(p: CityPalette, rand: () => number) {
  const count = 220;
  const geo = new THREE.BoxGeometry(1, 0.08, 0.1);
  const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  const mesh = new THREE.InstancedMesh(geo, mat, count);
  const cars = Array.from({ length: count }, () => {
    const horizontal = rand() < 0.5;
    const lane = Math.round((rand() * 2 - 1) * (EXTENT / BLOCK)) * BLOCK;
    const dir = rand() < 0.5 ? 1 : -1;
    const head = dir > 0;
    return { horizontal, lane: lane + (head ? 0.35 : -0.35), dir, pos: (rand() * 2 - 1) * EXTENT, speed: 4 + rand() * 7, head };
  });
  const white = new THREE.Color(1.5, 1.4, 1.2);
  const red = new THREE.Color(1.8, 0.15, 0.2);
  cars.forEach((c, i) => mesh.setColorAt(i, c.head ? white : red));
  void p;
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();
  const v = new THREE.Vector3();
  const update = (dt: number) => {
    cars.forEach((c, i) => {
      c.pos += c.dir * c.speed * dt;
      if (c.pos > EXTENT) c.pos = -EXTENT; else if (c.pos < -EXTENT) c.pos = EXTENT;
      const len = 0.5 + c.speed * 0.1;
      if (c.horizontal) { v.set(c.pos, -CITY_DEPTH + 0.1, c.lane); q.identity(); }
      else { v.set(c.lane, -CITY_DEPTH + 0.1, c.pos); q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2); }
      s.set(len, 1, 1);
      m.compose(v, q, s);
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
  };
  update(0);
  return { mesh, update };
}

/** Palmiers : vus d'en haut, une etoile sombre de palmes sur un halo de lampadaire. */
function makePalms(rand: () => number, shoreAt: (x: number, z: number) => number) {
  const leaf = new THREE.PlaneGeometry(1.5, 0.32);
  leaf.translate(0.75, 0, 0);
  leaf.rotateX(-Math.PI / 2);
  const parts: THREE.BufferGeometry[] = [];
  for (let k = 0; k < 7; k++) {
    const g = leaf.clone();
    g.rotateZ(-0.25); // palmes qui retombent
    g.rotateY((k / 7) * Math.PI * 2);
    parts.push(g);
  }
  const trunk = new THREE.CylinderGeometry(0.08, 0.12, 4, 6);
  trunk.translate(0, -2, 0);
  const crown = mergeSimple(parts);
  const count = 140;
  const crownMesh = new THREE.InstancedMesh(crown, new THREE.MeshBasicMaterial({ color: new THREE.Color("#0c2a1f"), side: THREE.DoubleSide }), count);
  const trunkMesh = new THREE.InstancedMesh(trunk, new THREE.MeshBasicMaterial({ color: new THREE.Color("#1a1210") }), count);
  const m = new THREE.Matrix4();
  let i = 0;
  for (let tries = 0; tries < 2000 && i < count; tries++) {
    const x = (rand() * 2 - 1) * EXTENT, z = (rand() * 2 - 1) * EXTENT;
    const s = shoreAt(x, z);
    const onBeach = s > -0.2 && s < 1.4;
    const onAvenue = s < 0 && Math.abs(((x + BLOCK * 0.5) % BLOCK + BLOCK) % BLOCK - BLOCK / 2) > BLOCK / 2 - STREET * 0.55;
    if (!onBeach && !(onAvenue && rand() < 0.3)) continue;
    const h = 3.5 + rand() * 2;
    m.compose(new THREE.Vector3(x, -CITY_DEPTH + h, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rand() * 6.28), new THREE.Vector3(1, 1, 1).multiplyScalar(0.8 + rand() * 0.5));
    crownMesh.setMatrixAt(i, m);
    trunkMesh.setMatrixAt(i, m);
    i++;
  }
  crownMesh.count = i;
  trunkMesh.count = i;
  return [trunkMesh, crownMesh];
}

function mergeSimple(geos: THREE.BufferGeometry[]) {
  const pos: number[] = [], nor: number[] = [], idx: number[] = [];
  let off = 0;
  for (const g of geos) {
    const p = g.getAttribute("position"), n = g.getAttribute("normal");
    for (let i = 0; i < p.count; i++) { pos.push(p.getX(i), p.getY(i), p.getZ(i)); nor.push(n.getX(i), n.getY(i), n.getZ(i)); }
    const ix = g.getIndex()!;
    for (let i = 0; i < ix.count; i++) idx.push(ix.getX(i) + off);
    off += p.count;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  out.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  out.setIndex(idx);
  return out;
}

export function buildCity(palette: CityPalette = DEFAULT_PALETTE, rand: () => number = Math.random) {
  const scene = new THREE.Scene();
  scene.background = palette.haze.clone().multiplyScalar(0.6);
  const shoreAt = (x: number, z: number) => x + z * 0.35 - EXTENT * 0.45;

  // Sol de la ville (rues, plage, ocean).
  const groundMat = groundMaterial(palette);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(EXTENT * 2.4, EXTENT * 2.4), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -CITY_DEPTH;
  scene.add(ground);

  // Immeubles : 2 a 4 par ilot, hauteurs variees, quelques tours tres proches du verre.
  const box = new THREE.BoxGeometry(1, 1, 1);
  box.translate(0, 0.5, 0);
  const placements: { x: number; z: number; w: number; d: number; h: number }[] = [];
  for (let bx = -EXTENT; bx <= EXTENT; bx += BLOCK) {
    for (let bz = -EXTENT; bz <= EXTENT; bz += BLOCK) {
      const inner = BLOCK - STREET;
      const n = 1 + Math.floor(rand() * 3);
      for (let k = 0; k < n; k++) {
        const w = inner / (n === 1 ? 1 : 2) - 0.2, d = inner / (n === 3 && k === 2 ? 1 : 2) - 0.2;
        const x = bx + (n === 1 ? 0 : (k % 2 ? 1 : -1) * inner / 4);
        const z = bz + (n === 1 ? 0 : (k < 2 ? -1 : 1) * inner / 4);
        if (shoreAt(x, z) > -1) continue; // rien sur la plage ni dans l'ocean
        const tall = rand();
        // Surtout des immeubles bas a moyens ; quelques tours, jamais a moins de 14 m du verre.
        const h = tall > 0.97 ? CITY_DEPTH - 14 - rand() * 6 : 2.5 + Math.pow(tall, 2.6) * (CITY_DEPTH - 22);
        placements.push({ x, z, w: n === 1 ? inner - 0.4 : w, d: n === 1 ? inner - 0.4 : d, h });
      }
    }
  }
  const bMat = buildingMaterial(palette);
  const buildings = new THREE.InstancedMesh(box, bMat, placements.length);
  const seeds = new Float32Array(placements.length);
  const m = new THREE.Matrix4();
  placements.forEach((b, i) => {
    m.compose(new THREE.Vector3(b.x, -CITY_DEPTH, b.z), new THREE.Quaternion(), new THREE.Vector3(b.w, b.h, b.d));
    buildings.setMatrixAt(i, m);
    seeds[i] = rand();
  });
  box.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seeds, 1));
  scene.add(buildings);

  const traffic = makeTraffic(palette, rand);
  scene.add(traffic.mesh);
  for (const p of makePalms(rand, shoreAt)) scene.add(p);

  const update = (dt: number, time: number) => {
    traffic.update(dt);
    bMat.uniforms.uTime.value = time;
    groundMat.uniforms.uTime.value = time;
  };
  return { scene, update };
}
