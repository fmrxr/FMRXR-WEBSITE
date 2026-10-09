// Commun aux pages Labs : palettes 2028 et panneau de réglages.
// Palettes : palettes-2028.json (scripts/experiences/palettes.py), un camaïeu
// de 7 tons réels par couleur clé WGSN × Coloro, plus un accent complémentaire
// sur les 10 % les plus lumineux (règle 60-30-10).

export const GRADE_GLSL = `
uniform int uMode;      // -1 couleurs d'origine, 0 camaïeu
uniform vec3 uRamp[7];
uniform vec3 uAccent;
vec3 grade2028(vec3 c) {
  if (uMode < 0) return c;
  float t = clamp(dot(clamp(c, 0.0, 1.0), vec3(0.2126, 0.7152, 0.0722)), 0.0, 1.0);
  if (t > 0.9) return mix(uRamp[6], uAccent, (t - 0.9) / 0.1);
  float x = t / 0.9 * 6.0;
  int i = min(int(floor(x)), 5);
  return mix(uRamp[i], uRamp[i + 1], x - float(i));
}`;

const hex3 = (h) => [1, 3, 5].map((k) => parseInt(h.slice(k, k + 2), 16) / 255);

export async function loadPalettes() {
  return fetch("palettes-2028.json").then((r) => r.json()).then((j) => j.palettes);
}

export function applyPalette(gl, prog, palettes, key) {
  gl.useProgram(prog);
  const p = palettes[key];
  const mode = gl.getUniformLocation(prog, "uMode");
  if (!p) return gl.uniform1i(mode, -1);
  gl.uniform3fv(gl.getUniformLocation(prog, "uRamp"), p.ramp.flatMap(hex3));
  gl.uniform3fv(gl.getUniformLocation(prog, "uAccent"), hex3(p.accent.hex));
  gl.uniform1i(mode, 0);
}

export function fail(msg) {
  const e = document.getElementById("err");
  e.textContent = msg;
  e.style.display = "block";
}

// Panneau : sélecteur de palette, curseurs, note, bouton d'ouverture.
export function panel({ palettes, current, onPalette, sliders = [], note = "" }) {
  const box = document.getElementById("panel");
  const toggle = document.getElementById("toggle");
  const head = (t) => { const h = document.createElement("h4"); h.textContent = t; box.append(h); };
  head("Palette 2028");
  const sel = document.createElement("select");
  sel.style.cssText = "width:100%;padding:6px;background:#14121d;color:#f5f5f8;border:1px solid rgba(245,245,248,.2);border-radius:6px;font:inherit";
  for (const [key, p] of Object.entries(palettes))
    sel.append(Object.assign(document.createElement("option"), { value: key, textContent: `${key} · ${p.season} · ${p.coloro}`, selected: key === current }));
  sel.append(Object.assign(document.createElement("option"), { value: "", textContent: "Original colours", selected: current === "" }));
  const sw = document.createElement("div");
  sw.style.cssText = "display:flex;height:10px;margin-top:6px;border-radius:3px;overflow:hidden";
  const paint = () => {
    const p = palettes[sel.value];
    sw.innerHTML = p ? [...p.ramp, p.accent.hex].map((h, i) => `<i style="flex:${i === 7 ? 0.6 : 1};background:${h}"></i>`).join("") : "";
  };
  sel.addEventListener("change", () => { onPalette(sel.value); paint(); });
  paint();
  box.append(sel, sw);

  const resets = [];
  for (const s of sliders) {
    if (s.group) { head(s.group); continue; }
    const row = document.createElement("label"); row.className = "row";
    const name = document.createElement("span"); name.textContent = s.label;
    const val = document.createElement("span"); val.textContent = s.get().toFixed(2);
    const input = Object.assign(document.createElement("input"), { type: "range", min: s.min, max: s.max, step: s.step, value: s.get() });
    input.addEventListener("input", () => { s.set(parseFloat(input.value)); val.textContent = s.get().toFixed(2); });
    document.addEventListener("labs-zoom", () => { input.value = s.get(); val.textContent = s.get().toFixed(2); });
    resets.push(() => { s.set(s.initial); input.value = s.initial; val.textContent = s.initial.toFixed(2); });
    row.append(name, val, input); box.append(row);
  }
  if (resets.length) {
    const reset = Object.assign(document.createElement("button"), { type: "button", textContent: "Reset" });
    reset.addEventListener("click", () => resets.forEach((f) => f()));
    box.append(reset);
  }
  if (note) { const p = document.createElement("p"); p.className = "note"; p.textContent = note; box.append(p); }
  toggle.addEventListener("click", () => {
    const open = box.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "CLOSE" : "PARAMETERS";
  });
}

