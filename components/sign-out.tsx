import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button type="submit" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white w-full">
        Sign out
      </Button>
    </form>
  );
}
