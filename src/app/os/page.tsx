import { redirect } from "next/navigation";

// /os est désormais l'OS natif (Command Center) — Today est le module d'accueil (§7).
// L'auth admin est vérifiée une fois dans le layout parent.
export default function OsPage() {
  redirect("/os/today");
}
