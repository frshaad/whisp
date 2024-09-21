import { Bolt, Dot, MonitorSmartphone, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { vazir } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export default function Preferences() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className="flex items-center">
          <Dot size={30} className="opacity-0" />
          <Button variant="ghost" className="gap-3 text-muted-foreground">
            <Bolt size={22} />
            <span>Settings</span>
          </Button>
        </li>
      </DialogTrigger>
      <DialogContent className="max-w-xl space-y-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Bolt size={25} />
            <p>User Preferences</p>
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center">
          <p className="flex-1">Language</p>
          <Tabs defaultValue="english">
            <TabsList>
              <TabsTrigger value="english" className="gap-2">
                English
              </TabsTrigger>
              <TabsTrigger
                value="farsi"
                className={cn('gap-2', vazir.className)}
              >
                فارسی
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center">
          <p className="flex-1">Theme Mode</p>
          <Tabs defaultValue="system">
            <TabsList>
              <TabsTrigger value="light" className="gap-2">
                <Sun size={16} />
                Light
              </TabsTrigger>
              <TabsTrigger value="dark" className="gap-2">
                <Moon size={16} />
                Dark
              </TabsTrigger>
              <TabsTrigger value="system" className="gap-2">
                <MonitorSmartphone size={16} />
                System
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center">
          <p className="flex-1">Theme Palette</p>
          <Tabs defaultValue="zinc" className="">
            <TabsList>
              <TabsTrigger value="zinc" className="gap-2">
                <div className="size-4 rounded-full bg-[#18181B]" />
                Zinc
              </TabsTrigger>
              <TabsTrigger value="blue" className="gap-2">
                <div className="size-4 rounded-full bg-[#2463EB]" />
                Blue
              </TabsTrigger>
              <TabsTrigger value="green" className="gap-2">
                <div className="size-4 rounded-full bg-[#16A249]" />
                Green
              </TabsTrigger>
              <TabsTrigger value="rose" className="gap-2">
                <div className="size-4 rounded-full bg-[#DD1D4A]" />
                Rose
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
