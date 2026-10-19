import type { Dictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";
import { LangSwitch } from "./lang-switch";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

const Dot = () => <span className="text-mark"> · </span>;

export function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <header className="site-header sticky top-0 z-10 border-b border-line bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1920px] flex-wrap items-baseline justify-between gap-x-[2ch] px-[22px] py-3.5 text-[13px] min-[400px]:text-sm sm:px-10 sm:py-[18px] sm:text-[15px]">
        <nav className="whitespace-nowrap">
          <NavLinks
            links={[
              { href: `/${lang}`, label: dict.nav.home },
              { href: `/${lang}/blog`, label: dict.nav.blog },
              { href: `/${lang}${localizePath(lang, "/contact")}`, label: dict.nav.contact },
            ]}
          />
        </nav>
        <p className="whitespace-nowrap text-muted-foreground">
          <LangSwitch lang={lang} label={dict.langSwitch.label} title={dict.langSwitch.title} />
          <Dot />
          <ThemeToggle label={dict.nav.theme} toDark={dict.theme.toDark} toLight={dict.theme.toLight} />
          <Dot />
          <a href={`/${lang}/blog/rss.xml`} className="no-underline hover:underline">
            rss
          </a>
        </p>
      </div>
    </header>
  );
}
