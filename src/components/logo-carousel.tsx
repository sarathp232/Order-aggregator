'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { Platform } from '@/lib/types';
import { cn } from '@/lib/utils';
import { getBrandColor } from '@/lib/brand-colors';
import { PlatformIcon } from './platform-icon';

const allPlatforms: Platform[] = [
  'Amazon',
  'eBay',
  'Shopify',
  'Walmart',
  'Target',
  'Flipkart',
  'Myntra',
  'Best Buy',
  'Etsy',
  'IKEA',
  'H&M',
  'Nike',
];


export function LogoCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'center' }, [
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  ]);

  return (
    <div className="overflow-hidden w-full max-w-6xl" ref={emblaRef}>
      <div className="flex">
        {[...allPlatforms, ...allPlatforms].map((platform, index) => (
          <div
            key={`${platform}-${index}`}
            className={cn(
              'flex-shrink-0 flex-grow-0 basis-1/6 min-w-0 flex items-center justify-center p-4'
            )}
          >
             <PlatformIcon
                platform={platform}
                className="h-12 w-auto"
                style={{ color: getBrandColor(platform) }}
              />
          </div>
        ))}
      </div>
    </div>
  );
}
