'use client';

import OrderDashboard from '@/components/order-dashboard';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to the new login page
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // While loading or if there is no user, show a skeleton loading state.
  // The useEffect above will handle the redirection.
  if (loading || !user) {
    return (
      <div className="flex min-h-screen w-full flex-col p-4 md:p-8">
        <div className="flex items-center gap-4 mb-8">
            <Skeleton className="h-16 w-full" />
        </div>
        <div className="flex items-center gap-4 mb-8">
            <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-[150px] rounded-lg" />
            ))}
        </div>
      </div>
    );
  }

  // If the user is logged in, render the main dashboard.
  return <OrderDashboard />;
}
