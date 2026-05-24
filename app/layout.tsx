import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vinamra Bhonsle — Developer & Cybersecurity Enthusiast",
    template: "%s · Vinamra Bhonsle",
  },
  description:
    "Developer and cybersecurity enthusiast building secure, robust software. Specializing in full-stack development, digital forensics, and application security.",
  keywords: [
    "Vinamra Bhonsle",
    "Developer",
    "Cybersecurity",
    "Full Stack",
    "Digital Forensics",
    "Portfolio",
  ],
  authors: [{ name: "Vinamra Bhonsle" }],
  creator: "Vinamra Bhonsle",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Vinamra Bhonsle — Developer & Cybersecurity Enthusiast",
    description:
      "Building secure, robust software with a passion for cybersecurity and digital forensics.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body>
        <SmoothScroll>
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
