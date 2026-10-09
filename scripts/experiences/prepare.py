"""Prépare public/experiences/ depuis les sources sur le disque d'Haïfa.

    python scripts/experiences/prepare.py [radiance access spicy terre labs]

Sans argument : tout. Chaque étape efface puis recrée son dossier cible, donc
le script se relance sans risque. Chaque remplacement est vérifié : un motif
introuvable arrête tout plutôt que de publier un fichier à moitié corrigé.
"""
import os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "public", "experiences")
PRO = os.path.dirname(ROOT)  # E:\FMRXR\CLAUDE PRO
SRC = {
    "radiance": r"E:\FB ART&EVENT\radiance_cascades_mediapipe (2)\radiance_cascades_final.html",
    "access": os.path.join(PRO, "Clients", "Morninglory Paris", "Contenu & Brief",
                           "Cyberpunk Halloween 42 Marches", "Jeu", "game_shotgun", "public"),
    "spicy": os.path.join(PRO, "spicy-airport"),
    "terre": os.path.join(PRO, "Concepts", "LeSonDeLaTerre_3D", "index.html"),
    "shaders": os.path.join(PRO, "EFFET MÈRE", "Shaders"),
}
# MediaPipe depuis le CDN, version fixée, au lieu des 33 Mo du dossier local.
MP = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35"


def fresh(name):
    d = os.path.join(OUT, name)
    shutil.rmtree(d, ignore_errors=True)
    os.makedirs(d)
    return d


def sub(text, old, new, regex=False):
    n = len(re.findall(old, text)) if regex else text.count(old)
    if not n:
        sys.exit(f"motif introuvable : {old[:90]}")
    return re.sub(old, new, text) if regex else text.replace(old, new)


def read(p):
    return open(p, encoding="utf-8").read()


def write(p, s):
    open(p, "w", encoding="utf-8", newline="\n").write(s)


def radiance():
    d = fresh("radiance")
    s = read(SRC["radiance"])
    s = sub(s, "import('./mediapipe/vision_bundle.mjs')", f"import('{MP}/vision_bundle.mjs')")
    s = sub(s, "'./mediapipe/wasm'", f"'{MP}/wasm'")
    if "./mediapipe/" in s:
        sys.exit("chemin local MediaPipe restant dans RADIANCE")
    write(os.path.join(d, "index.html"), s)
    shutil.copy(os.path.join(os.path.dirname(SRC["radiance"]), "Group_16.png"), d)  # logo de l'en-tête


LEAKS = re.compile(r"promo:|CYBER10|PIXEL20|SOFI30|Q1lC|UElY|U09G|shotgun\.live|cyberhalloween\.netlify|atob\(", re.I)


