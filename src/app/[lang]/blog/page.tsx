import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getDictionary } from "@/lib/dictionaries";
import { alternates, formatDate, hasLocale, pageTitle } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { posts } = getDictionary(lang);
  return {
    title: pageTitle(posts.title),
    description: posts.description,
    alternates: { ...alternates(lang, "/blog"), types: { "application/rss+xml": `/${lang}/blog/rss.xml` } },
  };
}

export default async function Blog({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const posts = await getPosts(lang);

  return (
    <PageShell
      frontmatter={[
        ["section", "blog"],
        ["posts", dict.posts.count(posts.length)],
        ["lang", "pt · en"],
        [
          "feed",
          <a key="feed" href={`/${lang}/blog/rss.xml`}>
            rss.xml
          </a>,
        ],
      ]}
    >
      <h1>{dict.posts.title}</h1>
      <blockquote>{dict.posts.description}</blockquote>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted-foreground">{dict.posts.empty}</p>
      ) : (
        <ol className="mt-12 border-b border-line">
          {posts.map((post) => (
            <li key={post.slug} className="border-t border-line">
              <Link
                href={`/${lang}/blog/${post.slug}`}
                className="group grid gap-x-[2ch] py-[1.1em] no-underline sm:grid-cols-[11ch_1fr]"
              >
                <time dateTime={post.date} className="text-muted-foreground">
                  {formatDate(post.date)}
                </time>
                <span>
                  <span className="font-semibold underline decoration-transparent underline-offset-[5px] group-hover:decoration-current">
                    {post.title}
                  </span>
                  <span className="block text-muted-foreground">{post.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </PageShell>
  );
}
