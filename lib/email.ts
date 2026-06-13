import { Resend } from "resend";

/**
 * Sends emails via Resend.
 * Required env vars: RESEND_API_KEY, CONTACT_EMAIL
 * Optional: RESEND_FROM (defaults to onboarding@resend.dev — works without
 * domain verification but shows Resend's address as sender. Once Bee
 * verifies mystudyhive.co.uk in Resend, set this to e.g.
 * "Study Hive <hello@mystudyhive.co.uk>").
 */

type EmailPayload = {
  subject: string;
  replyTo: string;
  html: string;
  text: string;
};

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  const apiKey = getRequiredEnv("RESEND_API_KEY");
  const to = getRequiredEnv("CONTACT_EMAIL");
  const from =
    process.env.RESEND_FROM || "Study Hive <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
    replyTo: payload.replyTo,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}

// ── Templates ─────────────────────────────────────────────────────────────

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function emailHtml({
  title,
  fields,
  bodyLabel,
  bodyText,
  name,
}: {
  title: string;
  fields: Array<{ label: string; value: string; isLink?: boolean }>;
  bodyLabel: string;
  bodyText: string;
  name: string;
}): string {
  const rows = fields
    .map(
      (f) => `
      <tr>
        <td style="padding: 6px 0; color: #5C3A1F; font-size: 13px; width: 100px;">${escapeHtml(f.label)}</td>
        <td style="padding: 6px 0;">${
          f.isLink
            ? `<a href="mailto:${escapeHtml(f.value)}" style="color:#3D2418;">${escapeHtml(f.value)}</a>`
            : escapeHtml(f.value)
        }</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.5; color: #3D2418; max-width: 600px; margin: 0 auto; padding: 24px; background: #FEE2B0;">
  <div style="background:#FFFAF0; padding:32px; border-radius:12px;">
    <h2 style="margin: 0 0 16px; font-size: 20px; color:#3D2418;">${escapeHtml(title)}</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">${rows}</table>
    <div style="padding: 16px; background: #FEF8E7; border-radius: 8px; border-left: 4px solid #E8A93C;">
      <div style="font-size: 12px; color: #5C3A1F; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">${escapeHtml(bodyLabel)}</div>
      <div style="white-space: pre-wrap;">${escapeHtml(bodyText)}</div>
    </div>
    <p style="margin-top: 24px; font-size: 13px; color: #5C3A1F;">Reply directly to this email to respond to ${escapeHtml(name)}.</p>
  </div>
</body></html>`;
}

export function buildContactEmail(values: {
  titleSubject: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}): EmailPayload {
  const phone = values.phone || "(not provided)";
  const subject = `[Study Hive Enquiry] ${values.titleSubject}`;

  const text = [
    `New enquiry from the Study Hive website`,
    ``,
    `Subject: ${values.titleSubject}`,
    `Name:    ${values.name}`,
    `Email:   ${values.email}`,
    `Phone:   ${phone}`,
    ``,
    `Message:`,
    values.message,
    ``,
    `---`,
    `Reply to this email to respond directly to ${values.name}.`,
  ].join("\n");

  const html = emailHtml({
    title: "New enquiry from the Study Hive website",
    fields: [
      { label: "Subject", value: values.titleSubject },
      { label: "Name", value: values.name },
      { label: "Email", value: values.email, isLink: true },
      { label: "Phone", value: phone },
    ],
    bodyLabel: "Message",
    bodyText: values.message,
    name: values.name,
  });

  return { subject, replyTo: values.email, html, text };
}

export function buildTutorApplicationEmail(values: {
  titleSubject: string;
  name: string;
  email: string;
  phone?: string;
  application: string;
}): EmailPayload {
  const phone = values.phone || "(not provided)";
  const subject = `[Tutor Application] ${values.titleSubject}`;

  const text = [
    `New tutor application from the Study Hive website`,
    ``,
    `Subject: ${values.titleSubject}`,
    `Name:    ${values.name}`,
    `Email:   ${values.email}`,
    `Phone:   ${phone}`,
    ``,
    `Application:`,
    values.application,
    ``,
    `---`,
    `Reply to this email to respond directly to ${values.name}.`,
  ].join("\n");

  const html = emailHtml({
    title: "New tutor application from the Study Hive website",
    fields: [
      { label: "Subject", value: values.titleSubject },
      { label: "Name", value: values.name },
      { label: "Email", value: values.email, isLink: true },
      { label: "Phone", value: phone },
    ],
    bodyLabel: "Application",
    bodyText: values.application,
    name: values.name,
  });

  return { subject, replyTo: values.email, html, text };
}

export function buildReviewEmail(values: {
  name: string;
  email: string;
  tutorName?: string;
  review: string;
}): EmailPayload {
  const tutor = values.tutorName?.trim() || "(not provided)";
  const subject = `[Study Hive Review] Feedback from ${values.name}`;

  const text = [
    `New tutor review from the Study Hive website`,
    ``,
    `Name:   ${values.name}`,
    `Email:  ${values.email}`,
    `Tutor:  ${tutor}`,
    ``,
    `Review:`,
    values.review,
    ``,
    `---`,
    `Reply to this email to respond directly to ${values.name}.`,
  ].join("\n");

  const html = emailHtml({
    title: "New tutor review from the Study Hive website",
    fields: [
      { label: "Name", value: values.name },
      { label: "Email", value: values.email, isLink: true },
      { label: "Tutor", value: tutor },
    ],
    bodyLabel: "Review",
    bodyText: values.review,
    name: values.name,
  });

  return { subject, replyTo: values.email, html, text };
}
