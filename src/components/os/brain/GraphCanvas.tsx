"use client";

import { useEffect, useRef } from "react";
import { GRAPH_TYPE_COLORS, graphNodeDegrees } from "@/lib/os/compute";
import type { GraphEdge, GraphEntity } from "@/lib/os/compute";

interface SimNode {
  e: GraphEntity;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  deg: number;
  /** Facteur d'apparition (0→1) — les nouveaux nœuds grandissent au lieu d'apparaître d'un coup. */
  ap: number;
  /** Phase de dérive individuelle — évite que tous les nœuds oscillent en phase. */
  ph: number;
}

interface SimEdge extends GraphEdge {
  na: SimNode;
  nb: SimNode;
  /** Position (0→1) de la particule de flux le long du lien. */
  t: number;
  sp: number;
}

interface Sim {
  entities: GraphEntity[];
  edges: GraphEdge[];
  search: string;
  nodes: SimNode[];
  simEdges: SimEdge[];
  pos: Map<string, { x: number; y: number }>;
  scale: number;
  ox: number;
  oy: number;
  alpha: number;
  hover: SimNode | null;
  drag: SimNode | null;
  pan: { x: number; y: number } | null;
  moved: number;
  running: boolean;
}

function neighbors(sim: Sim, n: SimNode): Set<SimNode> {
  const s = new Set<SimNode>([n]);
  for (const e of sim.simEdges) {
    if (e.na === n) s.add(e.nb);
    if (e.nb === n) s.add(e.na);
  }
  return s;
}

function matches(n: SimNode, search: string): boolean {
  return search.length > 0 && n.e.name.toLowerCase().includes(search);
}

function drift(x: number, y: number, ph: number, now: number): { x: number; y: number } {
  return { x: x + Math.sin(now * 0.0006 + ph) * 1.6, y: y + Math.cos(now * 0.0005 + ph * 1.7) * 1.6 };
}

function pointFromEvent(ev: MouseEvent, canvas: HTMLCanvasElement, sim: Sim): { x: number; y: number } {
  const r = canvas.getBoundingClientRect();
  return { x: (ev.clientX - r.left - sim.ox) / sim.scale, y: (ev.clientY - r.top - sim.oy) / sim.scale };
}

function hitTest(sim: Sim, p: { x: number; y: number }): SimNode | null {
  let best: SimNode | null = null;
  let bestDist = Infinity;
  for (const n of sim.nodes) {
    const d = Math.hypot(n.x - p.x, n.y - p.y);
    if (d < Math.max(n.r + 5, 9) && d < bestDist) {
      best = n;
      bestDist = d;
    }
  }
  return best;
}

/** Reconstruit nodes/simEdges à partir de entities/edges, en réutilisant les positions déjà connues. */
function rebuildNodes(sim: Sim, width: number, height: number) {
  const degrees = graphNodeDegrees(sim.edges);
  const byId = new Map<string, SimNode>();
  sim.nodes = sim.entities.map((e) => {
    const saved = sim.pos.get(e.id) || { x: width / 2 + (Math.random() - 0.5) * width * 0.7, y: height / 2 + (Math.random() - 0.5) * height * 0.7 };
    sim.pos.set(e.id, saved);
    const deg = degrees[e.id] || 0;
    const node: SimNode = {
      e,
      x: saved.x,
      y: saved.y,
      vx: 0,
      vy: 0,
      deg,
      r: (e.type === "identity" ? 8 : 4.5) + Math.min(5, Math.sqrt(deg) * 1.4),
      ap: 0,
      ph: Math.random() * 6.28,
    };
    byId.set(e.id, node);
    return node;
  });
  sim.simEdges = sim.edges.flatMap((e) => {
    const na = byId.get(e.a);
    const nb = byId.get(e.b);
    if (!na || !nb) return [];
    return [{ ...e, na, nb, t: Math.random(), sp: 0.0025 + Math.random() * 0.004 }];
  });
}

