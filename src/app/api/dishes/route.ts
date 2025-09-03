import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const dishes = await prisma.dish.findMany({
      include: {
        translations: true,
        optionGroups: {
          include: {
            group: {
              include: {
                translations: true,
                options: {
                  include: { translations: true },
                },
              },
            },
          },
        },
        tags: {
          include: { tag: true },
        },
        allergens: true,
      },
    });
    return NextResponse.json(dishes);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dishes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const dish = await prisma.dish.create({
      data: {
        basePrice: data.basePrice,
        photoUrl: data.photoUrl,
        isAvailable: data.isAvailable ?? true,
      },
    });
    return NextResponse.json(dish, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create dish" },
      { status: 500 }
    );
  }
}
