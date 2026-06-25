"use server";
import { revalidatePath } from "next/cache";
import { assertRole } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/schemas";

export async function submitLead(input: unknown): Promise<{ ok: true } | { error: string }> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const supabase = await getSupabaseServer();
  const { error } = await supabase.from("leads").insert(parsed.data as Record<string, unknown>);
  if (error) return { error: error.message };
  revalidatePath("/admin/requests");
  return { ok: true };
}

export async function listLeads() {
  await assertRole(["admin", "editor"]);
  const supabase = await getSupabaseServer();
  const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
  return data ?? [];
}

export async function deleteLead(id: string) {
  await assertRole(["admin", "editor"]);
  const supabase = await getSupabaseServer();
  await supabase.from("leads").delete().eq("id", id);
  revalidatePath("/admin/requests");
}

export async function setLeadStatus(id: string, status: string) {
  await assertRole(["admin", "editor"]);
  const supabase = await getSupabaseServer();
  await supabase.from("leads").update({ status }).eq("id", id);
  revalidatePath("/admin/requests");
}
