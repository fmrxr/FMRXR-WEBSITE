export type Role = "admin" | "editor";

export function hasAllowedRole(roles: Role[], allowed: Role[]) {
  return roles.some((r) => allowed.includes(r));
}
