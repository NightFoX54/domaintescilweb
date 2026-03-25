const base =
  process.env.NEXT_PUBLIC_WHMCS_BASE_URL?.replace(/\/$/, "") ||
  "https://panel.domaintescil.com";

export const WHMCS_URLS = {
  base,
  // The exact WHMCS cart routes are project-specific.
  // These defaults are safe and can be overridden via NEXT_PUBLIC_WHMCS_BASE_URL.
  domainRegister: `${base}/`,
  domainTransfer: `${base}/`,
};

