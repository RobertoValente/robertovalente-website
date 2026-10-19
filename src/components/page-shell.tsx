import { Frontmatter, type FrontmatterEntry } from "./frontmatter";

// Two columns on wide screens: the frontmatter sticks on the left, Markdown-style content on the right.
export function PageShell({ frontmatter, children }: { frontmatter: FrontmatterEntry[]; children: React.ReactNode }) {
  return (
    <div className="mx-auto grid w-full max-w-[1920px] flex-1 grid-cols-1 px-[22px] sm:px-10 min-[900px]:grid-cols-[300px_1fr] min-[900px]:gap-20">
      <aside className="pt-[6vh] pl-[2.4ch] min-[900px]:sticky min-[900px]:top-16 min-[900px]:self-start min-[900px]:pt-[8vh] min-[900px]:pl-0">
        <Frontmatter entries={frontmatter} />
      </aside>
      <main className="md min-w-0 pt-16 pb-[16vh] pl-[2.4ch] min-[900px]:pt-[8vh] min-[900px]:pl-0">{children}</main>
    </div>
  );
}
