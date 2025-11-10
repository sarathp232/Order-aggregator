
"use client";

import * as React from 'react';
import { getDeduplicatedOrders } from '@/app/actions';
import { mockOrders } from '@/lib/mock-data';
import type { Order, Platform } from '@/lib/types';
import { Header } from '@/components/header';
import { OrderFilters } from '@/components/order-filters';
import { OrderCard } from '@/components/order-card';
import { OrderDetails } from '@/components/order-details';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

type SortKey = 'orderDate' | 'status';
type SortDirection = 'asc' | 'desc';

export default function OrderDashboard() {
  const [allOrders, setAllOrders] = React.useState<Order[]>([]);
  const [linkedPlatforms, setLinkedPlatforms] = React.useState<Platform[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeduplicating, setIsDeduplicating] = React.useState(false);
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

  const [useAIDeduplication, setUseAIDeduplication] = React.useState(true);

  const handleAccountLinked = (platform: Platform) => {
    if (!linkedPlatforms.includes(platform)) {
      setLinkedPlatforms(prev => [...prev, platform]);
    }
  };

  const visibleOrders = React.useMemo(() => {
    return mockOrders.filter(order => linkedPlatforms.includes(order.platform));
  }, [linkedPlatforms]);

  React.useEffect(() => {
    const processOrders = async () => {
      if (visibleOrders.length === 0) {
        setAllOrders([]);
        return;
      }

      if (useAIDeduplication) {
        setIsDeduplicating(true);
        const deduplicated = await getDeduplicatedOrders(visibleOrders);
        setAllOrders(deduplicated);
        setIsDeduplicating(false);
      } else {
        setAllOrders(visibleOrders);
      }
    };
    processOrders();
  }, [visibleOrders, useAIDeduplication]);

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const filteredAndSortedOrders = React.useMemo(() => {
    let filtered = allOrders;

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
  }, [allOrders, filters, sorting]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header onAccountLinked={handleAccountLinked} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <OrderFilters
          filters={filters}
          onFiltersChange={setFilters}
          sorting={sorting}
          onSortingChange={setSorting}
          showRawData={!useAIDeduplication}
          onShowRawDataChange={(checked) => setUseAIDeduplication(!checked)}
          rawCount={visibleOrders.length}
          dedupedCount={allOrders.length}
          isDeduplicating={isDeduplicating}
          linkedPlatforms={linkedPlatforms}
        />
         {linkedPlatforms.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-12 flex flex-col items-center justify-center border-2 border-dashed rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">Your Dashboard is Empty</h3>
            <p className="mb-4">Link a shopping account to see your orders.</p>
            {/* The Header component already contains the button, so we don't need another one here. */}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading || isDeduplicating ? (
              Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-[150px] rounded-lg" />)
            ) : filteredAndSortedOrders.length > 0 ? (
              filteredAndSortedOrders.map(order => (
                <OrderCard key={order.id} order={order} onSelectOrder={handleSelectOrder} />
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground py-12">
                <h3 className="text-xl font-semibold">No Orders Found</h3>
                <p>Try adjusting your filters or linking another account.</p>
              </div>
            )}
          </div>
        )}
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
