import { NextIntlClientProvider } from "next-intl";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { cookies } from "next/headers";
import { CurrencyProvider } from "@/components/currency-provider";
import enMessages from "@/i18n/messages/en.json";
import ruMessages from "@/i18n/messages/ru.json";
import { LandingChromeGate } from "@/components/landing-chrome-gate";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const resolved = await params;
  const base = (resolved?.locale || "en").toLowerCase().split("-")[0] as
    | "en"
    | "ru";
  const messages = base === "ru" ? ruMessages : enMessages;
  const cookieStore = await cookies();
  const currencyCookie = cookieStore.get("currency")?.value;

  return (
    <NextIntlClientProvider locale={base} messages={messages} timeZone="UTC">
      <CurrencyProvider initialCurrency={currencyCookie ?? "USD"}>
        <LandingChromeGate>
          <SiteHeader locale={base} />
        </LandingChromeGate>

        {/* Content */}
        <main>{children}</main>

        {/* CTA band (moved above footer) */}
        <LandingChromeGate>
          <div className="mt-8 md:mt-10">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="rounded-lg border bg-accent/30 p-5 md:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-semibold">
                  {base === "en"
                    ? "Launch your menu in 2 minutes — free forever plan included"
                    : "Запустите меню за 2 минуты — бесплатный тариф навсегда"}
                </h3>
                <div className="mt-2 inline-flex items-center gap-3">
                  <Link
                    href={`/${base}/get-started`}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm font-medium"
                  >
                    {base === "en" ? "Get started free" : "Начать бесплатно"}
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {base === "en"
                      ? "No credit card · Cancel anytime"
                      : "Без карты · Отмена в любой момент"}
                  </span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {base === "en"
                    ? "Trusted by cafes, restaurants, hotels and bars worldwide"
                    : "Нам доверяют кафе, рестораны, отели и бары по всему миру"}
                </div>
              </div>
            </div>
          </div>
        </LandingChromeGate>

        {/* Footer */}
        <LandingChromeGate>
          <footer className="border-t mt-10">
            <div className="container mx-auto max-w-6xl px-4 py-10 space-y-8">
              {/* Links grid */}
              <div className="grid gap-8 md:grid-cols-4 text-sm">
                {/* Product */}
                <div>
                  <div className="font-medium text-foreground mb-2">
                    {base === "en" ? "Product" : "Продукт"}
                  </div>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>
                      <a href="#features" className="hover:text-foreground">
                        {base === "en" ? "Features" : "Возможности"}
                      </a>
                    </li>
                    <li>
                      <a href="#pricing" className="hover:text-foreground">
                        {base === "en" ? "Pricing" : "Цены"}
                      </a>
                    </li>
                    <li>
                      <a href="#home" className="hover:text-foreground">
                        {base === "en" ? "Demo" : "Демо"}
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:support@get-qr-menu.com"
                        className="hover:text-foreground"
                      >
                        {base === "en" ? "Support" : "Поддержка"}
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Company (trimmed) */}
                <div>
                  <div className="font-medium text-foreground mb-2">
                    {base === "en" ? "Company" : "Компания"}
                  </div>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>
                      <a
                        href="mailto:support@get-qr-menu.com"
                        className="hover:text-foreground"
                      >
                        {base === "en" ? "Contact us" : "Связаться с нами"}
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Legal */}
                <div>
                  <div className="font-medium text-foreground mb-2">
                    {base === "en" ? "Legal" : "Юридическое"}
                  </div>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>
                      <Link
                        href={`/${base}/terms`}
                        className="hover:text-foreground"
                      >
                        {base === "en"
                          ? "Terms of Service"
                          : "Условия использования"}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${base}/privacy`}
                        className="hover:text-foreground"
                      >
                        {base === "en"
                          ? "Privacy Policy"
                          : "Политика конфиденциальности"}
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Social */}
                <div>
                  <div className="font-medium text-foreground mb-2">
                    {base === "en" ? "Follow" : "Мы в соцсетях"}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-muted-foreground">
                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="hover:text-foreground"
                    >
                      <Linkedin className="size-4" />
                    </a>
                    <a
                      href="https://instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="hover:text-foreground"
                    >
                      <Instagram className="size-4" />
                    </a>
                    <a
                      href="https://facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="hover:text-foreground"
                    >
                      <Facebook className="size-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* SEO blurb + copyright */}
              <div className="text-center">
                <div className="text-xs text-muted-foreground max-w-3xl mx-auto">
                  {base === "en"
                    ? "Get QR Menu helps restaurants save time, reduce costs and delight guests with AI-powered digital menus. Available worldwide."
                    : "Get QR Menu помогает ресторанам экономить время, снижать издержки и радовать гостей с помощью цифровых меню на базе ИИ. Доступно по всему миру."}
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  © {new Date().getFullYear()} Get QR Menu.{" "}
                  {base === "en"
                    ? "All rights reserved."
                    : "Все права защищены."}
                </div>
              </div>
            </div>
          </footer>
        </LandingChromeGate>
      </CurrencyProvider>
    </NextIntlClientProvider>
  );
}
