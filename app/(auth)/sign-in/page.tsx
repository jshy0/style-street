import Link from "next/link";
import { ScreenTemplate } from "@/components/ScreenTemplate";
import SignIn from "@/components/sign-in";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Sparkle({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
    </svg>
  );
}

export default function SignInPage() {
  return (
    <ScreenTemplate>
      <div className="w-6xl">
        <Card className="border-zinc-700">
          <CardHeader className="text-center">
            <div className="mb-2 flex items-center justify-center gap-2 text-zinc-400">
              <Sparkle size={8} />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
                Est. 2026
              </span>
              <Sparkle size={8} />
            </div>
            <CardTitle className="font-display text-2xl font-black tracking-tight">
              Style Street
            </CardTitle>
            <p className="mt-1 text-sm text-zinc-400">Welcome back, friend</p>
          </CardHeader>

          <CardContent className="space-y-4">
            <SignIn />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-zinc-500">
            Not a member?{" "}
            <Link
              href="/"
              className="font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Continue shopping
            </Link>
          </p>
        </div>
      </div>
    </ScreenTemplate>
  );
}
