import { notFound } from "next/navigation";
import { getBySlug, getPublished } from "@/lib/public-data";
export const revalidate = 60;
export async function generateStaticParams() {
  const rows = await getPublished("articles");
  return rows.map((a: any) => ({ slug: a.slug }));
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await getBySlug("articles", slug);
  if (!a) notFound();
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">{a.title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{a.category} · {a.date} · {a.read_time}</p>
      {a.cover_url && <img src={a.cover_url} alt={a.title} className="my-6 w-full rounded-lg" />}
      {Array.isArray(a.body) && a.body.map((para: string, i: number) => <p key={i} className="mt-4">{para}</p>)}
    </main>
  );
}
