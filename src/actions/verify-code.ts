"use server";

import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function verifyCode(email: string, token: string) {
  try {
    if (!email || !token) return { ok: false, error: "Missing email or token" };

    const normalized = email.trim().toLowerCase();
    const t = token.trim();

    // Find unused, non-expired token
    const record = await (prisma as any).verificationToken.findFirst({
      where: {
        email: normalized,
        token: t,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!record) return { ok: false, error: "Invalid or expired code" };

    // Mark token used
    await (prisma as any).verificationToken.update({
      where: { id: record.id },
      data: { used: true },
    });

    // Create or find a user record (upsert ensures user exists).
    const user = await (prisma as any).user.upsert({
      where: { email: normalized },
      create: { email: normalized },
      update: {},
    });

    // Load restaurants linked to this user via the join table.
    const userRestaurants = await (prisma as any).userRestaurant.findMany({
      where: { userId: user.id },
      include: { restaurant: true },
    });

    const restaurants = (userRestaurants || []).map((ur: any) => {
      const r = ur.restaurant;
      return {
        id: r.id,
        slug: r.slug ?? null,
        name: r.name,
        defaultLocale: r.defaultLocale ?? "en",
      };
    });

    return { ok: true, restaurants, email: normalized };
  } catch (e) {
    console.error("verifyCode error", e);
    return { ok: false, error: "FAILED" };
  }
}
