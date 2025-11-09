"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { PlatformIcon } from './platform-icon';

interface AccountLinkingModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function AccountLinkingModal({ isOpen, onOpenChange }: AccountLinkingModalProps) {
  const { toast } = useToast();
  const [platform, setPlatform] = React.useState<string>('');

  const handleLinkAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!platform) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a platform.",
      });
      return;
    }
    toast({
      title: "Account Linked!",
      description: `Your ${platform} account has been successfully linked.`,
    });
    onOpenChange(false);
    setPlatform('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleLinkAccount}>
          <DialogHeader>
            <DialogTitle>Link Shopping Account</DialogTitle>
            <DialogDescription>
              Enter your credentials to connect your account. Your information is kept secure.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="platform" className="text-right">
                Platform
              </Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger id="platform" className="col-span-3">
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Amazon">
                    <div className="flex items-center gap-2">
                      <PlatformIcon platform="Amazon" className="h-4 w-4" /> Amazon
                    </div>
                  </SelectItem>
                  <SelectItem value="eBay">
                    <div className="flex items-center gap-2">
                      <PlatformIcon platform="eBay" className="h-4 w-4" /> eBay
                    </div>
                  </SelectItem>
                  <SelectItem value="Shopify">
                    <div className="flex items-center gap-2">
                      <PlatformIcon platform="Shopify" className="h-4 w-4" /> Shopify Store
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Email
              </Label>
              <Input id="username" type="email" placeholder="you@example.com" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" aria-label="Password" className="text-right">
                Password
              </Label>
              <Input id="password" type="password" className="col-span-3" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" variant="default">Link Account</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
