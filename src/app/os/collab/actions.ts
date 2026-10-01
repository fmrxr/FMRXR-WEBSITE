"use server";
import { revalidatePath } from "next/cache";
import { assertRole } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";

/**
 * Marque le fil comme lu. Reserve a l'admin : c'est son propre marque-page, pas
 * un etat partage, et un collaborateur n'a aucune raison de l'effacer.
 */
export async function markCollabSeen() {
  await assertRole(["admin"]);
  const supabase = await getSupabaseServer();
  const { error } = await supabase
    .from("collab_meta")
    .upsert(
      { key: "admin_last_seen", value: { at: new Date().toISOString() }, updated_at: new Date().toISOString() },
      { onConflict: "key" },
    );
  if (error) throw error;
  revalidatePath("/os/collab");
}
