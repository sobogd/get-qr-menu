"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  const t = useTranslations("Landing");
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <Button size="lg">{t("ctaPrimary")}</Button>
        <Button size="lg" variant="outline">
          {t("ctaSecondary")}
        </Button>
      </div>
      <div
        id="features"
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Fast setup</CardTitle>
          </CardHeader>
          <CardContent>
            Create your QR menu in minutes with our simple flow.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Beautiful design</CardTitle>
          </CardHeader>
          <CardContent>
            Clean, modern UI powered by shadcn/ui and Tailwind.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Share anywhere</CardTitle>
          </CardHeader>
          <CardContent>
            Download QR codes and share across print and digital.
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
