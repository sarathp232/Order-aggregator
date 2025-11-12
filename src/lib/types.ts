import { z } from 'zod';

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  imageHint: string;
};

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';

export type Platform = 
  | 'Amazon' 
  | 'eBay' 
  | 'Shopify'
  | 'Walmart'
  | 'Target'
  | 'Best Buy'
  | 'Home Depot'
  | 'Lowes'
  | 'Costco'
  | 'Etsy'
  | 'Wayfair'
  | 'Overstock'
  | 'Newegg'
  | 'Macy\'s'
  | 'Nordstrom'
  | 'Zappos'
  | 'Kohl\'s'
  | 'Sears'
  | 'JCPenney'
  | 'Gap'
  | 'Old Navy'
  | 'Banana Republic'
  | 'H&M'
  | 'Zara'
  | 'Uniqlo'
  | 'ASOS'
  | 'Shein'
  | 'Temu'
  | 'AliExpress'
  | 'Wish'
  | 'IKEA'
  | 'Crate & Barrel'
  | 'Williams-Sonoma'
  | 'Pottery Barn'
  | 'Restoration Hardware'
  | 'Bed Bath & Beyond'
  | 'GameStop'
  | 'Sephora'
  | 'Ulta'
  | 'Chewy'
  | 'Petco'
  | 'Petsmart'
  | 'REI'
  | 'Dick\'s Sporting Goods'
  | 'Lululemon'
  | 'Nike'
  | 'Adidas'
  | 'Under Armour'
  | 'Puma'
  | 'CVS'
  | 'Walgreens'
  // Indian Retailers
  | 'Flipkart'
  | 'Myntra'
  | 'Ajio'
  | 'Snapdeal'
  | 'JioMart'
  | 'BigBasket'
  | 'Nykaa'
  | 'Tata CLiQ'
  | 'Pepperfry'
  | 'FirstCry';

export const OrderItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  image: z.string().url(),
  imageHint: z.string(),
});

export const OrderSchema = z.object({
  id: z.string(),
  orderId: z.string().describe('The unique identifier for the order.'),
  platform: z.string().describe('The platform where the order was placed (e.g., Amazon, eBay).'),
  orderDate: z.string().describe('The date the order was placed in ISO format (YYYY-MM-DD).'),
  status: z.enum(['Pending', 'Shipped', 'Delivered', 'Cancelled']),
  totalAmount: z.number().describe('The total amount of the order.'),
  items: z.array(OrderItemSchema).describe('A list of items in the order.'),
  shippingAddress: z.string(),
});

export type Order = z.infer<typeof OrderSchema>;
