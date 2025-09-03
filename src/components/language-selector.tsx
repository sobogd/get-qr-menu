"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useParams, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Language = {
  code: string;
  name: string; // English name
  native: string; // Native name
};

const LANGUAGES: Language[] = [
  { code: "en", name: "English", native: "English" },
  { code: "ru", name: "Russian", native: "Русский" },
];

function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void
) {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current) return;
      if (e.target instanceof Node && ref.current.contains(e.target)) return;
      handler();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handler();
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [handler, ref]);
}

export function LanguageSelector({ className }: { className?: string }) {
  const locale = useLocale();
  const params = useParams() as { locale?: string } | null;
  // Prefer [locale] from route params (SSR-safe), then next-intl, then default
  const baseLocale = (params?.locale || locale || "en")
    .toLowerCase()
    .split("-")[0];
  const t = useTranslations("UI.languageSelector");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(containerRef, () => setOpen(false));

  const current = LANGUAGES.find((l) => l.code === baseLocale) ?? LANGUAGES[0];

  // Universal labels: always show native names (do not change with UI lang)
  const displayName = (l: Language) => l.native;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter((l) =>
      [l.code, l.name, l.native].some((s) => s.toLowerCase().includes(q))
    );
  }, [query]);

  const buildLocalePath = (targetLocale: string) => {
    const rest = pathname.replace(/^\/(en|ru)(?=\/|$)/, "");
    return `/${targetLocale}${rest}` || `/${targetLocale}`;
  };

  const search =
    searchParams && searchParams.toString()
      ? `?${searchParams.toString()}`
      : "";
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  const hrefFor = (code: string) => `${buildLocalePath(code)}${search}${hash}`;

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <Button
        variant="ghost"
        size="sm"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        onClick={() => setOpen((v) => !v)}
        className="min-w-[90px] justify-between"
      >
        <span className="truncate">{current && displayName(current)}</span>
        <span className="ml-2 text-xs text-muted-foreground">
          {current?.code.toUpperCase()}
        </span>
      </Button>

      {open && (
        <div
          role="dialog"
          className="absolute right-0 z-50 mt-2 w-56 rounded-md border bg-popover text-popover-foreground shadow-md"
        >
          <div className="p-2 border-b">
            <Input
              placeholder={t("search")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-8"
              autoFocus
            />
          </div>
          <ul role="listbox" className="max-h-60 overflow-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-muted-foreground">
                {t("noResults")}
              </li>
            ) : (
              filtered.map((l) => (
                <li key={l.code}>
                  <Link
                    href={hrefFor(l.code)}
                    className={cn(
                      "flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-accent",
                      l.code === baseLocale && "bg-accent/50"
                    )}
                    role="option"
                    aria-selected={l.code === baseLocale}
                    onClick={() => setOpen(false)}
                  >
                    <span>{displayName(l)}</span>
                    <span className="text-xs text-muted-foreground">
                      {l.code.toUpperCase()}
                    </span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
