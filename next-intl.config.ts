import type { LocalePrefix } from "next-intl/routing";

const config = {
  locales: ["en", "ru"] as const,
  defaultLocale: "en",
  localePrefix: "always" as LocalePrefix,
};

export default config;
