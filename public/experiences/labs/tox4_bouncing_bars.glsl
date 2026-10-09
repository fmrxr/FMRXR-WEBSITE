// =============================================================================
// TOX4 — Bouncing bars  ·  GLSL TOP (SimpleMixer, day2.tox)
// Version parametree — EFFET MERE / FMRXR
//
// Cinq couches de barres rebondissantes, phase decalee par un hash sur l'axe X.
// Le delta de la fonction de rebond sert de squash/stretch et fixe la hauteur
// des rectangles. Dessin en logique SDF.
//
// Les nombres magiques sont sortis dans 7 uniforms vec4 (page Vectors).
// Aux valeurs par defaut, le rendu est identique a l'original.
//
// ---- VALEURS ----------------------------------------------------------
//             |  x          y          z          w
//  uFrame     |  0.9        0.6        32.0       5.0
//  uMotion    |  1.0        0.65       3.123      0.0
//  uLayer     |  1.8        1.25       1.01       1.04
//  uShape     |  0.5        10.5       0.7        0.01
//  uGrade     |  0.1        0.05       0.0        0.0
//  uCol1      |  0.8118     0.7882     0.7765     1.0
//  uCol2      |  0.11       0.15       0.36       1.0
// =============================================================================

uniform float u_time, u_aspect;

//                   x              y                z                w
uniform vec4 uFrame;  // echelle Y    | decalage Y     | sections       | nb de couches
uniform vec4 uMotion; // vitesse      | defilement     | decal. couche  | (libre)
uniform vec4 uLayer;  // freq X       | croissance X   | freq Y         | croissance Y
uniform vec4 uShape;  // decroissance | squash         | seuil          | epaisseur
uniform vec4 uGrade;  // expo degrade | grain          | (libre)        | (libre)
uniform vec4 uCol1;   // couleur claire, rgb
uniform vec4 uCol2;   // couleur sombre, rgb

#define PI 3.14159

/*
mpottinger's murmur hash
https://gist.github.com/mpottinger/54d99732d4831d8137d178b4a6007d1a
*/
uint murmurHash12(uvec2 src) {
	const uint M = 0x5bd1e995u;
	uint h = 1190494759u;
	src *= M;
	src ^= src >> 24u;
	src *= M;
	h *= M;
	h ^= src.x;
	h *= M;
	h ^= src.y;
	h ^= h >> 13u;
	h *= M;
	h ^= h >> 15u;
	return h;
}

// 1 output, 2 inputs
float hash12(vec2 src) {
	uint h = murmurHash12(floatBitsToUint(src));
	return uintBitsToFloat(h & 0x007fffffu | 0x3f800000u) - 1.0;
}

//https://github.com/glslify/glsl-easings bounceOut function
float bounce(float t) {
	t = smoothstep(0.0, 1.0, t);
	const float a = 4.0 / 11.0;
	const float b = 8.0 / 11.0;
	const float c = 9.0 / 10.0;

	const float ca = 4356.0 / 361.0;
	const float cb = 35442.0 / 1805.0;
	const float cc = 16061.0 / 1805.0;

	float t2 = t * t;

	float o = t < a ? 7.5625 * t2 : t < b ? 9.075 * t2 - 9.9 * t + 3.4 : t < c ? ca * t2 - cb * t + cc : 10.8 * t * t - 20.52 * t + 10.72;
	return o;
}

out vec4 fragColor;
void main() {
	float sections = uFrame.z;

	vec2 uv = vUV.xy - 0.5;
	uv.x *= u_aspect;
	uv.y *= uFrame.x;
	uv.y -= uFrame.y;
	float outM = 0.0;

	float time = u_time * uMotion.x;

	float a = 1.0;
	float freq = uLayer.x;
	float freq2 = uLayer.z;

	// Borne bridee : un nombre de couches a 0 ou demesure casserait le rendu
	// ou ferait caler le GPU.
	int couches = int(clamp(uFrame.w, 1.0, 16.0));

	for(int i = 0; i < couches; i++) {
		float trans = ((u_time / float(i + 1)) * uMotion.y) - float(i) * uMotion.z;
		float m = uv.y;
		float xlu = uv.x - trans;
		float id = floor(xlu * sections + hash12(vec2(floor((xlu + 123.0) * sections / 2.0))));
		float h = hash12(vec2(id + float(i), id));
		float t = fract(time + h);
		float delta = bounce(fract(t - 0.001));
		t = bounce(t);
		delta = abs(delta - t) * uShape.y;

		m += t;

		m = smoothstep(delta * 1.0, 0.0, abs(m + delta) - (delta + uShape.w));
		m = delta > uShape.z ? 0.0 : m;
		m *= a;
		a *= uShape.x;
		uv.x *= freq;

		uv.y = (uv.y + 1.0) * freq2 - 1.0;
		freq *= uLayer.y;
		freq2 *= uLayer.w;

		outM = max(m, outM);
	}

	float chash = hash12(vUV.xy) * uGrade.y + 1.0;
	outM *= smoothstep(0.0, 1.0, vUV.y);
	vec4 color = mix(vec4(uCol2.rgb, 1.0), vec4(uCol1.rgb, 1.0),
	                 outM + (chash - pow(vUV.y, uGrade.x)));
	color.rgb = tanh(color.rgb);

	fragColor = color;
}
