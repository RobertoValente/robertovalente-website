import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/lib/dictionaries";
import { alternates, hasLocale, localeTags, locales, ogLocales } from "@/lib/i18n";
import { site } from "@/lib/site";
import "../globals.css";

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);

  return {
    metadataBase: new URL(site.url),
    title: { default: meta.title, template: `%s - ${site.name}` },
    description: meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    keywords: ["Roberto Valente", "robertovalente", "programador", "developer", "portfolio", "Portugal", "blog"],
    alternates: {
      ...alternates(lang, ""),
      types: { "application/rss+xml": `/${lang}/blog/rss.xml` },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: meta.title,
      description: meta.description,
      url: `/${lang}`,
      locale: ogLocales[lang],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
    robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: dict.meta.description,
        inLanguage: ["pt-PT", "en"],
        author: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        url: site.url,
        jobTitle: lang === "pt" ? "Programador" : "Developer",
        nationality: "Portugal",
        sameAs: [site.github, site.linkedin],
      },
    ],
  };

  return (
    <html
      lang={localeTags[lang]}
      suppressHydrationWarning
      className={`${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SiteHeader lang={lang} dict={dict} />
          {/* Route changes fade the page content; the header stays put. */}
          <ViewTransition default="page">{children}</ViewTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
