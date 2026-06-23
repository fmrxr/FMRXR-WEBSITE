import "server-only";
import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "./supabase/server";
import { assertRole, type Role } from "./auth";
import { ENTITIES } from "./entities";

const WRITE_ROLES: Role[] = ["admin", "editor"];

export async function listRows(entityKey: string) {
  const cfg = ENTITIES[entityKey];
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.from(cfg.table).select("*").order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function getRow(entityKey: string, id: string) {
  const cfg = ENTITIES[entityKey];
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.from(cfg.table).select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

export async function createRow(entityKey: string, input: unknown) {
  const cfg = ENTITIES[entityKey];
  await assertRole(WRITE_ROLES);
  const parsed = cfg.schema.parse(input) as Record<string, unknown>;
  const supabase = await getSupabaseServer();
  const { error } = await supabase.from(cfg.table).insert(parsed);
  if (error) throw error;
  revalidatePath("/" + cfg.key);
  revalidatePath("/admin/" + cfg.key);
}

export async function updateRow(entityKey: string, id: string, input: unknown) {
  const cfg = ENTITIES[entityKey];
  await assertRole(WRITE_ROLES);
  const parsed = cfg.schema.parse(input) as Record<string, unknown>;
  const supabase = await getSupabaseServer();
  const { error } = await supabase.from(cfg.table).update(parsed).eq("id", id);
  if (error) throw error;
  revalidatePath("/" + cfg.key);
  revalidatePath("/admin/" + cfg.key);
}

export async function deleteRow(entityKey: string, id: string) {
  const cfg = ENTITIES[entityKey];
  await assertRole(WRITE_ROLES);
  const supabase = await getSupabaseServer();
  const { error } = await supabase.from(cfg.table).delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/" + cfg.key);
  revalidatePath("/admin/" + cfg.key);
}

export async function reorderRows(entityKey: string, ids: string[]) {
  const cfg = ENTITIES[entityKey];
  await assertRole(WRITE_ROLES);
  const supabase = await getSupabaseServer();
  await Promise.all(
    ids.map((id, i) => supabase.from(cfg.table).update({ sort_order: i }).eq("id", id)),
  );
  revalidatePath("/" + cfg.key);
  revalidatePath("/admin/" + cfg.key);
}
