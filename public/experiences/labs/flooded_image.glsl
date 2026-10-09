// =============================================================
// FLOODED - Image (Post-Process / Lens Flare)
// TouchDesigner GLSL TOP - Pixel Shader
// Converti depuis Shadertoy "flooded" par zguerrero
//
// SETUP TouchDesigner :
//   1. Crée un second GLSL Multi TOP (nommé "image")
//   2. Connecte la sortie de "bufferA" en Input 0 (= iChannel0)
//   3. Colle ce code dans le Pixel Shader
//   4. Mode : Pixel Shader
//   5. Output Type : 2D Texture (RGBA8 ou RGBA16 suffisent)
//
// CHAIN : [Noise0] [Noise1] [Noise2]
//              ↓        ↓        ↓
//         [bufferA GLSL] ←───────┘
//              ↓
//         [image GLSL]  ← sortie finale
// =============================================================

// iChannel0 = sortie de bufferA (RGB = couleur, A = lensFlare mask)
#define iChannel0 sTD2DInputs[0]

out vec4 fragColor;

void main()
{
    vec2 uv = vUV.st;
    vec2 res = uTD2DInfos[0].res.zw;

    // Lecture de la texture bufferA
    vec4 tex = texture(iChannel0, uv);

    // Lens flare : échantillonnage multi-échelle du canal alpha (lensFlare)
    vec4 lf;
    lf.x = texture(iChannel0, ((1.0-uv) - vec2(0.5))*0.4  + vec2(0.5)).a;
    lf.y = texture(iChannel0, ((1.0-uv) - vec2(0.5))*1.0  + vec2(0.5)).a;
    lf.z = texture(iChannel0, ((1.0-uv) - vec2(0.5))*1.75 + vec2(0.5)).a;
    lf.w = texture(iChannel0, ((1.0-uv) - vec2(0.5))*10.0 + vec2(0.5)).a;

    lf = smoothstep(vec4(0.0, 0.75, 0.1, 0.0),
                    vec4(0.25, 0.95, 0.4, 0.5), lf);

    // Vignette douce sur les bords
    float v = length(uv - 0.5);

    // Tone-mapping léger + vignette
    vec3 col = mix(tex.rgb, tex.rgb * tex.rgb * tex.rgb, v);

    // Couleurs du lens flare (teintes chaudes/froides)
    vec3 lff = vec3(lf.x) * vec3(0.8, 0.7, 1.0)*0.125
             + vec3(lf.y) * vec3(1.0, 0.5, 0.6)*0.1
             + vec3(lf.z) * vec3(0.9, 0.6, 0.8)*0.2
             + vec3(lf.w) * vec3(1.0, 0.8, 0.5)*0.1;

    fragColor = vec4(col + lff, 1.0);
}
