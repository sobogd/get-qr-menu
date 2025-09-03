"use server";

import { PrismaClient } from "@/generated/prisma";
import { sendEmail } from "@/lib/brevo";

const prisma = new PrismaClient();

function generateCode(length = 6) {
  return Array.from({ length })
    .map(() => Math.floor(Math.random() * 10).toString())
    .join("");
}

export async function sendVerificationCode(email: string) {
  try {
    if (!email || typeof email !== "string") {
      return { ok: false, error: "Missing email" };
    }

    const normalized = email.trim().toLowerCase();
    if (!normalized) return { ok: false, error: "Missing email" };

    const token = generateCode(6);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

    await (prisma as any).verificationToken.create({
      data: {
        email: normalized,
        token,
        expiresAt,
      },
    });

    const subject = "Your verification code";
    const htmlContent = `<p>Your verification code for Get QR Menu is:</p>
      <h2 style="letter-spacing:4px">${token}</h2>
      <p>The code expires in 10 minutes.</p>`;

    try {
      await sendEmail({
        to: [{ email: normalized }],
        subject,
        htmlContent,
      });
    } catch (err) {
      console.error("Brevo error:", err);
    }

    return { ok: true };
  } catch (e) {
    console.error("sendVerificationCode error", e);
    return { ok: false, error: "FAILED" };
  }
}
