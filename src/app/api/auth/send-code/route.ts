import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { sendEmail } from "@/lib/brevo";

export const runtime = "nodejs";

const prisma = new PrismaClient();

function generateCode(length = 6) {
  return Array.from({ length })
    .map(() => Math.floor(Math.random() * 10).toString())
    .join("");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : null;

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Missing email" },
        { status: 400 }
      );
    }

    const token = generateCode(6);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

    // Persist token
    await (prisma as any).verificationToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    // Send email via Brevo
    const subject = "Your verification code";
    const htmlContent = `<p>Your verification code for Get QR Menu is:</p>
      <h2 style="letter-spacing:4px">${token}</h2>
      <p>The code expires in 10 minutes.</p>`;

    try {
      await sendEmail({
        to: [{ email }],
        subject,
        htmlContent,
      });
    } catch (err) {
      console.error("Brevo error:", err);
      // Still return OK to avoid leaking whether email sending failed, but log server side.
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("send-code error", e);
    return NextResponse.json({ ok: false, error: "FAILED" }, { status: 500 });
  }
}
