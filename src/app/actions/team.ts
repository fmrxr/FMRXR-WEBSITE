"use server";
import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { assertRole, type Role } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export type TeamMember = {
  user_id: string;
  email: string;
  roles: Role[];
  created_at: string;
  /** null = le compte n'a jamais servi, donc le mot de passe transmis n'a pas ete utilise. */
  last_sign_in_at: string | null;
  notes_count: number;
  last_note_at: string | null;
};

/**
 * Une ligne par personne, pas par role, avec de quoi savoir si le compte sert.
 *
 * L'ancienne version listait user_roles brut : quelqu'un portant deux roles
 * apparaissait deux fois, et rien ne disait si la personne s'etait seulement
 * connectee un jour. C'est pourtant la seule question qui compte apres avoir
 * transmis un mot de passe temporaire.
 */
export async function listTeam(): Promise<TeamMember[]> {
  await assertRole(["admin"]);
  const admin = getSupabaseAdmin();

  const [{ data: roleRows }, { data: users }, { data: notes }] = await Promise.all([
    admin.from("user_roles").select("user_id, role"),
    admin.auth.admin.listUsers(),
    // L'activite dans /collab se rattache a l'adresse, pas a l'identifiant :
    // c'est ce que l'espace enregistre au moment de l'ecriture.
    admin.from("opportunity_notes").select("author_email, created_at"),
  ]);

  const byUser = new Map<string, TeamMember>();

  for (const r of roleRows ?? []) {
    const u = users.users.find((x) => x.id === r.user_id);
    const email = u?.email ?? "(compte supprimé)";
    const existing = byUser.get(r.user_id);
    if (existing) {
      existing.roles.push(r.role as Role);
      continue;
    }
    const mine = (notes ?? []).filter((n) => n.author_email === email);
    byUser.set(r.user_id, {
      user_id: r.user_id,
      email,
      roles: [r.role as Role],
      created_at: u?.created_at ?? "",
      last_sign_in_at: u?.last_sign_in_at ?? null,
      notes_count: mine.length,
      last_note_at: mine.length
        ? mine.map((n) => n.created_at).sort().at(-1) ?? null
        : null,
    });
  }

  return [...byUser.values()].sort((a, b) => a.email.localeCompare(b.email, "fr"));
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

  // Retirer le dernier role admin verrouille tout le monde dehors de facon
  // definitive : plus personne ne peut rouvrir /admin/team pour le rendre, et
  // la seule issue passe par l'editeur SQL de Supabase. Le bouton est a cote de
  // ceux des invites, l'erreur est a un clic.
  if (role === "admin") {
    const { count } = await admin
      .from("user_roles").select("*", { count: "exact", head: true }).eq("role", "admin");
    if ((count ?? 0) <= 1) {
      throw new Error("C’est le dernier compte admin. Le retirer fermerait l’accès à tout le monde.");
    }
  }

  const { error } = await admin
    .from("user_roles").delete().eq("user_id", userId).eq("role", role);
  if (error) throw error;
  revalidatePath("/admin/team");
}
