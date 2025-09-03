import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export const runtime = "nodejs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ restaurantId: string }> }
) {
  const { restaurantId } = await params;
  const body = await req.json().catch(() => ({}));
  const groups: Array<{ categoryId: string; items: string[] }> = Array.isArray(
    body.groups
  )
    ? body.groups
    : [];
  if (!restaurantId || groups.length === 0) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const prisma = new PrismaClient();
  try {
    const cats = await prisma.category.findMany({
      where: { restaurantId },
    });
    const catSet = new Set(cats.map((c) => c.id));
    const updates = [];
    for (const group of groups) {
      if (!catSet.has(group.categoryId)) continue;
      const ids = group.items;
      if (!Array.isArray(ids) || ids.length === 0) continue;
      for (const itemId of ids) {
        updates.push(
          prisma.dish.update({
            where: { id: itemId },
            data: {
              sortIndex: ids.indexOf(itemId) * 10,
              categoryId: group.categoryId,
            },
          })
        );
      }
    }
    if (updates.length > 0) {
      await Promise.all(updates);
    }
    return NextResponse.json({ ok: true });
  } finally {
    await prisma.$disconnect();
  }
}
