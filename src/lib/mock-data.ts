import { PlaceHolderImages } from './placeholder-images';
import type { Order, OrderItem } from './types';

const products: Omit<OrderItem, 'quantity'>[] = PlaceHolderImages.map(p => ({
  id: p.id,
  name: p.description,
  price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
  image: p.imageUrl,
  imageHint: p.imageHint,
}));

export const mockOrders: Order[] = [
  {
    id: '1',
    orderId: '112-9876543-1234567',
    platform: 'Amazon',
    orderDate: '2024-07-20T14:48:00.000Z',
    status: 'Delivered',
    totalAmount: 149.98,
    items: [
      { ...products[0], quantity: 1, price: 89.99 },
      { ...products[1], quantity: 1, price: 59.99 },
    ],
    shippingAddress: '123 Main St, Anytown, USA 12345',
  },
  {
    id: '2',
    orderId: '25-01234-56789',
    platform: 'eBay',
    orderDate: '2024-07-18T09:21:00.000Z',
    status: 'Shipped',
    totalAmount: 299.99,
    items: [
      { ...products[2], quantity: 1, price: 299.99 },
    ],
    shippingAddress: '456 Oak Ave, Someville, USA 54321',
  },
  {
    id: '3',
    orderId: '9876',
    platform: 'Shopify',
    orderDate: '2024-07-21T18:05:00.000Z',
    status: 'Pending',
    totalAmount: 199.99,
    items: [
      { ...products[3], quantity: 1, price: 199.99 },
    ],
    shippingAddress: '789 Pine Ln, Otherplace, USA 67890',
  },
  {
    id: '4',
    orderId: '113-1112223-3344556',
    platform: 'Amazon',
    orderDate: '2024-06-30T11:00:00.000Z',
    status: 'Delivered',
    totalAmount: 49.99,
    items: [
      { ...products[4], quantity: 1, price: 49.99 },
    ],
    shippingAddress: '123 Main St, Anytown, USA 12345',
  },
  {
    id: '5',
    orderId: '30-98765-43210',
    platform: 'eBay',
    orderDate: '2024-07-22T10:15:00.000Z',
    status: 'Pending',
    totalAmount: 349.99,
    items: [
      { ...products[5], quantity: 1, price: 349.99 },
    ],
    shippingAddress: '456 Oak Ave, Someville, USA 54321',
  },
  {
    id: '6',
    orderId: '9877',
    platform: 'Shopify',
    orderDate: '2024-07-15T22:30:00.000Z',
    status: 'Cancelled',
    totalAmount: 89.99,
    items: [
      { ...products[0], quantity: 1, price: 89.99 },
    ],
    shippingAddress: '789 Pine Ln, Otherplace, USA 67890',
  },
  {
    id: '7',
    orderId: '114-5556667-7788990',
    platform: 'Amazon',
    orderDate: '2024-07-23T13:00:00.000Z',
    status: 'Shipped',
    totalAmount: 259.98,
    items: [
      { ...products[3], quantity: 1, price: 199.99 },
      { ...products[4], quantity: 1, price: 59.99 }, // Price variation for demo
    ],
    shippingAddress: '123 Main St, Anytown, USA 12345',
  },
  // Duplicate of order 1 for AI demonstration
  {
    id: '8',
    orderId: '78910-ABC', // Different order ID
    platform: 'eBay', // Different platform
    orderDate: '2024-07-20T16:00:00.000Z', // Slightly different date
    status: 'Delivered',
    totalAmount: 151.98, // Slightly different total
    items: [
      { ...products[0], quantity: 1, price: 89.99 },
      { ...products[1], quantity: 1, price: 61.99 },
    ],
    shippingAddress: '123 Main St, Anytown, USA 12345',
  },
];
