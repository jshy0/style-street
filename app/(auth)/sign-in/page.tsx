import Link from "next/link";
import SignIn from "@/components/sign-in";
import { ScreenTemplate } from "@/components/screen/ScreenTemplate";
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
    <ScreenTemplate className="flex flex-col items-center justify-center pt-0">
      <Card className="border-zinc-700 w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-2 flex items-center justify-center gap-2 text-zinc-400"></div>
          <CardTitle className="font-display text-2xl font-black tracking-tight">
            Style Street
          </CardTitle>
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
    </ScreenTemplate>
  );
}
