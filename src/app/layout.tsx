import type { Metadata } from "next";
import "./globals.css";
import { conductorData } from "@/data/conductor";

export const metadata: Metadata = {
  title: `${conductorData.name} | Conductor`,
  description: conductorData.biographyShort,
  keywords: ["conductor", "classical music", "orchestra", "opera", "symphony"],
  authors: [{ name: conductorData.name }],
  openGraph: {
    title: `${conductorData.name} | Conductor`,
    description: conductorData.biographyShort,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${conductorData.name} | Conductor`,
    description: conductorData.biographyShort,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
