import type { Metadata } from "next";
import { Barlow_Condensed, Barlow, Space_Mono } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NM3E — Calidad de Energía Eléctrica Industrial",
  description:
    "Diagnóstico, implementación y monitoreo continuo para instalaciones eléctricas industriales críticas en Chile.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-theme="light">
      <head>
      </head>
      <body
        className={`${barlowCondensed.variable} ${barlow.variable} ${spaceMono.variable}`}
        style={
          {
            "--fDisplay": "var(--font-barlow-condensed), sans-serif",
            "--fBody": "var(--font-barlow), sans-serif",
            "--fMono": "var(--font-space-mono), monospace",
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
