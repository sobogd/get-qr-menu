export default async function NewCategoryPage({
  params,
}: Readonly<{ params: Promise<{ locale: string; restaurantId: string }> }>) {
  const { locale } = await params;
  const base = (locale || "en").toLowerCase().split("-")[0] as "en" | "ru";
  return (
    <div className="container mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold">
        {base === "ru" ? "Новая категория" : "New category"}
      </h1>
      <div className="mt-4 rounded-md border bg-card p-4 text-sm text-muted-foreground">
        {base === "ru"
          ? "Заглушка формы. Реализуем позже."
          : "Form placeholder. To be implemented."}
      </div>
    </div>
  );
}