def access():
    d = os.path.join(OUT, "access-protocol")
    shutil.rmtree(d, ignore_errors=True)
    shutil.copytree(SRC["access"], d)

    g = os.path.join(d, "game.js")
    s = read(g)
    # Les codes promo sont retirés du fichier, pas masqués : ils seraient lisibles dans le source.
    s = sub(s, r",\s*promo:\s*'[A-Za-z0-9+/=]+'", "", regex=True)
    s = sub(s, "SHOTGUN: 'https://shotgun.live/events/cyberpunk-halloween-2026?utm_source=game'",
            "SHOTGUN: 'https://fmrxr.com/experiential'")
    s = sub(s, "STORAGE: 'ch42_shotgun_v1'", "STORAGE: 'fmrxr_demo_access_protocol'")
    s = sub(s, "code: atob(LEVEL.promo)", "code: 'DEMO'")
    s = sub(s, "`<div class=\"promo\"><span>PROMO CODE</span><b>${t.code}</b><span>−${t.discount}% ON SHOTGUN</span></div>`",
            "`<div class=\"promo\"><span>ACCESS GRANTED</span><b>PORTFOLIO DEMO</b><span>NO TICKET IS ISSUED</span></div>`")
    write(g, s)

    h = os.path.join(d, "index.html")
    s = read(h)
    s = sub(s, r'\s*<meta (?:property|name)="(?:og|twitter):[^>]*>', "", regex=True)
    s = sub(s, "https://shotgun.live/events/cyberpunk-halloween-2026?utm_source=game", "https://fmrxr.com/experiential")
    s = sub(s, ">SHOTGUN</a>", ">FMRXR//</a>")
    s = sub(s, "ENTER THIS PROMO CODE WHEN YOU BUY YOUR TICKET ON SHOTGUN", "THIS IS THE FMRXR PORTFOLIO DEMO OF THE GAME")
    s = sub(s, "GET MY TICKET ON SHOTGUN", "MORE FMRXR EXPERIENCES")
    s = sub(s, 'id="btnCopy" class="btn ghost sm" type="button"', 'id="btnCopy" class="btn ghost sm" type="button" hidden')
    s = sub(s, r'<meta name="description" content="[^"]*">',
            '<meta name="description" content="ACCESS PROTOCOL, the Cyberpunk Halloween promo game, portfolio demo by FMRXR Studio.">', regex=True)
    s = sub(s, "ON YOUR TICKET</p>", "ON YOUR TICKET<br>PORTFOLIO DEMO · NO TICKET IS ISSUED</p>")
    write(h, s)

    for root, _, files in os.walk(d):
        for f in files:
            if f.endswith((".js", ".html", ".css", ".json", ".txt")):
                m = LEAKS.search(read(os.path.join(root, f)) if f else "")
                if m:
                    sys.exit(f"fuite dans {f} : {m.group(0)}")


def spicy():
    # On copie le dernier build tel quel : recompiler embarquerait le travail en
    # cours du dépôt spicy-airport. Pour un nouveau build : npm run build là-bas
    # (vite.config.ts est déjà en base relative), puis relancer cette étape.
    src = os.path.join(SRC["spicy"], "dist")
    if re.search(r'(src|href)="/(assets|audio|brand|models)', read(os.path.join(src, "index.html"))):
        sys.exit("le build SPICY AIRPORT a des chemins absolus : il faut base './' dans vite.config.ts")
    d = os.path.join(OUT, "spicy-airport")
    shutil.rmtree(d, ignore_errors=True)
    shutil.copytree(src, d)
    # Seuls les modèles que le code charge partent en ligne. Le build contient
    # aussi des fichiers jamais référencés, dont a320.glb (licence Sketchfab
    # Standard, redistribution interdite) : ils restent sur le disque.
    code = "".join(read(os.path.join(d, "assets", f)) for f in os.listdir(os.path.join(d, "assets")) if f.endswith(".js"))
    used = set(re.findall(r"models/([\w.-]+\.glb)", code))
    if not used:
        sys.exit("aucun modèle référencé trouvé dans le build SPICY AIRPORT")
    for f in os.listdir(os.path.join(d, "models")):
        if f not in used:
            os.remove(os.path.join(d, "models", f))


def terre():
    d = fresh("le-son-de-la-terre")
    shutil.copy(SRC["terre"], os.path.join(d, "index.html"))


LABS = [("phyllotaxis_grid", "phyllotaxis_grid.glsl"), ("tox13_depth_tunnel", "mixer_tox/tox13_depth_tunnel.glsl"),
        ("tox4_bouncing_bars", "mixer_tox/tox4_bouncing_bars.glsl"), ("tox8_lightpos_noise", "mixer_tox/tox8_lightpos_noise.glsl")]


def labs():
    d = fresh("labs")
    shutil.copy(os.path.join(ROOT, "scripts", "experiences", "labs.html"), os.path.join(d, "index.html"))
    for name, rel in LABS:
        shutil.copy(os.path.join(SRC["shaders"], rel), os.path.join(d, name + ".glsl"))


STEPS = {"radiance": radiance, "access": access, "spicy": spicy, "terre": terre, "labs": labs}

if __name__ == "__main__":
    for k in sys.argv[1:] or STEPS:
        STEPS[k]()
        print("ok", k)
