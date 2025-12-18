// utils/groupOrdersByShop.ts
import type { GroupedOrder, Order, OrderResponse } from "@/types/Order.type";

// ✅ Function overloads for all possible inputs
export function groupOrdersByShop(data: Order): GroupedOrder[];
export function groupOrdersByShop(data: OrderResponse): GroupedOrder[];

// ✅ Implementation
export function groupOrdersByShop(
  data: Order | Order[] | OrderResponse
): GroupedOrder[] {
  // Normalize the input into an array of orders
  const orders = Array.isArray(data)
    ? data
    : "orders" in data
    ? data.orders
    : [data];

  const grouped: GroupedOrder[] = [];

  for (const order of orders) {
    const shopMap = new Map<number, GroupedOrder>();

    for (const item of order.items) {
      const shopId = item.shop.id;

      if (!shopMap.has(shopId)) {
        shopMap.set(shopId, {
          orderId: order.id,
          invoiceId: order.code,
          orderDate: order.createdAt,
          paymentStatus: order.paymentStatus,
          statusOrder: item.status,
          totalPayment: order.totalAmount,
          storeName: item.shop.name,
          shopId,
          products: [],
        });
      }

      const group = shopMap.get(shopId)!;
      group.products.push(item);
      // Optional: recalc total per shop if needed
      // group.totalPayment += item.priceSnapshot * item.qty;
    }

    grouped.push(...shopMap.values());
  }

  return grouped;
}
