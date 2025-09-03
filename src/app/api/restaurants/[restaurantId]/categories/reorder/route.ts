import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export const runtime = "nodejs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ restaurantId: string }> }
) {
  const { restaurantId } = await params;
  const body = await req.json().catch(() => ({}));
  const order: string[] = Array.isArray(body.order) ? body.order : [];
  if (!restaurantId || order.length === 0) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const prisma = new PrismaClient();
  try {
    // restaurantId param may be a slug (e.g. 'tasty-bites-cafe') or a UUID id.
    const isUuid = (s: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        s
      );
    const categories = await prisma.category.findMany({
      where: isUuid(restaurantId)
        ? { restaurantId }
        : { restaurant: { slug: restaurantId } },
    });
    const map = new Map(order.map((id, idx) => [id, idx * 10]));
    const updates = categories
      .filter((c) => map.has(c.id))
      .map((c) =>
        prisma.category.update({
          where: { id: c.id },
          data: { sortIndex: map.get(c.id) },
        })
      );
    if (updates.length > 0) {
      await Promise.all(updates);
    }
    return NextResponse.json({ ok: true });
  } finally {
    await prisma.$disconnect();
  }
}
