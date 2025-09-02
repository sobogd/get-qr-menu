import { NextResponse } from "next/server";

import { PrismaClient } from "@/generated/prisma";

export const runtime = "nodejs";

const prisma = new PrismaClient();

// Demo data for restaurant, categories, and items
const DEMO_RESTAURANT = {
  name: "Demo Restaurant",
  slug: "demo-restaurant",
  defaultLocale: "en",
  description: "A demo restaurant for testing",
};
const DEMO_CATEGORIES = [
  { name: "Starters", slug: "starters", sortIndex: 0 },
  { name: "Main Courses", slug: "main-courses", sortIndex: 1 },
  { name: "Desserts", slug: "desserts", sortIndex: 2 },
];
const DEMO_ITEMS = [
  {
    name: "Tomato Soup",
    description: "Fresh tomato soup",
    priceCents: 500,
    currency: "USD",
    available: true,
    sortIndex: 0,
    category: "Starters",
  },
  {
    name: "Grilled Chicken",
    description: "Juicy grilled chicken breast",
    priceCents: 1500,
    currency: "USD",
    available: true,
    sortIndex: 0,
    category: "Main Courses",
  },
  {
    name: "Chocolate Cake",
    description: "Rich chocolate cake",
    priceCents: 700,
    currency: "USD",
    available: true,
    sortIndex: 0,
    category: "Desserts",
  },
];

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const locale = typeof body?.locale === "string" ? body.locale : "en";

    // Create demo restaurant
    const restaurant = await prisma.gqm_restaurant.create({
      data: {
        ...DEMO_RESTAURANT,
        defaultLocale: locale,
      },
    });

    // Create categories
    const categories = await Promise.all(
      DEMO_CATEGORIES.map((cat) =>
        prisma.gqm_category.create({
          data: {
            ...cat,
            restaurantId: restaurant.id,
          },
        })
      )
    );

    // Create items and assign to categories
    await Promise.all(
      DEMO_ITEMS.map((item) => {
        const category = categories.find((c) => c.name === item.category);
        return prisma.gqm_item.create({
          data: {
            name: item.name,
            description: item.description,
            priceCents: item.priceCents,
            currency: item.currency,
            available: item.available,
            sortIndex: item.sortIndex,
            restaurantId: restaurant.id,
            categoryId: category?.id,
            isDemo: true,
          },
        });
      })
    );

    const res = NextResponse.json({ ok: true, restaurantId: restaurant.id });
    res.cookies.set("gqm_rid", restaurant.id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
  } catch (e) {
    console.error("create-demo error", e);
    return NextResponse.json({ ok: false, error: "FAILED" }, { status: 500 });
  }
}
