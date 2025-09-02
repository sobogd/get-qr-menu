"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    __gqm_demo_created__?: boolean;
  }
}
import { Button } from "@/components/ui/button";
import { ProgressSteps } from "@/components/progress-steps";

export function GetStartedFlow({ base }: { base: "en" | "ru" }) {
  const router = useRouter();
  const [demoEnabled, setDemoEnabled] = useState(false);
  const [done, setDone] = useState(false);
  const [completedOnce, setCompletedOnce] = useState(false);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDemoEnabled(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Kick off creation once on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (typeof window !== "undefined") {
        if (window.__gqm_demo_created__) return;
        window.__gqm_demo_created__ = true;
      }
      try {
        const res = await fetch("/api/create-demo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale: base }),
        });
        if (!res.ok) return;
        const data = (await res.json()) as {
          ok: boolean;
          restaurantId?: string;
        };
        if (!cancelled && data.ok && data.restaurantId)
          setRestaurantId(data.restaurantId);
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, [base]);

  const steps = useMemo(
    () =>
      base === "en"
        ? [
            "🎨 Adding demo layout",
            "📸 Uploading sample dishes",
            "🌍 Translating with AI",
            "✅ Finishing touches",
          ]
        : [
            "🎨 Добавляем демо-оформление",
            "📸 Загружаем примеры блюд",
            "🌍 Переводим с помощью ИИ",
            "✅ Последние штрихи",
          ],
    [base]
  );

  const tips =
    base === "en"
      ? [
          "Your menu will be available in 30+ languages instantly with AI translations.",
          "No more reprints — update prices anytime, live.",
        ]
      : [
          "Ваше меню будет доступно на 30+ языках мгновенно благодаря ИИ-переводам.",
          "Больше никаких перепечаток — обновляйте цены в любой момент.",
        ];

  useEffect(() => {
    if (done && restaurantId) {
      router.push(`/${base}/${restaurantId}/menu`);
    }
  }, [done, restaurantId, base, router]);

  return (
    <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-[1.2fr_.8fr] md:items-start">
      {/* Left: headline + steps */}
      <div className="text-center md:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-primary inline-block" />
          {base === "en" ? "Working" : "Создаём"}
        </div>
        <h1 className="mt-4 text-2xl sm:text-3xl font-semibold">
          {base === "en"
            ? "Cooking up your first menu 🍳..."
            : "Готовим ваше первое меню 🍳..."}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {base === "en"
            ? "Give us a sec — we’re setting the table so you can start adding dishes."
            : "Секундочку — накрываем стол, чтобы вы могли сразу добавить блюда."}
        </p>

        <div className="mt-5">
          <ProgressSteps
            steps={steps}
            stepDurationMs={650}
            className="max-w-xl"
            onComplete={() => {
              if (!completedOnce) {
                setCompletedOnce(true);
                setDone(true);
              }
            }}
          />
        </div>
      </div>

      {/* Right: tips + demo button + final CTA */}
      <div className="md:pl-4 flex flex-col">
        {/* Final CTA shown above tips on mobile */}
        {done && (
          <div className="order-1 md:order-2 mt-0 md:mt-4 rounded-md border bg-card p-4 text-sm text-center md:text-left">
            <div className="font-medium">
              {base === "en" ? "Your menu is ready 🎉" : "Ваше меню готово 🎉"}
            </div>
            <p className="mt-1 text-muted-foreground">
              {base === "en" ? "Redirecting..." : "Перенаправляем..."}
            </p>
          </div>
        )}

        <div className="order-2 md:order-1 mt-4 md:mt-0 rounded-md border bg-card p-4 text-sm">
          <div className="font-medium">
            {base === "en" ? "Did you know?" : "Знали ли вы?"}
          </div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            {tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full"
              asChild
              disabled={!demoEnabled}
            >
              <Link
                href={`/${base}${
                  restaurantId ? `?rid=${restaurantId}` : ""
                }#home`}
              >
                {base === "en"
                  ? "See your menu link"
                  : "Посмотреть ссылку на меню"}
              </Link>
            </Button>
            {!demoEnabled && (
              <p className="mt-2 text-[11px] text-muted-foreground text-center">
                {base === "en" ? "Preparing link…" : "Готовим ссылку…"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
