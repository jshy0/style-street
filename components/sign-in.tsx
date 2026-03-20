import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
      className="flex flex-col gap-3"
    >
      <Button type="submit" variant="chrome" size="lg" className="w-full">
        Sign in with Google
      </Button>
    </form>
  );
}
