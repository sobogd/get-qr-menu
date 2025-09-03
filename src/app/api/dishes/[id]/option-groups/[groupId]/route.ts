import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; groupId: string } }
) {
  const { id: dishId, groupId } = params;
  try {
    await prisma.dishOptionGroup.delete({
      where: {
        dishId_groupId: { dishId, groupId },
      },
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to unlink option group" },
      { status: 500 }
    );
  }
}
