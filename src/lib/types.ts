
export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  imageHint: string;
};

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';

export type Platform = 'Amazon' | 'eBay' | 'Shopify';

export type Order = {
  id: string; // Internal unique ID
  orderId: string; // Platform specific order ID
  platform: Platform;
  orderDate: string; // ISO string
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: string;
};
