import Link from "next/link";
import { getPublished } from "@/lib/public-data";
export const revalidate = 60;
export default async function Services() {
  const services = await getPublished("services");
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Services</h1>
      <ul className="flex flex-col gap-4">
        {services.map((s: any) => (
          <li key={s.id} className="rounded-lg border p-4">
            <Link href={`/services/${s.slug}`} className="font-semibold">{s.title}</Link>
            <p className="text-sm text-muted-foreground">{s.short}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
