"use server";
import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { assertRole, type Role } from "@/lib/auth";
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

/**
 * Cree le compte et lui donne son role, sans passer par un email.
 *
 * L'ancien flux appelait inviteUserByEmail, qui envoie un lien que rien dans
 * l'app ne savait traiter avant /auth/confirm, et qui depend du SMTP du projet.
 * Ici le compte est utilisable immediatement : le mot de passe temporaire est
 * renvoye une seule fois a l'ecran, et c'est a Haifa de le transmettre par son
 * propre canal. Il n'est stocke nulle part.
 */
export async function createMember(email: string, role: Role) {
  await assertRole(["admin"]);
  const admin = getSupabaseAdmin();
  const address = email.trim().toLowerCase();
  if (!address) throw new Error("Email manquant");

  const password = randomBytes(12).toString("base64url");
  const { data, error } = await admin.auth.admin.createUser({
    email: address,
    password,
    // Sans cela, Supabase attend une confirmation par email que personne ne
    // recevra forcement, et la connexion echoue avec « Email not confirmed ».
    email_confirm: true,
  });

  let userId = data?.user?.id;
  let created = true;

  if (error) {
    // Le compte existe deja : on ne touche pas a son mot de passe, on se
    // contente de lui ajouter le role demande.
    const { data: users } = await admin.auth.admin.listUsers();
    userId = users.users.find((u) => u.email?.toLowerCase() === address)?.id;
    if (!userId) throw error;
    created = false;
  }

  const { error: rErr } = await admin
    .from("user_roles").upsert({ user_id: userId, role }, { onConflict: "user_id,role" });

  if (rErr) {
    // Le compte venait d'etre cree et n'a pas recu son role : on le supprime
    // plutot que de laisser un utilisateur orphelin, sans acces et dont le mot
    // de passe genere est deja perdu. Sans ce retour en arriere, reessayer
    // tombait sur la branche « existe deja » et ne rendait plus jamais de mot
    // de passe.
    if (created && userId) await admin.auth.admin.deleteUser(userId);
    throw rErr;
  }

  revalidatePath("/admin/team");
  return created ? { created, password } : { created, password: null };
}

export async function revokeMember(userId: string, role: Role) {
  await assertRole(["admin"]);
  const admin = getSupabaseAdmin();
  await admin.from("user_roles").delete().eq("user_id", userId).eq("role", role);
  revalidatePath("/admin/team");
}
