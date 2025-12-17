import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

type Body = {
  name?: string;
  phone?: string;
  email?: string;
  requestType?: string;
  message?: string;
  // honeypot
  company?: string;
};

function badRequest(res: VercelResponse, msg: string) {
  return res.status(400).json({ ok: false, error: msg });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = (req.body || {}) as Body;

  // basic spam trap
  if (body.company && body.company.trim().length) {
    return res.status(200).json({ ok: true });
  }

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  const email = (body.email || "").trim();
  const requestType = (body.requestType || "").trim();
  const message = (body.message || "").trim();

  if (!name) return badRequest(res, "Numele este obligatoriu.");
  if (!phone) return badRequest(res, "Telefonul este obligatoriu.");
  if (!requestType) return badRequest(res, "Tipul solicitării este obligatoriu.");
  if (!message) return badRequest(res, "Mesajul este obligatoriu.");

  // Conform Zoho EU: smtppro.zoho.eu (465 SSL / 587 TLS)
  const smtpHost = process.env.ZOHO_SMTP_HOST || "smtppro.zoho.eu";
  const smtpPort = Number(process.env.ZOHO_SMTP_PORT || 465);
  const smtpSecure =
    (process.env.ZOHO_SMTP_SECURE || "").toLowerCase() === "true" ||
    smtpPort === 465;
  const smtpUser = process.env.ZOHO_SMTP_USER;
  const smtpPass = process.env.ZOHO_SMTP_PASS;

  const to = process.env.CONTACT_TO || "office@clinica-veterinara-timisoara.ro";
  const from = process.env.CONTACT_FROM || smtpUser || to;

  if (!smtpUser || !smtpPass) {
    return res.status(500).json({
      ok: false,
      error: "SMTP not configured (ZOHO_SMTP_USER/ZOHO_SMTP_PASS).",
    });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const subject = `[Contact] ${requestType} – ${name}`;
  const text = [
    `Nume: ${name}`,
    `Telefon: ${phone}`,
    `Email: ${email || "-"}`,
    `Tip solicitare: ${requestType}`,
    "",
    "Mesaj:",
    message,
  ].join("\n");

  try {
    // confirmă conexiunea/configurația SMTP (nu loghează credențiale)
    await transporter.verify();

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      replyTo: email || undefined,
    });

    console.log("contact_email_sent", {
      to,
      from,
      messageId: info.messageId,
      requestType,
    });

    return res.status(200).json({ ok: true, messageId: info.messageId });
  } catch (err: any) {
    console.error("contact_email_error", {
      message: err?.message,
      code: err?.code,
      response: err?.response,
      command: err?.command,
    });
    return res.status(500).json({
      ok: false,
      error:
        err?.message ||
        "Eroare la trimiterea emailului (verifică SMTP/Zoho).",
    });
  }
}


