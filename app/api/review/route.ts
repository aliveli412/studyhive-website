import { NextResponse } from "next/server";
import { reviewFormSchema } from "@/lib/schemas";
import { buildReviewEmail, sendEmail } from "@/lib/email";
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

  const parsed = reviewFormSchema.safeParse(body);
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
    await sendEmail(buildReviewEmail(parsed.data));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Review form error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: `We couldn't send your review. Please email us directly at ${footer.email} or try again.`,
      },
      { status: 500 }
    );
  }
}
