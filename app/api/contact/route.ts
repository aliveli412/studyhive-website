import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/schemas";
import { buildContactEmail, sendEmail } from "@/lib/email";
import { footer } from "@/lib/content";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the form fields and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendEmail(buildContactEmail(parsed.data));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: `We couldn't send your message. Please email us directly at ${footer.email} or try again.`,
      },
      { status: 500 }
    );
  }
}
