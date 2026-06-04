import type { Metadata } from "next";
import { Geist, Caveat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Grain from "@/components/Grain";

const geist = Geist({ variable: "--font-sans", subsets: ["latin"] });
const caveat = Caveat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Bozo Boards — Surfboard Repairs, South West UK",
    template: "%s | Bozo Boards",
  },
  description: "Bozo Boards — surfboard ding repairs, used boards for sale, and we buy unwanted boards. Based in the South West UK. Fast turnaround, all board types.",
  keywords: ["bozo boards", "surfboard repair", "ding repair", "surfboard south west", "surfboard repair UK", "used surfboards for sale", "buy surfboard UK"],
  authors: [{ name: "Bozo Boards" }],
  creator: "Bozo Boards",
  metadataBase: new URL("https://bozo-boards.com"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://bozo-boards.com",
    siteName: "Bozo Boards",
    title: "Bozo Boards — Surfboard Repairs, South West UK",
    description: "Surfboard ding repairs, used boards for sale, and we buy unwanted boards. Based in the South West UK.",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Bozo Boards" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bozo Boards — Surfboard Repairs",
    description: "Surfboard ding repairs, used boards for sale. South West UK.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${caveat.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F7F4EE] dark:bg-[#0d0c0a] text-neutral-900 dark:text-white transition-colors">
        <Grain />
        <Nav />
        {children}
      </body>
    </html>
  );
}
