import { sendNotification } from "../services/email.js";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function handleCareerApplication(req, res) {
  try {
    const { fullName, jobRole, fileName, fileType, fileSize, fileBase64 } =
      req.body || {};

    const errors = [];

    if (!fullName || !fullName.trim()) errors.push("Full name is required.");
    if (!jobRole || !jobRole.trim()) errors.push("Job role is required.");

    if (!fileName || !fileBase64) {
      errors.push("Please upload your resume.");
    } else {
      const lowerName = fileName.toLowerCase();
      const extOk = ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
      if (!extOk) {
        errors.push("Only PDF, DOC, or DOCX files are allowed.");
      } else if (fileSize && fileSize > MAX_FILE_SIZE) {
        errors.push("File too large. Maximum size is 5MB.");
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(" ") });
    }

    const timestamp = new Date().toISOString();
    const notifyEmail =
      process.env.NOTIFY_EMAIL || "service@syncmindautomation.com";

    const html = `
      <div style="font-family:Arial,sans-serif;font-size:14px;color:#1a1a1a;line-height:1.6;">
        <h2 style="color:#1366d6;margin-bottom:16px;">New Career Application Received</h2>
        <table style="border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 12px 6px 0;color:#555;font-weight:600;">Applicant Name:</td><td>${escapeHtml(fullName)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#555;font-weight:600;">Applied For:</td><td>${escapeHtml(jobRole)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#555;font-weight:600;">Resume:</td><td>${escapeHtml(fileName)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#555;font-weight:600;">Application Date &amp; Time:</td><td>${escapeHtml(timestamp)}</td></tr>
        </table>
        <p style="margin-top:20px;color:#888;font-size:12px;">The resume file is attached to this email.</p>
      </div>
    `;

    const buffer = Buffer.from(fileBase64, "base64");

    await sendNotification({
      to: notifyEmail,
      subject: `New Career Application — ${jobRole} — ${fullName}`,
      html,
      attachments: [
        {
          filename: fileName,
          content: buffer,
          contentType: fileType || "application/octet-stream",
        },
      ],
    });

    return res.json({
      success: true,
      message:
        "Thank you for applying. Your application has been received successfully.",
    });
  } catch (err) {
    console.error("Career application error:", err.message);
    return res
      .status(500)
      .json({
        error:
          "We couldn't submit your application right now. Please try again.",
      });
  }
}
