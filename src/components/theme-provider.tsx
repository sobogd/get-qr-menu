"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import SonnerToaster from "./sonner-toaster";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <SonnerToaster />
    </NextThemesProvider>
  );
}
