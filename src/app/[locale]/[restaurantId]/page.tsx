import { PrismaClient } from "@/generated/prisma";
import { RestaurantDashboard } from "@/components/admin/restaurant-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const prisma = new PrismaClient();

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ locale: string; restaurantId: string }>;
}) {
  const { locale, restaurantId } = await params;
  const base = (locale || "en").toLowerCase().split("-")[0];

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: restaurantId },
  });

  if (!restaurant) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">
          {base === "ru" ? "Ресторан не найден" : "Restaurant not found"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {base === "ru"
            ? "Проверьте ссылку или создайте новый ресторан."
            : "Check the link or create a new restaurant."}
        </p>
      </div>
    );
  }

  const categories = await prisma.category.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { sortIndex: "asc" },
  });
  const items = await prisma.dish.findMany({
    where: { restaurantId: restaurant.id },
    // Dish model doesn't have sortIndex — order by creation time and include translations
    orderBy: { createdAt: "asc" },
    include: { translations: true },
  });

  const categoriesDTO = categories.map((c) => ({
    id: c.id,
    name: c.name,
    sortIndex: c.sortIndex,
  }));
  const itemsDTO = items.map(
    (i: {
      translations: {
        id: string;
        name: string;
        description: string | null;
        dishId: string;
        lang: string;
      }[];
      id: string;
      createdAt: Date;
      updatedAt: Date;
      basePrice: unknown;
      photoUrl: string | null;
      isAvailable?: boolean;
      categoryId?: string | null;
    }) => {
      // Dish stores translations and basePrice (decimal). Pick translation for locale.
      const tr =
        (i.translations || []).find((t) => t.lang === base) ||
        (i.translations || [])[0] ||
        null;
      const name = tr?.name ?? null;
      const description = tr?.description ?? null;

      // basePrice is stored as Decimal — convert to number then to cents.
      const basePriceNum = Number(i.basePrice ?? 0);
      const priceCents = Math.round(basePriceNum * 100);

      return {
        id: i.id,
        name,
        description,
        priceCents,
        // No currency on Dish model — default to USD
        currency: "USD",
        // field renamed to isAvailable
        available: i.isAvailable ?? true,
        // no sortIndex on Dish by default — fallback to 0
        sortIndex: 0,
        categoryId: i.categoryId ?? null,
        // demo flag not present on Dish model — default false
        isDemo: false,
      };
    }
  );

  return (
    <div className="container mx-auto max-w-4xl">
      <RestaurantDashboard
        base={base as "en" | "ru"}
        restaurantId={restaurant.slug ?? restaurantId}
        restaurantName={restaurant.name}
        categories={categoriesDTO}
        items={itemsDTO}
      />
    </div>
  );
}
