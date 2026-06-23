import { describe, it, expect } from "vitest";
import { projectSchema, articleSchema, slug } from "@/lib/schemas";

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
  it("coerces null DB columns to empty strings (edit path)", () => {
    const r = projectSchema.safeParse({
      slug: "lik", title: "LIK", client: "Rawdha", location: null,
      description: null, gradient: null, cover_url: null,
      role: [], stack: [], tags: [], gallery: [], sort_order: 1, published: true,
    });
    expect(r.success).toBe(true);
    if (r.success) { expect(r.data.location).toBe(""); expect(r.data.cover_url).toBe(""); }
  });
  it("maps empty article date to null (date column safe)", () => {
    const r = articleSchema.safeParse({ slug: "a", title: "A", date: "", body: [] });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.date).toBeNull();
  });
});
