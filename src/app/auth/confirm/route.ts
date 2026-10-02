import { type NextRequest, NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { getSupabaseServer } from "@/lib/supabase/server";
import { currentRoles } from "@/lib/auth";
import { landingPath } from "@/lib/roles";

/**
 * Point d'atterrissage des liens envoyes par email par Supabase : invitation,
 * reinitialisation de mot de passe, confirmation d'adresse.
 *
 * Sans cette route, le lien d'une invitation ne menait nulle part : la session
 * n'etait jamais etablie, et l'invite restait bloque sur la page de connexion
 * avec un mot de passe qu'il n'avait jamais choisi.
 *
 * A configurer cote Supabase dans Authentication > URL Configuration :
 * Site URL = https://fmrxr.com, et https://fmrxr.com/auth/confirm dans la liste
 * des redirections autorisees.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");

  const supabase = await getSupabaseServer();

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (error) return fail(error.message);
  } else if (code) {
    // Flux PKCE : certains modeles d'email envoient un code plutot qu'un hash.
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return fail(error.message);
  } else {
    return fail("Lien incomplet ou déjà utilisé.");
  }

  const next = searchParams.get("next");
  // On n'accepte qu'un chemin interne : une URL absolue venue de la query
  // transformerait ce lien en redirection ouverte.
  const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : null;
  return redirectTo(safeNext ?? landingPath(await currentRoles()));
}

/**
 * Redirection vers un chemin relatif, sans jamais reconstruire d'URL absolue.
 *
 * Derriere le proxy d'Hostinger, l'hote vu par l'application est son adresse de
 * bind : les liens renvoyaient vers https://0.0.0.0:3000/auth, c'est-a-dire
 * nulle part. request.nextUrl ne sauve pas la mise ici, contrairement au proxy :
 * dans un Route Handler il derive de request.url et porte la meme adresse. Next
 * ne le reconstruit a partir des en-etes transmis que dans le proxy, d'ou /collab
 * qui redirige correctement et pas cette route.
 *
 * Un Location relatif supprime la question : le navigateur le resout contre
 * l'adresse qu'il a lui-meme demandee, donc contre le domaine public, quel que
 * soit l'hebergeur.
 */
function redirectTo(path: string) {
  return new NextResponse(null, { status: 307, headers: { Location: path } });
}

function fail(message: string) {
  return redirectTo(`/auth?error=${encodeURIComponent(message)}`);
}
