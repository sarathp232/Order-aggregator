import type { SVGProps } from 'react';
import { AmazonIcon, EBayIcon, ShopifyIcon } from '@/components/icons';
import type { Platform } from '@/lib/types';
import { Package } from 'lucide-react';

export function PlatformIcon({
  platform,
  ...props
}: { platform: Platform } & SVGProps<SVGSVGElement>) {
  switch (platform) {
    case 'Amazon':
      return <AmazonIcon {...props} />;
    case 'eBay':
      return <EBayIcon {...props} />;
    case 'Shopify':
      return <ShopifyIcon {...props} />;
    default:
      return <Package {...props} />;
  }
}
