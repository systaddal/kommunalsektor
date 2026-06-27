import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KommunalSektor — Eit nytt operativsystem for kommunane";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F5F1E8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        {/* Shield icon */}
        <svg
          width={56}
          height={72}
          viewBox="0 0 135 171"
          fill="#2D4233"
        >
          <path d="M135 0V62.6113C135 118.177 74.445 166.696 67.5 171C60.555 166.696 0.000299323 118.177 0 62.6113V0H135Z" />
        </svg>

        <div
          style={{
            marginTop: 40,
            fontSize: 52,
            fontWeight: 400,
            color: "#18251D",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: 800,
          }}
        >
          Eit nytt operativsystem for kommunane
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 22,
            color: "#43565A",
            textAlign: "center",
            lineHeight: 1.6,
            maxWidth: 640,
          }}
        >
          Erfaringar, rammeverk og inspirasjon for kommunar som vil gjere noko anna.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 48,
            fontSize: 16,
            color: "#6F7A73",
            letterSpacing: "0.05em",
          }}
        >
          kommunalsektor.no
        </div>
      </div>
    ),
    { ...size },
  );
}
