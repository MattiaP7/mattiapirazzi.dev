import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") || "Blog";
  const description =
    searchParams.get("description") || "Informatica, C++ e Linux";
  const author = searchParams.get("author") || "Mattia Pirazzi";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0a0a0a",
        color: "#ffffff",
        padding: "60px 80px",
        fontFamily: "sans-serif",
        border: "1px solid #262626",
      }}
    >
      {/* Background Grid Accent */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #262626 2px, transparent 0)",
          backgroundSize: "50px 50px",
          opacity: 0.3,
        }}
      />

      {/* Header con Autore/Brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#3b82f6",
          }}
        />
        <span style={{ fontSize: "24px", color: "#a3a3a3", fontWeight: 600 }}>
          {author}
        </span>
      </div>

      {/* Corpo centrale: Titolo e Descrizione */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#f5f5f5",
            margin: 0,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "24px",
            color: "#a3a3a3",
            margin: 0,
            lineHeight: 1.4,
            maxHeight: "68px",
            overflow: "hidden",
          }}
        >
          {description}
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #262626",
          paddingTop: "24px",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: "18px",
            color: "#737373",
            fontFamily: "monospace",
          }}
        >
          mattiapirazzi.dev
        </span>
        <span style={{ fontSize: "18px", color: "#3b82f6", fontWeight: 600 }}>
          System & Software Development
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
