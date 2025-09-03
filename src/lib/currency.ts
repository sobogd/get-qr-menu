// Currency detection utilities
// - Map country codes (ISO 3166-1 alpha-2) to ISO 4217 currency codes
// - Detect from request geo/headers with fallbacks

export type CurrencyDetection = {
  currency: string;
  country?: string;
  source: "cookie" | "geo" | "header" | "accept-language" | "default";
};

// Core mapping for Europe + requested LATAM
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  // Euro area (EUR)
  AT: "EUR",
  BE: "EUR",
  CY: "EUR",
  DE: "EUR",
  EE: "EUR",
  ES: "EUR",
  FI: "EUR",
  FR: "EUR",
  GR: "EUR",
  HR: "EUR",
  IE: "EUR",
  IT: "EUR",
  LT: "EUR",
  LU: "EUR",
  LV: "EUR",
  MT: "EUR",
  NL: "EUR",
  PT: "EUR",
  SI: "EUR",
  SK: "EUR",

  // UK + CH + EEA neighbors
  GB: "GBP",
  IM: "GBP",
  JE: "GBP",
  GG: "GBP",
  CH: "CHF",
  LI: "CHF",

  // “Krona/Krone/Koruna” family
  SE: "SEK", // Swedish Krona
  NO: "NOK",
  SJ: "NOK", // Norwegian Krone
  DK: "DKK",
  FO: "DKK",
  GL: "DKK", // Danish Krone (Faroes/Greenland use DKK)
  IS: "ISK", // Icelandic Króna
  CZ: "CZK", // Czech Koruna

  // Other European popular
  PL: "PLN",
  HU: "HUF",
  RO: "RON",
  BG: "BGN",
  RS: "RSD",
  MK: "MKD",
  AL: "ALL",
  BA: "BAM",
  MD: "MDL",
  UA: "UAH",
  GE: "GEL",
  BY: "BYN",
  AZ: "AZN",
  TR: "TRY", // Turkish Lira
  RU: "RUB",

  // Nordics/Baltics already covered (EE/LT/LV in EUR)

  // Americas (requested)
  BR: "BRL", // Brazil
  AR: "ARS", // Argentina
  CL: "CLP", // Chile
};

export function countryToCurrency(
  country?: string,
  fallback: string = "EUR"
): string {
  if (!country) return fallback;
  const cc = country.toUpperCase();
  return COUNTRY_TO_CURRENCY[cc] || fallback;
}

// Minimal Accept-Language region parsing, e.g. "en-GB,en;q=0.8"
export function regionFromAcceptLanguage(header?: string): string | undefined {
  if (!header) return undefined;
  const first = header.split(",")[0]?.trim();
  const parts = first?.split("-");
  if (parts && parts?.length >= 2) return parts[1]?.toUpperCase();
  return undefined;
}

// Server-side detection helper: accepts a subset of NextRequest to avoid direct import
export function detectCurrencyFromHeaders(
  getHeader: (key: string) => string | null | undefined,
  opts?: { country?: string; cookie?: string; fallback?: string }
): CurrencyDetection {
  const fallback = opts?.fallback ?? "EUR";

  // 1) Cookie override
  const cookieHeader = opts?.cookie || getHeader("cookie") || "";
  const cookieMatch = cookieHeader.match(/(?:^|;\s*)currency=([^;]+)/i);
  if (cookieMatch?.[1]) {
    try {
      const val = decodeURIComponent(cookieMatch[1]);
      if (val) return { currency: val, source: "cookie" };
    } catch {}
  }

  // 2) Explicit country (e.g., request.geo.country)
  if (opts?.country) {
    return {
      currency: countryToCurrency(opts.country, fallback),
      country: opts.country,
      source: "geo",
    };
  }

  // 3) Common provider headers
  const countryHeader =
    getHeader("x-vercel-ip-country") ||
    getHeader("cf-ipcountry") ||
    getHeader("x-country") ||
    getHeader("x-geo-country") ||
    undefined;
  if (countryHeader) {
    const country = countryHeader.toString().trim();
    return {
      currency: countryToCurrency(country, fallback),
      country,
      source: "header",
    };
  }

  // 4) Accept-Language region fallback
  const region = regionFromAcceptLanguage(
    getHeader("accept-language") || undefined
  );
  if (region) {
    return {
      currency: countryToCurrency(region, fallback),
      country: region,
      source: "accept-language",
    };
  }

  // 5) Default
  return { currency: fallback, source: "default" };
}

export function formatMoney(
  amount: number,
  currency: string,
  locale: string = "en"
) {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}
