"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export function NavLinks({ links }: { links: { href: string; label: string }[] }) {
  const pathname = usePathname();
  // The home link is only current on the home page; others also match their sub-pages.
  const isCurrent = (href: string, i: number) => (i === 0 ? pathname === href : pathname.startsWith(href));

  return links.map((link, i) => (
    <Fragment key={link.href}>
      {i > 0 && <span className="text-mark"> · </span>}
      <Link
        href={link.href}
        aria-current={isCurrent(link.href, i) ? "page" : undefined}
        className="decoration-transparent hover:decoration-mark aria-[current=page]:font-semibold aria-[current=page]:decoration-current"
      >
        {link.label}
      </Link>
    </Fragment>
  ));
}
