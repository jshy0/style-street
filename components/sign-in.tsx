"use client";

import { useTransition } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = () => {
    startTransition(async () => {
      await signIn("google", { redirectTo: "/?login=success" });
    });
  };

  return (
    <form action={handleSignIn} className="flex flex-col gap-3">
      <Button
        type="submit"
        variant="outline"
        size="lg"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? "Signing in..." : "Sign in with Google"}
      </Button>
    </form>
  );
}
