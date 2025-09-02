export default async function EditItemPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string; restaurantId: string; itemId: string }>;
}>) {
  const { locale, itemId } = await params;
  const base = (locale || "en").toLowerCase().split("-")[0] as "en" | "ru";
  return (
    <div className="container mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold">
        {base === "ru" ? "Редактировать товар" : "Edit item"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">ID: {itemId}</p>
      <div className="mt-4 rounded-md border bg-card p-4 text-sm text-muted-foreground">
        {base === "ru"
          ? "Заглушка формы. Реализуем позже."
          : "Form placeholder. To be implemented."}
      </div>
    </div>
  );
}
