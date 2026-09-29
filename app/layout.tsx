import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Semiconductor Platform | From atoms to advanced chips",
  description:
    "Production-quality interactive semiconductor learning and career platform. Master charge carriers, transistors, fabrication, VLSI, and advanced semiconductor technology.",
  keywords: [
    "semiconductor",
    "VLSI",
    "MOSFET",
    "transistor physics",
    "microelectronics",
    "analog IC",
    "device engineering",
    "semiconductor career",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-200 tech-grid-pattern">
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
