import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type TranslationInput = {
  lang: string;
  name: string;
  description?: string;
};

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: dishId } = params;
  try {
    const translations: TranslationInput[] = await request.json();

    await prisma.$transaction([
      prisma.dishTranslation.deleteMany({ where: { dishId } }),
      ...translations.map((t) =>
        prisma.dishTranslation.create({
          data: {
            dishId,
            lang: t.lang,
            name: t.name,
            description: t.description,
          },
        })
      ),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update translations" },
      { status: 500 }
    );
  }
}
