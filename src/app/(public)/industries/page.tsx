import Link from "next/link";
import { getPublished } from "@/lib/public-data";
export const revalidate = 60;
export default async function Industries() {
  const rows = await getPublished("industries");
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Industries</h1>
      <ul className="grid gap-3 md:grid-cols-2">
        {rows.map((r: any) => (
          <li key={r.id} className="rounded border p-4">
            <Link href={`/industries/${r.slug}`} className="font-semibold">{r.name}</Link>
            <p className="text-sm text-muted-foreground">{r.note}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
