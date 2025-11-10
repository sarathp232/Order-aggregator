
'use server';

import { deduplicateOrders, type DeduplicateOrdersInput } from '@/ai/flows/deduplicate-orders';
import type { Order } from '@/lib/types';

export async function getDeduplicatedOrders(orders: Order[]): Promise<Order[]> {
  // If there are no orders or only one, no need to call the AI
  if (orders.length <= 1) {
    return orders;
  }
  
  const aiInput: DeduplicateOrdersInput = orders.map(o => ({
    orderId: o.orderId,
    platform: o.platform,
    orderDate: o.orderDate,
    totalAmount: o.totalAmount,
    items: o.items.map(item => item.name),
  }));

  try {
    const deduplicatedOrdersFromAI = await deduplicateOrders(aiInput);
    
    // The AI returns a list of orders it considers unique.
    // We need to map these back to our original, full Order objects.
    const originalOrdersMap = new Map<string, Order>();
    orders.forEach(o => {
        // Use a composite key to better find the original order later
        const key = `${o.platform}-${o.orderId}`;
        originalOrdersMap.set(key, o);
    });

    const result: Order[] = [];
    const seenInternalIds = new Set<string>();

    deduplicatedOrdersFromAI.forEach(aiOrder => {
      // The AI might create orders that don't perfectly match, so we need a good way to find the original.
      // We prioritize platform and orderId.
      const key = `${aiOrder.platform}-${aiOrder.orderId}`;
      const originalOrder = originalOrdersMap.get(key);

      if (originalOrder && !seenInternalIds.has(originalOrder.id)) {
        result.push(originalOrder);
        seenInternalIds.add(originalOrder.id);
      }
    });

    // As a fallback if the AI returns an empty list, return the original orders.
    if (result.length === 0 && orders.length > 0) {
        return orders;
    }

    return result;

  } catch (error) {
    console.error('Error deduplicating orders with AI:', error);
    // On error, gracefully fall back to returning the original, unprocessed list.
    return orders;
  }
}
