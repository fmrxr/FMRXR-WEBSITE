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
    if (error) return fail(request, error.message);
  } else if (code) {
    // Flux PKCE : certains modeles d'email envoient un code plutot qu'un hash.
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return fail(request, error.message);
  } else {
    return fail(request, "Lien incomplet ou déjà utilisé.");
  }

  const next = searchParams.get("next");
  // On n'accepte qu'un chemin interne : une URL absolue venue de la query
  // transformerait ce lien en redirection ouverte.
  const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : null;
  return redirectTo(request, safeNext ?? landingPath(await currentRoles()));
}

/**
 * Redirection construite sur request.nextUrl, pas sur request.url.
 *
 * Derriere le proxy d'Hostinger, request.url porte l'adresse de bind interne :
 * les liens renvoyaient vers https://0.0.0.0:3000/auth, c'est-a-dire nulle part.
 * nextUrl porte l'hote public, c'est deja ce dont se sert proxy.ts.
 */
function redirectTo(request: NextRequest, path: string) {
  const url = request.nextUrl.clone();
  // `next` peut porter sa propre chaine de requete : l'affecter entiere a
  // pathname produirait un chemin contenant un « ? » encode.
  const [pathname, search = ""] = path.split("?");
  url.pathname = pathname;
  url.search = search;
  return NextResponse.redirect(url);
}

function fail(request: NextRequest, message: string) {
  const url = request.nextUrl.clone();
  url.pathname = "/auth";
  url.search = "";
  url.searchParams.set("error", message);
  return NextResponse.redirect(url);
}
