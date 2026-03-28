import { getAllProducts } from "@/app/products/actions";
import { ScreenTemplate } from "@/components/screen/ScreenTemplate";
import { ScreenTitle } from "@/components/screen/ScreenTitle";
import { ProductsManager } from "@/components/admin/ProductsManager";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <ScreenTemplate className="pt-8">
      <div className="w-full">
        <div className="mb-8">
          <ScreenTitle>Products</ScreenTitle>
        </div>
        <ProductsManager initialProducts={products} />
      </div>
    </ScreenTemplate>
  );
}
