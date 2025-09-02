import { getRequestConfig } from "next-intl/server";

type Messages = Record<string, unknown>;

export default getRequestConfig(async ({ locale }) => {
  const activeLocale = locale ?? "en";
  try {
    const mod: { default: Messages } = await import(
      `./messages/${activeLocale}.json`
    );
    return { locale: activeLocale, messages: mod.default };
  } catch {
    const fallback: { default: Messages } = await import("./messages/en.json");
    return { locale: activeLocale, messages: fallback.default };
  }
});
