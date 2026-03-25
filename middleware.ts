import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./src/lib/i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  // TR default should be served without prefix at `/`
  localePrefix: "as-needed",
  // Avoid unexpected redirects during dev.
  localeDetection: false,
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

