"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { otherLocale, switchLocalePath, type Locale } from "@/lib/i18n";

// Links to the same page in the other language. Posts without a translation redirect to the blog.
export function LangSwitch({ lang, label, title }: { lang: Locale; label: string; title: string }) {
  const pathname = usePathname();
  const target = otherLocale(lang);
  const href = switchLocalePath(pathname, target);

  return (
    <Link href={href} hrefLang={target} title={title} className="no-underline hover:underline">
      {label}
    </Link>
  );
}
