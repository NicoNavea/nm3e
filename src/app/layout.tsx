import type { Metadata } from "next";
import { Barlow_Condensed, Barlow, Space_Mono } from "next/font/google";
import "./globals.css";
import CartProvider from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";

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
  icons: {
    icon: "/uploads/favicon.jpeg",
    shortcut: "/uploads/favicon.jpeg",
    apple: "/uploads/favicon.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');})();` }} />
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
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
