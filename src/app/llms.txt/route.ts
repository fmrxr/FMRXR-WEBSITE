import { getPublished, getSiteSettings } from "@/lib/public-data";

export async function GET() {
  const [s, projects, services] = await Promise.all([
    getSiteSettings(), getPublished("projects"), getPublished("services"),
  ]);
  const body = [
    `# ${s.name}`,
    `> ${s.tagline} — ${s.description}`,
    ``,
    `FMRXR Studio is a creative technology studio (Tunis) for immersive arts, XR, projection mapping and generative installations. Artistic identity: ${s.artist_alias}. Founder: ${s.founder}.`,
    ``,
    `## Services`,
    ...services.map((x: any) => `- ${x.title}: ${x.short ?? ""}`),
    ``,
    `## Selected projects`,
    ...projects.map((p: any) => `- ${p.title} (${p.client ?? ""}, ${p.year ?? ""}): ${p.summary ?? ""}`),
    ``,
    `## Contact`,
    `${s.email} · ${s.location}`,
  ].join("\n");
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
