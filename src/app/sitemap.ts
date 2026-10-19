import type { MetadataRoute } from "next";
import { defaultLocale, localeTags, localizePath, locales } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

function pageInBothLanguages(path: string, lastModified: string): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(locales.map((lang) => [localeTags[lang], `${site.url}/${lang}${localizePath(lang, path)}`])),
    "x-default": `${site.url}/${defaultLocale}${localizePath(defaultLocale, path)}`,
  };
  return locales.map((lang) => ({ url: `${site.url}/${lang}${localizePath(lang, path)}`, lastModified, alternates: { languages } }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await Promise.all(locales.map((lang) => getPosts(lang)))).flat();

  return [
    ...pageInBothLanguages("", site.updated),
    ...pageInBothLanguages("/blog", posts[0]?.date ?? site.updated),
    ...pageInBothLanguages("/contact", site.updated),
    ...posts.map((post) => ({ url: `${site.url}/${post.lang}/blog/${post.slug}`, lastModified: post.date })),
  ];
}
