"""Amorce le journal de bord de chaque service (colonne services.log, migration 0025).

Chaque entrée vient d'une source datée : historique git du site ou archives
de CLAUDE.md. Le script n'écrase un journal que s'il est vide, pour ne jamais
effacer ce que Haïfa a saisi dans l'admin. --force pour réécrire quand même.

    python scripts/seed_service_log.py [--dry-run] [--force]
"""
import json, sys, urllib.request
from pathlib import Path

ENV = dict(
    l.split("=", 1) for l in Path(__file__).resolve().parent.parent.joinpath(".env.local").read_text(encoding="utf-8").splitlines()
    if "=" in l and not l.lstrip().startswith("#")
)
URL = ENV["NEXT_PUBLIC_SUPABASE_URL"].strip().strip('"') + "/rest/v1/services"
KEY = ENV["SUPABASE_SERVICE_ROLE_KEY"].strip().strip('"')
H = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}

LOG = {
    "creative-direction": [
        "2026-11 · SOFI AIRLINES live setup covered by Magnetic Magazine.",
        "2026-10-31 · ACCESS PROTOCOL: a cyberpunk promo game for the Halloween night at 42 Marches, Paris.",
        "2026-10-08 · ClassZ manifesto: a 90 second film written, designed and cut in-house.",
        "2026-07-25 · Les 100 Violons: 150 violinists in a circle of light at the Musée national de Carthage.",
    ],
    "xr": [
        "2026-10-24 · SPICY AIRPORT live: tower, DJ booth and club room connected over fmrxr.com.",
        "2026-10-18 · SPICY AIRPORT: a club cabin and a 757 cockpit in real-time 3D, flying over Paris.",
        "2026-05-22 · SPECTRUM: an XR room at Studio B3, Tunis.",
    ],
    "projection-mapping": [
        "2026-11-12 · Projection mapping now bookable from 2,000 TND.",
        "2026-04 · Mapping Oudhna: eight chronological chapters on the Roman site, from prehistory to the architectural climax.",
    ],
    "generative-art": [
        "2026-10-09 · Seven live shaders from the Effet Mère mixer, ported from TouchDesigner to WebGL and playable on the site.",
        "2026-10-08 · The studio motion style: eleven 15 second loops generated in light, one per service.",
        "2026-07-25 · Les 100 Violons: one shader driving 16 LED surfaces live.",
    ],
    "interactive-installation": [
        "2026-11-12 · Le Jardin des Lucioles: final version, reviewed end to end.",
        "2026-10-31 · Le Jardin des Lucioles: creatures in five layouts and a deeper swarm.",
        "2026-10-29 · Le Jardin des Lucioles playable in the browser, hand tracking by FMRXR technologies.",
        "2026-10-16 · STOMP: a floor game for interactive LED floors, 1 to 4 players.",
    ],
    "real-time-systems": [
        "2026-10-31 · SPICY AIRPORT: a light feed for TouchDesigner on a laptop GPU.",
        "2026-10-27 · SPICY AIRPORT: a four-camera grid and a beat clock sent to TouchDesigner.",
        "2026-10-25 · Web pages served as live video feeds for TouchDesigner.",
        "2026-07-25 · Les 100 Violons: one GLSL shader across 8 LED pillars and 16 surfaces.",
    ],
    "brand-activation": [
        "2026-11-10 · THE WALL: your event's own social network, live on the giant screen.",
        "2026-11-10 · The Wall: automatic moderation in French, English, Derja and Arabic.",
        "2026-11-10 · The Wall: the recap reel edits itself after the show, rendered in the browser.",
        "2026-10-15 · AI Photobooth launched: 14 styles, runs on any existing booth.",
    ],
    "vjing": [
        "2026-11 · SOFI AIRLINES live setup covered by Magnetic Magazine.",
        "2026-10-24 · SPICY AIRPORT live: the 3D show follows Spicy Sofi's sets in real time.",
        "2026-08-18 · VIGILANCE ZERO × CALYPSO: live visuals for the night.",
        "2026-07-25 · Les 100 Violons: live visuals at the Musée national de Carthage.",
    ],
    "ai-workflows": [
        "2026-10-16 · AI Photobooth: the Tarot style draws a card from the visitor's aura.",
        "2026-10-15 · AI Photobooth: a bank of 8,000 stagings, brand logo as reference, faces kept faithful.",
        "2026-08-16 · Phénix « Business »: a music video generated entirely with AI, no shoot.",
    ],
    "web": [
        "2026-11-12 · Services and industries merged into one page, with public starting prices.",
        "2026-10-16 · The studio CMS becomes fully usable on a phone.",
        "2026-10-09 · /experiences: web experiences playable right on the site.",
        "2026-09-20 · mauritalent.com and piconsult-mr.com go live.",
    ],
    "motion-design": [
        "2026-10-08 · ClassZ manifesto: a 16:9 master and a true 9:16 recomposition.",
        "2026-10-08 · The studio motion style « generated room », with eleven service loops.",
        "2026-09-20 · NeoPhi platform demo films, 16:9 and 9:16.",
        "2026-06-21 · CRK CGI carousel: 152,000 views on the brand's account.",
    ],
}


def req(method, url, body=None):
    r = urllib.request.Request(url, method=method, headers=H, data=json.dumps(body).encode() if body is not None else None)
    with urllib.request.urlopen(r) as resp:
        t = resp.read()
        return json.loads(t) if t else None


def main():
    dry, force = "--dry-run" in sys.argv, "--force" in sys.argv
    rows = req("GET", URL + "?select=slug,log")
    for row in rows:
        entries = LOG.get(row["slug"])
        if not entries:
            print(f"{row['slug']}: pas d'entrées prévues")
            continue
        if row.get("log") and not force:
            print(f"{row['slug']}: journal déjà rempli ({len(row['log'])}), laissé tel quel")
            continue
        print(f"{row['slug']}: {len(entries)} entrées" + (" (à blanc)" if dry else ""))
        if not dry:
            req("PATCH", URL + f"?slug=eq.{row['slug']}", {"log": entries})


main()
