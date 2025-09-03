import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export const runtime = "nodejs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : null;
    const token = typeof body?.token === "string" ? body.token.trim() : null;

    if (!email || !token) {
      return NextResponse.json(
        { ok: false, error: "Missing email or token" },
        { status: 400 }
      );
    }

    // Find unused, non-expired token
    const record = await (prisma as any).verificationToken.findFirst({
      where: {
        email,
        token,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!record) {
      return NextResponse.json(
        { ok: false, error: "Invalid or expired code" },
        { status: 400 }
      );
    }

    // Mark token used
    await (prisma as any).verificationToken.update({
      where: { id: record.id },
      data: { used: true },
    });

    // Create or find a user record (upsert ensures user exists).
    const user = await (prisma as any).user.upsert({
      where: { email },
      create: { email },
      update: {},
    });

    // Load restaurants linked to this user via the join table.
    const userRestaurants = await (prisma as any).userRestaurant.findMany({
      where: { userId: user.id },
      include: {
        restaurant: true,
      },
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

    // Build response: return restaurants array (may be empty).
    const res = NextResponse.json({
      ok: true,
      restaurants,
    });

    // Set auth cookie (same as before).
    res.cookies.set("gqm_auth", Buffer.from(email).toString("base64"), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return res;
  } catch (e) {
    console.error("verify-code error", e);
    return NextResponse.json({ ok: false, error: "FAILED" }, { status: 500 });
  }
}
