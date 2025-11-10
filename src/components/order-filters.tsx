
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, Calendar as CalendarIcon, Filter, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import type { OrderStatus, Platform } from '@/lib/types';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

type SortKey = 'orderDate' | 'status';
type SortDirection = 'asc' | 'desc';

interface OrderFiltersProps {
  filters: { status: string; platform: string; date: Date | undefined };
  onFiltersChange: React.Dispatch<React.SetStateAction<{ status: string; platform: string; date: Date | undefined }>>;
  sorting: { key: SortKey; direction: SortDirection };
  onSortingChange: React.Dispatch<React.SetStateAction<{ key: SortKey; direction: SortDirection }>>;
  showRawData: boolean;
  onShowRawDataChange: (checked: boolean) => void;
  rawCount: number;
  dedupedCount: number;
  isDeduplicating: boolean;
  linkedPlatforms: Platform[];
}

const statuses: OrderStatus[] = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
const allPlatforms: Platform[] = ['Amazon', 'eBay', 'Shopify', 'Flipkart', 'Myntra', 'Tata CLiQ'];


export function OrderFilters({
  filters,
  onFiltersChange,
  sorting,
  onSortingChange,
  showRawData,
  onShowRawDataChange,
  rawCount,
  dedupedCount,
  isDeduplicating,
  linkedPlatforms,
}: OrderFiltersProps) {
  const handleFilterChange = (key: 'status' | 'platform', value: string) => {
    onFiltersChange(prev => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    onFiltersChange(prev => ({ ...prev, date }));
  };
  
  const handleSortChange = (value: string) => {
      const [key, direction] = value.split('-') as [SortKey, SortDirection];
      onSortingChange({key, direction});
  }
  
  const availablePlatforms = allPlatforms.filter(p => linkedPlatforms.includes(p));

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
        <div className='flex items-center gap-2'>
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h2 className='text-lg font-semibold'>Filter & Sort</h2>
        </div>
        <Separator orientation='vertical' className='h-6 hidden md:block' />
      <div className="flex flex-wrap items-center gap-2">
        <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={filters.platform} onValueChange={(value) => handleFilterChange('platform', value)} disabled={availablePlatforms.length === 0}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Platforms</SelectItem>
            {availablePlatforms.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>

        <Popover>
            <PopoverTrigger asChild>
                <Button
                variant={"outline"}
                className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !filters.date && "text-muted-foreground"
                )}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.date ? format(filters.date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                mode="single"
                selected={filters.date}
                onSelect={handleDateChange}
                initialFocus
                />
            </PopoverContent>
        </Popover>

        <Select value={`${sorting.key}-${sorting.direction}`} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="orderDate-desc">Date (Newest)</SelectItem>
            <SelectItem value="orderDate-asc">Date (Oldest)</SelectItem>
            <SelectItem value="status-asc">Status (A-Z)</SelectItem>
            <SelectItem value="status-desc">Status (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2 md:ml-auto border p-2 rounded-lg bg-card">
        <Sparkles className={cn("w-5 h-5", !showRawData ? 'text-primary animate-pulse' : 'text-muted-foreground')} />
        <Label htmlFor="ai-switch" className="flex flex-col">
            <span className={cn(!showRawData ? 'text-primary font-semibold' : 'text-muted-foreground')}>AI Deduplication</span>
            <small className='text-muted-foreground'>
              {!showRawData ? `${rawCount - dedupedCount} duplicates removed` : `Showing ${rawCount} raw entries`}
            </small>
        </Label>
        <Switch id="ai-switch" checked={!showRawData} onCheckedChange={onShowRawDataChange} disabled={linkedPlatforms.length === 0} />
      </div>
    </div>
  );
}
