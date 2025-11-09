'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { Platform } from '@/lib/types';
import { cn } from '@/lib/utils';
import { getBrandColor } from '@/lib/brand-colors';
import { PlatformIcon } from './platform-icon';

const platformsWithIcons: Platform[] = ['Amazon', 'eBay', 'Shopify'];

export function LogoCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'center' }, [
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  ]);

  return (
    <div className="overflow-hidden w-full max-w-6xl" ref={emblaRef}>
      <div className="flex">
        {platformsWithIcons.map((platform, index) => (
          <div
            key={index}
            className={cn(
              'flex-shrink-0 flex-grow-0 basis-1/5 min-w-0 flex items-center justify-center p-4'
            )}
          >
             <PlatformIcon
                platform={platform}
                className="h-16 w-auto"
                style={{ color: getBrandColor(platform) }}
              />
          </div>
        ))}
      </div>
    </div>
  );
}