export const PAGE_CSS = `
  html, body { margin: 0; height: 100%; background: #000; overflow: hidden; }
  canvas { display: block; width: 100%; height: 100%; }
  #tag, #err { position: fixed; left: 16px; bottom: 14px; margin: 0; font: 11px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; letter-spacing: .15em; text-transform: uppercase; color: #f5f5f8; text-shadow: 0 0 8px rgba(0,0,0,.8); pointer-events: none; }
  #tag b { color: #7bef7b; font-weight: 700; }
  #err { display: none; top: 16px; right: 16px; bottom: auto; white-space: pre-wrap; text-transform: none; letter-spacing: 0; color: #ff5a5f; }
  #toggle { position: fixed; top: 12px; right: 12px; z-index: 3; cursor: pointer; font: 700 10px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; letter-spacing: .15em; color: #f5f5f8; background: rgba(13,12,20,.72); border: 1px solid rgba(245,245,248,.18); border-radius: 999px; padding: 8px 12px; backdrop-filter: blur(6px); }
  #toggle:hover { border-color: #7bef7b; color: #7bef7b; }
  #panel { position: fixed; top: 0; right: 0; bottom: 0; z-index: 2; width: 270px; max-width: 86vw; overflow-y: auto; padding: 48px 14px 24px; box-sizing: border-box; background: rgba(13,12,20,.86); border-left: 1px solid rgba(245,245,248,.12); backdrop-filter: blur(8px); font: 10px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; color: #c9c9d2; transform: translateX(100%); transition: transform .25s ease; }
  #panel.open { transform: none; }
  #panel h4 { margin: 14px 0 4px; font-size: 9px; letter-spacing: .18em; text-transform: uppercase; color: #7b7a8e; font-weight: 600; }
  #panel .row { display: grid; grid-template-columns: 1fr auto; gap: 2px 8px; margin: 5px 0; }
  #panel .row span:last-child { color: #f5f5f8; font-variant-numeric: tabular-nums; }
  #panel input[type=range] { grid-column: 1 / 3; width: 100%; margin: 0; accent-color: #7bef7b; }
  #panel button { width: 100%; margin-top: 14px; padding: 8px; cursor: pointer; border-radius: 6px; font: inherit; letter-spacing: .15em; text-transform: uppercase; color: #f5f5f8; background: transparent; border: 1px solid rgba(245,245,248,.2); }
  #panel button:hover { border-color: #7bef7b; color: #7bef7b; }
  #panel .note { margin-top: 12px; color: #7b7a8e; }`;

export function chrome(title) {
  const style = document.createElement("style");
  style.textContent = PAGE_CSS;
  document.head.append(style);
  document.body.insertAdjacentHTML("beforeend",
    `<p id="tag">FMRXR<b>//</b> LABS · ${title}</p>
     <button id="toggle" type="button" aria-expanded="false" aria-controls="panel">PARAMETERS</button>
     <aside id="panel" aria-label="Shader parameters"></aside><pre id="err"></pre>`);
}

export function program(gl, vert, frag) {
  const sh = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  const p = gl.createProgram();
  gl.attachShader(p, sh(gl.VERTEX_SHADER, vert));
  gl.attachShader(p, sh(gl.FRAGMENT_SHADER, frag));
  gl.bindAttribLocation(p, 0, "aPos");
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
  return p;
}

// Triangle plein écran, vUV en vec3 comme dans un GLSL TOP de TouchDesigner.
// uZoom > 1 rapproche, < 1 éloigne, autour du centre de l'image.
export const FULLSCREEN_VERT = `#version 300 es
in vec2 aPos;
uniform float uZoom;
out vec3 vUV;
void main() { vUV = vec3(aPos * 0.5 / max(uZoom, 1e-3) + 0.5, 0.0); gl_Position = vec4(aPos, 0.0, 1.0); }`;

// Molette = zoom, bornes identiques au curseur du panneau.
export function wheelZoom(canvas, get, set, min = 0.25, max = 4) {
  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    set(Math.min(max, Math.max(min, get() * Math.exp(-e.deltaY * 0.0015))));
    document.dispatchEvent(new Event("labs-zoom"));
  }, { passive: false });
}

export function fullscreen(gl) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  return () => { gl.bindVertexArray(vao); gl.drawArrays(gl.TRIANGLES, 0, 3); };
}

export function target(gl, w, h, float) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  if (float) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
  else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  const fb = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { tex, fb, w, h };
}
