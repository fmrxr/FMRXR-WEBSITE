"""Fiches projet des expériences du catalogue /experiences.

    python scripts/experiences/fiches.py create    # insère, non publiées
    python scripts/experiences/fiches.py publish   # publie (après déploiement du code)

Chaque fiche ne contient que des faits tirés des fichiers sources et de leur
README. Les médias pointent vers fmrxr.com/experiences/ (URL absolues, exigées
par le schéma admin) : publier avant le déploiement afficherait des liens morts.
"""
import json, os, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SITE = "https://fmrxr.com/experiences"


def env():
    out = {}
    for line in open(os.path.join(ROOT, ".env.local"), encoding="utf-8"):
        line = line.strip()
        if "=" in line and not line.startswith("#"):
            k, v = line.split("=", 1)
            out[k] = v.strip().strip('"')
    return out["NEXT_PUBLIC_SUPABASE_URL"], out["SUPABASE_SERVICE_ROLE_KEY"]


def req(method, path, body=None):
    url, key = env()
    r = urllib.request.Request(f"{url}/rest/v1/{path}", method=method,
                               data=json.dumps(body).encode() if body is not None else None,
                               headers={"apikey": key, "Authorization": f"Bearer {key}",
                                        "Content-Type": "application/json", "Prefer": "return=representation"})
    with urllib.request.urlopen(r) as resp:
        return json.loads(resp.read() or "null")


def play(slug, entry, label, caption, credit=None):
    item = {"url": f"{SITE}{entry}", "embed": True, "label": label, "poster": f"{SITE}/_media/{slug}.jpg",
            "alt": caption, "caption": caption}
    if credit:
        item["credit"] = credit
    return item


def loop(slug, caption):
    return {"url": f"{SITE}/_media/{slug}.mp4", "sound": False, "poster": f"{SITE}/_media/{slug}.jpg",
            "alt": caption, "caption": caption}


