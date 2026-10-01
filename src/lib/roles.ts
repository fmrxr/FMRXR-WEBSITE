// guest : acces a l'espace /collab uniquement. Ni l'OS (admin), ni le CMS
// (admin, editor) ne l'acceptent, et leurs verifications nomment les roles
// autorises plutot que d'exclure les autres, donc ajouter un role ici n'ouvre
// aucune porte existante.
export type Role = "admin" | "editor" | "guest";

export const ROLES: Role[] = ["admin", "editor", "guest"];

export function isRole(value: string): value is Role {
  return (ROLES as string[]).includes(value);
}

export function hasAllowedRole(roles: Role[], allowed: Role[]) {
  return roles.some((r) => allowed.includes(r));
}

/**
 * Ou renvoyer quelqu'un apres une connexion reussie. Rediriger tout le monde
 * vers /admin renvoyait un guest sur une page qui le rejette vers /auth, ce qui
 * se lit comme un echec de connexion alors que la session est bien ouverte.
 *
 * Un compte sans role atterrit sur /collab, qui lui explique qu'il n'a pas
 * encore d'acces au lieu de le renvoyer en boucle vers la page de connexion.
 */
export function landingPath(roles: Role[]): string {
  if (roles.includes("admin")) return "/os";
  if (roles.includes("editor")) return "/admin";
  return "/collab";
}
