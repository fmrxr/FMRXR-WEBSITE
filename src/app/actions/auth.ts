"use server";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const supabase = await getSupabaseServer();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  });
  if (error) return { error: error.message };
  redirect("/admin");
}

export async function signUp(formData: FormData) {
  const supabase = await getSupabaseServer();
  const { error } = await supabase.auth.signUp({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  });
  if (error) return { error: error.message };
  redirect("/admin");
}

export async function signOut() {
  const supabase = await getSupabaseServer();
  await supabase.auth.signOut();
  redirect("/auth");
}
