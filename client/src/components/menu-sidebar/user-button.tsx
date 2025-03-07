'use client';

import Link from 'next/link';

import UserAvatar from '@/components/shared/user-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthUser } from '@/hooks/use-auth-user';

export default function UserButton() {
  const { user, isPending, error, logout, isError } = useAuthUser();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-fit items-center gap-4 rounded-full outline-none">
        <UserAvatar fullname={user.fullname} profileImg={user.profileImg} />
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
        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
