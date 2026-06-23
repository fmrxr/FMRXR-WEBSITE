import Link from "next/link";
import { getPublished, getAll, getSiteSettings } from "@/lib/public-data";

export const revalidate = 60;

export default async function Home() {
  const [settings, projects, services, clients] = await Promise.all([
    getSiteSettings(), getPublished("projects"), getPublished("services"), getAll("clients"),
  ]);
  return (
    <main className="mx-auto max-w-5xl p-8">
      <section className="py-16">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{settings.tagline}</p>
        <h1 className="mt-2 text-5xl font-black">FMRXR//</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{settings.description}</p>
      </section>
      <section className="py-8">
        <h2 className="mb-4 text-xl font-bold">Selected work</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {projects.slice(0, 6).map((p: any) => (
            <li key={p.id} className="rounded-lg border p-4">
              <Link href={`/projects/${p.slug}`}><span className="font-semibold">{p.title}</span></Link>
              <p className="text-sm text-muted-foreground">{p.client} · {p.year}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="py-8">
        <h2 className="mb-4 text-xl font-bold">Services</h2>
        <ul className="flex flex-wrap gap-2">
          {services.map((s: any) => <li key={s.id} className="rounded border px-3 py-1 text-sm">{s.title}</li>)}
        </ul>
      </section>
      <section className="py-8">
        <h2 className="mb-4 text-xl font-bold">Clients</h2>
        <p className="text-sm text-muted-foreground">{clients.map((c: any) => c.name).join(" · ")}</p>
      </section>
    </main>
  );
}
