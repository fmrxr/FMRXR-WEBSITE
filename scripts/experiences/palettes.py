"""Palettes 2028 des shaders Labs : une palette autour de chaque couleur clé.

    python scripts/experiences/palettes.py <dossier des images coloro>

Sources (coloro.com/key-colors, relevé du 09/10/2026) :
  - les 5 couleurs clés S/S 28 de WGSN × Coloro, valeur écran lue sur leur
    échantillon officiel (images/swatches/ss28/*.png) ;
  - l'image de campagne de chaque couleur (images/keycolors/*.png), que WGSN
    traite en camaïeu de la couleur.

Méthode (bonnes pratiques de construction de palette) :
  1. Tons : échelle de clarté perceptuelle en OKLCH. On garde les pixels de
     l'image de campagne dont la teinte est proche de celle de la couleur clé,
     on les classe par clarté OKLCH, et chaque palier est la médiane des
     pixels réels de sa tranche. Aucun ton n'est calculé : ce sont des pixels
     de l'image officielle.
  2. Accent (les 10 % de la règle 60-30-10) : parmi les quatre autres couleurs
     clés officielles, celle dont la teinte OKLCH est la plus proche du
     complémentaire (base + 180°).
Sortie : public/experiences/labs/palettes-2028.json
"""
import json, math, os, sys
from PIL import Image

# nom : (saison, code Coloro, échantillon, image de campagne, recadrage en
# fractions de largeur ou None). La bannière A/H 27-28 met les cinq couleurs
# côte à côte en bandes verticales, dans l'ordre ci-dessous ; chaque bande est
# recadrée avec une marge pour ne pas mordre sur la voisine.
KEYS = {
    "Radiant Earth": ("S/S 28", "017-42-31", "sw_Radiant_Earth.png", "kc_Radiant_Earth.png", None),
    "Serene Green": ("S/S 28", "076-86-07", "sw_Serene_Green.png", "kc_Serene_Green.png", None),
    "Positively Yellow": ("S/S 28", "043-85-34", "sw_Positively_Yellow.png", "kc_Positively_Yellow.png", None),
    "Flourish Pink": ("S/S 28", "012-65-24", "sw_Flourish_Pink.png", "kc_Flourish_Pink.png", None),
    "Offline Blue": ("S/S 28", "123-52-27", "sw_Offline_Blue.png", "kc_Offline_Blue.png", None),
    "Luminous Blue": ("A/W 27/28", "125-28-38", "aw_LuminousBlue.png", "banner_aw.png", (0.01, 0.18)),
    "Russet": ("A/W 27/28", "013-30-24", "aw_Russet.png", "banner_aw.png", (0.21, 0.38)),
    "Peaceful Lilac": ("A/W 27/28", "135-78-11", "aw_PeacefulLilac.png", "banner_aw.png", (0.42, 0.58)),
    "Maize": ("A/W 27/28", "036-65-23", "aw_Maize.png", "banner_aw.png", (0.62, 0.79)),
    "Deep Green": ("A/W 27/28", "082-30-14", "aw_DeepGreen.png", "banner_aw.png", (0.82, 0.99)),
}
STOPS = 7          # paliers de clarté, du plus sombre au plus clair
HUE_WINDOW = 30.0  # degrés OKLCH autour de la teinte de la couleur clé
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def srgb_to_oklch(r, g, b):
    def lin(c):
        c /= 255
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = lin(r), lin(g), lin(b)
    l = (0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b) ** (1 / 3)
    m = (0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b) ** (1 / 3)
    s = (0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b) ** (1 / 3)
    L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s
    A = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s
    B = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s
    return L, math.hypot(A, B), math.degrees(math.atan2(B, A)) % 360


def hue_dist(a, b):
    d = abs(a - b) % 360
    return min(d, 360 - d)


def dominant(path):
    im = Image.open(path).convert("RGBA")
    counts = {}
    for p in im.getdata():
        if p[3] == 255:
            counts[p[:3]] = counts.get(p[:3], 0) + 1
    return max(counts, key=counts.get)


def tonal_ramp(path, hue, crop=None):
    im = Image.open(path).convert("RGB")
    if crop:
        w, h = im.size
        im = im.crop((int(w * crop[0]), 0, int(w * crop[1]), h))
    im.thumbnail((400, 400))
    px = []
    for rgb in im.getdata():
        L, C, H = srgb_to_oklch(*rgb)
        # les gris quasi neutres n'ont pas de teinte fiable : on les garde
        # seulement s'ils sont dans l'image, sans filtre de teinte (C < 0.02)
        if C < 0.02 or hue_dist(H, hue) <= HUE_WINDOW:
            px.append((L, rgb))
    px.sort()
    n = len(px)
    ramp = []
    for i in range(STOPS):
        chunk = px[int(n * i / STOPS): max(int(n * (i + 1) / STOPS), int(n * i / STOPS) + 1)]
        mid = chunk[len(chunk) // 2][1]
        ramp.append("#%02X%02X%02X" % mid)
    return ramp, n


def main(src):
    out = {"source": "coloro.com/key-colors, WGSN x Coloro Key Colors S/S 28 and A/W 27/28, read 2026-10-09", "palettes": {}}
    info = {}
    for name, (season, code, sw, kc, crop) in KEYS.items():
        rgb = dominant(os.path.join(src, sw))
        info[name] = (season, code, rgb, srgb_to_oklch(*rgb))
    for name, (season, code, rgb, (L, C, H)) in info.items():
        kc, crop = KEYS[name][3], KEYS[name][4]
        ramp, n = tonal_ramp(os.path.join(src, kc), H, crop)
        comp = (H + 180) % 360
        # accent : dans la même saison, la couleur clé la plus proche du complémentaire
        mates = [o for o in info if o != name and info[o][0] == season]
        accent = min(mates, key=lambda o: hue_dist(info[o][3][2], comp))
        out["palettes"][name] = {
            "season": season, "coloro": code, "hex": "#%02X%02X%02X" % rgb,
            "oklch": [round(L, 4), round(C, 4), round(H, 2)],
            "ramp": ramp, "ramp_pixels": n,
            "accent": {"name": accent, "coloro": info[accent][1], "hex": "#%02X%02X%02X" % info[accent][2],
                       "hue_from_complement": round(hue_dist(info[accent][3][2], comp), 1)},
        }
        print(f"{name:18} {season:9} {out['palettes'][name]['hex']} H{H:5.0f} | {' '.join(ramp)} | accent {accent}")
    dst = os.path.join(ROOT, "public", "experiences", "labs", "palettes-2028.json")
    json.dump(out, open(dst, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    print("->", dst)


if __name__ == "__main__":
    main(sys.argv[1])
