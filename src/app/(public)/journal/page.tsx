import Link from "next/link";
import { getPublished } from "@/lib/public-data";
export const revalidate = 60;
export default async function Journal() {
  const rows = await getPublished("articles");
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Journal</h1>
      <ul className="flex flex-col gap-6">
        {rows.map((a: any) => (
          <li key={a.id}>
            <Link href={`/journal/${a.slug}`} className="text-xl font-semibold">{a.title}</Link>
            <p className="text-sm text-muted-foreground">{a.category} · {a.date} · {a.read_time}</p>
            <p className="mt-1">{a.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
