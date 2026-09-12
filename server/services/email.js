import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP credentials are not fully configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in your .env file.");
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

export async function sendNotification({ to, subject, html, attachments = [] }) {
  const transport = getTransporter();
  const from = process.env.SMTP_USER;

  await transport.sendMail({
    from: `SyncMind Automation <${from}>`,
    to,
    subject,
    html,
    attachments,
  });
}
