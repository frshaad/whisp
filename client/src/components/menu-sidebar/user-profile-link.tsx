'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { Dot, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuthUser } from '@/hooks/use-auth-user';
import { cn } from '@/lib/utils';

export default function UserProfileLink() {
  const queryClient = useQueryClient();
  const { user } = useAuthUser();
  const pathname = usePathname();

  if (!user) {
    return;
  }
  const path = `/profile/${user?.username}`;
  const isActiveLink = pathname.includes(`/profile/${user?.username}`);

  const prefetchProfile = () => {
    queryClient.prefetchQuery({
      queryKey: ['profile', user.username],
      queryFn: async () => {
        // ...
      },
      // Prefetch only fires when data is older than the staleTime,
      // so in a case like this you definitely want to set one
      staleTime: 60000,
    });
  };

  return (
    <li className="flex items-center">
      <Dot
        className={cn(
          'text-primary opacity-0 transition',
          isActiveLink && 'opacity-100',
        )}
        size={30}
      />
      <Link className="flex w-full items-center" href={path}>
        <Button
          className={cn(
            'w-full justify-start gap-3 text-muted-foreground',
            isActiveLink && 'text-primary hover:text-primary',
          )}
          onMouseEnter={prefetchProfile}
          variant="ghost"
        >
          <User size={22} />
          <span>Profile</span>
        </Button>
      </Link>
    </li>
  );
}
