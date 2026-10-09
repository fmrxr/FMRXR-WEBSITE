// =============================================================================
// TOX13 — Depth tunnel  ·  GLSL TOP (SimpleMixer, day29.tox)
// Version parametree — EFFET MERE / FMRXR
//
// 18 couches de bruit gyroide empilees en profondeur, chacune tournee et
// mise a l'echelle selon son avancement, composees en max(). Donne un tunnel
// de filaments qui defile vers le spectateur.
//
// NOTE : l'entree u_grid de la page Vectors est MORTE — le shader ne la
// declare pas. Laissee en place, sans effet.
//
// ---- VALEURS ----------------------------------------------------------
//             |  x          y          z          w
//  uFrame     |  3.6        2.0        0.15       18.0
//  uNoise     |  0.35       0.1        0.25       0.075
//  uNoise2    |  3.0        0.05       4.0        0.05
//  uDepth     |  0.1        5.5        0.1        0.01
//  uScroll    |  0.5        1.23       12.32      1.0
// =============================================================================

uniform float u_time, u_aspect;

//                    x              y               z              w
uniform vec4 uFrame;  // zoom        | echelle       | vignette     | nb de couches
uniform vec4 uNoise;  // echelle     | vitesse Z     | warp         | seuil trait
uniform vec4 uNoise2; // harmonique1 | gain 1        | harmonique2  | gain 2
uniform vec4 uDepth;  // v. couches  | profondeur    | fondu bord   | epaisseur
uniform vec4 uScroll; // defilement Y| decal. couche | decal. Z     | v. Z globale

mat2 rot(float a) {
	a *= 3.14159 * 2.0;
	float s = sin(a), c = cos(a);
	return mat2(c, -s, s, c);
}

float noise(vec3 p) {
	p *= uNoise.x;
	p.z -= u_time * uNoise.y;

	p.x += sin((p.y + p.y) * uNoise.z - p.z * uNoise.z);
	p.y += cos((p.x + p.y) * uNoise.z - p.z * uNoise.z);
	float g = dot(sin(p.xyz), cos(p.yzx)) * 0.5;
	g += dot(sin(p.xyz * uNoise2.x + 8.0), cos(p.yzx * uNoise2.x + 3.0)) * uNoise2.y;
	g += dot(sin(p.xyz * uNoise2.z), cos(p.yzx * uNoise2.z)) * uNoise2.w * sin(length(p.xy) - u_time);
	// return exp(-abs(g) * 5.0) * 0.5;
	return smoothstep(uNoise.w, 0.0, abs(g) - uDepth.w);
}

float over(vec2 fg, vec2 bg) {
	return fg.x + bg.x * (1.0 - fg.y);
}

float depth_fbm(vec3 p) {
	// Borne bridee : un nombre de couches trop haut ferait ramer, trop bas
	// casserait la boucle (pas d'increment nul).
	float LAYERS = clamp(uFrame.w, 1.0, 64.0);
	float n = 0.0;
	vec2 uv = p.xy;
	float l = max(1.0 - length(vUV.xy - 0.5), 0.0);
	float tt = p.z;
	for(float i = 0.0; i < 1.0; i += 1.0 / LAYERS) {
		float d = fract(i + u_time * uDepth.x);
		float depth = mix(uDepth.y, 0.0, d * d * d);
		float fade = d * smoothstep(1.0, 1.0 - l * l * uDepth.z, d);
		vec3 new_p = vec3(uv * rot(d * d * d) * depth + i * uScroll.y
		                  - vec2(0.0, u_time * uScroll.x),
		                  tt + i * uScroll.z - u_time * uScroll.w);
		float new_n = noise(new_p) * fade * 1.0;
		n = max(new_n, n);
	}

	return n;
}

out vec4 fragColor;
void main() {
	vec2 uv = vUV.xy * 2.0 - 1.0;
	uv *= uFrame.x;
	uv.x *= u_aspect;
	vec3 p = vec3(uv * uFrame.y, 0.0);
	float ddp = (length(p));
	//p *= 1.0 - ddp * 0.4;
	vec3 trans = vec3(0, 0, 0);

	float n = depth_fbm(p - trans);

	n *= 1.0 - max(length(vec3(uv, n) * uFrame.z), 0.0);

	vec4 color = vec4(vec3(n), 1);
	fragColor = (color);
}
