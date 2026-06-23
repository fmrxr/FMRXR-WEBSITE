import Link from "next/link";
import { getPublished } from "@/lib/public-data";
export const revalidate = 60;
export default async function Projects() {
  const projects = await getPublished("projects");
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Projects</h1>
      <ul className="grid gap-4 md:grid-cols-2">
        {projects.map((p: any) => (
          <li key={p.id} className="rounded-lg border p-4">
            <Link href={`/projects/${p.slug}`} className="font-semibold">{p.title}</Link>
            <p className="text-sm text-muted-foreground">{p.client} · {p.year} · {p.category}</p>
            <p className="mt-2 text-sm">{p.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
