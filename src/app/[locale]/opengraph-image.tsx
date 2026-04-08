import { ImageResponse } from "next/og";
import type { Locale } from "@/lib/i18n";

export const runtime = "edge";

export default async function handler({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr
    ? "Domain Tescil, Hosting ve SSL"
    : "Domain Registration, Hosting and SSL";

  const subtitle = isTr
    ? "200+ uzantıda anında sorgulama"
    : "Instant checks for 200+ TLDs";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          padding: "64px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          background: "rgb(6,6,17)",
          color: "white",
          position: "relative",
          fontFamily: '"Plus Jakarta Sans", sans-serif',
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "420px",
            height: "420px",
            borderRadius: "210px",
            background: "radial-gradient(circle at center, rgba(0,212,255,0.55), rgba(0,212,255,0) 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-140px",
            left: "-140px",
            width: "420px",
            height: "420px",
            borderRadius: "210px",
            background: "radial-gradient(circle at center, rgba(255,107,53,0.35), rgba(255,107,53,0) 65%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18, zIndex: 1 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, rgba(0,212,255,1), rgba(0,71,255,1))",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", fontWeight: 700 }}>
              Domaintescil
            </div>
            <div
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(0,212,255,0.12)",
                color: "rgba(0,212,255,0.95)",
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: 0.2,
              }}
            >
              {isTr ? "TR" : "EN"}
            </div>
          </div>
        </div>

        <h1
          style={{
            zIndex: 1,
            marginTop: 72,
            fontFamily: '"Clash Display", sans-serif',
            fontSize: 52,
            letterSpacing: -0.8,
            lineHeight: 1.05,
            maxWidth: 760,
          }}
        >
          {title}
        </h1>

        <div
          style={{
            zIndex: 1,
            marginTop: 22,
            fontSize: 18,
            color: "rgba(255,255,255,0.8)",
            maxWidth: 620,
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            zIndex: 1,
            marginTop: "auto",
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>
            ICANN Akredite Kayıt Kuruluşu
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>
            20 yıl deneyim
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

