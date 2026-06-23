import { describe, it, expect } from "vitest";
import { ENTITIES } from "@/lib/entities";

describe("entity schemas via registry", () => {
  it("projects rejects bad slug", () => {
    const r = ENTITIES.projects.schema.safeParse({ slug: "Bad Slug", title: "X" });
    expect(r.success).toBe(false);
  });
  it("services accepts valid", () => {
    const r = ENTITIES.services.schema.safeParse({ slug: "xr", title: "XR" });
    expect(r.success).toBe(true);
  });
});
