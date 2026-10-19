export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const otherLocale = (lang: Locale): Locale => (lang === "pt" ? "en" : "pt");

// Used for <html lang>, Open Graph and date formatting.
export const localeTags: Record<Locale, string> = { pt: "pt-PT", en: "en" };
export const ogLocales: Record<Locale, string> = { pt: "pt_PT", en: "en_US" };

// Dates read like file timestamps: 2026.10.19.
export function formatDate(date: string) {
  return date.replaceAll("-", ".");
}

// URL segments that differ per language. Folders in app/[lang] use the English name; the proxy
// rewrites the localized URL to that folder and redirects the wrong-language one.
const segments: Record<string, Record<Locale, string>> = {
  contact: { pt: "contacto", en: "contact" },
};

// "/contact" (or the other language's "/contacto") -> "/contacto" for pt.
export function localizePath(lang: Locale, path: string) {
  const [, first = "", ...rest] = path.split("/");
  const route = Object.keys(segments).find((key) => key === first || Object.values(segments[key]).includes(first));
  const localized = route ? segments[route][lang] : first;
  return ["", localized, ...rest].join("/").replace(/\/$/, "");
}

// The folder name for a URL segment in a language: "contacto" (pt) -> "contact".
export function routeSegment(lang: Locale, segment: string) {
  return Object.keys(segments).find((route) => segments[route][lang] === segment) ?? segment;
}

// The same page in the other language, from a full pathname like "/pt/contacto".
export function switchLocalePath(pathname: string, target: Locale) {
  const [, lang = "", first = "", ...rest] = pathname.split("/");
  const route = hasLocale(lang) ? routeSegment(lang, first) : first;
  return `/${target}${localizePath(target, ["", route, ...rest].join("/"))}`;
}

// Capitalized page name for the browser tab: "contacto" -> "Contacto".
export const pageTitle = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

// Canonical and hreflang links for a page that exists in both languages (path like "/contact" or "").
export function alternates(lang: Locale, path: string) {
  return {
    canonical: `/${lang}${localizePath(lang, path)}`,
    languages: {
      "pt-PT": `/pt${localizePath("pt", path)}`,
      en: `/en${localizePath("en", path)}`,
      "x-default": `/${defaultLocale}${localizePath(defaultLocale, path)}`,
    },
  };
}
