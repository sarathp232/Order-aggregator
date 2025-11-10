
"use client";

import * as React from 'react';
import { Package2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
    onLinkAccountClick: () => void;
}

export function Header({ onLinkAccountClick }: HeaderProps) {
  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 z-10">
        <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full">
          <a
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base text-foreground"
          >
            <Package2 className="h-6 w-6 text-primary" />
            <span>Order Aggregator</span>
          </a>
          <div className="ml-auto">
            <Button onClick={onLinkAccountClick}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Link Account
            </Button>
          </div>
        </nav>
      </header>
    </>
  );
}
