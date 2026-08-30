import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import "@/styles/visitor.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anmol Madan — Cybersecurity Trainer & Motivational Speaker",
  description:
    "Official portfolio of Anmol Madan, certified Cybersecurity Specialist & Motivational Speaker based in Chandigarh, India. Corporate training, keynotes, and workshops across India and online.",
  keywords: [
    "Anmol Madan",
    "Cybersecurity Trainer",
    "Motivational Speaker",
    "Corporate Training",
    "Cybersecurity Specialist",
    "Chandigarh",
    "Speaker India",
  ],
  authors: [{ name: "Anmol Madan" }],
  openGraph: {
    title: "Anmol Madan — Cybersecurity Trainer & Motivational Speaker",
    description:
      "Transforming classrooms and boardrooms with memorable cybersecurity sessions and motivational keynotes.",
    type: "website",
    locale: "en_US",
    siteName: "Anmol Madan Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen`}
      >
        {children}

        <Toaster
          position="top-right"
          richColors
          closeButton
          expand
          duration={4000}
        />
      </body>
    </html>
  );
}