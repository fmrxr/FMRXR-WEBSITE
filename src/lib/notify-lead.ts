import "server-only";
import nodemailer from "nodemailer";

// Notification d'une nouvelle demande de projet, envoyée par le SMTP Gmail du
// studio. Trois variables d'environnement (à poser aussi sur Hostinger) :
//   SMTP_USER  adresse Gmail qui envoie (fmrxr.studio@gmail.com)
//   SMTP_PASS  mot de passe d'application Google (16 caractères), jamais le
//              mot de passe du compte
//   LEAD_NOTIFY_TO  destinataire, SMTP_USER par défaut
// Sans identifiants on n'envoie rien, et un échec d'envoi ne fait jamais
// échouer la demande : elle est déjà en base, le mail n'est qu'un signal.

type Lead = {
  name: string;
  email: string;
  company?: string | null;
  industry?: string | null;
  service?: string | null;
  budget?: string | null;
  timeline?: string | null;
  location?: string | null;
  message?: string | null;
  attachments?: { url: string; name?: string | null }[] | null;
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function notifyLead(lead: Lead): Promise<void> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.warn("[lead] SMTP_USER / SMTP_PASS absents : demande enregistrée sans notification");
    return;
  }
  const to = process.env.LEAD_NOTIFY_TO || user;

  const rows: [string, string | null | undefined][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Industry", lead.industry],
    ["Service", lead.service],
    ["Budget", lead.budget],
    ["Timeline", lead.timeline],
    ["Location", lead.location],
  ];
  const filled = rows.filter(([, v]) => v);
  const files = (lead.attachments ?? []).filter((a) => a?.url);
  const admin = "https://fmrxr.com/admin/requests";

  const text = [
    ...filled.map(([k, v]) => `${k}: ${v}`),
    "",
    lead.message || "(no message)",
    ...(files.length ? ["", "Attachments:", ...files.map((a) => `- ${a.name || a.url}: ${a.url}`)] : []),
    "",
    `Admin: ${admin}`,
  ].join("\n");

  const html = `<div style="font-family:system-ui,sans-serif;font-size:14px;color:#111;max-width:560px">
<p style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#666;margin:0 0 12px">FMRXR// · New project request</p>
<table style="border-collapse:collapse;width:100%">${filled
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0">${esc(String(v))}</td></tr>`,
    )
    .join("")}</table>
<p style="white-space:pre-wrap;line-height:1.5;border-top:1px solid #ddd;margin-top:12px;padding-top:12px">${esc(lead.message || "(no message)")}</p>
${files.length ? `<p>Attachments:<br>${files.map((a) => `<a href="${esc(a.url)}">${esc(a.name || a.url)}</a>`).join("<br>")}</p>` : ""}
<p style="margin-top:20px"><a href="${admin}" style="color:#111">Open in admin →</a></p>
</div>`;

  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
      connectionTimeout: 8000,
      socketTimeout: 8000,
    });
    await transport.sendMail({
      from: `"FMRXR// site" <${user}>`,
      to,
      // Répondre au mail répond directement au prospect.
      replyTo: { name: lead.name, address: lead.email },
      subject: `New request · ${lead.name}${lead.company ? ` (${lead.company})` : ""}${lead.service ? ` · ${lead.service}` : ""}`,
      text,
      html,
    });
  } catch (e) {
    console.error("[lead] notification non envoyée :", e instanceof Error ? e.message : e);
  }
}
