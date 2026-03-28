import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkle } from "@/components/Sparkle";
import { AmbientGlow, CornerBrackets, DotGrid } from "@/components/HeroDecorations";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#111012] px-4">
      <DotGrid />
      <AmbientGlow />
      <CornerBrackets />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-3 text-zinc-600">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-zinc-600" />
          <Sparkle size={8} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em]">
            Error 404
          </span>
          <Sparkle size={8} />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-zinc-600" />
        </div>

        {/* 404 */}
        <p
          className="font-display text-[clamp(6rem,20vw,14rem)] font-black leading-none tracking-tighter"
          style={{
            background:
              "linear-gradient(180deg,#ffffff 0%,#d4d4d4 35%,#888888 65%,#d0d0d0 85%,#ffffff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </p>

        <p className="mt-4 text-xs font-medium uppercase tracking-[0.35em] text-zinc-500 sm:text-sm">
          Page not found
        </p>

        <div className="mt-10 flex items-center gap-4">
          <Sparkle size={10} />
          <Link href="/">
            <Button size="lg" variant="outline">
              Back to Home
            </Button>
          </Link>
          <Sparkle size={10} />
        </div>
      </div>
    </main>
  );
}
