import "server-only";

// Auth des agents (indépendante du cookie admin) : en-tête Authorization: Bearer <OS_AGENT_TOKEN>.
// Permet à un agent capable d'appels HTTP authentifiés (Claude Code, cron serveur) de lire le graphe
// et de proposer des changements, sans session navigateur. NE PAS exposer côté client.
export function checkAgentToken(req: Request): boolean {
  const token = process.env.OS_AGENT_TOKEN;
  if (!token) return false;
  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  return !!m && m[1] === token;
}
