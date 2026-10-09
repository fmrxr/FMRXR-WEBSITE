// =============================================================================
// PHYLLOTAXIS GRID  ·  GLSL TOP (TouchDesigner)
// EFFET MÈRE / FMRXR Labs
//
// Champ de phyllotaxie (angle d'or) répété sur une grille, coloré par
// interférence sin/cos. D'après l'article de xor dev :
//   https://mini.gmshaders.com/p/phi
//
// Version paramétrée : tous les nombres magiques sont sortis dans 8 uniforms
// vec4, à créer sur la page « Vectors » du GLSL TOP. Une fois exposés, chacun
// des 32 réglages se pilote au CHOP — audio, MIDI, LFO, tracking.
//
// ⚠️ TouchDesigner crée tout seul les entrées de la page Vectors en lisant les
// uniforms, MAIS il les initialise à 1. Tant qu'on n'a pas saisi les valeurs
// ci-dessous, le shader tourne avec 1 point dans la fleur et un zoom de 1 :
// l'image n'a rien à voir. td_setup_vectors.py les pose en un clic.
//
// ---- VALEURS ---------------------------------------------------------------
//             |  x         y         z         w
//  uFrame     |  0.2       6.0      -1.78      0.75
//  uField     |  256       2.0       0.3486   -0.9
//  uMotion    |  2.195     0.1       1.0       0.1
//  uCell      |  2.399963  1.570796  1.0       2.0
//  uWave      |  8.0       2.0       0.1       0.5
//  uGrid      |  0.495     0.4      10.0       1.0
//  uInk       |  0.2       0.3       0.5       0.9
//  uPaper     |  1.0       1.0       1.0       1.0
//
//  Pour retrouver le rendu d'origine (xor dev), seules 3 lignes changent :
//  uFrame 2.0 1.5 0.0 1.0 · uField 256 0.75 2.399963 0.5 · uMotion 0.4 0.1 1.0 0.1
// =============================================================================

#define HPI 1.570796
#define PHI 1.61803398

uniform float u_aspect, u_time;

//                   x                  y                    z                  w
uniform vec4 uFrame;  // zoom          | échelle grille     | pan X            | pan Y
uniform vec4 uField;  // nb de points  | rayon              | angle divergence | ampl. respiration
uniform vec4 uMotion; // v. respiration| v. rotation        | v. défilement    | tourbillon
uniform vec4 uCell;   // décal. rangée | décal. colonne     | dispersion       | mélange dispersion
uniform vec4 uWave;   // gain distance | gain xy            | halo             | dégradé vertical
uniform vec4 uGrid;   // taille cellule| fondu bas          | luminance grille | épaisseur trait
uniform vec4 uInk;    // r             | g                  | b                | tone map
uniform vec4 uPaper;  // r             | g                  | b                | alpha de sortie

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

out vec4 fragColor;
void main() {

  vec2 uv = vUV.xy - 0.5;
  uv.x *= u_aspect;

  uv *= uFrame.x;          // zoom
  uv += uFrame.zw;         // pan

  float scale = uFrame.y;  // échelle de la grille

  vec2 id = floor(uv * scale);
  uv = fract(uv * scale) - 0.5;
  vec2 guv = uv;

  // Borne de boucle dynamique : bridée pour qu'un réglage à 0 ou à 10000
  // ne parte pas en vrille (d resterait à 1000, ou le GPU calerait).
  float n = clamp(uField.x, 1.0, 1024.0);

  float r = uField.y + sin(uv.x
                           - u_time * uMotion.x
                           + (id.x + id.y) * PHI * 10.0 * uCell.z) * uField.w;

  float d = 1000.0;
  uv *= rot(u_time * uMotion.y
            + length(uv * uMotion.w)
            + id.y * uCell.x
            + id.x * uCell.y);

  // On pense les points comme un bruit de Voronoï : d = distance au plus proche.
  // ⚠️ C'est LE coût du shader — n itérations par pixel.
  for(float i = 0.0; i < n; i++) {
    vec2 pos = cos(i * uField.z + vec2(0, HPI)) * sqrt(i / n) * r;
    d = min(d, distance(pos, uv));
  }

  float dg = d * uWave.x;
  vec3 p = vec3((uv - dg) * uWave.y,
                dg
                - u_time * uMotion.z
                + (-id.x * PHI + id.y * sin(id.x + id.y * uCell.w)) * uCell.z);
  float g = dot(sin(p), cos(p.yzx)) * 0.5 + 0.5;

  g *= vUV.y * uWave.w + (1.0 - uWave.w);   // dégradé vertical
  g = uWave.z / max(abs(g), 1e-4);          // halo (garde-fou contre la div. par 0)

  float gs   = uGrid.x;
  float grid = max(abs(guv.x) - gs, abs(guv.y) - gs);
  float w    = fwidth(grid);
  grid = smoothstep(0.0, w, grid + w * uGrid.w);

  g = mix(g, uGrid.z, grid * smoothstep(0.0, uGrid.y, vUV.y));

  vec4 color = mix(vec4(uPaper.rgb, 1.0), vec4(uInk.rgb, 1.0), g);

  // tanh comme tone-mapping, également repris de xor dev
  color.rgb = tanh(color.rgb * uInk.w);
  color.a   = uPaper.w;
  fragColor = color;
}
