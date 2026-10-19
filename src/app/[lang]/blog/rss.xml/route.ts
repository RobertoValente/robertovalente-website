import { getDictionary } from "@/lib/dictionaries";
import { hasLocale, localeTags, locales } from "@/lib/i18n";
import { getPost, getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET(_request: Request, { params }: RouteContext<"/[lang]/blog/rss.xml">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return new Response("Not found", { status: 404 });
  const dict = getDictionary(lang);
  const posts = await getPosts(lang);

  const items = await Promise.all(
    posts.map(async (meta) => {
      const post = await getPost(lang, meta.slug);
      const url = `${site.url}/${lang}/blog/${meta.slug}`;
      return `
    <item>
      <title>${escape(meta.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(`${meta.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(meta.description)}</description>
      <content:encoded><![CDATA[${post?.html ?? ""}]]></content:encoded>
    </item>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${dict.posts.title} · ${site.name}`)}</title>
    <link>${site.url}/${lang}/blog</link>
    <atom:link href="${site.url}/${lang}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escape(dict.posts.description)}</description>
    <language>${localeTags[lang]}</language>${items.join("")}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
