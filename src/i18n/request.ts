import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "@/lib/i18n";

export default getRequestConfig(async ({ requestLocale }) => {
  // When URL is unprefixed (e.g. "/domain-ara"), next-intl provides the locale
  // via requestLocale (resolved by middleware/cookie/headers).
  const candidate = await requestLocale;
  const locale = locales.includes(candidate as any) ? (candidate as any) : defaultLocale;

  const messagesModule = await import(`../messages/${locale}.json`);
  const messages = messagesModule.default ?? messagesModule;

  return {
    locale,
    messages,
  };
});

