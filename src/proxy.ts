import { existsSync } from "node:fs";
import path from "node:path";
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, localizePath, otherLocale, routeSegment, type Locale } from "@/lib/i18n";

const POST_PATH = /^\/(pt|en)\/blog\/([^/]+)\/?$/;
const SLUG = /^[a-z0-9-]+$/;

const postExists = (lang: Locale, slug: string) =>
  SLUG.test(slug) && existsSync(path.join(process.cwd(), "content", "blog", lang, `${slug}.md`));

// Picks the first supported language from Accept-Language, by preference order.
function preferredLocale(request: NextRequest): Locale {
  const languages = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  return languages.map(({ lang }) => lang).find(hasLocale) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Pages stream with a 200, so a missing post must be caught here to get a real 404.
  const post = pathname.match(POST_PATH);
  if (post) {
    const [, lang, slug] = post as unknown as [string, Locale, string];
    if (postExists(lang, slug)) return;
    // The language switch keeps the slug; a post without a translation goes to the blog.
    if (postExists(otherLocale(lang), slug)) return NextResponse.redirect(new URL(`/${lang}/blog`, request.url));
    return NextResponse.rewrite(new URL(`/${lang}/404`, request.url));
  }

  const [, lang = "", first = "", ...rest] = pathname.split("/");
  if (hasLocale(lang)) {
    // Localized URLs (/pt/contacto) are served from the English folder (/pt/contact).
    const route = routeSegment(lang, first);
    if (route !== first) return NextResponse.rewrite(new URL(`/${lang}/${[route, ...rest].join("/")}`, request.url));
    // A URL in the other language's wording (/pt/contact) redirects to the right one.
    const localized = localizePath(lang, `/${first}`).slice(1);
    if (localized !== first) return NextResponse.redirect(new URL(`/${lang}/${[localized, ...rest].join("/")}`, request.url));
    return;
  }

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals and files (anything with a dot, like robots.txt or llms.txt).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
