import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const dishId = params.id;
  try {
    const { groupId, position } = await request.json();
    const link = await prisma.dishOptionGroup.create({
      data: { dishId, groupId, position },
    });
    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to link option group" },
      { status: 500 }
    );
  }
}
