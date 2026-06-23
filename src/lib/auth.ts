import "server-only";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "./supabase/server";
import { hasAllowedRole, type Role } from "./roles";

export type { Role } from "./roles";
export { hasAllowedRole } from "./roles";

export async function currentUser() {
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function currentRoles(): Promise<Role[]> {
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
  return (data ?? []).map((r) => r.role as Role);
}

/** For pages: redirect if not signed in. */
export async function requireUser() {
  const user = await currentUser();
  if (!user) redirect("/auth");
  return user;
}

/** For Server Actions: throw (no redirect) if role missing. */
export async function assertRole(allowed: Role[]) {
  const roles = await currentRoles();
  if (!hasAllowedRole(roles, allowed)) {
    throw new Error("Forbidden: insufficient role");
  }
  return roles;
}
