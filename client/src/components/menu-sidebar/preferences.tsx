import { Bolt, Dot } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Bolt size={25} />
            <p>User Preferences</p>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
