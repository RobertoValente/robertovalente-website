import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { Status } from "@/components/status";
import { events, projects } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { formatDate, hasLocale, localizePath } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

const LATEST_POSTS = 3;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const posts = (await getPosts(lang)).slice(0, LATEST_POSTS);

  return (
    <PageShell
      frontmatter={[
        ["name", site.name],
        ["role", dict.frontmatter.role],
        ["based", dict.frontmatter.based],
        ["status", <Status key="status" working={dict.frontmatter.working} chilling={dict.frontmatter.chilling} />],
      ]}
    >
      <h1>{dict.hero.title}</h1>
      <blockquote>{dict.hero.statement}</blockquote>

      <h2 id="projects">{dict.projects.title}</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.name}>
            <a href={project.site ?? project.code} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>{" "}
            <span className="text-muted-foreground">{`// ${dict.projects.status[project.status]}`}</span>
            <span className="block text-muted-foreground">{project.description[lang]}</span>
          </li>
        ))}
      </ul>

      <h2 id="writing">{dict.posts.latest}</h2>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">{dict.posts.empty}</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <span className="text-muted-foreground">{formatDate(post.date)}</span>{" "}
              <Link href={`/${lang}/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4">
        <Link href={`/${lang}/blog`} className="text-muted-foreground">
          {dict.posts.all}
        </Link>
      </p>

      <details className="mt-14">
        <summary>
          {dict.path.title} <span className="font-normal text-muted-foreground">{dict.path.count(events.length)}</span>{" "}
          <span aria-hidden className="twisty inline-block text-mark transition-transform">
            ▸
          </span>
        </summary>
        <ul className="mt-4">
          {events.map((event) => (
            <li key={event.name} className="sm:grid sm:grid-cols-[6ch_1fr_auto] sm:gap-x-[2ch]">
              <span className="text-muted-foreground">{event.year}</span>{" "}
              {event.url ? (
                <a href={event.url} target="_blank" rel="noopener noreferrer" className="justify-self-start">
                  {event.name}
                </a>
              ) : (
                <span>{event.name}</span>
              )}{" "}
              <span className="text-muted-foreground">{event.location}</span>
            </li>
          ))}
        </ul>
      </details>

      <h2 id="contact">{dict.contact.title}</h2>
      <p>
        {dict.contact.home.before} <Link href={`/${lang}${localizePath(lang, "/contact")}`}>{dict.contact.home.link}</Link>
        {dict.contact.home.after}{" "}
        <a href={site.github} target="_blank" rel="me noopener noreferrer">
          github
        </a>{" "}
        {dict.contact.home.and}{" "}
        <a href={site.linkedin} target="_blank" rel="me noopener noreferrer">
          linkedin
        </a>
        .
      </p>
    </PageShell>
  );
}
