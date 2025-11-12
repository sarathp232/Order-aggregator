"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/lib/types";
import { PlatformIcon } from "./platform-icon";
import { cn } from "@/lib/utils";
import { Truck, CheckCircle2, Clock, XCircle } from "lucide-react";
import Image from "next/image";

interface OrderCardProps {
  order: Order;
  onSelectOrder: (order: Order) => void;
}

const statusConfig = {
    Pending: { icon: Clock, className: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-800" },
    Shipped: { icon: Truck, className: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800" },
    Delivered: { icon: CheckCircle2, className: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800" },
    Cancelled: { icon: XCircle, className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800" },
}

export function OrderCard({ order, onSelectOrder }: OrderCardProps) {
  const { icon: StatusIcon, className: statusClassName } = statusConfig[order.status] || statusConfig.Pending;
  const firstItem = order.items[0];

  return (
    <Card 
        className="cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-200 flex flex-col"
        onClick={() => onSelectOrder(order)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectOrder(order)}
        tabIndex={0}
        role="button"
        aria-label={`View details for order ${order.orderId}`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
                <PlatformIcon platform={order.platform} className="h-8 w-8" />
                <div>
                    <CardTitle className="text-lg">
                        {order.platform}
                    </CardTitle>
                    <CardDescription>ID: {order.orderId}</CardDescription>
                </div>
            </div>
            <Badge variant="outline" className={cn("text-xs", statusClassName)}>
                <StatusIcon className="mr-1 h-3 w-3" />
                {order.status}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between pt-2">
        <div className="flex items-center gap-4 my-4">
            {firstItem && (
                <Image 
                    src={firstItem.image}
                    alt={firstItem.name}
                    width={56}
                    height={56}
                    className="rounded-md object-cover h-14 w-14"
                    data-ai-hint={firstItem.imageHint}
                />
            )}
            <div className="flex-1">
                <p className="font-semibold leading-tight">{firstItem?.name || "Order Item"}</p>
                {order.items.length > 1 && (
                    <p className="text-xs text-muted-foreground mt-1">
                        + {order.items.length - 1} more item{order.items.length > 2 ? 's' : ''}
                    </p>
                )}
            </div>
        </div>
        <div className="flex justify-between items-end border-t pt-4 mt-2">
            <div>
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground text-right">Total</p>
              <p className="font-semibold text-lg">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.totalAmount)}
              </p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
