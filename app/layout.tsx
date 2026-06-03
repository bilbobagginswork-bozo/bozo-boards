import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Grain from "@/components/Grain";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bozo Boards — Surfboard Repairs",
  description: "Surfboard repairs, used boards, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen flex flex-col bg-[#F7F4EE] dark:bg-[#0d0c0a] text-neutral-900 dark:text-white transition-colors">
        <Grain />
        <Nav />
        {children}
      </body>
    </html>
  );
}
