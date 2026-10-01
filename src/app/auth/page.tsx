import type { Metadata } from "next";
import { AuthForm } from "./form";

export const metadata: Metadata = {
  title: "Connexion",
  robots: { index: false, follow: false },
};

// Page serveur pour lire ?error=, pose par /auth/confirm quand un lien d'email
// est expire ou deja utilise. Le formulaire lui-meme reste client.
export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { error } = await searchParams;
  return <AuthForm initialError={typeof error === "string" ? error : undefined} />;
}
