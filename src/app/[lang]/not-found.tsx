import Link from "next/link";
import { lang as rootLang } from "next/root-params";
import { PageShell } from "@/components/page-shell";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";

export default async function NotFound() {
  const value = await rootLang();
  const lang = hasLocale(value) ? value : "pt";
  const { notFound } = getDictionary(lang);

  return (
    <PageShell frontmatter={[["status", "404"]]}>
      <h1>{notFound.title}</h1>
      <p className="mt-6">
        <Link href={`/${lang}`} className="text-muted-foreground">
          {notFound.back}
        </Link>
      </p>
    </PageShell>
  );
}
