"use server";
import { revalidatePath } from "next/cache";
import { assertRole } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";

const COLORS = ["green", "blue", "orange", "muted", "white"];
const color = (c?: string) => (c && COLORS.includes(c) ? c : "muted");
const clamp = (n: number) => Math.round(Number.isFinite(n) ? n : 0);

export async function createNode(input: { title: string; body?: string; color?: string; x: number; y: number }) {
  await assertRole(["admin", "editor"]);
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase
    .from("blueprint_nodes")
    .insert({
      title: (input.title || "New node").slice(0, 120),
      body: input.body ? input.body.slice(0, 400) : null,
      color: color(input.color),
      x: clamp(input.x),
      y: clamp(input.y),
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blueprint");
  return data;
}

export async function updateNode(
  id: string,
  patch: Partial<{ title: string; body: string | null; color: string; x: number; y: number }>,
) {
  await assertRole(["admin", "editor"]);
  const clean: Record<string, unknown> = {};
  if (patch.title !== undefined) clean.title = String(patch.title).slice(0, 120);
  if (patch.body !== undefined) clean.body = patch.body == null ? null : String(patch.body).slice(0, 400);
  if (patch.color !== undefined) clean.color = color(patch.color);
  if (patch.x !== undefined) clean.x = clamp(patch.x);
  if (patch.y !== undefined) clean.y = clamp(patch.y);
  if (Object.keys(clean).length === 0) return;
  const supabase = await getSupabaseServer();
  const { error } = await supabase.from("blueprint_nodes").update(clean).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blueprint");
}

export async function deleteNode(id: string) {
  await assertRole(["admin", "editor"]);
  const supabase = await getSupabaseServer();
  await supabase.from("blueprint_nodes").delete().eq("id", id);
  revalidatePath("/admin/blueprint");
}

export async function createEdge(source: string, target: string) {
  await assertRole(["admin", "editor"]);
  if (source === target) return null;
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.from("blueprint_edges").insert({ source, target }).select().single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blueprint");
  return data;
}

export async function deleteEdge(id: string) {
  await assertRole(["admin", "editor"]);
  const supabase = await getSupabaseServer();
  await supabase.from("blueprint_edges").delete().eq("id", id);
  revalidatePath("/admin/blueprint");
}
