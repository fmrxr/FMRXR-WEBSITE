import { describe, it, expect, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { DEFAULT_CONFIG, privacyText, resolveConfig, type CampaignConfig } from "@/lib/photobooth/config";
import { laplacianVariance, meanLuma, photoIssues } from "@/lib/photobooth/photo-check";
import { contactsCsv, isEmail, parseContact, portraitMail } from "@/lib/photobooth/contact";
import { computeStats, type StatRow } from "@/lib/photobooth/stats";
import { anonymize } from "@/lib/photobooth/purge";
import { buildMoodProfile, buildPortraitPrompt, PROMPT_MAX } from "@/lib/photobooth/mood";
import { STYLE_IDS, STYLES } from "@/lib/photobooth/styles";

// Options du 16/10/2026 : controle de la photo, email, contacts, statistiques,
// conservation, portrait professionnel.

const lead = (patch: Partial<CampaignConfig["leadCapture"]> = {}): CampaignConfig => ({
  ...DEFAULT_CONFIG, leadCapture: { ...DEFAULT_CONFIG.leadCapture, enabled: true, ...patch },
});

describe("configuration des options", () => {
  it("par defaut : email inclus, options payantes coupees, 30 jours de conservation", () => {
    const r = resolveConfig({});
    expect(r.ok && r.config.emailDelivery).toBe(true);
    expect(r.ok && r.config.leadCapture.enabled).toBe(false);
    expect(r.ok && r.config.liveWall).toBe(false);
    expect(r.ok && r.config.retentionDays).toBe(30);
  });
  it("une surcharge partielle du formulaire garde le reste par defaut", () => {
    const r = resolveConfig({ leadCapture: { enabled: true } });
    expect(r.ok && r.config.leadCapture.fields).toEqual(["name", "email"]);
    expect(r.ok && r.config.leadCapture.optIn.fr).toBeTruthy();
  });
  it("conservation bornee (7 a 90 jours)", () => {
    expect(resolveConfig({ retentionDays: 3 }).ok).toBe(false);
    expect(resolveConfig({ retentionDays: 120 }).ok).toBe(false);
  });
  it("la mention de confidentialite affiche la duree de conservation", () => {
    expect(privacyText({ ...DEFAULT_CONFIG, retentionDays: 14 }, "fr")).toContain("14 jours");
    expect(privacyText(DEFAULT_CONFIG, "en")).not.toContain("{days}");
  });
});

describe("controle de la photo avant l'envoi", () => {
  const ok = { faces: [{ x: 0.3, y: 0.2, w: 0.35, h: 0.4 }], luma: 120, sharpness: 200, eyesClosed: 0.05 };
  it("une bonne photo passe sans remarque", () => expect(photoIssues(ok, "solo")).toEqual([]));
  it("aucun visage : seul defaut annonce (il bloque l'envoi)", () => {
    expect(photoIssues({ ...ok, faces: [] }, "solo")).toEqual(["no_face"]);
  });
  it("trop loin, coupe, sombre, flou, yeux fermes", () => {
    expect(photoIssues({ ...ok, faces: [{ x: 0.45, y: 0.4, w: 0.06, h: 0.08 }] }, "solo")).toContain("far");
    expect(photoIssues({ ...ok, faces: [{ x: -0.05, y: 0.2, w: 0.3, h: 0.4 }] }, "solo")).toContain("cut");
    expect(photoIssues({ ...ok, luma: 30 }, "solo")).toContain("dark");
    expect(photoIssues({ ...ok, luma: 240 }, "solo")).toContain("bright");
    expect(photoIssues({ ...ok, sharpness: 5 }, "solo")).toContain("blur");
    expect(photoIssues({ ...ok, eyesClosed: 0.9 }, "solo")).toContain("eyes_closed");
  });
  it("en groupe, des visages plus petits sont acceptes", () => {
    const g = { ...ok, faces: [{ x: 0.1, y: 0.3, w: 0.07, h: 0.09 }, { x: 0.6, y: 0.3, w: 0.07, h: 0.09 }] };
    expect(photoIssues(g, "group")).not.toContain("far");
    expect(photoIssues(g, "solo")).toContain("far");
  });
  it("mesures : luminance et nettete", () => {
    const flat = new Uint8ClampedArray(10 * 10 * 4).fill(128);
    expect(Math.round(meanLuma(flat))).toBe(128);
    expect(laplacianVariance(flat, 10, 10)).toBe(0);
    const checker = new Uint8ClampedArray(10 * 10 * 4);
    for (let i = 0; i < 100; i++) { const v = ((i % 10) + Math.floor(i / 10)) % 2 ? 255 : 0; checker.set([v, v, v, 255], i * 4); }
    expect(laplacianVariance(checker, 10, 10)).toBeGreaterThan(1000);
  });
});

describe("email et formulaire de contact", () => {
  it("validation de l'email", () => {
    expect(isEmail("guest@example.com")).toBe(true);
    expect(isEmail("pas un email")).toBe(false);
    expect(isEmail("a@b")).toBe(false);
  });
  it("sans option : l'email seul, pour recevoir le portrait, aucun contact enregistre", () => {
    const r = parseContact({ email: "guest@example.com", name: "X" }, DEFAULT_CONFIG);
    expect(r.ok && r.contact).toBeNull();
    expect(r.ok && r.delivery?.email).toBe("guest@example.com");
  });
  it("sans option ni envoi par email : refuse", () => {
    expect(parseContact({ email: "guest@example.com" }, { ...DEFAULT_CONFIG, emailDelivery: false }).ok).toBe(false);
  });
  it("avec option : champs exiges, case marketing jamais cochee par defaut", () => {
    expect(parseContact({ email: "guest@example.com" }, lead()).ok).toBe(false); // nom manquant
    const r = parseContact({ email: "guest@example.com", name: "  Amina  " }, lead());
    expect(r.ok && r.contact).toMatchObject({ name: "Amina", email: "guest@example.com", optIn: false });
    const y = parseContact({ email: "guest@example.com", name: "Amina", optIn: true }, lead());
    expect(y.ok && y.contact?.optIn).toBe(true);
  });
  it("telephone seul accepte quand l'email n'est pas demande", () => {
    const r = parseContact({ name: "Sami", phone: "+216 56 000 000" }, lead({ fields: ["name", "phone"] }));
    expect(r.ok && r.contact?.phone).toBe("+216 56 000 000");
    expect(r.ok && r.delivery).toBeNull();
    expect(parseContact({ name: "Sami", phone: "12" }, lead({ fields: ["name", "phone"] })).ok).toBe(false);
  });
  it("export CSV : en-tete, guillemets, BOM pour Excel", () => {
    const csv = contactsCsv([{ date: "2026-10-16T10:00:00Z", title: "Calme, editorial", contact: { name: 'A "B"', email: "a@b.co", optIn: true, at: "" } }]);
    expect(csv.startsWith("﻿date,name,email")).toBe(true);
    expect(csv).toContain('"A ""B"""');
    expect(csv).toContain(",yes,");
  });
  it("mail du portrait : langue de l'invite, image en ligne, mention IA, sans tiret cadratin", () => {
    const m = portraitMail({ locale: "en", title: "Still", campaign: "Launch", shareLink: "https://fmrxr.com/x" });
    expect(m.subject).toBe("Your portrait · Launch");
    expect(m.html).toContain('src="cid:portrait"');
    expect(m.text).toContain("artificial intelligence");
    expect(m.html + m.text).not.toContain("—");
    expect(portraitMail({ locale: "ar", title: "", campaign: "X", shareLink: null }).html).toContain('dir="rtl"');
  });
});

describe("statistiques de la galerie", () => {
  const row = (style: string, at: string, extra: StatRow["mood"] = {}): StatRow => ({ status: "succeeded", completed_at: at, mood: { style, ...extra } });
  it("compte portraits, styles, emails, contacts et pic", () => {
    const s = computeStats([
      row("tarot", "2026-10-16T18:05:00Z", { delivery: { sentAt: "x" }, contact: { optIn: true } }),
      row("tarot", "2026-10-16T18:40:00Z", { shot: "group", contact: { optIn: false } }),
      row("card", "2026-10-16T20:10:00Z", { delivery: { sentAt: "x", error: "SMTP" } }),
      { status: "failed", completed_at: null, mood: null },
    ], { shareViews: 7, downloads: 3 });
    expect(s.portraits).toBe(3);
    expect(s.groups).toBe(1);
    expect(s.failed).toBe(1);
    expect(s.styles[0]).toMatchObject({ id: "tarot", count: 2 });
    expect([s.emailsRequested, s.emailsSent]).toEqual([2, 1]);
    expect([s.contacts, s.optIns]).toEqual([2, 1]);
    expect(s.peak).toBe("19h"); // Africa/Tunis = UTC+1
    expect(s.shareViews).toBe(7);
  });
  it("evenement sur plusieurs jours : chronologie par jour", () => {
    const s = computeStats([row("mood", "2026-10-15T12:00:00Z"), row("mood", "2026-10-16T12:00:00Z")], { shareViews: 0, downloads: 0 });
    expect(s.timeline.map((t) => t.label)).toEqual(["15/10", "16/10"]);
  });
});

describe("fin de conservation", () => {
  it("efface coordonnees, adresse, photo source et visages ; garde les statistiques anonymes", () => {
    const out = anonymize({
      style: "tarot", shot: "solo", title: { fr: "XIX" }, face: { x: 0 },
      submission: { imageUrl: "https://hf/x" },
      contact: { name: "A", email: "a@b.co", optIn: true, at: "t" },
      delivery: { email: "a@b.co", at: "t", sentAt: "s" },
    });
    expect(out).toMatchObject({ style: "tarot", shot: "solo", hidden: true, purged: true, contact: { optIn: true }, delivery: { sentAt: "s" } });
    expect(JSON.stringify(out)).not.toContain("a@b.co");
    expect(out).not.toHaveProperty("submission");
    expect(out).not.toHaveProperty("face");
  });
});

describe("portrait professionnel", () => {
  const mood = buildMoodProfile(["bold", "experimental", "digital"], DEFAULT_CONFIG, "seed-1", null, "solo", "headshot");
  const prompt = buildPortraitPrompt(mood, DEFAULT_CONFIG);
  it("fait partie des styles, marque nouveau", () => {
    expect(STYLE_IDS).toContain("headshot");
    expect(STYLES.headshot.isNew).toBe(true);
  });
  it("fond de studio neutre impose, a la place du decor et de la lumiere de l'ambiance", () => {
    expect(prompt).toContain("seamless studio backdrop");
    expect(prompt).toContain("softbox");
    expect(prompt).not.toContain(DEFAULT_CONFIG.setDirection!.slice(0, 40));
    expect(prompt).not.toContain("coloured gel lighting");
  });
  it("garde la pose et l'identite, sous la limite de Higgsfield", () => {
    expect(prompt).toContain("POSE (must not change)");
    expect(prompt).toContain("IDENTITY (must not change)");
    expect(prompt.length).toBeLessThanOrEqual(PROMPT_MAX);
  });
});
