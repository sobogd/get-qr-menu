import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const { priceDelta, isDefault, isAvailable } = await request.json();
    const updated = await prisma.option.update({
      where: { id },
      data: {
        priceDelta,
        isDefault: isDefault ?? false,
        isAvailable: isAvailable ?? true,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update option" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    await prisma.option.delete({ where: { id } });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete option" },
      { status: 500 }
    );
  }
}
