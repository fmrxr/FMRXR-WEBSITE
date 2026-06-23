import { describe, it, expect } from "vitest";
import { hasAllowedRole } from "@/lib/roles";

describe("hasAllowedRole", () => {
  it("allows when role present", () => {
    expect(hasAllowedRole(["editor"], ["admin", "editor"])).toBe(true);
  });
  it("denies when role absent", () => {
    expect(hasAllowedRole(["editor"], ["admin"])).toBe(false);
  });
  it("denies empty roles", () => {
    expect(hasAllowedRole([], ["admin", "editor"])).toBe(false);
  });
});
