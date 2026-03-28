"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Order, OrderItem } from "@/db/schema";
import { updateOrderStatus } from "@/app/orders/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

type OrderWithItems = Order & { items: OrderItem[] };

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered"];

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-400 border-green-500/20",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[status] ?? "bg-zinc-800 text-zinc-400 border-zinc-700"}`}
    >
      {status}
    </span>
  );
}

export function OrdersManager({
  initialOrders,
}: {
  initialOrders: OrderWithItems[];
}) {
  const [orders, setOrders] = useState<OrderWithItems[]>(initialOrders);
  const [viewing, setViewing] = useState<OrderWithItems | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(orderId: number, status: string) {
    startTransition(async () => {
      try {
        const [updated] = await updateOrderStatus(orderId, status);
        setOrders((prev) =>
          prev.map((o) => (o.id === updated.id ? { ...o, ...updated } : o)),
        );
        if (viewing?.id === orderId) {
          setViewing((prev) => (prev ? { ...prev, status } : prev));
        }
        toast.success("Order status updated");
      } catch {
        toast.error("Failed to update status");
      }
    });
  }

  return (
    <>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100">Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">Order</TableHead>
                <TableHead className="text-zinc-400">Customer</TableHead>
                <TableHead className="text-zinc-400">Date</TableHead>
                <TableHead className="text-zinc-400">Items</TableHead>
                <TableHead className="text-zinc-400">Total</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-zinc-400 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-zinc-800 hover:bg-zinc-800/50"
                  >
                    <TableCell className="font-mono text-zinc-400 text-sm">
                      #{order.id}
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-zinc-100">
                        {order.fullName}
                      </p>
                      <p className="text-xs text-zinc-500">{order.email}</p>
                    </TableCell>
                    <TableCell className="text-zinc-400 text-sm">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      {order.items.reduce((sum, i) => sum + i.quantity, 0)}
                    </TableCell>
                    <TableCell className="text-zinc-300 font-medium">
                      £{(order.total / 100).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(v) => handleStatusChange(order.id, v)}
                        disabled={isPending}
                      >
                        <SelectTrigger className="h-8 w-36 bg-zinc-800 border-zinc-700 text-xs">
                          <SelectValue>
                            <StatusBadge status={order.status} />
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800">
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s} value={s}>
                              <StatusBadge status={s} />
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                        onClick={() => setViewing(order)}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-zinc-500 py-10"
                  >
                    No orders yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={!!viewing} onOpenChange={() => setViewing(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-lg">
          <DialogHeader>
            <DialogTitle>Order #{viewing?.id}</DialogTitle>
          </DialogHeader>

          {viewing && (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Status</span>
                <StatusBadge status={viewing.status} />
              </div>

              {/* Shipping */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
                  Shipping
                </p>
                <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 p-4 text-sm space-y-1">
                  <p className="text-zinc-100 font-medium">{viewing.fullName}</p>
                  <p className="text-zinc-400">{viewing.email}</p>
                  <p className="text-zinc-400">{viewing.address}</p>
                  <p className="text-zinc-400">
                    {viewing.city}, {viewing.postcode}
                  </p>
                  <p className="text-zinc-400">{viewing.country}</p>
                </div>
              </div>

              {/* Items */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
                  Items
                </p>
                <div className="divide-y divide-zinc-800 rounded-lg border border-zinc-800 bg-zinc-800/50">
                  {viewing.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3"
                    >
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="h-12 w-12 rounded object-cover bg-zinc-700"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-100 truncate">
                          {item.productName}
                        </p>
                        <p className="text-xs text-zinc-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm text-zinc-300 font-medium shrink-0">
                        £{(item.price / 100).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                <span className="text-sm font-semibold text-zinc-100">
                  Total
                </span>
                <span className="text-lg font-bold text-zinc-100">
                  £{(viewing.total / 100).toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
