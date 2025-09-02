import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export const runtime = "nodejs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const { itemId } = await params;
  const { available } = await req.json().catch(() => ({}));
  if (!itemId || typeof available !== "boolean") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const prisma = new PrismaClient();
  try {
    const item = await prisma.gqm_item.findUnique({ where: { id: itemId } });
    if (!item) return NextResponse.json({ ok: false }, { status: 404 });
    await prisma.gqm_item.update({
      where: { id: itemId },
      data: { available },
    });
    return NextResponse.json({ ok: true });
  } finally {
    await prisma.$disconnect();
  }
}
