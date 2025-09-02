export default async function NewItemPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ locale: string; restaurantId: string }>;
  searchParams?: Promise<{ category?: string }>;
}>) {
  const { locale } = await params;
  const q = (await searchParams) || {};
  const base = (locale || "en").toLowerCase().split("-")[0] as "en" | "ru";
  const cat = q.category;
  return (
    <div className="container mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold">
        {base === "ru" ? "Новый товар" : "New item"}
      </h1>
      {cat && (
        <p className="mt-2 text-sm text-muted-foreground">Category: {cat}</p>
      )}
      <div className="mt-4 rounded-md border bg-card p-4 text-sm text-muted-foreground">
        {base === "ru"
          ? "Заглушка формы. Реализуем позже."
          : "Form placeholder. To be implemented."}
      </div>
    </div>
  );
}
