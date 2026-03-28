import { ScreenTemplate } from "@/components/screen/ScreenTemplate";
import { ScreenTitle } from "@/components/screen/ScreenTitle";
import { OrdersManager } from "@/components/admin/OrdersManager";
import { getAllOrders } from "@/app/orders/actions";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <ScreenTemplate className="pt-8">
      <div className="w-full">
        <div className="mb-8">
          <ScreenTitle>Orders</ScreenTitle>
        </div>
        <OrdersManager initialOrders={orders} />
      </div>
    </ScreenTemplate>
  );
}
