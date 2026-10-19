import { ImageResponse } from "next/og";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";

export const alt = "Roberto Valente";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const muted = "#9a9893";
const mark = "#55534f";

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(hasLocale(lang) ? lang : "pt");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#121212",
          color: "#e8e8e6",
          fontFamily: "monospace",
          fontSize: 34,
          lineHeight: 1.6,
        }}
      >
        <div style={{ color: mark }}>---</div>
        <div style={{ display: "flex" }}>
          <span style={{ color: muted }}>name</span>: Roberto Valente
        </div>
        <div style={{ display: "flex" }}>
          <span style={{ color: muted }}>role</span>: {dict.frontmatter.role}
        </div>
        <div style={{ display: "flex" }}>
          <span style={{ color: muted }}>site</span>: robertovalente.pt
        </div>
        <div style={{ color: mark }}>---</div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 64, fontWeight: 700 }}>
          <span style={{ color: mark, marginRight: 24 }}>#</span>
          {dict.hero.title}
        </div>
      </div>
    ),
    size,
  );
}
