import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") || "Blog";
  const description =
    searchParams.get("description") || "Informatica, C++ e Linux";
  const author = searchParams.get("author") || "Mattia Pirazzi";
  const coverImage = searchParams.get("coverImage");

  // Se l'immagine è un percorso relativo (es. /images/cover.png),
  // costruiamo l'URL assoluto richiesto da Satori/next/og
  let absoluteImageUrl: string | null = null;
  if (coverImage) {
    if (coverImage.startsWith("http://") || coverImage.startsWith("https://")) {
      absoluteImageUrl = coverImage;
    } else {
      const origin = req.nextUrl.origin;
      absoluteImageUrl = `${origin}${coverImage.startsWith("/") ? "" : "/"}${coverImage}`;
    }
  }

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
        position: "relative",
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

      {/* Corpo centrale: Layout Flessibile (Con o Senza Immagine) */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          zIndex: 10,
        }}
      >
        {/* Testo (Titolo + Descrizione) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            flex: 1,
          }}
        >
          <h1
            style={{
              fontSize: absoluteImageUrl ? "46px" : "56px",
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
              fontSize: "22px",
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

        {/* Anteprima Cover Image (se presente) */}
        {absoluteImageUrl && (
          <div
            style={{
              display: "flex",
              width: "360px",
              height: "240px",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #333333",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
              // shrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={absoluteImageUrl}
              alt="Cover"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}
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
