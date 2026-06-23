import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Selseng & Systaddal — Fornying av offentleg sektor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#314D3C",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 100px",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 500,
            color: "#F6F1E8",
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          Selseng & Systaddal
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#938C7F",
            lineHeight: 1.5,
            maxWidth: 700,
          }}
        >
          Fornying av offentleg sektor. Frå innsida.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 100,
            fontSize: 18,
            color: "#6B6860",
          }}
        >
          selsengsystaddal.no
        </div>
      </div>
    ),
    { ...size },
  );
}
