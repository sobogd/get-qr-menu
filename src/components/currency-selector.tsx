"use client";
import { useMemo, useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useCurrency } from "@/components/currency-provider";

type Currency = { code: string; name: string };

const CURRENCIES: Currency[] = [
  { code: "EUR", name: "Euro" },
  { code: "USD", name: "US Dollar" },
  { code: "GBP", name: "British Pound" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "DKK", name: "Danish Krone" },
  { code: "ISK", name: "Icelandic Króna" },
  { code: "CZK", name: "Czech Koruna" },
  { code: "PLN", name: "Polish Złoty" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "RON", name: "Romanian Leu" },
  { code: "BGN", name: "Bulgarian Lev" },
  { code: "RSD", name: "Serbian Dinar" },
  { code: "MKD", name: "Macedonian Denar" },
  { code: "ALL", name: "Albanian Lek" },
  { code: "BAM", name: "Bosnia and Herzegovina Convertible Mark" },
  { code: "MDL", name: "Moldovan Leu" },
  { code: "UAH", name: "Ukrainian Hryvnia" },
  { code: "GEL", name: "Georgian Lari" },
  { code: "BYN", name: "Belarusian Ruble" },
  { code: "AZN", name: "Azerbaijani Manat" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "CLP", name: "Chilean Peso" },
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

function currencySymbol(code: string): string {
  switch (code) {
    case "EUR":
      return "€";
    case "USD":
      return "$";
    case "GBP":
      return "£";
    case "CHF":
      return "Fr";
    case "SEK":
    case "NOK":
    case "DKK":
    case "ISK":
      return "kr";
    case "CZK":
      return "Kč";
    case "PLN":
      return "zł";
    case "HUF":
      return "Ft";
    case "RON":
      return "lei";
    case "BGN":
      return "лв";
    case "RSD":
      return "дин";
    case "MKD":
      return "ден";
    case "ALL":
      return "L";
    case "BAM":
      return "KM";
    case "MDL":
      return "L";
    case "UAH":
      return "₴";
    case "GEL":
      return "₾";
    case "BYN":
      return "Br";
    case "AZN":
      return "₼";
    case "TRY":
      return "₺";
    case "RUB":
      return "₽";
    case "BRL":
      return "R$";
    case "ARS":
      return "$";
    case "CLP":
      return "$";
    default:
      return code;
  }
}

export function CurrencySelector({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const { currency, setCurrency } = useCurrency();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(containerRef, () => setOpen(false));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter((c) =>
      [c.code, c.name, currencySymbol(c.code)].some((s) =>
        s.toLowerCase().includes(q)
      )
    );
  }, [query]);

  const choose = (code: string) => {
    setCurrency(code);
    setOpen(false);
    router.refresh();
  };

  const placeholder = locale?.toLowerCase().startsWith("ru")
    ? "Поиск валюты"
    : "Search currency";
  const noResults = locale?.toLowerCase().startsWith("ru")
    ? "Ничего не найдено"
    : "No results";

  const currentLabel = () => {
    const found = CURRENCIES.find((c) => c.code === currency);
    return found ? found.code : "EUR";
  };

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <Button
        variant="ghost"
        size="sm"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={
          locale?.toLowerCase().startsWith("ru")
            ? "Выбрать валюту"
            : "Select currency"
        }
        onClick={() => setOpen((v) => !v)}
        className="min-w-[80px] justify-between"
      >
        <span className="truncate">{currentLabel()}</span>
        <span className="ml-2 text-xs text-muted-foreground">
          {currencySymbol(currency)}
        </span>
      </Button>

      {open && (
        <div
          role="dialog"
          className="absolute right-0 z-50 mt-2 w-64 rounded-md border bg-popover text-popover-foreground shadow-md"
        >
          <div className="p-2 border-b">
            <Input
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-8"
              autoFocus
            />
          </div>
          <ul role="listbox" className="max-h-72 overflow-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-muted-foreground">
                {noResults}
              </li>
            ) : (
              filtered.map((c) => (
                <li key={c.code}>
                  <button
                    type="button"
                    onClick={() => choose(c.code)}
                    className={cn(
                      "flex w-full min-w-0 items-center justify-between px-3 py-2 text-sm hover:bg-accent",
                      c.code === currency && "bg-accent/50"
                    )}
                    role="option"
                    aria-selected={c.code === currency}
                  >
                    <span className="font-medium truncate pr-3">{c.name}</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {currencySymbol(c.code)}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
