import { Button } from "@/components/ui";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COOKIE_SLUG } from "@/constants";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function GetStartedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const cookieStore = await cookies();
  const slug = cookieStore.get(COOKIE_SLUG)?.value;

  if (slug) {
    redirect(`/${(locale || "en").toLowerCase()}/${slug}`);
  }

  const t = await getTranslations("GetStarted");

  return (
    <main className="min-h-dvh flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardFooter className="gap-3">
          <Link href={`/${locale}/login`}>
            <Button variant="outline">{t("login")}</Button>
          </Link>
          <Link href={`/${locale}/create-restaurant`}>
            <Button variant="default">{t("create")}</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
