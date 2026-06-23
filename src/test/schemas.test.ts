import { describe, it, expect } from "vitest";
import { projectSchema, slug } from "@/lib/schemas";

describe("schemas", () => {
  it("accepts a valid slug", () => {
    expect(slug.safeParse("art-basel-2025").success).toBe(true);
  });
  it("rejects an invalid slug", () => {
    expect(slug.safeParse("Art Basel").success).toBe(false);
  });
  it("rejects empty project title", () => {
    expect(projectSchema.safeParse({ slug: "x", title: "" }).success).toBe(false);
  });
  it("accepts a minimal project", () => {
    expect(projectSchema.safeParse({ slug: "x", title: "X" }).success).toBe(true);
  });
});
