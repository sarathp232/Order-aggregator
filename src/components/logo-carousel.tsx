'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { Platform } from '@/lib/types';
import { cn } from '@/lib/utils';
import { getBrandColor } from '@/lib/brand-colors';
import { PlatformIcon } from './platform-icon';

const platforms: Platform[] = [
    'Amazon', 'eBay', 'Shopify', 'Walmart', 'Target', 'Best Buy', 'Home Depot', 'Lowes', 'Costco',
    'Etsy', 'Wayfair', 'Overstock', 'Newegg', 'Macy\'s', 'Nordstrom', 'Zappos', 'Kohl\'s', 'Sears',
    'JCPenney', 'Gap', 'Old Navy', 'Banana Republic', 'H&M', 'Zara', 'Uniqlo', 'ASOS', 'Shein',
    'Temu', 'AliExpress', 'Wish', 'IKEA', 'Crate & Barrel', 'Williams-Sonoma', 'Pottery Barn',
    'Restoration Hardware', 'Bed Bath & Beyond', 'GameStop', 'Sephora', 'Ulta', 'Chewy',
    'Petco', 'Petsmart', 'REI', 'Dick\'s Sporting Goods', 'Lululemon', 'Nike', 'Adidas',
    'Under Armour', 'Puma', 'CVS', 'Walgreens'
];

const platformsWithIcons: Platform[] = ['Amazon', 'eBay', 'Shopify'];

export function LogoCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'center' }, [
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  ]);

  return (
    <div className="overflow-hidden w-full max-w-6xl" ref={emblaRef}>
      <div className="flex">
        {platforms.map((platform, index) => (
          <div
            key={index}
            className={cn(
              'flex-shrink-0 flex-grow-0 basis-1/5 min-w-0 flex items-center justify-center p-4'
            )}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              {platformsWithIcons.includes(platform) ? (
                 <PlatformIcon
                    platform={platform}
                    className="h-16 w-16"
                    style={{ color: getBrandColor(platform) }}
                  />
              ) : (
                <div
                  className="h-16 w-full flex items-center justify-center font-bold text-xl px-2"
                  style={{ color: getBrandColor(platform) }}
                >
                  {platform}
                </div>
              )}
               <p className="text-sm font-semibold text-muted-foreground">
                {platform === 'Shopify' ? 'Shopify Stores' : platform}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
