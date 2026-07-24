import { describe, it, expect } from "vitest";
import { docSeqPrefix, nextDocRef, parseRefSeq, itemsTotal, buildDocumentHtml, documentFilename } from "@/lib/os/document";

describe("docSeqPrefix", () => {
  it("derives the client code from letters only, uppercased, max 4 chars", () => {
    expect(docSeqPrefix("invoice", "Rawdha Abdallah", 2026)).toBe("FMRXR-RAWD-2026-");
    expect(docSeqPrefix("quote", "Rawdha Abdallah", 2026)).toBe("FMRXR-DEV-RAWD-2026-");
  });

  it("falls back to CLI when the client name has no letters", () => {
    expect(docSeqPrefix("invoice", "123", 2026)).toBe("FMRXR-CLI-2026-");
    expect(docSeqPrefix("invoice", "", 2026)).toBe("FMRXR-CLI-2026-");
  });
});

describe("nextDocRef", () => {
  it("uses existingCount+1 when nothing is stored in meta.seq", () => {
    expect(nextDocRef("invoice", "CRK Maroquinerie", 2026, 0, undefined)).toBe("FMRXR-CRKM-2026-01");
    expect(nextDocRef("invoice", "CRK Maroquinerie", 2026, 2, undefined)).toBe("FMRXR-CRKM-2026-03");
  });

  it("takes the max of stored seq and existingCount, so manual ref edits aren't overwritten", () => {
    const stored = { "FMRXR-CRKM-2026-": 5 };
    expect(nextDocRef("invoice", "CRK Maroquinerie", 2026, 1, stored)).toBe("FMRXR-CRKM-2026-06");
  });

  it("pads the sequence number to 2 digits", () => {
    expect(nextDocRef("invoice", "CRK", 2026, 8, undefined)).toBe("FMRXR-CRK-2026-09");
  });
});

describe("parseRefSeq", () => {
  it("splits a ref into its prefix and numeric suffix", () => {
    expect(parseRefSeq("FMRXR-RAWD-2026-03")).toEqual({ key: "FMRXR-RAWD-2026-", value: 3 });
  });

  it("returns null when there's no trailing number", () => {
    expect(parseRefSeq("no-digits-here")).toBeNull();
  });
});

describe("itemsTotal", () => {
  it("sums qty * unit price across items", () => {
    expect(
      itemsTotal([
        { title: "A", qty: 2, pu: 100 },
        { title: "B", qty: 1, pu: 50 },
      ]),
    ).toBe(250);
  });

  it("returns 0 for no items", () => {
    expect(itemsTotal([])).toBe(0);
  });
});

describe("buildDocumentHtml / documentFilename", () => {
  const baseInput = {
    kind: "invoice" as const,
    ref: "FMRXR-RAWD-2026-01",
    clientName: "Rawdha Abdallah",
    items: [{ title: "Direction visuelle", qty: 1, pu: 2000 }],
    currency: "TND" as const,
    issued: "2026-07-23",
    due: "à réception",
    conditions: "Réglement à réception.",
  };

  const fmt = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  it("produces a self-contained HTML document with the branded toolbar", () => {
    const html = buildDocumentHtml(baseInput);
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("FMRXR-RAWD-2026-01");
    expect(html).toContain(`${fmt(2000)} TND`);
    expect(html).toContain("✏️ Éditer");
    expect(html).toContain("⟲ Réinitialiser");
    expect(html).toContain("💾 Enregistrer");
    expect(html).toContain("⬇ PDF");
    expect(html).toContain("localStorage");
  });

  it("shows 'reste à payer' when an advance was received on an invoice", () => {
    const html = buildDocumentHtml({ ...baseInput, advance: 500 });
    expect(html).toContain("Reste à payer");
    expect(html).toContain(`${fmt(1500)} TND`);
  });

  it("shows 'acompte à la commande' instead, for a quote", () => {
    const html = buildDocumentHtml({ ...baseInput, kind: "quote", advance: 500 });
    expect(html).toContain("Acompte à la commande");
    expect(html).not.toContain("Reste à payer");
  });

  it("names the file by document kind and ref", () => {
    expect(documentFilename(baseInput)).toBe("FMRXR_Facture_FMRXR-RAWD-2026-01.html");
    expect(documentFilename({ ...baseInput, kind: "quote" })).toBe("FMRXR_Devis_FMRXR-RAWD-2026-01.html");
  });
});
