import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function UserButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-fit items-center gap-4 rounded-full outline-none">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <p className="text-sm">Farshad Hatami</p>
          <p className="text-sm text-muted-foreground">@frshaad</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile">Go to profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
