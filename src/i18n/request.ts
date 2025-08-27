import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // Only EN for now; could inspect request for locale later
  const locale = "en";
  const messages = (await import(`./messages/${locale}.json`)).default;
  return { locale, messages };
});
