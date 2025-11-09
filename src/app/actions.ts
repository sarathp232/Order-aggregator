'use server';

import { deduplicateOrders, type DeduplicateOrdersInput } from '@/ai/flows/deduplicate-orders';
import type { Order } from '@/lib/types';

export async function getDeduplicatedOrders(orders: Order[]): Promise<Order[]> {
  const aiInput: DeduplicateOrdersInput = orders.map(o => ({
    orderId: o.orderId,
    platform: o.platform,
    orderDate: o.orderDate,
    totalAmount: o.totalAmount,
    items: o.items.map(item => item.name),
  }));

  try {
    const deduplicatedOrdersFromAI = await deduplicateOrders(aiInput);

    const uniqueKey = (o: { orderId: string; platform: string; totalAmount: number }) =>
      `${o.platform}-${o.orderId}-${o.totalAmount}`;
      
    const originalOrdersMap = new Map<string, Order>();
    orders.forEach(o => {
        // Use a more robust key to handle potential ID collisions across platforms
        const key = uniqueKey(o);
        if (!originalOrdersMap.has(key)) {
            originalOrdersMap.set(key, o);
        }
    });

    const result = deduplicatedOrdersFromAI
      .map(aiOrder => {
        // Find the original order. The AI might slightly change the total, so we can't do a direct map lookup.
        // We find the first order that matches platform and ID, assuming the AI preserves these.
        return orders.find(o => o.platform === aiOrder.platform && o.orderId === aiOrder.orderId);
      })
      .filter((o): o is Order => !!o);

    // To handle cases where AI might merge and pick one, we ensure no duplicate internal IDs in the final list.
    const finalDedupedOrders = Array.from(new Map(result.map(o => [o.id, o])).values());

    return finalDedupedOrders;

  } catch (error) {
    console.error('Error deduplicating orders with AI:', error);
    return orders;
  }
}
