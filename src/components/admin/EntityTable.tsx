"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { ENTITIES } from "@/lib/entities";
import { deleteEntity, reorderEntity } from "@/app/actions/crud";

export function EntityTable({ entityKey, rows }: { entityKey: string; rows: any[] }) {
  const config = ENTITIES[entityKey];
  const router = useRouter();
  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    await deleteEntity(config.key, id); toast.success("Deleted"); router.refresh();
  }
  async function move(i: number, dir: -1 | 1) {
    const next = [...rows];
    const j = i + dir; if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    await reorderEntity(config.key, next.map((r) => r.id)); router.refresh();
  }
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{config.label}s</h1>
        <Link href={`/admin/${config.key}/new`} className={buttonVariants()}>+ New</Link>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id} className="border-b">
              <td className="py-2">{r[config.titleField]}</td>
              <td className="py-2 text-muted-foreground">{config.publishable ? (r.published ? "published" : "draft") : ""}</td>
              <td className="py-2 text-right">
                {config.ordered && (<>
                  <Button variant="ghost" size="sm" onClick={() => move(i, -1)}>↑</Button>
                  <Button variant="ghost" size="sm" onClick={() => move(i, 1)}>↓</Button>
                </>)}
                <Link href={`/admin/${config.key}/${r.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>Edit</Link>
                <Button variant="ghost" size="sm" onClick={() => remove(r.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
