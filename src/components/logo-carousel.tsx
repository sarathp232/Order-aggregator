'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { PlatformIcon } from './platform-icon';
import type { Platform } from '@/lib/types';
import { cn } from '@/lib/utils';

const platforms: Platform[] = ['Amazon', 'eBay', 'Shopify'];

export function LogoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {platforms.map((platform, index) => (
          <div
            key={index}
            className={cn(
              'flex-shrink-0 flex-grow-0 basis-full min-w-0 flex items-center justify-center transition-opacity duration-1000',
              {
                'opacity-100': index === activeIndex,
                'opacity-20': index !== activeIndex,
              }
            )}
            style={{ minWidth: '100%' }}
          >
            <div className="flex flex-col items-center text-center">
              <PlatformIcon
                platform={platform}
                className="h-16 w-16 text-foreground"
              />
               <p className="mt-2 text-xl font-semibold text-foreground">
                {platform === 'Shopify' ? 'Shopify Stores' : platform}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
