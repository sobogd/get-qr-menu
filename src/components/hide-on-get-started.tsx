"use client";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export function HideOnGetStarted({ children }: PropsWithChildren) {
  const pathname = usePathname();
  if (pathname && pathname.includes("/get-started")) return null;
  return <>{children}</>;
}
