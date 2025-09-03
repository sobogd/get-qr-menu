import { PrismaClient } from "../src/generated/prisma/index.js";

const prisma = new PrismaClient();

const DEMO_RESTAURANT = {
  name: "Demo Restaurant (script)",
  slug: `demo-script-${Date.now()}`,
  defaultLocale: "en",
  description: "A demo restaurant for testing (script)",
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

async function run() {
  try {
    console.log("Creating restaurant...");
    const restaurant = await prisma.restaurant.create({
      data: {
        ...DEMO_RESTAURANT,
        defaultLocale: "en",
      },
    });
    console.log("Restaurant created:", restaurant.id, restaurant.slug);

    console.log("Creating categories...");
    const categories = [];
    for (const cat of DEMO_CATEGORIES) {
      const c = await prisma.category.create({
        data: {
          ...cat,
          restaurantId: restaurant.id,
        },
      });
      categories.push(c);
    }
    console.log(
      "Categories created:",
      categories.map((c) => c.id)
    );

    console.log("Creating dishes with translations...");
    for (const item of DEMO_ITEMS) {
      const category = categories.find((c) => c.name === item.category);
      const basePrice = (item.priceCents / 100).toFixed(2);
      const dish = await prisma.dish.create({
        data: {
          basePrice: basePrice,
          photoUrl: null,
          isAvailable: item.available,
          restaurantId: restaurant.id,
          categoryId: category?.id,
          translations: {
            create: [
              {
                lang: "en",
                name: item.name,
                description: item.description,
              },
            ],
          },
        },
      });
      console.log("Created dish:", dish.id);
    }

    console.log("Done.");
  } catch (err) {
    console.error("ERROR in script:", err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
