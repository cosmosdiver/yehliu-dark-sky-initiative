import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "野柳暗空倡議 | 藝術、文化與自然場域",
  description: "那些來自大家的思想的光點",
  keywords: ["野柳", "暗空", "藝術", "文化", "自然"],
  openGraph: {
    title: "野柳暗空倡議 | 藝術、文化與自然場域",
    description: "那些來自大家的思想的光點",
    type: "website",
    locale: "zh_TW",
    siteName: "野柳暗空倡議",
  },
  twitter: {
    card: "summary_large_image",
    title: "野柳暗空倡議 | 藝術、文化與自然場域",
    description: "那些來自大家的思想的光點",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
