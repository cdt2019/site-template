import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** 自动生成 favicon：青柠方块 + 品牌首字母 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#c6f432",
          borderRadius: 16,
          color: "#15140f",
          fontSize: 44,
          fontStyle: "italic",
          fontFamily: "serif",
        }}
      >
        {siteConfig.name.charAt(0)}
      </div>
    ),
    size,
  );
}
