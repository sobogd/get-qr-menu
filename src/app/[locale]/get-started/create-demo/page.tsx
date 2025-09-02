import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createDemoRestaurant } from "@/lib/createDemoRestaurant";

export const dynamic = "force-dynamic";

export default async function CreateDemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const base = (locale || "en").toLowerCase().split("-")[0] as "en" | "ru";

  // Создание демо-ресторана (реализуйте функцию createDemoRestaurant)
  const rid = await createDemoRestaurant(base);

  // SSR установка куки
  const cookieStore = await cookies();
  cookieStore.set({
    name: "gqm_rid",
    value: rid,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 дней
  });

  redirect(`/${base}/menu/${rid}`);
  return null;
}
