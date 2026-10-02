"use server";
import { getSupabaseServer } from "@/lib/supabase/server";

/**
 * Changement de mot de passe par le titulaire du compte.
 *
 * Les comptes sont crees par l'admin avec un mot de passe temporaire transmis
 * de la main a la main. Sans cet ecran, ce mot de passe restait definitif :
 * celui qui l'a recu par message ne pouvait jamais en changer, et quiconque
 * avait vu le message gardait l'acces.
 *
 * Aucun role requis, seulement une session : un compte en attente de role doit
 * pouvoir securiser son mot de passe avant meme d'avoir acces a quoi que ce soit.
 */
export async function changePassword(password: string) {
  if (password.length < 10) {
    return { error: "Au moins 10 caractères." };
  }
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Session expirée, reconnecte-toi." };

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };
  return { ok: true as const };
}
