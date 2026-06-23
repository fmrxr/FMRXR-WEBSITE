"use server";
import { revalidatePath } from "next/cache";
import { assertRole } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function listTeam() {
  await assertRole(["admin"]);
  const admin = getSupabaseAdmin();
  const { data: roles } = await admin.from("user_roles").select("user_id, role");
  const { data: users } = await admin.auth.admin.listUsers();
  return (roles ?? []).map((r) => ({
    ...r,
    email: users.users.find((u) => u.id === r.user_id)?.email ?? "(unknown)",
  }));
}

export async function inviteMember(email: string, role: "admin" | "editor") {
  await assertRole(["admin"]);
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.auth.admin.inviteUserByEmail(email);
  if (error || !data.user) throw new Error(error?.message ?? "Invite failed");
  const { error: rErr } = await admin.from("user_roles").insert({ user_id: data.user.id, role });
  if (rErr) throw rErr;
  revalidatePath("/admin/team");
}

export async function revokeMember(userId: string, role: "admin" | "editor") {
  await assertRole(["admin"]);
  const admin = getSupabaseAdmin();
  await admin.from("user_roles").delete().eq("user_id", userId).eq("role", role);
  revalidatePath("/admin/team");
}
