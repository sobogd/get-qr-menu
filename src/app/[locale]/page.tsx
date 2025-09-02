import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  LayoutGrid,
  Languages,
  BarChart3,
  RefreshCcw,
  Palette,
  Smartphone,
  ClipboardList,
  PiggyBank,
  Timer,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  Lock,
  Video,
  BedDouble,
  Croissant,
  Beer,
  Utensils,
  Server,
} from "lucide-react";

export default async function Home({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const resolved = await params;
  const base = (resolved?.locale || "en").toLowerCase().split("-")[0];
  const t = await getTranslations("Landing");
  const s = await getTranslations("Sections");
  return (
    <div className="container mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section
        id="home"
        className="pt-10 pb-8 md:pt-10 md:pb-10 flex items-center"
      >
        <div className="grid items-stretch gap-6 md:grid-cols-[3fr_2fr]">
          <div className="flex flex-col justify-center text-center md:text-left">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground md:mx-0 mx-auto">
              <CheckCircle2 className="size-3.5 text-primary" />{" "}
              {t("trustedWorldwide")}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight whitespace-pre-line">
              {t("title")}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
            {/* Feature pills */}
            <div className="mt-4 space-y-2">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border bg-card px-2.5 py-1 text-xs text-muted-foreground">
                  <Globe2 className="size-3.5 text-primary" />{" "}
                  {t("pills.languages")}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border bg-card px-2.5 py-1 text-xs text-muted-foreground">
                  <RefreshCcw className="size-3.5 text-primary" />{" "}
                  {t("pills.updates")}
                </span>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border bg-card px-2.5 py-1 text-xs text-muted-foreground">
                  <BarChart3 className="size-3.5 text-primary" />{" "}
                  {t("pills.analytics")}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border bg-card px-2.5 py-1 text-xs text-muted-foreground">
                  <LayoutGrid className="size-3.5 text-primary" />{" "}
                  {t("pills.flexible")}
                </span>
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start">
              <Button size="lg" className="px-6 py-4 text-base" asChild>
                <Link href={`/${base}/get-started`}>{t("ctaPrimary")}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-6 py-4 text-base"
              >
                {t("ctaSecondary")}
              </Button>
            </div>
            <p
              className="mt-2 text-xs text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: `${t.raw("trustHtml")} · ${t("cancelAnytime")}`,
              }}
            />
          </div>
          {/* Mockups */}
          <div className="relative h-full flex items-center justify-center">
            <div className="relative mx-auto w-full max-w-md h-[360px] flex items-center justify-center">
              {/* Laptop wireframe */}
              <div className="relative w-full h-[80%] rounded-lg border bg-card p-3 shadow-sm">
                <div className="h-3 w-14 rounded bg-muted" />
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="h-6 rounded bg-muted" />
                  <div className="h-6 rounded bg-muted" />
                  <div className="h-6 rounded bg-muted" />
                </div>
                <div className="mt-2 h-6 rounded bg-muted" />
              </div>
              {/* Phone wireframe */}
              <div className="absolute z-10 -right-5 bottom-0 h-[80%] aspect-[9/19.5] -rotate-2 rounded-2xl border bg-card p-2 shadow-lg ring-1 ring-black/5">
                <div className="h-3 w-16 rounded bg-muted" />
                <div className="mt-1 h-10 rounded bg-muted" />
                <div className="mt-1 grid grid-cols-2 gap-1.5">
                  <div className="h-5 rounded bg-muted" />
                  <div className="h-5 rounded bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="pt-3 pb-6 md:pt-2 md:pb-4">
        <h2 className="text-base sm:text-lg font-semibold text-center">
          {s("why.subtitle")}
        </h2>
        <ul className="mx-auto mt-4 grid max-w-6xl list-none grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {s
            .raw("why.items")
            .map((item: { title: string; desc: string }, i: number) => {
              const Icon = [Smartphone, Palette, Video][i] ?? CheckCircle2;
              const emphasize = i < 3;
              return (
                <li
                  key={i}
                  className="group flex items-start gap-3 rounded-md border bg-card p-4 text-sm text-foreground transition-colors hover:bg-accent/40"
                >
                  <Icon className="mt-0.5 size-5 shrink-0 text-primary transition-transform duration-200 group-hover:scale-110" />
                  <div className="flex-1">
                    <div
                      className={
                        "text-foreground " + (emphasize ? "font-medium" : "")
                      }
                    >
                      {item.title}
                    </div>
                    <div className="text-muted-foreground text-xs mt-1">
                      {item.desc}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </section>

      {/* Features (vertical sections with screenshot placeholders) */}
      <section id="features" className="py-10 md:py-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center md:mb-6">
          {s("features.title")}
        </h2>
        <div className="mt-10 space-y-6 md:mt-14 md:space-y-6">
          {[
            { key: "builder", Icon: ClipboardList },
            { key: "qr", Icon: LayoutGrid },
            { key: "multiLang", Icon: Languages },
            { key: "analytics", Icon: BarChart3 },
            { key: "updates", Icon: RefreshCcw },
            { key: "themes", Icon: Palette },
            { key: "safety", Icon: ShieldCheck },
          ].map(({ key, Icon }, idx) => (
            <div
              key={key}
              className="grid gap-8 md:grid-cols-2 md:items-center md:gap-6"
            >
              {/* Copy */}
              <div className="order-1 md:order-2 flex flex-col justify-center space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Icon className="size-5 text-primary" />
                  {s(`features.items.${key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s(`features.items.${key}.desc`)}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <li
                    dangerouslySetInnerHTML={{
                      __html: s.raw(`features.items.${key}.line1`),
                    }}
                  />
                  <li
                    dangerouslySetInnerHTML={{
                      __html: s.raw(`features.items.${key}.line2`),
                    }}
                  />
                </ul>
                <p
                  className="text-sm font-medium underline underline-offset-4 decoration-primary/40"
                  dangerouslySetInnerHTML={{
                    __html: s.raw(`features.items.${key}.punch`),
                  }}
                />
              </div>
              {/* Screenshot mockup: alternate 3-phone and 2-phone layouts */}
              <div className="order-2 md:order-1 w-full md:justify-self-start">
                {(() => {
                  const isTriple = idx % 2 === 0; // even rows: 3 phones; odd: 2 phones
                  const R = "rounded-[10px] bg-card p-2 shadow"; // squarer corners, subtle shadow, no borders
                  return (
                    <div className="relative w-full h-64 sm:h-72 md:h-80 overflow-visible">
                      {/* Left phone */}
                      <div
                        className={`absolute ${
                          isTriple ? "left-[18%]" : "left-[22%]"
                        } bottom-0 -rotate-8 ${
                          isTriple ? "h-[86%] z-10" : "h-[88%] z-10"
                        } aspect-[9/19.5] ${R}`}
                      >
                        <div className="mx-auto h-2.5 w-10 rounded bg-muted" />
                        <div className="mt-2 h-8 rounded bg-muted" />
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <div className="h-12 rounded bg-muted" />
                          <div className="h-12 rounded bg-muted" />
                        </div>
                        <div className="mt-2 h-14 rounded bg-muted" />
                      </div>

                      {/* Center phone (front) for 3-phone layout */}
                      {isTriple && (
                        <div
                          className={`absolute left-1/2 -translate-x-1/2 top-1 rotate-2 h-[92%] z-20 aspect-[9/19.5] ${R}`}
                        >
                          <div className="mx-auto h-2.5 w-12 rounded bg-muted" />
                          <div className="mt-2 h-10 rounded bg-muted" />
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            <div className="h-14 rounded bg-muted" />
                            <div className="h-14 rounded bg-muted" />
                          </div>
                          <div className="mt-2 h-16 rounded bg-muted" />
                        </div>
                      )}

                      {/* Right phone */}
                      <div
                        className={`absolute ${
                          isTriple ? "right-[18%]" : "right-[22%]"
                        } bottom-0 rotate-6 ${
                          isTriple ? "h-[86%] z-0" : "h-[88%] z-0"
                        } aspect-[9/19.5] ${R}`}
                      >
                        <div className="mx-auto h-2.5 w-10 rounded bg-muted" />
                        <div className="mt-2 h-8 rounded bg-muted" />
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <div className="h-12 rounded bg-muted" />
                          <div className="h-12 rounded bg-muted" />
                        </div>
                        <div className="mt-2 h-12 rounded bg-muted" />
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section id="faq" className="py-10 md:py-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center">
          {s("benefits.title")}
        </h2>
        <ul className="mx-auto mt-4 md:mt-4 grid max-w-5xl list-none grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { Icon: PiggyBank, i: 0 },
            { Icon: Timer, i: 1 },
            { Icon: ShieldCheck, i: 2 },
          ].map(({ Icon, i }) => (
            <li
              key={i}
              className="group flex items-start gap-3 rounded-md border bg-card p-4 text-sm text-foreground transition-colors hover:bg-accent/40"
            >
              <Icon className="mt-0.5 size-5 shrink-0 text-primary transition-transform duration-200 group-hover:scale-110" />
              <div className="flex-1">
                <div className="text-foreground font-medium">
                  {s(`benefits.items.${i}.title`)}
                </div>
                <div className="text-muted-foreground text-xs mt-1">
                  {s(`benefits.items.${i}.desc`)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Use cases */}
      <section className="py-10 md:py-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center">
          {s("useCases.title")}
        </h2>
        <ul className="mx-auto mt-4 md:mt-4 grid max-w-4xl list-none grid-cols-1 gap-4 md:grid-cols-2">
          {s
            .raw("useCases.items")
            .map((item: { title: string; desc: string }, i: number) => {
              const Icon =
                [Croissant, Beer, Utensils, BedDouble][i] ?? Croissant;
              return (
                <li
                  key={i}
                  className="group flex items-start gap-3 rounded-md border bg-card p-4 text-sm text-foreground transition-colors hover:bg-accent/40"
                >
                  <Icon className="mt-0.5 size-5 shrink-0 text-primary transition-transform duration-200 group-hover:scale-110" />
                  <div className="flex-1">
                    <div className="text-foreground font-medium">
                      {item.title}
                    </div>
                    <div className="text-muted-foreground text-xs mt-1">
                      {item.desc}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </section>

      {/* Security */}
      <section className="py-10 md:py-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center">
          {s("security.title")}
        </h2>
        <ul className="mx-auto mt-4 md:mt-4 grid max-w-5xl list-none grid-cols-1 gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              className="group flex items-start gap-3 rounded-md border bg-card p-4 text-sm text-foreground transition-colors hover:bg-accent/40"
            >
              {i === 0 ? (
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary transition-transform duration-200 group-hover:scale-110" />
              ) : i === 1 ? (
                <Lock className="mt-0.5 size-5 shrink-0 text-primary transition-transform duration-200 group-hover:scale-110" />
              ) : (
                <Server className="mt-0.5 size-5 shrink-0 text-primary transition-transform duration-200 group-hover:scale-110" />
              )}
              <div className="flex-1">
                <div className="text-foreground font-medium">
                  {s(`security.items.${i}.title`)}
                </div>
                <div className="text-muted-foreground text-xs mt-1">
                  {s(`security.items.${i}.desc`)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="py-10 md:py-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center">
          {s("how.title")}
        </h2>
        <p className="text-muted-foreground text-center mt-2">
          {s("how.desc")}
        </p>
        <ul className="mx-auto mt-4 md:mt-4 grid max-w-5xl list-none grid-cols-1 gap-4 md:grid-cols-3">
          {["1", "2", "3"].map((step) => (
            <li
              key={step}
              className="group flex items-start gap-3 rounded-md border bg-card p-4 text-sm text-foreground transition-colors hover:bg-accent/40"
            >
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center text-primary font-semibold">
                {step}
              </span>
              <div className="flex-1">
                <div className="text-foreground font-medium">
                  {s(`how.steps.${step}.title`)}
                </div>
                <div className="text-muted-foreground text-xs mt-1">
                  {s(`how.steps.${step}.desc`)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-10 md:py-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center">
          {s("pricing.title")}
        </h2>
        <p className="text-muted-foreground text-center mt-2">
          {s("pricing.desc")}
        </p>
        <div className="mt-6 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {["free", "pro", "ultra"].map((plan) => (
            <Card
              key={plan}
              className={
                (plan === "pro" ? "ring-1 ring-primary " : "") +
                "flex h-full flex-col"
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{s(`pricing.${plan}.name`)}</CardTitle>
                  {plan === "pro" && (
                    <Badge variant="secondary">{s("pricing.highlight")}</Badge>
                  )}
                </div>
                {s.has(`pricing.${plan}.tagline`) && (
                  <div className="text-muted-foreground text-sm mt-1">
                    {s(`pricing.${plan}.tagline`)}
                  </div>
                )}
                <div className="mt-2 text-3xl font-bold">
                  {s(`pricing.${plan}.price`)}
                  <span className="text-base text-muted-foreground">
                    {s(`pricing.${plan}.period`)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="text-muted-foreground list-disc pl-5 space-y-1">
                  {s
                    .raw(`pricing.${plan}.features`)
                    .map((f: string, i: number) => (
                      <li key={i}>{f}</li>
                    ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/${base}/get-started?plan=${plan}`}>
                    {s(`pricing.${plan}.cta`)}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center">
          {s("faq.title")}
        </h2>
        <div className="max-w-2xl mx-auto mt-5 md:mt-5">
          <Accordion type="single" collapsible>
            {s
              .raw("faq.items")
              .map((item: { q: string; a: string }, idx: number) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="group mb-2 last:mb-0 rounded-md border bg-card overflow-hidden"
                >
                  <AccordionTrigger className="px-4 py-3 text-left transition-colors data-[state=open]:bg-accent/40 data-[state=open]:font-semibold data-[state=open]:text-foreground data-[state=open]:border-l-2 data-[state=open]:border-primary data-[state=open]:rounded-b-none">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 text-muted-foreground pt-3 border-t border-border">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </section>

      {/* CTA removed per request */}
    </div>
  );
}
