import { auth } from "@/auth";
import { getAllProducts } from "@/app/products/actions";
import { ScreenTemplate } from "@/components/screen/ScreenTemplate";
import { ScreenTitle } from "@/components/screen/ScreenTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Tag, Sparkles } from "lucide-react";
import { toTitleCase } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;
  const products = await getAllProducts();

  const totalProducts = products.length;
  const totalCategories = new Set(products.map((p) => p.category)).size;
  const featuredItems = products.filter((p) => p.badge).length;

  const stats = [
    { label: "Total Products", value: totalProducts, icon: Package },
    { label: "Categories", value: totalCategories, icon: Tag },
    { label: "Featured Items", value: featuredItems, icon: Sparkles },
  ];

  return (
    <ScreenTemplate className="pt-8">
      <div className="w-full">
        <div className="mb-8">
          <ScreenTitle>Dashboard</ScreenTitle>
          <p className="text-zinc-400 mt-2">
            Welcome back, {user?.name?.split(" ")[0]}!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon }) => (
            <Card key={label} className="bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  {label}
                </CardTitle>
                <Icon className="h-4 w-4 text-zinc-500" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-zinc-100">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-100">Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length > 0 ? (
              <div className="divide-y divide-zinc-800">
                {products.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <p className="font-medium text-zinc-100">
                        {product.name}
                      </p>
                      <p className="text-sm text-zinc-500">
                        {toTitleCase(product.category)}
                      </p>
                    </div>
                    <p className="text-zinc-300 font-medium">
                      £{(product.price / 100).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 text-center py-6">No products yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </ScreenTemplate>
  );
}
