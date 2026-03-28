import Link from "next/link";
import SignIn from "@/components/sign-in";
import { ScreenTemplate } from "@/components/screen/ScreenTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
