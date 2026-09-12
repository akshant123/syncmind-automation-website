import { appendRow } from "../services/google-sheets.js";
import { sendNotification } from "../services/email.js";

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function handleDemoRequest(req, res) {
  try {
    const {
      fullName,
      email,
      company,
      interestedIn,
      companySize,
      requirement,
    } = req.body || {};

    const errors = [];

    if (!fullName || !fullName.trim()) errors.push("Full name is required.");
    if (!email || !email.trim()) errors.push("Email is required.");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errors.push("Please provide a valid email address.");

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(" ") });
    }

    const timestamp = new Date().toISOString();
    const source = "Website — Request Demo";
    const status = "New";

    const row = [
      timestamp,
      fullName.trim(),
      email.trim(),
      (company || "").trim(),
      "", // Phone Number column (not collected in this form)
      (interestedIn || "").trim(),
      (companySize || "").trim(),
      (requirement || "").trim(),
      source,
      status,
    ];

    await appendRow(row);

    const notifyEmail = process.env.NOTIFY_EMAIL || "service@syncmindautomation.com";

    const html = `
      <div style="font-family:Arial,sans-serif;font-size:14px;color:#1a1a1a;line-height:1.6;">
        <h2 style="color:#1366d6;margin-bottom:16px;">New Request Demo Received</h2>
        <table style="border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 12px 6px 0;color:#555;font-weight:600;">Name:</td><td>${escapeHtml(fullName)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#555;font-weight:600;">Email:</td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#555;font-weight:600;">Company:</td><td>${escapeHtml(company) || "—"}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#555;font-weight:600;">Interested In:</td><td>${escapeHtml(interestedIn) || "—"}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#555;font-weight:600;">Company Size:</td><td>${escapeHtml(companySize) || "—"}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#555;font-weight:600;">Requirement:</td><td>${escapeHtml(requirement) || "—"}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#555;font-weight:600;">Submission Date &amp; Time:</td><td>${escapeHtml(timestamp)}</td></tr>
        </table>
        <p style="margin-top:20px;color:#888;font-size:12px;">This lead was captured from the SyncMind Automation website Request Demo form.</p>
      </div>
    `;

    await sendNotification({
      to: notifyEmail,
      subject: "New Request Demo Lead — SyncMind Automation",
      html,
    });

    return res.json({
      success: true,
      message:
        "Thank you. Your request has been received. Our team will contact you shortly.",
    });
  } catch (err) {
    console.error("Demo request error:", err.message);
    return res
      .status(500)
      .json({ error: "We couldn't process your request right now. Please try again." });
  }
}
