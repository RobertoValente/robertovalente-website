import { notFound } from "next/navigation";

// Catches unknown paths under a language so they render the localized 404.
export default function Missing() {
  notFound();
}
