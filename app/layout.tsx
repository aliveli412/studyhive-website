import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Study Hive — Tutoring by medical & science students",
    template: "%s | The Study Hive",
  },
  description:
    "Founded by Bee. A network of experienced tutors — all with a prior degree, teaching experience and an enhanced DBS. All lessons online.",
  metadataBase: new URL("https://mystudyhive.co.uk"),
  openGraph: {
    title: "The Study Hive",
    description:
      "Founded by Bee. Tutoring by post-graduate professionals & doctors. All lessons online.",
    url: "https://mystudyhive.co.uk",
    siteName: "The Study Hive",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
