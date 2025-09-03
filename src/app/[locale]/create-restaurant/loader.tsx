import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

export default async function GetStartedLoader() {
  const t = await getTranslations("CreateRestaurant");

  return (
    <main className="min-h-dvh flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full h-2 bg-gray-200 rounded overflow-hidden">
            <div
              className="absolute inset-y-0 w-1/3 bg-green-500 rounded"
              style={{
                animation: "indeterminate 2s ease-in-out infinite",
                position: "absolute",
              }}
            />
          </div>
          <style>{`@keyframes indeterminate {0% { left: -30%; }50% { left: 50%; }100% { left: 110%; }}`}</style>
          <p className="text-sm text-muted-foreground">{t("status")}</p>
        </CardContent>
      </Card>
    </main>
  );
}
