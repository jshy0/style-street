import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Style Street",
  description: "Streetwear Essentials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#111012] text-zinc-100">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
