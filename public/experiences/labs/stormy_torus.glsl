// Stormy Torus
// TouchDesigner GLSL TOP (camera-enabled)

out vec4 fragColor;

uniform float uTime;
uniform vec2 uRes;

/* =========================
   Camera Uniforms
   ========================= */

uniform vec3 uCamPos;
uniform vec3 uCamTarget;
uniform vec3 uCamUp;

uniform float uFov;
uniform vec2 uMouse;
uniform float uZoom;

/* =========================
   Camera Ray Builder
   ========================= */

vec3 getCameraRay(vec2 uv)
{
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uRes.x / uRes.y;

    vec3 forward = normalize(uCamTarget - uCamPos);
    vec3 right   = normalize(cross(forward, uCamUp));
    vec3 up      = cross(right, forward);

    float fov = radians(uFov);

    vec3 ray = normalize(
        forward +
        p.x * tan(fov * 0.5) * right +
        p.y * tan(fov * 0.5) * up
    );

    return ray;
}

void main()
{
    vec2 uv = gl_FragCoord.xy / uRes.xy;

    vec3 rayDir = getCameraRay(uv);
    vec3 camPos = uCamPos;

    vec4 O = vec4(0.0);

    float i = 0.0;
    float d = 0.0;
    float w = 0.0;
    float t = uTime;
    float m = 1.0;

    vec3 p = vec3(0.0);
    vec3 k = vec3(0.0);
    vec3 Z = vec3(0.0);

    /* =========================
       MAIN RAYMARCH LOOP
       (your original logic kept)
       ========================= */

    for(
        ;
        i++ < 100.0 && abs(p.x) < 6.0;

        d += w = .01 + .07 * abs(
            max(
                mix(
                    sin(length(ceil(4.0*k.z) + k)),
                    sin(length(p) - 1.0),
                    smoothstep(5.0,5.5,p.y)
                ),
                sqrt(dot(k,k) + 16.0 - 8.0*length(k.xy)) - 1.5
            ) - i/150.0
        ),

        O += max(
            1.3/w * sin(vec4(1,2,3,1) + i*.5),
            -length(k*k)
        )
    )

    for(
        /* CAMERA REPLACEMENT HERE */
        k = camPos + rayDir * d,

        k.xz *= mat2(
            cos(t * 0.5 + 0.785), -sin(t * 0.5 + 0.785),
            sin(t * 0.5 + 0.785),  cos(t * 0.5 + 0.785)
        ),

        k.y < -6.3
            ? (k.y = -k.y - 9.0, m = .5)
            : m,

        p = k * .5,
        w = .01;

        w < .2;

        w += w
    )

    p.yz +=
        cos(p.xy * .01)
        - abs(
            dot(
                sin(
                    .02*p.z +
                    .03*p.y +
                    t + t +
                    .3*p/w
                ),
                w + Z
            )
        );

    fragColor = tanh(O * O / 1e6) * m;
}