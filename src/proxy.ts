import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const p = request.nextUrl.pathname;
  // /api/os/agent/* s'authentifie par token Bearer (checkAgentToken), pas par cookie de session —
  // exempté du gate cookie, sinon le proxy redirige avant que la route ait pu vérifier le token.
  if (p.startsWith("/api/os/agent/")) return response;
  // Premier filtre seulement : il ne verifie que la session. Le controle de role
  // est fait par chaque layout (/os exige admin, /admin exige admin ou editor,
  // /collab exige un role quelconque) et par les routes /api/os.
  const gated =
    p.startsWith("/admin") || p.startsWith("/os") || p.startsWith("/api/os") ||
    p.startsWith("/collab") || p.startsWith("/account");
  if (gated && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|experiences/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