FICHES = [
    {
        "slug": "radiance", "title": "RADIANCE", "client": "FMRXR Studio", "year": "2026",
        "category": "Interactive web", "location": None,
        "summary": "Your hand becomes a light source. A radiance cascades renderer driven by hand tracking, running live in the browser.",
        "description": (
            "RADIANCE turns a webcam into a light pen. A hand tracked by MediaPipe paints light into the scene, "
            "and a radiance cascades renderer traces how that light spreads, bounces off walls and fades, every frame.\n\n"
            "Light, walls and erasers are drawn by hand or with the mouse. The side panel exposes the renderer itself: "
            "number of cascades, base rays, exposure, colour of the source.\n\n"
            "Hand tracking runs on the visitor's device. Camera frames stay in the browser, nothing is uploaded."
        ),
        "role": ["Creative direction", "Real-time rendering", "Creative coding"],
        "stack": ["WebGL2", "GLSL", "Radiance cascades", "MediaPipe Hand Landmarker"],
        "tags": ["interactive", "hand tracking", "global illumination", "webgl"],
        "industries": [], "services": ["real-time-systems", "interactive-installation", "web"],
        "gallery": [play("radiance", "/radiance/index.html", "Play RADIANCE", "RADIANCE, live. Camera or mouse."),
                    loop("radiance", "Light painted with the mouse, radiance cascades on")],
        "sort_order": 41,
    },
    {
        "slug": "spicy-airport", "title": "SPICY AIRPORT", "client": "SOFI AIRLINES · Spicy Sofi", "year": "2026",
        "category": "Interactive 3D", "location": None,
        "summary": "An interactive digital twin of a turbofan, parked at its gate. Start it, open it, take it apart and walk through it.",
        "description": (
            "A SOFI AIRLINES airframe waits at stand A07 at night, flight SPICY 1. Under its wing, a high-bypass turbofan "
            "can be started, opened, exploded and reassembled, with a guided tour of its four strokes: suck, squeeze, bang, blow.\n\n"
            "It is built as the rehearsal for a physical installation, not as a demo: every control the mouse touches is an "
            "abstract intent that a thrust quadrant or an overhead panel can produce instead.\n\n"
            "Part of the SPICY COCKPIT universe of Spicy Sofi. Palette, typography and the sixteen flight phases come from the brand brief."
        ),
        "role": ["Creative direction", "3D interaction design", "Front-end development"],
        "stack": ["Three.js", "TypeScript", "Vite"],
        "tags": ["interactive 3d", "digital twin", "aviation", "installation rehearsal"],
        "industries": ["music"], "services": ["real-time-systems", "web", "creative-direction"],
        "gallery": [play("spicy-airport", "/spicy-airport/index.html", "Start the engine", "SPICY AIRPORT, live.",
                         "Music: SPICY HOT! by Spicy Sofi, used with permission"),
                    loop("spicy-airport", "Stand A07, engine bay")],
        "sort_order": 42,
    },
    {
        "slug": "le-son-de-la-terre", "title": "LE SON DE LA TERRE", "client": None, "year": "2026",
        "category": "3D viewer", "location": "Paris, on the Seine",
        "summary": "A real-time viewer for Le Son de la Terre, a barge on the Seine with Notre-Dame behind it, the DJ booth rising from the deck.",
        "description": (
            "The barge, its quay, the Seine and Notre-Dame, rendered live from a single animated scene: 2,326 objects, "
            "547,763 triangles, a fifteen-second camera one-shot and a DJ booth that rises from the deck.\n\n"
            "The viewer plays the file's own camera or three drawn paths, switches to a free orbit while the animation runs, "
            "and exposes sky, exposure, haze and shadows. The scene was also rendered frame by frame to video from the same page."
        ),
        "role": ["3D direction", "Real-time viewer", "Render pipeline"],
        "stack": ["Three.js", "glTF"],
        "tags": ["3d", "architecture", "music venue", "real-time"],
        "industries": [], "services": ["real-time-systems", "web"],
        "gallery": [play("le-son-de-la-terre", "/le-son-de-la-terre/index.html", "Open the viewer", "Le Son de la Terre, live viewer."),
                    loop("le-son-de-la-terre", "The barge at dusk")],
        "sort_order": 43,
    },
    {
        "slug": "fmrxr-labs", "title": "FMRXR LABS · LIVE SHADERS", "client": "FMRXR Studio", "year": "2026",
        "category": "R&D", "location": None,
        "summary": "Seven shaders from our TouchDesigner show files, ported to WebGL and recoloured around the 2028 key colours.",
        "description": (
            "Shaders that ran our live shows, now running in the browser. Each one is loaded from its original file; "
            "only the TouchDesigner names are translated for WebGL.\n\n"
            "Storm tunnel: a GLSL material that tears a rectangular tunnel with a five-octave storm field, on a million-vertex sphere, "
            "with the original camera. Flooded: a raymarched sea after the Shadertoy shader \"flooded\" by zguerrero, adapted in TouchDesigner. "
            "Stormy torus: a TouchDesigner adaptation of a Shadertoy shader. Depth tunnel, Phyllotaxis, Bouncing bars and Light field: "
            "shaders from the Effet Mère live mixer.\n\n"
            "Colour: one palette around each WGSN × Coloro key colour for 2028, built from the tones of the official campaign images, "
            "with an accent taken from the complementary key colour of the same season. Every palette can be switched in the parameters panel."
        ),
        "role": ["Creative coding", "Real-time systems", "Colour direction"],
        "stack": ["WebGL2", "GLSL", "TouchDesigner"],
        "tags": ["shaders", "generative", "live visuals", "colour 2028"],
        "industries": [], "services": ["generative-art", "real-time-systems"],
        "gallery": [
            play("lab-storm-tunnel", "/labs/storm.html", "Play Storm tunnel", "Storm tunnel · Radiant Earth"),
            play("lab-flooded", "/labs/flooded.html", "Play Flooded", "Flooded · Luminous Blue",
                 "After \"flooded\" by zguerrero (Shadertoy)"),
            play("lab-stormy-torus", "/labs/torus.html", "Play Stormy torus", "Stormy torus · Russet"),
            play("lab-depth-tunnel", "/labs/index.html?s=tox13_depth_tunnel", "Play Depth tunnel", "Depth tunnel · Offline Blue"),
            play("lab-phyllotaxis", "/labs/index.html?s=phyllotaxis_grid", "Play Phyllotaxis", "Phyllotaxis · Serene Green"),
            play("lab-bouncing-bars", "/labs/index.html?s=tox4_bouncing_bars", "Play Bouncing bars", "Bouncing bars · Positively Yellow"),
            play("lab-lightpos-noise", "/labs/index.html?s=tox8_lightpos_noise", "Play Light field", "Light field · Flourish Pink"),
        ],
        "sort_order": 44,
    },
]


def main(action):
    slugs = ",".join(f["slug"] for f in FICHES)
    if action == "create":
        existing = {r["slug"] for r in req("GET", f"projects?select=slug&slug=in.({slugs})")}
        for f in FICHES:
            if f["slug"] in existing:
                print("existe déjà, inchangée :", f["slug"])
                continue
            row = req("POST", "projects", {**f, "metrics": [], "cover_url": f["gallery"][0]["poster"], "published": False})
            print("créée (non publiée) :", row[0]["slug"])
    elif action == "publish":
        for f in FICHES:
            row = req("PATCH", f"projects?slug=eq.{f['slug']}", {"published": True})
            print("publiée :", row[0]["slug"] if row else f"introuvable {f['slug']}")


if __name__ == "__main__":
    main(sys.argv[1])
