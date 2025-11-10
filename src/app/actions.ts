
'use server';

import {
  deduplicateOrders,
  type DeduplicateOrdersInput,
} from '@/ai/flows/deduplicate-orders';
import { mockOrders } from '@/lib/mock-data';
import type { Order, Platform } from '@/lib/types';

/**
 * Simulates fetching orders for a specific platform from a remote server.
 * Includes an artificial delay to mimic network latency.
 * @param platform The e-commerce platform to fetch orders for.
 * @returns A promise that resolves to an array of orders.
 */
export async function fetchOrdersForPlatform(platform: Platform): Promise<Order[]> {
  console.log(`Fetching orders for ${platform}...`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  const platformOrders = mockOrders.filter(order => order.platform === platform);
  
  console.log(`Found ${platformOrders.length} orders for ${platform}.`);
  return platformOrders;
}


export async function getDeduplicatedOrders(orders: Order[]): Promise<Order[]> {
  // If there are no orders or only one, no need to call the AI
  if (orders.length <= 1) {
    return orders;
  }

  const aiInput: DeduplicateOrdersInput = orders.map((o) => ({
    orderId: o.orderId,
    platform: o.platform,
    orderDate: o.orderDate,
    totalAmount: o.totalAmount,
    items: o.items.map((item) => item.name),
  }));

  try {
    const deduplicatedOrdersFromAI = await deduplicateOrders(aiInput);

    // The AI returns a list of orders it considers unique.
    // We need to map these back to our original, full Order objects.
    const originalOrdersMap = new Map<string, Order>();
    orders.forEach((o) => {
      // Use a composite key to better find the original order later
      const key = `${o.platform}-${o.orderId}`;
      originalOrdersMap.set(key, o);
    });

    const result: Order[] = [];
    const seenInternalIds = new Set<string>();

    deduplicatedOrdersFromAI.forEach((aiOrder) => {
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
