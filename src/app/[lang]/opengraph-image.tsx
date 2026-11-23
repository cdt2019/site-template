import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import en from "@/i18n/dictionaries/en";

// 默认 OG 字体不含中文字形，这里统一用英文文案，避免出现方块字
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return siteConfig.locales.map((lang) => ({ lang }));
}

export default function OpengraphImage() {
  const { hero } = en;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f0e8",
          color: "#15140f",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#c6f432",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontStyle: "italic",
            }}
          >
            {siteConfig.name.charAt(0)}
          </div>
          <div style={{ fontSize: 34, fontFamily: "sans-serif", fontWeight: 600 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, lineHeight: 1, letterSpacing: -3, display: "flex", flexWrap: "wrap" }}>
            <span>{hero.titleBefore}&nbsp;</span>
            <span style={{ background: "#c6f432", padding: "0 12px", fontStyle: "italic" }}>
              {hero.titleEmphasis}
            </span>
            <span>{hero.titleAfter}</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#4a473e", fontFamily: "sans-serif" }}>
            {hero.eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #d8d3c5",
            paddingTop: 24,
            fontSize: 24,
            color: "#8a8577",
            fontFamily: "monospace",
          }}
        >
          <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
          <span style={{ color: "#ff5b2e" }}>● live</span>
        </div>
      </div>
    ),
    size,
  );
}
