import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const p = request.nextUrl.pathname;
  // /api/os/agent/* s'authentifie par token Bearer (checkAgentToken), pas par cookie de session —
  // exempté du gate cookie, sinon le middleware redirige avant que la route ait pu vérifier le token.
  if (p.startsWith("/api/os/agent/")) return response;
  const gated = p.startsWith("/admin") || p.startsWith("/os") || p.startsWith("/api/os");
  if (gated && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
