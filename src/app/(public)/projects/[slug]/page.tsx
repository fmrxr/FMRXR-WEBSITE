import { notFound } from "next/navigation";
import { getBySlug, getPublished } from "@/lib/public-data";
export const revalidate = 60;
export async function generateStaticParams() {
  const projects = await getPublished("projects");
  return projects.map((p: any) => ({ slug: p.slug }));
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getBySlug("projects", slug);
  if (!p) notFound();
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">{p.title}</h1>
      <p className="mt-1 text-muted-foreground">{p.client} · {p.year} · {p.category}</p>
      {p.cover_url && <img src={p.cover_url} alt={p.title} className="my-6 w-full rounded-lg" />}
      <p className="text-lg">{p.summary}</p>
      {p.description && <p className="mt-4 whitespace-pre-line">{p.description}</p>}
      {Array.isArray(p.gallery) && p.gallery.length > 0 && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {p.gallery.map((g: any, i: number) => (
            <figure key={i}><img src={g.url} alt={g.alt} className="rounded-lg" />
              {g.caption && <figcaption className="mt-1 text-sm text-muted-foreground">{g.caption}</figcaption>}</figure>
          ))}
        </div>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "CreativeWork",
        name: p.title, about: p.category, dateCreated: p.year,
        creator: { "@type": "Organization", name: "FMRXR Studio" },
      }) }} />
    </main>
  );
}
