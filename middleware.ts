import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { detectCurrencyFromHeaders } from "@/lib/currency";

const intlMiddleware = createMiddleware({
  locales: ["en", "ru"],
  defaultLocale: "en",
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Debug: log path processing (remove after verifying)
  // console.log("[middleware] path:", pathname);

  // Bypass assets and internal routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return intlMiddleware(request);
  }

  // Currency detection & cookie (lightweight)
  const det = detectCurrencyFromHeaders((k) => request.headers.get(k), {
    country: (request as unknown as { geo?: { country?: string } })?.geo
      ?.country,
    cookie: request.headers.get("cookie") || undefined,
    fallback: "EUR",
  });
  const res = intlMiddleware(request);
  if (
    !request.cookies.get("currency") ||
    request.cookies.get("currency")?.value !== det.currency
  ) {
    // Set cookie for 30 days
    res.cookies.set("currency", det.currency, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  // If already locale-prefixed, return i18n response (with currency cookie applied)
  if (/^\/(en|ru)(\/|$)/.test(pathname)) {
    return res;
  }

  // Root path: redirect to default locale directly (always EN)
  if (pathname === "/") {
    const best = "en";
    const url = request.nextUrl.clone();
    url.pathname = `/${best}`;
    const redirect = NextResponse.redirect(url);
    redirect.cookies.set("currency", det.currency, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return redirect;
  }

  // No locale in other paths: always prefix with default locale (EN)
  const best = "en";
  const url = request.nextUrl.clone();
  url.pathname = `/${best}${pathname}`;
  const redirect = NextResponse.redirect(url);
  redirect.cookies.set("currency", det.currency, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return redirect;
}

export const config = {
  // Match all paths except static assets and Next internals
  matcher: [
    "/", // ensure root is matched and redirected to a locale
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)",
  ],
};