interface GraphCanvasProps {
  entities: GraphEntity[];
  edges: GraphEdge[];
  search: string;
  /** Incrémenter pour forcer une réorganisation (nouvelles positions aléatoires). */
  reseedSignal: number;
  onOpenEntity: (id: string) => void;
  onStats: (nodeCount: number, edgeCount: number, derivedCount: number) => void;
}

/**
 * Graphe force-directed — porte gBuild()/gLoop()/initGraph() de RENDER.graph. La simulation vit
 * entièrement dans une ref mutable (pas de useState) : à 60 fps, passer par le rendu React sur
 * chaque frame serait à la fois inutile (le canvas se redessine lui-même) et bien plus lent.
 */
export function GraphCanvas({ entities, edges, search, reseedSignal, onOpenEntity, onStats }: GraphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const simRef = useRef<Sim>({
    entities: [],
    edges: [],
    search: "",
    nodes: [],
    simEdges: [],
    pos: new Map(),
    scale: 1,
    ox: 0,
    oy: 0,
    alpha: 1,
    hover: null,
    drag: null,
    pan: null,
    moved: 0,
    running: false,
  });

  // Boucle physique + rendu + interactions — montée une seule fois, la ref `sim` transporte l'état
  // vivant pour que ce useEffect n'ait jamais besoin de redémarrer quand les props changent.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const sim = simRef.current;
    sim.running = true;

    function loop() {
      const cv = canvasRef.current;
      if (!cv || !sim.running) return;
      const dpr = window.devicePixelRatio || 1;
      const width = cv.clientWidth;
      const height = cv.clientHeight;
      if (cv.width !== width * dpr) {
        cv.width = width * dpr;
        cv.height = height * dpr;
      }
      const ctx = cv.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const now = performance.now();

      // ── physique (le graphe ne s'endort jamais complètement : il respire légèrement) ──
      const alpha = Math.max(sim.alpha, 0.006);
      const nodes = sim.nodes;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 1) d2 = 1;
          if (d2 < 40000) {
            const f = (1600 / d2) * alpha;
            const d = Math.sqrt(d2);
            dx /= d;
            dy /= d;
            a.vx += dx * f;
            a.vy += dy * f;
            b.vx -= dx * f;
            b.vy -= dy * f;
          }
        }
      }
      sim.simEdges.forEach((e) => {
        const dx = e.nb.x - e.na.x;
        const dy = e.nb.y - e.na.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = (d - (e.derived ? 150 : 95)) * 0.028 * e.w * alpha * 4;
        const ux = dx / d;
        const uy = dy / d;
        e.na.vx += ux * f;
        e.na.vy += uy * f;
        e.nb.vx -= ux * f;
        e.nb.vy -= uy * f;
      });
      nodes.forEach((n) => {
        n.vx += (width / 2 - n.x) * 0.0015 * alpha * 4;
        n.vy += (height / 2 - n.y) * 0.0015 * alpha * 4;
        if (sim.drag !== n) {
          n.x += n.vx;
          n.y += n.vy;
        }
        n.vx *= 0.82;
        n.vy *= 0.82;
        n.ap += (1 - n.ap) * 0.07;
        sim.pos.set(n.e.id, { x: n.x, y: n.y });
      });
      sim.alpha *= 0.985;

      // ── rendu ──
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(sim.ox, sim.oy);
      ctx.scale(sim.scale, sim.scale);
      const hl = sim.hover ? neighbors(sim, sim.hover) : null;
      const searching = sim.search.length > 0;

      sim.simEdges.forEach((e) => {
        const A = drift(e.na.x, e.na.y, e.na.ph, now);
        const B = drift(e.nb.x, e.nb.y, e.nb.ph, now);
        const on = !!hl && hl.has(e.na) && hl.has(e.nb) && (e.na === sim.hover || e.nb === sim.hover);
        const dim = (hl || searching) && !on;
        // Un lien touchant un fantôme est du sédiment relationnel (§loadHistoricalEdges) — jamais de
        // flux vivant dessus, un trait pointillé plus terne que même les liens dérivés.
        const sediment = e.na.e.state === "ghost" || e.nb.e.state === "ghost";
        ctx.strokeStyle = on ? "rgba(123,239,123,.6)" : sediment ? `rgba(180,180,195,${dim ? 0.03 : 0.06})` : `rgba(255,255,255,${dim ? 0.04 : e.derived ? 0.07 : 0.14})`;
        ctx.lineWidth = on ? 1.4 : e.derived || sediment ? 0.5 : 0.7;
        if (e.derived || sediment) ctx.setLineDash([3, 5]);
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
        ctx.setLineDash([]);
        if (!e.derived && !sediment && !dim) {
          e.t = (e.t + e.sp) % 1;
          const px = A.x + (B.x - A.x) * e.t;
          const py = A.y + (B.y - A.y) * e.t;
          ctx.beginPath();
          ctx.arc(px, py, on ? 2.2 : 1.4, 0, 7);
          ctx.fillStyle = on ? "#7BEF7B" : "rgba(123,239,123,.5)";
          if (on) {
            ctx.shadowColor = "rgba(123,239,123,.9)";
            ctx.shadowBlur = 8;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      nodes.forEach((n) => {
        const P = drift(n.x, n.y, n.ph, now);
        const m = matches(n, sim.search);
        const isGhost = n.e.state === "ghost";
        const dimmed = (hl && !hl.has(n)) || (searching && !m);
        const archived = n.e.type === "project" && n.e.status === "archived";
        const r = n.r * (n.ap < 0.99 ? 1 - Math.pow(1 - n.ap, 3) : 1) * (n === sim.hover ? 1.25 : 1) * (isGhost ? 0.82 : 1);
        // Un fantôme reste visible en permanence (couche sédiment, §loadHistoricalEntities) — pas
        // aussi terne qu'un nœud simplement masqué par un filtre, mais jamais aussi vif qu'un vivant.
        ctx.globalAlpha = (dimmed ? 0.12 : isGhost ? 0.32 : archived ? 0.45 : 1) * Math.min(1, n.ap * 1.5);
        ctx.beginPath();
        ctx.arc(P.x, P.y, r, 0, 7);
        ctx.fillStyle = isGhost ? "rgba(190,190,205,.9)" : GRAPH_TYPE_COLORS[n.e.type] || "#888";
        if (!isGhost && (n.e.type === "identity" || n === sim.hover || m) && !dimmed) {
          const pulse = n.e.type === "identity" ? 10 + Math.sin(now * 0.002 + n.ph) * 5 : 0;
          ctx.shadowColor = n.e.type === "identity" ? "rgba(123,239,123,.8)" : "rgba(255,255,255,.5)";
          ctx.shadowBlur = (n === sim.hover || m ? 18 : 10) + pulse;
        } else if (isGhost && (n === sim.hover || m) && !dimmed) {
          ctx.shadowColor = "rgba(255,255,255,.3)";
          ctx.shadowBlur = 8;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
        if (n === sim.hover || m) {
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        const showLabel = !dimmed && (sim.scale >= 0.75 || n.e.type === "identity" || n === sim.hover || m || (hl && hl.has(n)));
        if (showLabel) {
          ctx.fillStyle = isGhost ? "rgba(255,255,255,.32)" : archived ? "rgba(255,255,255,.4)" : "rgba(255,255,255,.85)";
          ctx.font = (n.e.type === "identity" ? "600 11.5px" : "300 9.5px") + ' "Space Grotesk", sans-serif';
          const label = n.e.name.length > 30 ? n.e.name.slice(0, 28) + "…" : n.e.name;
          ctx.fillText(label, P.x + r + 5, P.y + 3.5);
        }
        ctx.globalAlpha = 1;
      });
      ctx.restore();
      requestAnimationFrame(loop);
    }

    function onMouseDown(ev: MouseEvent) {
      const p = pointFromEvent(ev, canvas!, sim);
      const n = hitTest(sim, p);
      sim.moved = 0;
      if (n) sim.drag = n;
      else sim.pan = { x: ev.clientX - sim.ox, y: ev.clientY - sim.oy };
      sim.alpha = Math.max(sim.alpha, 0.25);
    }
    function onMouseMove(ev: MouseEvent) {
      const p = pointFromEvent(ev, canvas!, sim);
      sim.moved++;
      if (sim.drag) {
        sim.drag.x = p.x;
        sim.drag.y = p.y;
        sim.pos.set(sim.drag.e.id, { x: p.x, y: p.y });
        sim.alpha = Math.max(sim.alpha, 0.12);
      } else if (sim.pan) {
        sim.ox = ev.clientX - sim.pan.x;
        sim.oy = ev.clientY - sim.pan.y;
      } else {
        sim.hover = hitTest(sim, p);
        canvas!.style.cursor = sim.hover ? "pointer" : "default";
      }
      sim.alpha = Math.max(sim.alpha, 0.25);
    }
    function onMouseUp() {
      if (sim.drag && sim.moved < 4) onOpenEntity(sim.drag.e.id);
      sim.drag = null;
      sim.pan = null;
      sim.alpha = Math.max(sim.alpha, 0.25);
    }
    function onMouseLeave() {
      sim.drag = null;
      sim.pan = null;
      sim.hover = null;
      sim.alpha = Math.max(sim.alpha, 0.25);
    }
    function onWheel(ev: WheelEvent) {
      ev.preventDefault();
      const r = canvas!.getBoundingClientRect();
      const mx = ev.clientX - r.left;
      const my = ev.clientY - r.top;
      const k = ev.deltaY < 0 ? 1.12 : 1 / 1.12;
      const ns = Math.min(4, Math.max(0.25, sim.scale * k));
      sim.ox = mx - (mx - sim.ox) * (ns / sim.scale);
      sim.oy = my - (my - sim.oy) * (ns / sim.scale);
      sim.scale = ns;
      sim.alpha = Math.max(sim.alpha, 0.25);
    }
    function onDblClick() {
      sim.scale = 1;
      sim.ox = 0;
      sim.oy = 0;
      sim.alpha = Math.max(sim.alpha, 0.25);
    }

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("dblclick", onDblClick);
    requestAnimationFrame(loop);

    return () => {
      sim.running = false;
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("dblclick", onDblClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- montée unique intentionnelle ; entities/edges/search/onOpenEntity sont lus depuis `sim` (synchronisé par les effets ci-dessous), pas capturés en closure.
  }, []);

  // Synchronise entities/edges dans la ref sim et reconstruit les nœuds, en conservant les
  // positions déjà connues (par id) — comme G.pos dans le monolithe.
  useEffect(() => {
    const canvas = canvasRef.current;
    const sim = simRef.current;
    sim.entities = entities;
    sim.edges = edges;
    rebuildNodes(sim, canvas?.clientWidth || 800, canvas?.clientHeight || 500);
    sim.alpha = Math.max(sim.alpha, 0.5);
    onStats(sim.nodes.length, sim.simEdges.length, sim.simEdges.filter((e) => e.derived).length);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onStats est stable côté appelant (useCallback), pas nécessaire dans les deps.
  }, [entities, edges]);

  useEffect(() => {
    simRef.current.search = search.toLowerCase();
    simRef.current.alpha = Math.max(simRef.current.alpha, 0.1);
  }, [search]);

  // reseedSignal à 0 au montage → ne pas réorganiser tant que l'utilisateur n'a pas cliqué le bouton.
  const firstReseed = useRef(true);
  useEffect(() => {
    if (firstReseed.current) {
      firstReseed.current = false;
      return;
    }
    const canvas = canvasRef.current;
    const sim = simRef.current;
    sim.pos.clear();
    sim.scale = 1;
    sim.ox = 0;
    sim.oy = 0;
    sim.hover = null;
    sim.drag = null;
    rebuildNodes(sim, canvas?.clientWidth || 800, canvas?.clientHeight || 500);
    sim.alpha = 1;
  }, [reseedSignal]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
