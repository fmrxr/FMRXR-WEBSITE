import { notFound } from "next/navigation";
import { getBySlug, getPublished } from "@/lib/public-data";
export const revalidate = 60;
export async function generateStaticParams() {
  const rows = await getPublished("industries");
  return rows.map((r: any) => ({ slug: r.slug }));
}
export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = await getBySlug("industries", slug);
  if (!r) notFound();
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">{r.name}</h1>
      <p className="mt-4">{r.note}</p>
    </main>
  );
}
