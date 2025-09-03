import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type TagInput = {
  slug: string;
  label: string;
  isPublic?: boolean;
};

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const dishId = params.id;
  try {
    const inputs: TagInput[] = await request.json();

    // Upsert tags and collect their IDs
    const tags = await Promise.all(
      inputs.map((t) =>
        prisma.tag.upsert({
          where: { slug: t.slug },
          create: {
            slug: t.slug,
            label: t.label,
            isPublic: t.isPublic ?? true,
          },
          update: {
            label: t.label,
            isPublic: t.isPublic ?? true,
          },
        })
      )
    );

    // Reset dish-tag relations
    await prisma.dishTag.deleteMany({ where: { dishId } });

    // Recreate relations
    await prisma.dishTag.createMany({
      data: tags.map((t) => ({ dishId, tagId: t.id })),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update tags" },
      { status: 500 }
    );
  }
}
