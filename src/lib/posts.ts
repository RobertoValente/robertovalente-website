import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import type { Locale } from "./i18n";

// Posts live in content/blog/<lang>/<slug>.md. The same slug in both folders is a translation.
const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Code blocks carry their language so the page can show the ``` fence marks, like in the source file.
const marked = new Marked({
  renderer: {
    code({ text, lang }) {
      const language = lang?.split(/\s/)[0] ?? "";
      return `<pre data-lang="${escapeHtml(language)}"><code>${escapeHtml(text)}</code></pre>\n`;
    },
  },
});

export type PostMeta = {
  slug: string;
  lang: Locale;
  title: string;
  description: string;
  date: string;
  minutes: number;
};

export type Post = PostMeta & { html: string };

async function readPost(lang: Locale, slug: string): Promise<Post | null> {
  let file: string;
  try {
    file = await readFile(path.join(BLOG_DIR, lang, `${slug}.md`), "utf8");
  } catch {
    return null;
  }

  const { data, content } = matter(file);
  for (const key of ["title", "description", "date"]) {
    if (!data[key]) throw new Error(`content/blog/${lang}/${slug}.md is missing "${key}" in its frontmatter`);
  }

  return {
    slug,
    lang,
    title: String(data.title),
    description: String(data.description),
    // YAML parses unquoted dates as Date objects.
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    minutes: Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE)),
    html: await marked.parse(content),
  };
}

export async function getPosts(lang: Locale): Promise<PostMeta[]> {
  "use cache";
  let files: string[] = [];
  try {
    files = await readdir(path.join(BLOG_DIR, lang));
  } catch {
    return [];
  }

  const posts = await Promise.all(
    files.filter((file) => file.endsWith(".md")).map((file) => readPost(lang, file.slice(0, -3))),
  );

  return posts
    .filter((post): post is Post => post !== null)
    .map((post): PostMeta => ({
      slug: post.slug,
      lang: post.lang,
      title: post.title,
      description: post.description,
      date: post.date,
      minutes: post.minutes,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(lang: Locale, slug: string): Promise<Post | null> {
  "use cache";
  return readPost(lang, slug);
}
