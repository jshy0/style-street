import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ScreenTemplate } from "@/components/screen/ScreenTemplate";
import { CheckoutForm } from "./CheckoutForm";

export default async function CheckoutPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <ScreenTemplate>
      <CheckoutForm
        defaultEmail={session.user.email ?? ""}
        defaultName={session.user.name ?? ""}
      />
    </ScreenTemplate>
  );
}
