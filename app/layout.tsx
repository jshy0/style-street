import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, Geist } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { DemoBanner } from "@/components/DemoBanner";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
      className={cn(
        "h-full",
        orbitron.variable,
        spaceGrotesk.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-[#111012] text-zinc-100">
        <Navbar />
        <DemoBanner />
        <div className="pt-10">{children}</div>
        <Toaster theme="dark" />
        <Analytics />
      </body>
    </html>
  );
}
