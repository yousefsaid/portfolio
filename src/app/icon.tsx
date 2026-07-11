import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

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
          background: "linear-gradient(135deg, #8f7ee0 0%, #5aa6e8 55%, #eea0c0 100%)",
          borderRadius: 14,
          color: "#fff",
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: "-0.05em",
        }}
      >
        ys
      </div>
    ),
    size,
  );
}
