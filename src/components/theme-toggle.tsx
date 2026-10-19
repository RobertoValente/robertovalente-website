"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";

export function ThemeToggle({ label, toDark, toLight }: { label: string; toDark: string; toLight: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const isDark = !mounted || resolvedTheme === "dark";

  // The new theme grows as a circle from the click point (see .theme-vt in globals.css).
  const toggle = (event: MouseEvent) => {
    const next = isDark ? "light" : "dark";
    const root = document.documentElement;
    const apply = () => {
      root.classList.toggle("dark", next === "dark");
      setTheme(next);
    };

    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();

    root.style.setProperty("--vt-x", `${event.clientX}px`);
    root.style.setProperty("--vt-y", `${event.clientY}px`);
    root.classList.add("theme-vt");
    document.startViewTransition(() => flushSync(apply)).finished.finally(() => root.classList.remove("theme-vt"));
  };

  return (
    <button
      type="button"
      title={isDark ? toLight : toDark}
      onClick={toggle}
      className="cursor-pointer underline decoration-transparent underline-offset-[5px] hover:decoration-current"
    >
      {label}
    </button>
  );
}
