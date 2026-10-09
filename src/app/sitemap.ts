import type { MetadataRoute } from "next";
import { getPublished } from "@/lib/public-data";

const BASE = "https://fmrxr.com";

// Le sitemap doit refleter l'etat reel de la base : fige au build, il omettait
// les projets publies apres le dernier deploiement.
export const dynamic = "force-dynamic";

// Date de derniere modification reelle de la ligne. Mettre new Date() ici
// revenait a annoncer a Google que toutes les pages changent a chaque seconde,
// ce qui lui fait cesser d'accorder du credit au signal lastmod.
function lastModified(row: { updated_at?: string; created_at?: string }): Date | undefined {
  const raw = row.updated_at ?? row.created_at;
  if (!raw) return undefined;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

// La page la plus recemment modifiee d'une collection sert de date pour la page
// d'index correspondante, qui change exactement quand son contenu change.
function mostRecent(rows: any[]): Date | undefined {
  const dates = rows.map(lastModified).filter(Boolean) as Date[];
  return dates.length ? new Date(Math.max(...dates.map((d) => d.getTime()))) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, services, industries, articles] = await Promise.all([
    getPublished("projects"), getPublished("services"),
    getPublished("industries"), getPublished("articles"),
  ]);

  const newest = mostRecent([...projects, ...services, ...industries, ...articles]);

  const index: MetadataRoute.Sitemap = [
    // Barre finale sur la racine : « https://fmrxr.com » sans chemin est accepte
    // mais Google attend une URL complete, et c'est la forme que sert le site.
    { url: `${BASE}/`, lastModified: newest, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/projects`, lastModified: mostRecent(projects), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/experiences`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services`, lastModified: mostRecent(services), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries`, lastModified: mostRecent(industries), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/journal`, lastModified: mostRecent(articles), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/effet-mere`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/press`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const collection = (rows: any[], prefix: string, priority: number): MetadataRoute.Sitemap =>
    rows.map((r: any) => ({
      url: `${BASE}${prefix}/${r.slug}`,
      lastModified: lastModified(r),
      changeFrequency: "monthly" as const,
      priority,
    }));

  return [
    ...index,
    ...collection(projects, "/projects", 0.9),
    ...collection(articles, "/journal", 0.7),
    ...collection(services, "/services", 0.7),
    ...collection(industries, "/industries", 0.6),
  ];
}
