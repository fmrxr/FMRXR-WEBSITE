import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getSupabaseServer } from "@/lib/supabase/server";
import { currentUser, currentRoles } from "@/lib/auth";
import { serializeGraphForAsk } from "@/lib/os/compute";
import type { OsGraph } from "@/lib/os/types";

// POST /api/os/brain/ask — Sprint F3 : l'unique route qui débloque une lecture "cognitive" du
// graphe. Sérialise le graphe (serializeGraphForAsk) puis pose la question à Claude, qui répond
// en citant des ids réels entre crochets — l'UI (page Brain / EntityDrawer) les rend cliquables.
// Admin uniquement — même garde que /api/os/export.

const SYSTEM_PROMPT = `Tu es l'assistant du Brain de FMRXR OS, le système d'exploitation business de Haïfa Becheikh (FMRXR Studio / EFFET MÈRE).
On te donne un dump texte du graphe (identités, clients, projets, factures/devis, tâches, échéances, OKR, historique récent).
Réponds en français, de façon concise et directe. Quand tu cites une entité du graphe, utilise EXACTEMENT son id entre crochets tel qu'il apparaît dans le contexte (ex: [proj-lik]) — ne les invente jamais et n'en mets pas si tu n'es pas sûr.e de l'id.
Si l'information n'est pas dans le contexte fourni, dis-le clairement plutôt que d'inventer.`;

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const roles = await currentRoles();
  if (!roles.includes("admin")) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY non configurée" }, { status: 500 });

  let body: { question?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  const question = (body.question || "").trim();
  if (!question) return NextResponse.json({ error: "question requise" }, { status: 400 });
  if (question.length > 2000) return NextResponse.json({ error: "question trop longue (max 2000 caractères)" }, { status: 400 });

  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.from("os_graph").select("data").eq("owner", user.id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data?.data) return NextResponse.json({ error: "os_graph vide" }, { status: 404 });

  const graph = data.data as OsGraph;
  const context = serializeGraphForAsk(graph);

  const client = new Anthropic({ apiKey });
  let message;
  try {
    message = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `${context}\n\n---\n\nQuestion : ${question}` }],
    });
  } catch (e) {
    return NextResponse.json({ error: "appel Claude échoué : " + (e as Error).message }, { status: 502 });
  }

  if (message.stop_reason === "refusal") {
    return NextResponse.json({ error: "réponse refusée par les filtres de sécurité" }, { status: 502 });
  }

  const answer = message.content.filter((b) => b.type === "text").map((b) => (b as { text: string }).text).join("\n");
  const knownIds = new Set([
    ...graph.identities.map((i) => i.id),
    ...(graph.clients || []).map((c) => c.id),
    ...(graph.people || []).map((p) => p.id),
    ...graph.projects.map((p) => p.id),
    ...graph.finance.map((f) => f.id),
    ...(graph.quotes || []).map((q) => q.id),
    ...(graph.tasks || []).map((t) => t.id),
    ...(graph.deadlines || []).map((d) => d.id),
    ...(graph.okrs || []).map((o) => o.id),
  ]);
  const citedEntityIds = Array.from(new Set(Array.from(answer.matchAll(/\[([\w-]+)\]/g), (m) => m[1]))).filter((id) => knownIds.has(id));

  return NextResponse.json({ answer, citedEntityIds });
}
