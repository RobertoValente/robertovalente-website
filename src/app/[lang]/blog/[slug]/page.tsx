import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { PageShell } from "@/components/page-shell";
import { hasLocale, localeTags, otherLocale, type Locale } from "@/lib/i18n";
import { getPost, getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!hasLocale(params.lang)) return [];
  return (await getPosts(params.lang)).map((post) => ({ slug: post.slug }));
}

async function translation(lang: Locale, slug: string) {
  return getPost(otherLocale(lang), slug);
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const post = await getPost(lang, slug);
  if (!post) return {};
  const other = await translation(lang, slug);

  const languages: Record<string, string> = { [localeTags[lang]]: `/${lang}/blog/${slug}` };
  if (other) languages[localeTags[other.lang]] = `/${other.lang}/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: site.name, url: site.url }],
    alternates: { canonical: `/${lang}/blog/${slug}`, languages },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/${lang}/blog/${slug}`,
      publishedTime: post.date,
      authors: [site.url],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const post = await getPost(lang, slug);
  const other = await translation(lang, slug);

  // Missing posts are answered in the proxy (404 or redirect); this only guards direct renders.
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: localeTags[lang],
    url: `${site.url}/${lang}/blog/${slug}`,
    mainEntityOfPage: `${site.url}/${lang}/blog/${slug}`,
    author: { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, url: site.url },
  };

  return (
    <PageShell
      frontmatter={[
        ["title", post.title],
        ["date", post.date],
        ["read", dict.posts.minutes(post.minutes)],
        [
          "lang",
          <span key="lang">
            {lang}
            {other && (
              <>
                {" · "}
                <Link href={`/${other.lang}/blog/${slug}`} hrefLang={other.lang}>
                  {other.lang}
                </Link>
              </>
            )}
          </span>,
        ],
      ]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="mb-6 text-[15px]">
        <Link href={`/${lang}/blog`} className="text-muted-foreground">
          {dict.posts.back}
        </Link>
      </p>
      <article>
        <h1>{post.title}</h1>
        <blockquote>{post.description}</blockquote>
        <div className="prose mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </PageShell>
  );
}
