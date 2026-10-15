import "server-only";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "./supabase/server";
import { hasAllowedRole, landingPath, type Role } from "./roles";

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

/**
 * Ou envoyer quelqu'un apres connexion. Un client photobooth n'a aucun role
 * (voir migration 0018 : un role lui ouvrirait /collab), il est seulement
 * membre de campagnes : on le reconnait a cela et on l'envoie sur /client.
 */
export async function landingFor(): Promise<string> {
  const roles = await currentRoles();
  if (roles.length > 0) return landingPath(roles);
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { count } = await supabase
      .from("photobooth_campaign_members")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);
    if (count) return "/client";
  }
  return landingPath(roles);
}
