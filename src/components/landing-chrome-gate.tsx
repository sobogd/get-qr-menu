"use client";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

// Shows children (landing chrome) only on marketing pages.
// Marketing routes: /[locale], /[locale]/about, /blog, /careers, /privacy, /terms
export function LandingChromeGate({ children }: PropsWithChildren) {
  const pathname = usePathname() || "/";

  // Expect paths like /en, /en/..., split and inspect the second segment
  const segments = pathname.split("/").filter(Boolean);
  // segments[0] = locale (en|ru|...)
  const second = segments[1];

  const marketing: Array<string | undefined> = [
    undefined, // root landing: /[locale]
    "about",
    "blog",
    "careers",
    "privacy",
    "terms",
  ];

  const isMarketing = marketing.some((s) => s === second);
  if (!isMarketing) return null;
  return <>{children}</>;
}
