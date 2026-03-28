import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ScreenTemplate } from "@/components/screen/ScreenTemplate";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SignOut from "@/components/sign-out";
import { getUserOrders } from "@/app/orders/actions";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const { name, email, image, role } = session.user;

  const userOrders = await getUserOrders(session.user.id!);

  return (
    <ScreenTemplate>
      <div className="mx-auto max-w-lg">
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
                  <Link href="/admin">Go to Dashboard</Link>
                </Button>
              </div>
            )}

            <div className="mt-6 border-t border-zinc-800 pt-6">
              <SignOut />
            </div>
          </CardContent>
        </Card>

        {/* Order history */}
        <h2 className="mb-4 mt-10 font-display text-lg font-black tracking-tight text-zinc-100">
          Order History
        </h2>

        {userOrders.length === 0 ? (
          <p className="text-sm text-zinc-500">No orders yet.</p>
        ) : (
          <div className="space-y-3">
            {userOrders.map((order) => (
              <Card key={order.id} className="border-zinc-800 bg-zinc-900">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-zinc-100">
                        Order #{order.id}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="border-zinc-700 text-zinc-400 text-[10px] capitalize">
                        {order.status}
                      </Badge>
                      <span className="font-mono text-sm font-semibold text-zinc-100">
                        £{(order.total / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {order.items.slice(0, 4).map((item) => (
                      <div
                        key={item.id}
                        className="relative h-12 w-10 overflow-hidden rounded-lg bg-zinc-800"
                      >
                        <Image
                          src={item.productImage}
                          alt={item.productName}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    ))}
                    {order.items.length > 4 && (
                      <div className="flex h-12 w-10 items-center justify-center rounded-lg bg-zinc-800 text-xs text-zinc-500">
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ScreenTemplate>
  );
}
