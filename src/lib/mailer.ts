import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

// SMTP Gmail du studio (SMTP_USER, SMTP_PASS : mot de passe d'application
// Google), partage par les notifications de demandes et l'envoi des portraits.
// null sans identifiants : l'appelant n'envoie rien, sans echouer.

export function smtp(): { transport: Transporter; user: string } | null {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 8000,
    socketTimeout: 20000, // piece jointe de quelques Mo
  });
  return { transport, user };
}
