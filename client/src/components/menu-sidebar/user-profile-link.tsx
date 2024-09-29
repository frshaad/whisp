'use client';

import { Dot, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  username: string;
};

export default function UserProfileLink({ username }: Props) {
  const pathname = usePathname();
  const path = `/profile/${username}`;
  const isActiveLink = pathname === path;

  return (
    <li className="flex items-center">
      <Dot
        size={30}
        className={cn(
          'text-primary opacity-0 transition',
          isActiveLink && 'opacity-100',
        )}
      />
      <Link href={path} className="flex w-full items-center">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start gap-3 text-muted-foreground',
            isActiveLink && 'text-primary hover:text-primary',
          )}
        >
          <User size={22} />
          <span>Profile</span>
        </Button>
      </Link>
    </li>
  );
}
