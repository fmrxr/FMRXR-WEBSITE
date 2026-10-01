"use server";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { currentRoles } from "@/lib/auth";
import { landingPath } from "@/lib/roles";

export async function signIn(formData: FormData) {
  const supabase = await getSupabaseServer();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  });
  if (error) return { error: error.message };
  // La destination depend du role : /admin rejette un guest, qui croirait alors
  // que sa connexion a echoue. redirect() leve une exception, donc les roles se
  // lisent avant l'appel.
  redirect(landingPath(await currentRoles()));
}

// Pas de signUp exporte ici. Une server action exportee reste joignable par
// requete directe meme sans bouton dans l'interface : retirer le lien de la page
// de connexion sans retirer l'action aurait laisse l'inscription ouverte. Les
// comptes se creent depuis /admin/team, qui exige le role admin.

export async function signOut() {
  const supabase = await getSupabaseServer();
  await supabase.auth.signOut();
  redirect("/auth");
}
