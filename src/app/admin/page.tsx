import { listRows } from "@/lib/crud";
import { ENTITIES } from "@/lib/entities";

export default async function AdminHome() {
  const entries = await Promise.all(
    Object.values(ENTITIES).map(async (c) => [c.label, (await listRows(c.key)).length] as const),
  );
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {entries.map(([label, count]) => (
          <div key={label} className="rounded-lg border p-4">
            <div className="text-3xl font-bold">{count}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
