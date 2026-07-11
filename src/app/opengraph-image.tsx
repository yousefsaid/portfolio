import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — Software Engineer`;

/** Social share card: dark glass look matching the site. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background:
            "radial-gradient(52% 60% at 16% 18%, rgba(143,126,224,0.4) 0%, rgba(10,9,19,0) 65%), radial-gradient(50% 55% at 86% 80%, rgba(90,166,232,0.3) 0%, rgba(10,9,19,0) 65%), #0a0913",
          color: "#f1effa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            backgroundImage:
              "linear-gradient(115deg, #b3a4f5 0%, #8cc3f5 40%, #f5b8d2 80%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          ys.
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: "-0.03em", marginTop: 8 }}>
          {SITE.name}
        </div>
        <div style={{ fontSize: 30, color: "rgba(241,239,250,0.65)", marginTop: 18, maxWidth: 900 }}>
          {SITE.tagline}
        </div>
        <div style={{ fontSize: 22, color: "rgba(241,239,250,0.4)", marginTop: 40, fontFamily: "monospace" }}>
          {SITE.role}
        </div>
      </div>
    ),
    size,
  );
}
