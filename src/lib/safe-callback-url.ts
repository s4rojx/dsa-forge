const DEFAULT_AUTH_CALLBACK_URL = "/dashboard";
const AUTH_PAGE_PREFIXES = ["/login", "/register"];

export function getSafeCallbackUrl(rawValue?: string | null) {
  if (!rawValue) {
    return DEFAULT_AUTH_CALLBACK_URL;
  }

  if (!rawValue.startsWith("/") || rawValue.startsWith("//")) {
    return DEFAULT_AUTH_CALLBACK_URL;
  }

  try {
    const parsed = new URL(rawValue, "http://localhost");
    const pathname = parsed.pathname;
    const isAuthPage = AUTH_PAGE_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    );

    if (isAuthPage) {
      return DEFAULT_AUTH_CALLBACK_URL;
    }

    return `${pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return DEFAULT_AUTH_CALLBACK_URL;
  }
}

