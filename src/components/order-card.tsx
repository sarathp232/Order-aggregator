"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/lib/types";
import { PlatformIcon } from "./platform-icon";
import { cn } from "@/lib/utils";
import { Truck, CheckCircle2, Clock, XCircle } from "lucide-react";

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
  return (
    <Card 
        className="cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-200"
        onClick={() => onSelectOrder(order)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectOrder(order)}
        tabIndex={0}
        role="button"
        aria-label={`View details for order ${order.orderId}`}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-lg flex items-center gap-2">
                    <PlatformIcon platform={order.platform} className="h-6 w-6" />
                    {order.platform}
                </CardTitle>
                <CardDescription>ID: {order.orderId}</CardDescription>
            </div>
            <Badge variant="outline" className={cn("text-xs", statusClassName)}>
                <StatusIcon className="mr-1 h-3 w-3" />
                {order.status}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex justify-between items-end">
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
      </CardContent>
    </Card>
  );
}
