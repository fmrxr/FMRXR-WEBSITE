// =============================================================================
// TOX8 / glsl2 — bruit de positions de lumieres  ·  GLSL TOP (day12.tox)
// Version parametree — EFFET MERE / FMRXR
//
// Genere une bande de bruit value 3 canaux (xyz) qui sert de table de
// positions aux 32 lumieres de glsl1. Une colonne de texture = une lumiere.
//
// ---- VALEURS ----------------------------------------------------------
//             |  x          y          z          w
//  uNoise     |  30.0       0.6        0.2        2.0
// =============================================================================

uniform float u_time;

//                   x             y             z            w
uniform vec4 uNoise; // echelle X  | defilement  | vitesse Y  | gain

float hash(vec2 p)  // replace this by something better
{
	p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
	return -1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));
}

float noise(in vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
	return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
	           mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

vec3 noise3(vec2 p) {
	return vec3(noise(p), noise(p + 12.321), noise(p - 324.432));
}

out vec4 fragColor;

void main() {
	vec2 l = vec2(vUV.x * uNoise.x - u_time * uNoise.y, u_time * uNoise.z);
	fragColor = vec4(noise3(l) * uNoise.w - 1.0, 1);
}
