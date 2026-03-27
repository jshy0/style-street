import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ScreenTemplate } from "@/components/screen/ScreenTemplate";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SignOut from "@/components/sign-out";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const { name, email, image, role } = session.user;

  return (
    <ScreenTemplate>
      <div className="mx-auto max-w-lg pt-8">
        <h1 className="mb-6 font-display text-2xl font-black tracking-tight text-zinc-100">
          My Account
        </h1>

        <Card className="border-zinc-800 bg-zinc-900">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {image ? (
                <Image
                  src={image}
                  alt={name ?? "Profile"}
                  width={64}
                  height={64}
                  className="rounded-full ring-2 ring-zinc-700"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 ring-2 ring-zinc-700 text-2xl font-bold text-zinc-400">
                  {name?.[0]?.toUpperCase() ?? "?"}
                </div>
              )}

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-semibold text-zinc-100">{name}</p>
                  {role === "admin" && (
                    <Badge className="border-zinc-600 text-zinc-400 text-[10px]">
                      Admin
                    </Badge>
                  )}
                </div>
                <p className="truncate text-sm text-zinc-500">{email}</p>
              </div>
            </div>

            {role === "admin" && (
              <div className="mt-6 border-t border-zinc-800 pt-6">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 hover:text-white"
                >
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            )}

            <div className="mt-6 border-t border-zinc-800 pt-6">
              <SignOut />
            </div>
          </CardContent>
        </Card>
      </div>
    </ScreenTemplate>
  );
}
