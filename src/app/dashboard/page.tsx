
import OrderDashboard from '@/components/order-dashboard';

// We wrap the OrderDashboard in a React.Suspense boundary
// This can help with initial load performance and streaming UI.
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardLoading() {
    return (
        <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-10 w-[150px]" />
                <Skeleton className="h-10 w-[150px]" />
                <Skeleton className="h-10 w-[240px]" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton key={i} className="h-[150px] rounded-lg" />
                ))}
            </div>
        </div>
    )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
        <OrderDashboard />
    </Suspense>
  );
}
