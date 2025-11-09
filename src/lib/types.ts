
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
