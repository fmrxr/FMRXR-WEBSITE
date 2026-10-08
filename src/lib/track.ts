// Événements GA4 côté client. Sans gtag (développement, bloqueur de pub),
// l'appel ne fait rien : la mesure ne doit jamais casser un parcours.
type Gtag = (cmd: "event", name: string, params?: Record<string, unknown>) => void;

export function track(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}
