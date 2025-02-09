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
          <Dot className="opacity-0" size={30} />
          <Button
            className="w-full justify-start gap-3 text-muted-foreground"
            variant="ghost"
          >
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
              <TabsTrigger className="gap-2" value="english">
                English
              </TabsTrigger>
              <TabsTrigger
                className={cn('gap-2', vazir.className)}
                value="farsi"
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
              <TabsTrigger className="gap-2" value="light">
                <Sun size={16} />
                Light
              </TabsTrigger>
              <TabsTrigger className="gap-2" value="dark">
                <Moon size={16} />
                Dark
              </TabsTrigger>
              <TabsTrigger className="gap-2" value="system">
                <MonitorSmartphone size={16} />
                System
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center">
          <p className="flex-1">Theme Palette</p>
          <Tabs className="" defaultValue="zinc">
            <TabsList>
              <TabsTrigger className="gap-2" value="zinc">
                <div className="size-4 rounded-full bg-[#18181B]" />
                Zinc
              </TabsTrigger>
              <TabsTrigger className="gap-2" value="blue">
                <div className="size-4 rounded-full bg-[#2463EB]" />
                Blue
              </TabsTrigger>
              <TabsTrigger className="gap-2" value="green">
                <div className="size-4 rounded-full bg-[#16A249]" />
                Green
              </TabsTrigger>
              <TabsTrigger className="gap-2" value="rose">
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
