"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

type Ctx = {
  currency: string;
  setCurrency: (code: string) => void;
};

const CurrencyContext = createContext<Ctx | null>(null);

export function useCurrency(): Ctx {
  const ctx = useContext(CurrencyContext);
  if (!ctx)
    throw new Error("useCurrency must be used within <CurrencyProvider>");
  return ctx;
}

export function CurrencyProvider({
  initialCurrency,
  children,
}: {
  initialCurrency: string;
  children: React.ReactNode;
}) {
  const [currency, setCurrencyState] = useState(initialCurrency || "EUR");

  const setCurrency = (code: string) => {
    try {
      const maxAge = 60 * 60 * 24 * 30;
      document.cookie = `currency=${encodeURIComponent(
        code
      )}; path=/; max-age=${maxAge}`;
    } catch {}
    setCurrencyState(code);
  };

  const value = useMemo(() => ({ currency, setCurrency }), [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}
