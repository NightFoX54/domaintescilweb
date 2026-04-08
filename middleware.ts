import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { defaultLocale, locales } from "./src/lib/i18n";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  // TR default should be served without prefix at `/`
  localePrefix: "as-needed",
  // Avoid unexpected redirects during dev.
  localeDetection: false,
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const host = request.headers.get("host") ?? "";
  const isProductionHost = host === "domaintescil.com" || host === "www.domaintescil.com";
  const isPreviewHost = host.includes("vercel.app") && !isProductionHost;

  if (isPreviewHost) {
    response.headers.set("x-robots-tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

