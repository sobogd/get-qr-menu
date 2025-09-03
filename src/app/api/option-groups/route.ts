import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { kind, selection, required, minSelect, maxSelect } =
      await request.json();
    const group = await prisma.optionGroup.create({
      data: {
        kind,
        selection,
        required: required ?? false,
        minSelect,
        maxSelect,
      },
    });
    return NextResponse.json(group, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create option group" },
      { status: 500 }
    );
  }
}
