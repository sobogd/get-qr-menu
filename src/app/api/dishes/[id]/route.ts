import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const dish = await prisma.dish.findUnique({
      where: { id },
      include: {
        translations: true,
        optionGroups: {
          include: {
            group: {
              include: {
                translations: true,
                options: { include: { translations: true } },
              },
            },
          },
        },
        tags: { include: { tag: true } },
        allergens: true,
      },
    });
    if (!dish)
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    return NextResponse.json(dish);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch dish" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();
    const updated = await prisma.dish.update({
      where: { id },
      data: {
        basePrice: data.basePrice,
        photoUrl: data.photoUrl,
        isAvailable: data.isAvailable,
      },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Failed to update dish" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.dish.delete({ where: { id } });
    return NextResponse.json({}, { status: 204 });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete dish" },
      { status: 500 }
    );
  }
}
