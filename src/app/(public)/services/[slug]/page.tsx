import { notFound } from "next/navigation";
import { getBySlug, getPublished } from "@/lib/public-data";
export const revalidate = 60;
export async function generateStaticParams() {
  const rows = await getPublished("services");
  return rows.map((s: any) => ({ slug: s.slug }));
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getBySlug("services", slug);
  if (!s) notFound();
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">{s.title}</h1>
      <p className="mt-2 text-lg">{s.short}</p>
      {s.description && <p className="mt-4 whitespace-pre-line">{s.description}</p>}
      {Array.isArray(s.outcomes) && s.outcomes.length > 0 && (
        <ul className="mt-6 list-disc pl-5">{s.outcomes.map((o: string, i: number) => <li key={i}>{o}</li>)}</ul>
      )}
    </main>
  );
}
