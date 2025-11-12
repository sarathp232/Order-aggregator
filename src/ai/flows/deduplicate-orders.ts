'use server';

/**
 * @fileOverview A flow for deduplicating orders fetched from different platforms using AI.
 *
 * - deduplicateOrders - A function that takes a list of orders and returns a list of deduplicated orders.
 * - DeduplicateOrdersInput - The input type for the deduplicateOrders function.
 * - DeduplicateOrdersOutput - The return type for the deduplicateOrders function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { OrderSchema } from '@/lib/types';
import type { Order as OrderType } from '@/lib/types';


const DeduplicateOrdersInputSchema = z.array(OrderSchema.pick({ orderId: true, platform: true, orderDate: true, totalAmount: true}).extend({items: z.array(z.string())})).describe('A list of orders to deduplicate.');
export type DeduplicateOrdersInput = z.infer<typeof DeduplicateOrdersInputSchema>;

const DeduplicateOrdersOutputSchema = z.array(OrderSchema.pick({ orderId: true, platform: true, orderDate: true, totalAmount: true}).extend({items: z.array(z.string())})).describe('A list of deduplicated orders.');
export type DeduplicateOrdersOutput = z.infer<typeof DeduplicateOrdersOutputSchema>;

export async function deduplicateOrders(input: DeduplicateOrdersInput): Promise<DeduplicateOrdersOutput> {
  return deduplicateOrdersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'deduplicateOrdersPrompt',
  input: {schema: DeduplicateOrdersInputSchema},
  output: {schema: DeduplicateOrdersOutputSchema},
  prompt: `You are an AI assistant specializing in identifying and removing duplicate order entries from a list of orders fetched from various online platforms.

  Your task is to analyze the given list of orders and return a new list containing only unique orders. Consider the following factors when determining if two orders are duplicates:

  - **Order ID:** Check if the order IDs are the same. If they are, the orders are likely duplicates, unless the platform is different and the order details vary significantly.
  - **Platform:** Take into account that different platforms may use the same order ID for different orders. If the order IDs are the same but the platforms are different, compare the order details to determine if they are truly duplicates.
  - **Order Date:** Orders with the same items, amount and originating from different platforms may be the same logical order recorded on different platforms, but the dates might be slightly different.
  - **Total Amount:** The total amount of the order should be the same or very close (within a small tolerance) for the orders to be considered duplicates.
  - **Items:** The items in the order should be the same or very similar for the orders to be considered duplicates. Ignore small variations like different sizes or colors of the same item.

  Return only unique orders. Do not explain your reasoning.

  Orders:
  {{#each this}}
  - Order ID: {{orderId}}, Platform: {{platform}}, Date: {{orderDate}}, Amount: {{totalAmount}}, Items: {{items}}
  {{/each}}`,
});

const deduplicateOrdersFlow = ai.defineFlow(
  {
    name: 'deduplicateOrdersFlow',
    inputSchema: DeduplicateOrdersInputSchema,
    outputSchema: DeduplicateOrdersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
