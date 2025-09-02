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

  const restaurant = await prisma.gqm_restaurant.findUnique({
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

  const categories = await prisma.gqm_category.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { sortIndex: "asc" },
  });
  const items = await prisma.gqm_item.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { sortIndex: "asc" },
  });

  const categoriesDTO = categories.map((c) => ({
    id: c.id,
    name: c.name,
    sortIndex: c.sortIndex,
  }));
  const itemsDTO = items.map((i) => ({
    id: i.id,
    name: i.name,
    description: i.description ?? null,
    priceCents: i.priceCents,
    currency: i.currency,
    available: i.available,
    sortIndex: i.sortIndex,
    categoryId: i.categoryId ?? null,
    isDemo: i.isDemo ?? false,
  }));

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
