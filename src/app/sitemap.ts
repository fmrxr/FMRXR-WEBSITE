import type { MetadataRoute } from "next";
import { getPublished } from "@/lib/public-data";

const BASE = "https://fmrxr.studio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, services, industries, articles] = await Promise.all([
    getPublished("projects"), getPublished("services"),
    getPublished("industries"), getPublished("articles"),
  ]);
  const staticUrls = ["", "/projects", "/services", "/industries", "/journal", "/about", "/press", "/contact", "/effet-mere", "/experiential"]
    .map((p) => ({ url: BASE + p, lastModified: new Date() }));
  const dyn = [
    ...projects.map((p: any) => `/projects/${p.slug}`),
    ...services.map((s: any) => `/services/${s.slug}`),
    ...industries.map((i: any) => `/industries/${i.slug}`),
    ...articles.map((a: any) => `/journal/${a.slug}`),
  ].map((p) => ({ url: BASE + p, lastModified: new Date() }));
  return [...staticUrls, ...dyn];
}
