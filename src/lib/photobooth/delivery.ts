import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { smtp } from "@/lib/mailer";
import { resolveConfig } from "./config";
import { portraitMail, type Contact, type Delivery } from "./contact";
import { createSupabaseDb, getProvider, portraitImage, shareUrl, warmPortrait } from "./server";
import { pollGeneration } from "./service";

// Envoi du portrait par email : l'invite laisse son adresse pendant la
// generation et peut partir, la borne passe au suivant. Le serveur suit la
// generation lui-meme (la borne a pu revenir a l'accueil) et envoie une seule
// fois : la ligne est « reservee » (delivery.sentAt) avant l'envoi.

type Mood = Record<string, unknown> & { contact?: Contact; delivery?: Delivery; title?: Record<string, string>; locale?: string };

/** Ajoute contact et/ou adresse d'envoi au profil, sans toucher au reste. */
export async function saveContact(usageId: string, patch: { contact?: Contact | null; delivery?: Delivery | null }) {
  const sb = getSupabaseAdmin();
  const { data } = await sb.from("photobooth_usage").select("mood").eq("id", usageId).maybeSingle();
  const mood = (data?.mood ?? {}) as Mood;
  const next: Mood = { ...mood };
  if (patch.contact) next.contact = patch.contact;
  // Une adresse deja servie n'est pas renvoyee une deuxieme fois.
  if (patch.delivery && !mood.delivery?.sentAt) next.delivery = patch.delivery;
  await sb.from("photobooth_usage").update({ mood: next }).eq("id", usageId);
}

export type DeliverOutcome = "sent" | "pending" | "skipped" | "failed";

export async function deliverPortrait(usageId: string): Promise<DeliverOutcome> {
  const sb = getSupabaseAdmin();
  const { data } = await sb.from("photobooth_usage")
    .select("id, campaign_id, status, result_url, share_token, mood, campaign:photobooth_campaigns(name, config)")
    .eq("id", usageId).maybeSingle();
  if (!data) return "skipped";
  const mood = (data.mood ?? {}) as Mood;
  const d = mood.delivery;
  if (!d?.email || d.sentAt || mood.hidden) return "skipped";
  if (data.status === "failed" || data.status === "cancelled") return "skipped";
  if (data.status !== "succeeded" || !data.result_url) return "pending";
  const mail = smtp();
  if (!mail) {
    await sb.from("photobooth_usage").update({ mood: { ...mood, delivery: { ...d, error: "SMTP_NOT_CONFIGURED" } } }).eq("id", usageId);
    return "failed";
  }

  // Reservation : seule la requete qui passe sentAt de vide a une date envoie.
  const sentAt = new Date().toISOString();
  const { data: claimed } = await sb.from("photobooth_usage")
    .update({ mood: { ...mood, delivery: { ...d, sentAt, error: null } } })
    .eq("id", usageId).is("mood->delivery->>sentAt", null).select("id");
  if (!claimed?.length) return "skipped";

  const campaign = (Array.isArray(data.campaign) ? data.campaign[0] : data.campaign) as { name: string; config: unknown } | null;
  const cfg = resolveConfig(campaign?.config);
  const loc = mood.locale === "en" || mood.locale === "ar" ? mood.locale : "fr";
  const campaignTitle = cfg.ok ? cfg.config.title[loc] : campaign?.name ?? "FMRXR";
  const share = cfg.ok && cfg.config.shareEnabled && data.share_token ? shareUrl(data.share_token as string) : null;
  try {
    const image = await portraitImage(data.result_url, usageId, null);
    if (!image) throw new Error("IMAGE_UNAVAILABLE");
    const m = portraitMail({ locale: mood.locale, title: mood.title?.[loc] ?? "", campaign: campaignTitle, shareLink: share });
    await mail.transport.sendMail({
      from: `"${campaignTitle.replace(/"/g, "")} · FMRXR//" <${mail.user}>`,
      to: d.email,
      subject: m.subject,
      text: m.text,
      html: m.html,
      attachments: [{ filename: "portrait.jpg", content: image, contentType: "image/jpeg", cid: "portrait" }],
    });
    await sb.from("photobooth_audit").insert({ campaign_id: data.campaign_id, actor: null, action: "email_sent", before: null, after: { usage_id: usageId } });
    return "sent";
  } catch (e) {
    // Echec : l'erreur est notee, pas de deuxieme tentative automatique (pas de doublon).
    await sb.from("photobooth_usage").update({ mood: { ...mood, delivery: { ...d, sentAt, error: e instanceof Error ? e.message.slice(0, 120) : "SEND_FAILED" } } }).eq("id", usageId);
    return "failed";
  }
}

// Suivi en tache de fond, une fois par portrait et par processus.
const WATCHING = new Set<string>();

/** Suit la generation jusqu'au portrait (4 min au plus), puis l'envoie. */
export function watchAndDeliver(usageId: string) {
  if (WATCHING.has(usageId)) return;
  WATCHING.add(usageId);
  void (async () => {
    const provider = getProvider();
    const db = createSupabaseDb();
    for (let i = 0; i < 48; i++) {
      const out = await deliverPortrait(usageId).catch(() => "failed" as const);
      if (out !== "pending") return;
      if (provider) {
        const r = await pollGeneration(usageId, null, { db, provider }).catch(() => null);
        if (r?.status === "succeeded") {
          const u = await db.getUsage(usageId);
          if (u?.result_url) warmPortrait(u.result_url, usageId);
        }
      }
      await new Promise((r) => setTimeout(r, 5000));
    }
  })().finally(() => WATCHING.delete(usageId));
}
