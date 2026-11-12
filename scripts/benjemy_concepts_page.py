"""Page de développement créatif BENJEMY · HAY (public/work/benjemy-hay/index.html).

Embarquée dans la fiche projet comme élément de galerie (embed + label). Les
images viennent de Clients/BENJEMY/VJ_SET_HAY/concepts/web, réduites à 960 px
dans public/work/benjemy-hay/concepts/. Le texte reprend la direction visuelle
DA_HAY.html, sans ses références (secrètes), sans paroles et sans nom divin.

    python scripts/benjemy_concepts_page.py
"""
import html
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public/work/benjemy-hay"
imgs = sorted(p.name for p in (OUT / "concepts").glob("*.jpg"))


def title(name: str) -> str:
    n, _, rest = name[:-4].partition("_")
    return n, rest.replace("_", " ").capitalize()


tiles = "\n".join(
    f'<figure><button data-i="{i}"><img src="concepts/{f}" alt="Concept {n}: {html.escape(t)}" loading="lazy"></button>'
    f'<figcaption><span>{n}</span>{html.escape(t)}</figcaption></figure>'
    for i, f in enumerate(imgs) for n, t in [title(f)]
)

RULES = [
    ("The material is real", "Snake, olive and tile come from the official files, every rebuild measured against them. The map comes from a real neighbourhood, never an invented maze."),
    ("One material per image", "Line, chrome, halftone or map. Never two at once."),
    ("A single red event", "One line, one cell, one front. Two would no longer be an event."),
    ("The grid holds everything", "Fixed margins, a wireframe border, tiny reading marks. The more the image moves, the stiller the grid."),
    ("Sound measures, it does not shake", "The kick moves a structure: a front, a density, a thickness. No full-frame flash, no camera shake."),
    ("The image keeps the trace of its calculation", "Grain, delay, visible survey lines. It is generated, and it shows."),
    ("The black breathes", "At least half the frame stays empty. In the room, the void is what makes the sign readable."),
]
rules = "\n".join(f"<li><b>{a}</b><span>{b}</span></li>" for a, b in RULES)

page = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>HAY · Creative development · FMRXR</title>
<meta name="robots" content="noindex">
<style>
:root{{--bg:#04070d;--ink:#e8eef3;--mute:#8a98a6;--line:#16202c;--blue:#002147;--zig:#b8d0e0;--red:#ff172e}}
*{{box-sizing:border-box}}html,body{{margin:0;background:var(--bg);color:var(--ink);font:15px/1.6 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}}
main{{max-width:1180px;margin:0 auto;padding:48px 20px 80px}}
.k{{font:11px/1 ui-monospace,Menlo,Consolas,monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--mute)}}
h1{{font-weight:900;font-size:clamp(2.4rem,7vw,5rem);line-height:.92;letter-spacing:-.01em;margin:14px 0 0;text-transform:uppercase}}
h1 .ar{{font-weight:400;color:var(--red);display:inline-block;line-height:1;vertical-align:.08em;font-size:.82em}}
h2{{font:11px/1 ui-monospace,Menlo,Consolas,monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--mute);margin:64px 0 18px}}
.lead{{max-width:720px;font-size:18px;color:#cfd8df;margin-top:22px}}
.three{{display:grid;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:12px;overflow:hidden;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}}
.three div{{background:var(--bg);padding:20px}}.three b{{display:block;font-weight:800;text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px}}.three p{{margin:0;color:var(--mute);font-size:14px}}
.pal{{display:flex;flex-wrap:wrap;gap:10px}}.pal div{{flex:1 1 150px;border:1px solid var(--line);border-radius:10px;overflow:hidden}}
.pal i{{display:block;height:64px}}.pal span{{display:block;padding:10px 12px;font:12px/1.4 ui-monospace,Menlo,Consolas,monospace;color:var(--mute)}}.pal b{{color:var(--ink);font:600 13px system-ui}}
ol.rules{{list-style:none;padding:0;margin:0;display:grid;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:12px;overflow:hidden}}
ol.rules li{{background:var(--bg);padding:14px 18px;display:grid;grid-template-columns:minmax(0,260px) 1fr;gap:16px}}ol.rules span{{color:var(--mute);font-size:14px}}
@media(max-width:640px){{ol.rules li{{grid-template-columns:1fr;gap:4px}}}}
.grid{{display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(210px,1fr))}}
figure{{margin:0}}figure button{{all:unset;cursor:zoom-in;display:block;border:1px solid var(--line);border-radius:8px;overflow:hidden;aspect-ratio:16/9;background:#000}}
figure img{{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s}}figure button:hover img{{transform:scale(1.04)}}
figcaption{{font:11px/1.3 ui-monospace,Menlo,Consolas,monospace;color:var(--mute);margin-top:7px;letter-spacing:.04em}}figcaption span{{color:var(--red);margin-right:8px}}
.box{{position:fixed;inset:0;background:rgba(2,4,8,.94);display:none;align-items:center;justify-content:center;flex-direction:column;padding:20px;z-index:9}}
.box.on{{display:flex}}.box img{{max-width:min(1400px,96vw);max-height:80vh;border:1px solid var(--line);border-radius:6px}}
.box p{{font:12px ui-monospace,Menlo,Consolas,monospace;color:var(--zig);letter-spacing:.08em;margin-top:14px}}
.box button{{all:unset;cursor:pointer;position:absolute;top:50%;font:28px system-ui;color:var(--ink);padding:16px}}.box .p{{left:8px}}.box .n{{right:8px}}.box .x{{top:12px;right:16px}}
footer{{margin-top:64px;border-top:1px solid var(--line);padding-top:18px}}
</style></head><body><main>
<p class="k">FMRXR Studio · Effet Mère · Benjemy · Creative development</p>
<h1>HAY <span class="ar">حيّ</span><br>the map is alive</h1>
<p class="lead">The word means alive, and it means neighbourhood. After the HAY Live Experience at AINA, the visuals for Benjemy's HAY set grew from that double meaning: a map that breathes. {len(imgs)} concepts, each one written as a GLSL shader and rendered from code: the material of the live set.</p>

<h2>Three materials</h2>
<div class="three">
<div><b>The survey</b><p>A real neighbourhood, measured. Its blocks and voids, a strict grid, tiny reading labels. The cold half of the image.</p></div>
<div><b>The living</b><p>The snake of Benjemy's identity inhabits the survey. It sheds, breathes and moves through the streets. The warm half, and the only place the music enters.</p></div>
<div><b>The writing</b><p>Arabic letters are not a title laid on top. They are a material, like chrome and like the map: the city is seen through them.</p></div>
</div>

<h2>Colour</h2>
<div class="pal">
<div><i style="background:#002147"></i><span><b>Prussian Blue</b><br>#002147 · the ground, taken down towards black</span></div>
<div><i style="background:#b8d0e0"></i><span><b>Ziggurat</b><br>#b8d0e0 · the material and the line</span></div>
<div><i style="background:#8F0D1A"></i><span><b>Tamarillo</b><br>#8F0D1A · the only event</span></div>
<div><i style="background:#ff172e"></i><span><b>Tamarillo, emitting</b><br>#ff172e · same hue, gain 1.78, when red becomes light</span></div>
</div>

<h2>Seven rules</h2>
<ol class="rules">
{rules}
</ol>

<h2>The concepts · {len(imgs)}</h2>
<div class="grid">
{tiles}
</div>

<footer class="k">Visual direction and shaders: FMRXR Studio · Effet Mère. Identity elements from the official Benjemy brand files.</footer>
</main>
<div class="box" role="dialog" aria-modal="true"><button class="x" aria-label="Close">✕</button><button class="p" aria-label="Previous">‹</button><img alt=""><p></p><button class="n" aria-label="Next">›</button></div>
<script>
const figs=[...document.querySelectorAll('figure')],box=document.querySelector('.box'),im=box.querySelector('img'),cap=box.querySelector('p');let i=0;
const show=k=>{{i=(k+figs.length)%figs.length;const f=figs[i];im.src=f.querySelector('img').src;cap.textContent=f.querySelector('figcaption span').textContent+' · '+f.querySelector('figcaption').lastChild.textContent;box.classList.add('on')}};
figs.forEach((f,k)=>f.querySelector('button').onclick=()=>show(k));
box.querySelector('.x').onclick=()=>box.classList.remove('on');box.querySelector('.p').onclick=()=>show(i-1);box.querySelector('.n').onclick=()=>show(i+1);
box.onclick=e=>{{if(e.target===box)box.classList.remove('on')}};
addEventListener('keydown',e=>{{if(!box.classList.contains('on'))return;if(e.key==='Escape')box.classList.remove('on');if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)}});
</script></body></html>
"""
(OUT / "index.html").write_text(page, encoding="utf-8")
print(OUT / "index.html", len(imgs), "concepts")
