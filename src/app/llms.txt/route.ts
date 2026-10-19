import { projects } from "@/lib/content";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

// llms.txt (https://llmstxt.org): a Markdown summary of the site for language models.
export async function GET() {
  const [pt, en] = await Promise.all([getPosts("pt"), getPosts("en")]);
  const posts = [...en, ...pt];

  const body = `# ${site.name}

> Roberto Valente is a developer from Portugal. This is his personal website, in Portuguese and English: projects, a blog and a contact form.

A dreamer with action: always learning, always building. He builds software and has taken part in robotics competitions (RoboCup, Festival Nacional de Robótica).

## Pages

- [Home (English)](${site.url}/en): introduction, projects and robotics
- [Início (Português)](${site.url}/pt): apresentação, projetos e robótica
- [Blog (English)](${site.url}/en/blog)
- [Blog (Português)](${site.url}/pt/blog)
- [Contact](${site.url}/en/contact): send Roberto a message (name, email, message)
- [Contacto](${site.url}/pt/contacto): envia uma mensagem ao Roberto

## Projects

${projects.map((p) => `- [${p.name}](${p.site ?? p.code}): ${p.description.en}`).join("\n")}

## Blog posts

${posts.length ? posts.map((p) => `- [${p.title}](${site.url}/${p.lang}/blog/${p.slug}) (${p.lang}, ${p.date}): ${p.description}`).join("\n") : "- No posts yet."}

## Elsewhere

- [GitHub](${site.github})
- [LinkedIn](${site.linkedin})
`;

  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
