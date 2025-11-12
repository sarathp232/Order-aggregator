"use client";

import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Order } from '@/lib/types';
import { PlatformIcon } from './platform-icon';

interface OrderDetailsProps {
  order: Order;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function OrderDetails({ order, isOpen, onOpenChange }: OrderDetailsProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-full overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="text-2xl flex items-center gap-2">
            <PlatformIcon platform={order.platform} className="h-7 w-7" />
            Order Details
          </SheetTitle>
          <SheetDescription>
            ID: {order.orderId} from {order.platform}
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Order Date</p>
              <p>{new Date(order.orderDate).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <p>{order.status}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Shipping Address</p>
            <p>{order.shippingAddress}</p>
          </div>
        </div>
        <Separator />
        <div className="py-4">
          <h4 className="text-lg font-semibold mb-2">Items</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead colSpan={2}>Product</TableHead>
                <TableHead className="text-center">Qty</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map(item => (
                <TableRow key={item.id}>
                  <TableCell className='p-2'>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-md object-cover aspect-square"
                      data-ai-hint={item.imageHint}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Separator />
        <div className="flex justify-end items-center py-4 text-right">
            <p className="text-muted-foreground mr-4">Total Amount</p>
            <p className="text-2xl font-bold">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.totalAmount)}
            </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
