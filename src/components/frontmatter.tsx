// The page's "YAML frontmatter", shown in the left column.
export type FrontmatterEntry = [key: string, value: React.ReactNode];

export function Frontmatter({ entries }: { entries: FrontmatterEntry[] }) {
  return (
    <pre className="m-0 font-mono text-[15px] whitespace-pre-wrap">
      <span className="block text-mark">---</span>
      {entries.map(([key, value]) => (
        // Wrapped values indent under the value, like in an editor.
        <span key={key} className="block pl-[4ch] -indent-[4ch]">
          <span className="text-muted-foreground">{key}</span>: {value}
        </span>
      ))}
      <span className="block text-mark">---</span>
    </pre>
  );
}
