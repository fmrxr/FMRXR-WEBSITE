"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteLead, setLeadStatus } from "@/app/actions/leads";

export function RequestsPanel({ leads }: { leads: any[] }) {
  const router = useRouter();

  async function remove(id: string) {
    if (!confirm("Delete this request?")) return;
    await deleteLead(id);
    toast.success("Deleted");
    router.refresh();
  }
  async function toggle(id: string, status: string) {
    await setLeadStatus(id, status === "handled" ? "new" : "handled");
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex items-baseline justify-between">
        <h1 className="text-2xl font-bold">Requests</h1>
        <span className="text-sm text-muted-foreground">{leads.length} total</span>
      </div>

      {leads.length === 0 && <p className="text-muted-foreground">No requests yet.</p>}

      <div className="flex flex-col gap-3">
        {leads.map((l) => (
          <div key={l.id} className="rounded-lg border p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">
                  {l.name} <span className="font-normal text-muted-foreground">· {l.email}</span>
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {[l.company, l.industry, l.service].filter(Boolean).join(" · ")}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wide ${
                  l.status === "handled" ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
                }`}
              >
                {l.status}
              </span>
            </div>

            {l.message && <p className="mt-3 whitespace-pre-line text-sm">{l.message}</p>}

            {Array.isArray(l.attachments) && l.attachments.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {l.attachments.map((f: any, i: number) => (
                  <a
                    key={i}
                    href={f.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border bg-muted/40 px-2.5 py-1 text-xs hover:bg-muted"
                  >
                    {(f.type?.split("/")[0] || "file")} · {f.name}
                  </a>
                ))}
              </div>
            )}

            <div className="mt-3 flex items-center gap-3 border-t pt-3 text-xs text-muted-foreground">
              <span>{new Date(l.created_at).toLocaleString()}</span>
              <a href={`mailto:${l.email}`} className="underline">Reply</a>
              <Button variant="ghost" size="sm" onClick={() => toggle(l.id, l.status)}>
                {l.status === "handled" ? "Mark new" : "Mark handled"}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => remove(l.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
