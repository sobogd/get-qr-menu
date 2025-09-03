import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { groupId, priceDelta, isDefault, isAvailable } =
      await request.json();
    const option = await prisma.option.create({
      data: {
        groupId,
        priceDelta,
        isDefault: isDefault ?? false,
        isAvailable: isAvailable ?? true,
      },
    });
    return NextResponse.json(option, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create option" },
      { status: 500 }
    );
  }
}
