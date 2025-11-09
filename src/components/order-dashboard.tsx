"use client";

import * as React from 'react';
import { getDeduplicatedOrders } from '@/app/actions';
import { mockOrders } from '@/lib/mock-data';
import type { Order } from '@/lib/types';
import { Header } from '@/components/header';
import { OrderFilters } from '@/components/order-filters';
import { OrderCard } from '@/components/order-card';
import { OrderDetails } from '@/components/order-details';
import { Skeleton } from '@/components/ui/skeleton';

type SortKey = 'orderDate' | 'status';
type SortDirection = 'asc' | 'desc';

export default function OrderDashboard() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  const [filters, setFilters] = React.useState<{ status: string; platform: string; date: Date | undefined }>({
    status: 'All',
    platform: 'All',
    date: undefined,
  });

  const [sorting, setSorting] = React.useState<{ key: SortKey; direction: SortDirection }>({
    key: 'orderDate',
    direction: 'desc',
  });

  const [showRawData, setShowRawData] = React.useState(false);

  React.useEffect(() => {
    const processOrders = async () => {
      setIsLoading(true);
      if (showRawData) {
        setOrders(mockOrders);
      } else {
        const deduplicated = await getDeduplicatedOrders(mockOrders);
        setOrders(deduplicated);
      }
      setIsLoading(false);
    };
    processOrders();
  }, [showRawData]);

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const filteredAndSortedOrders = React.useMemo(() => {
    let filtered = orders;

    if (filters.status !== 'All') {
      filtered = filtered.filter(order => order.status === filters.status);
    }
    if (filters.platform !== 'All') {
      filtered = filtered.filter(order => order.platform === filters.platform);
    }
    if (filters.date) {
        const filterDate = filters.date.setHours(0,0,0,0);
        filtered = filtered.filter(order => new Date(order.orderDate).setHours(0,0,0,0) === filterDate)
    }

    return [...filtered].sort((a, b) => {
      const { key, direction } = sorting;
      const valA = a[key];
      const valB = b[key];
      
      let comparison = 0;
      if (valA > valB) {
        comparison = 1;
      } else if (valA < valB) {
        comparison = -1;
      }
      return direction === 'desc' ? comparison * -1 : comparison;
    });
  }, [orders, filters, sorting]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <OrderFilters
          filters={filters}
          onFiltersChange={setFilters}
          sorting={sorting}
          onSortingChange={setSorting}
          showRawData={showRawData}
          onShowRawDataChange={setShowRawData}
          rawCount={mockOrders.length}
          dedupedCount={orders.length}
          isDeduplicating={!showRawData}
        />
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-[150px] rounded-lg" />)
          ) : filteredAndSortedOrders.length > 0 ? (
            filteredAndSortedOrders.map(order => (
              <OrderCard key={order.id} order={order} onSelectOrder={handleSelectOrder} />
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-12">
              <h3 className="text-xl font-semibold">No Orders Found</h3>
              <p>Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </main>
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          isOpen={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      )}
    </div>
  );
}
