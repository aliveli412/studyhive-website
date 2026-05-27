import { NextResponse } from "next/server";
import { tutorApplicationSchema } from "@/lib/schemas";
import { buildTutorApplicationEmail, sendEmail } from "@/lib/email";

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

  const parsed = tutorApplicationSchema.safeParse(body);
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
    await sendEmail(buildTutorApplicationEmail(parsed.data));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Tutor application form error:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't send your application. Please email us directly at ask.studyhive@gmail.com or try again.",
      },
      { status: 500 }
    );
  }
}
