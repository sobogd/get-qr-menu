import { Button } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
// ...existing code...
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

  // If we already have a demo restaurant slug in cookies — redirect to it
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
