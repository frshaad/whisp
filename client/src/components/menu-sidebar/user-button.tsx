'use client';

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
import { useAuthUser } from '@/hooks/use-auth-user';
import { getAbbreviation } from '@/lib/utils/helper';

export default function UserButton() {
  const { user, isLoading, error, logout } = useAuthUser();

  if (!user || isLoading || error) {
    return <p>Loading...</p>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-fit items-center gap-4 rounded-full outline-none">
        <Avatar>
          <AvatarImage
            src={user.profileImg ?? 'https://github.com/shadcn.png'}
          />
          <AvatarFallback>{getAbbreviation(user.fullname)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <p className="text-sm">{user.fullname}</p>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/profile/${user.username}`}>Go to profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
