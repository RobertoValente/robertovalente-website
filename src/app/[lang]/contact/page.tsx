import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import { getDictionary } from "@/lib/dictionaries";
import { alternates, hasLocale, pageTitle } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { contact } = getDictionary(lang);
  return { title: pageTitle(contact.title), description: contact.description, alternates: alternates(lang, "/contact") };
}

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { contact } = getDictionary(lang);

  return (
    <PageShell
      frontmatter={[
        ["section", contact.title],
        [
          "github",
          <a key="github" href={site.github} target="_blank" rel="me noopener noreferrer">
            RobertoValente
          </a>,
        ],
        [
          "linkedin",
          <a key="linkedin" href={site.linkedin} target="_blank" rel="me noopener noreferrer">
            robertovalennte
          </a>,
        ],
      ]}
    >
      <h1>{contact.title}</h1>
      <blockquote>{contact.description}</blockquote>
      <div className="mt-12 max-w-5xl">
        <ContactForm lang={lang} t={contact} />
      </div>
    </PageShell>
  );
}
