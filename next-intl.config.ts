import type { LocalePrefix } from "next-intl/routing";

const config = {
  locales: ["en"] as const,
  defaultLocale: "en",
  localePrefix: "as-needed" as LocalePrefix,
};

export default config;
