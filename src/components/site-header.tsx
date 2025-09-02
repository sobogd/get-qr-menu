"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Menu,
  LayoutGrid,
  Tag,
  PlayCircle,
  MessageCircleQuestion,
  Phone,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
// import { usePathname } from "@/i18n/routing";
import { LanguageSelector } from "@/components/language-selector";
import { CurrencySelector } from "@/components/currency-selector";

export function SiteHeader({ locale }: { locale: string }) {
  const t = useTranslations("Nav");
  // const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto max-w-6xl flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href={`/${locale}`} aria-label="Home">
            <Brand size="md" />
          </Link>
        </div>

        {/* Desktop nav (>=1024px) */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <NavigationMenu className="text-sm">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  href="#features"
                  className="px-2 py-1.5 rounded-md hover:bg-accent/50 transition-colors text-sm"
                >
                  {t("features")}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="#pricing"
                  className="px-2 py-1.5 rounded-md hover:bg-accent/50 transition-colors text-sm"
                >
                  {t("pricing")}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a
                  href="mailto:support@get-qr-menu.com"
                  className="px-2 py-1.5 rounded-md hover:bg-accent/50 transition-colors text-sm"
                >
                  {t("contact")}
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-1">
            <LanguageSelector />
            <CurrencySelector />
          </div>
          <Button size="sm" asChild>
            <Link href={`/${locale}/get-started`}>{t("cta")}</Link>
          </Button>
        </div>

        {/* Mobile nav (<1024px) */}
        <div className="lg:hidden">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader className="pb-2">
                  <SheetTitle>
                    <Link href={`/${locale}`} aria-label="Home">
                      <Brand size="md" />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-2 grid">
                  <Link
                    href="#features"
                    className="flex items-center gap-3 px-2 py-3 text-base hover:bg-accent/40 rounded-md"
                  >
                    <LayoutGrid className="size-5 text-primary" />{" "}
                    {t("features")}
                  </Link>
                  <Link
                    href="#pricing"
                    className="flex items-center gap-3 px-2 py-3 text-base hover:bg-accent/40 rounded-md"
                  >
                    <Tag className="size-5 text-primary" /> {t("pricing")}
                  </Link>
                  <Link
                    href="#home"
                    className="flex items-center gap-3 px-2 py-3 text-base hover:bg-accent/40 rounded-md"
                  >
                    <PlayCircle className="size-5 text-primary" /> {t("demo")}
                  </Link>
                  <Link
                    href="#faq"
                    className="flex items-center gap-3 px-2 py-3 text-base hover:bg-accent/40 rounded-md"
                  >
                    <MessageCircleQuestion className="size-5 text-primary" />{" "}
                    {t("faq")}
                  </Link>
                  <a
                    href="mailto:support@get-qr-menu.com"
                    className="flex items-center gap-3 px-2 py-3 text-base hover:bg-accent/40 rounded-md"
                  >
                    <Phone className="size-5 text-primary" /> {t("contact")}
                  </a>
                </nav>
                <SheetFooter className="p-0">
                  <div className="sticky bottom-0 left-0 right-0 border-t bg-background p-4">
                    <div className="mb-2 flex flex-wrap items-center gap-1">
                      <LanguageSelector />
                      <CurrencySelector />
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={`/${locale}/get-started`}>{t("cta")}</Link>
                    </Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
