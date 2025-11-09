import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 z-10">
        <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base text-foreground"
          >
            <Package2 className="h-6 w-6 text-primary" />
            <span>Order Aggregator</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
               <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    All Your Orders, One Simple View
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Tired of tracking packages across a dozen different sites?
                    Order Aggregator brings all your online purchases into a single,
                    easy-to-use dashboard.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/sign-up">Get Started for Free</Link>
                  </Button>
                </div>
              </div>
              <img
                src="https://picsum.photos/seed/promo/600/400"
                width="600"
                height="400"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                data-ai-hint="dashboard product"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Simplify Your Online Shopping
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers a suite of features designed to make your life easier. From AI-powered deduplication to a unified view of all your orders.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Unified Dashboard</CardTitle>
                  <CardDescription>
                    Connect accounts from Amazon, eBay, Shopify and more. See every order in one place.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img src="https://picsum.photos/seed/dashboard/600/400" alt="Unified Dashboard" className="rounded-md" data-ai-hint="dashboard chart"/>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>AI Deduplication</CardTitle>
                  <CardDescription>
                    Our smart AI automatically detects and merges duplicate orders from different platforms.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img src="https://picsum.photos/seed/ai-feature/600/400" alt="AI Feature" className="rounded-md" data-ai-hint="abstract technology"/>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Powerful Filtering</CardTitle>
                  <CardDescription>
                   Quickly find what you're looking for with filters for date, platform, and order status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img src="https://picsum.photos/seed/filters/600/400" alt="Filter UI" className="rounded-md" data-ai-hint="ui elements"/>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Order Aggregator. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
