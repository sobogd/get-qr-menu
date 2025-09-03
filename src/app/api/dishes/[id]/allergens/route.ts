import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const dishId = params.id;
  try {
    const codes: string[] = await request.json();

    await prisma.$transaction([
      prisma.dishAllergen.deleteMany({ where: { dishId } }),
      ...codes.map((code) =>
        prisma.dishAllergen.create({
          data: { dishId, code },
        })
      ),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update allergens" },
      { status: 500 }
    );
  }
}
