import { PrismaClient } from "@/generated/prisma";
import { OpenAI } from "openai";

const prisma = new PrismaClient();

async function generateHumanSlug(): Promise<string> {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (!openaiApiKey) return `demo-${Math.random().toString(36).slice(2, 8)}`;
  const openai = new OpenAI({ apiKey: openaiApiKey });
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a creative assistant that generates catchy, short, human-readable restaurant slugs for URLs.",
        },
        {
          role: "user",
          content:
            "Generate a short, memorable, human-readable restaurant slug for a demo restaurant. Only output the slug, no extra text.",
        },
      ],
      max_tokens: 10,
      temperature: 0.8,
    });
    let slug = completion.choices[0]?.message?.content
      ?.trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-");
    if (!slug) slug = `demo-${Math.random().toString(36).slice(2, 8)}`;
    // Проверить уникальность
    const exists = await prisma.gqm_restaurant.findFirst({ where: { slug } });
    if (exists) slug += `-${Math.random().toString(36).slice(2, 4)}`;
    return slug;
  } catch {
    return `demo-${Math.random().toString(36).slice(2, 8)}`;
  }
}

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

export async function createDemoRestaurant(locale: string): Promise<string> {
  // Генерируем человекопонятный slug через OpenAI
  const slug = await generateHumanSlug();
  // Создание ресторана
  const restaurant = await prisma.gqm_restaurant.create({
    data: {
      ...DEMO_RESTAURANT,
      slug,
      defaultLocale: locale,
    },
  });
  // Категории
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
  // Товары
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
  return restaurant.slug;
}
