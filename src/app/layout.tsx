import type { Metadata } from "next";
import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import { SITE } from "@/data/site";
import "./globals.css";

const sans = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${SITE.name} — Software Engineer`,
  description: SITE.tagline,
  openGraph: {
    title: `${SITE.name} — Software Engineer`,
    description: SITE.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
