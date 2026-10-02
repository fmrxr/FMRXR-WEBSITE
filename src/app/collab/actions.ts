"use server";
import { revalidatePath } from "next/cache";
import { assertRole, currentUser } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { OpportunityOutcome, OpportunityStatus } from "@/lib/collab/opportunities";

// Les trois roles ont les memes droits dans cet espace : c'est un plan de
// travail partage, pas un dossier a valider. La separation vis-a-vis de l'OS
// se fait au niveau de la route, pas au niveau des champs.
const ALLOWED = ["admin", "editor", "guest"] as const;

async function client() {
  await assertRole([...ALLOWED]);
  return getSupabaseServer();
}

/**
 * On ne revalide que le dossier affiche.
 *
 * Revalider aussi « /collab » invalidait la page d'index, que le selecteur
 * d'espace garde en lien visible : Next la rechargeait alors en boucle, elle et
 * /account, a chaque message publie. Trente-deux requetes pour un clic, chacune
 * etant un rendu serveur authentifie complet, au point de faire tomber la page.
 *
 * L'index n'en a de toute facon pas besoin : il est en force-dynamic, donc
 * recalcule a chaque visite.
 */
function refresh(slug: string) {
  revalidatePath(`/collab/${slug}`);
}

const STATUSES: OpportunityStatus[] = ["to_study", "preparing", "submitted", "result"];
const OUTCOMES: OpportunityOutcome[] = ["accepted", "rejected", "no_answer"];

export async function setStatus(slug: string, status: string, outcome?: string) {
  if (!STATUSES.includes(status as OpportunityStatus)) throw new Error("Statut inconnu");
  const supabase = await client();
  // Passer hors de « result » efface le resultat, sinon un dossier repasse en
  // preparation garderait un « non retenu » qui ne veut plus rien dire.
  const nextOutcome =
    status === "result" && outcome && OUTCOMES.includes(outcome as OpportunityOutcome)
      ? outcome
      : null;
  const { error } = await supabase
    .from("opportunities").update({ status, outcome: nextOutcome }).eq("slug", slug);
  if (error) throw error;
  refresh(slug);
}

export async function setAssignee(slug: string, assignee: string) {
  const supabase = await client();
  const value = assignee.trim() || null;
  const { error } = await supabase.from("opportunities").update({ assignee: value }).eq("slug", slug);
  if (error) throw error;
  refresh(slug);
}

export async function setNotes(slug: string, notes: string) {
  const supabase = await client();
  const { error } = await supabase
    .from("opportunities").update({ notes: notes.trim() || null }).eq("slug", slug);
  if (error) throw error;
  refresh(slug);
}

export async function addTask(slug: string, opportunityId: string, label: string, assignee: string, dueDate: string) {
  const text = label.trim();
  if (!text) return;
  const supabase = await client();
  const { data: last } = await supabase
    .from("opportunity_tasks").select("position")
    .eq("opportunity_id", opportunityId)
    .order("position", { ascending: false }).limit(1).maybeSingle();
  const { error } = await supabase.from("opportunity_tasks").insert({
    opportunity_id: opportunityId,
    label: text,
    assignee: assignee.trim() || null,
    due_date: dueDate || null,
    position: ((last?.position as number | undefined) ?? 0) + 1,
  });
  if (error) throw error;
  refresh(slug);
}

export async function toggleTask(slug: string, taskId: string, done: boolean) {
  const supabase = await client();
  const { error } = await supabase.from("opportunity_tasks").update({ done }).eq("id", taskId);
  if (error) throw error;
  refresh(slug);
}

export async function deleteTask(slug: string, taskId: string) {
  const supabase = await client();
  const { error } = await supabase.from("opportunity_tasks").delete().eq("id", taskId);
  if (error) throw error;
  refresh(slug);
}

export async function addNote(slug: string, opportunityId: string, body: string) {
  const text = body.trim();
  if (!text) return;
  const supabase = await client();
  const user = await currentUser();
  const { error } = await supabase.from("opportunity_notes").insert({
    opportunity_id: opportunityId,
    author_email: user?.email ?? null,
    body: text,
  });
  if (error) throw error;
  refresh(slug);
}

export async function deleteNote(slug: string, noteId: string) {
  const supabase = await client();
  const { error } = await supabase.from("opportunity_notes").delete().eq("id", noteId);
  if (error) throw error;
  refresh(slug);
}
