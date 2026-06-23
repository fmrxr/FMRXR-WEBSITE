"use server";
import { assertRole } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function uploadImage(formData: FormData): Promise<{ url: string } | { error: string }> {
  await assertRole(["admin", "editor"]);
  const file = formData.get("file") as File | null;
  if (!file) return { error: "No file" };
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${crypto.randomUUID()}.${ext}`;
  const supabase = await getSupabaseServer();
  const { error } = await supabase.storage.from("media").upload(path, file, {
    contentType: file.type, upsert: false,
  });
  if (error) return { error: error.message };
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return { url: data.publicUrl };
}
