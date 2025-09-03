import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const { kind, selection, required, minSelect, maxSelect } =
      await request.json();
    const group = await prisma.optionGroup.update({
      where: { id },
      data: {
        kind,
        selection,
        required: required ?? false,
        minSelect,
        maxSelect,
      },
    });
    return NextResponse.json(group);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update option group" },
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
    await prisma.optionGroup.delete({ where: { id } });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete option group" },
      { status: 500 }
    );
  }
}
