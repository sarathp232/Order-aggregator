'use server';
/**
 * @fileOverview A flow for generating realistic sample orders for a given e-commerce platform.
 * 
 * - generateSampleOrders - A function that takes a platform name and returns a list of sample orders.
 * - GenerateSampleOrdersInput - The input type for the generateSampleOrders function.
 * - GenerateSampleOrdersOutput - The return type for the generateSampleOrders function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { OrderItem, OrderStatus, Platform } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const GenerateSampleOrdersInputSchema = z.object({
    platform: z.string().describe('The e-commerce platform to generate orders for (e.g., Amazon, Flipkart).'),
});
export type GenerateSampleOrdersInput = z.infer<typeof GenerateSampleOrdersInputSchema>;


const GeneratedOrderItemSchema = z.object({
    productName: z.string().describe('The name of the product.'),
    quantity: z.number().int().min(1).describe('The quantity of the product ordered.'),
    price: z.number().describe('The price of a single unit of this product.'),
});

const GeneratedOrderSchema = z.object({
    orderId: z.string().describe("A realistic, platform-appropriate order ID."),
    orderDate: z.string().describe("The date the order was placed in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ). The date should be within the last 3 months."),
    status: z.enum(['Pending', 'Shipped', 'Delivered', 'Cancelled']).describe("The current status of the order."),
    items: z.array(GeneratedOrderItemSchema).min(1).max(3).describe('A list of items included in the order.'),
    shippingAddress: z.string().describe("A realistic-looking shipping address in the primary country for the given platform (e.g., USA for Amazon, India for Flipkart)."),
});

const GenerateSampleOrdersOutputSchema = z.array(GeneratedOrderSchema).length(5).describe('A list of 5 generated sample orders.');
export type GenerateSampleOrdersOutput = z.infer<typeof GenerateSampleOrdersOutputSchema>;


export async function generateSampleOrders(platform: Platform): Promise<Order[]> {
    const aiGeneratedOrders = await generateSampleOrdersFlow({ platform });

    // The AI generates realistic data, but we need to map it back to our internal data structure,
    // especially for things like images which the AI cannot create.
    const fullOrders: Order[] = aiGeneratedOrders.map((aiOrder, index) => {
        let totalAmount = 0;
        
        const orderItems: OrderItem[] = aiOrder.items.map((aiItem, itemIndex) => {
            const placeholderIndex = (index * 3 + itemIndex) % PlaceHolderImages.length;
            const placeholder = PlaceHolderImages[placeholderIndex];
            
            totalAmount += aiItem.price * aiItem.quantity;
            
            return {
                id: `${aiOrder.orderId}-${itemIndex}`,
                name: aiItem.productName,
                quantity: aiItem.quantity,
                price: aiItem.price,
                image: placeholder.imageUrl,
                imageHint: placeholder.imageHint,
            };
        });

        return {
            id: `${platform}-${aiOrder.orderId}`, // Create a unique internal ID
            platform,
            orderId: aiOrder.orderId,
            orderDate: aiOrder.orderDate,
            status: aiOrder.status,
            totalAmount,
            items: orderItems,
            shippingAddress: aiOrder.shippingAddress,
        };
    });

    return fullOrders;
}


const prompt = ai.definePrompt({
  name: 'generateSampleOrdersPrompt',
  input: {schema: GenerateSampleOrdersInputSchema},
  output: {schema: GenerateSampleOrdersOutputSchema},
  prompt: `You are an expert data generator for e-commerce applications.
  Your task is to create a realistic list of 5 sample orders for the specified online platform: {{{platform}}}.
  
  Please adhere to the following guidelines:
  - Generate order IDs that are appropriate and realistic for the given platform. For example, Amazon order IDs look like "112-9876543-1234567", while a smaller Shopify store might just be a number like "9876".
  - Order dates should be recent, within the last 3 months.
  - Generate a variety of order statuses (Pending, Shipped, Delivered, Cancelled).
  - Each order should contain between 1 and 3 items.
  - Product names should be common and believable items sold on that platform.
  - Prices should be realistic for the items.
  - Shipping addresses should be plausible and match the primary country of operation for the platform (e.g., India for Flipkart, USA for Amazon).
  
  Do not provide any explanation or commentary. Only return the structured JSON data.`,
});

const generateSampleOrdersFlow = ai.defineFlow(
  {
    name: 'generateSampleOrdersFlow',
    inputSchema: GenerateSampleOrdersInputSchema,
    outputSchema: GenerateSampleOrdersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
