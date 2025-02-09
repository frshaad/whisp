'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Dot } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { MenuItem } from '@/types/menu-sidebar';

type Properties = React.ComponentPropsWithoutRef<'li'> & MenuItem;

export default function NavItem({
  icon: Icon,
  label,
  path,
  ...properties
}: Properties) {
  const pathname = usePathname();
  const isActiveLink = pathname === path;

  return (
    <li
      className={cn('flex items-center', properties.className)}
      {...properties}
    >
      <Dot
        className={cn(
          'text-primary opacity-0 transition',
          isActiveLink && 'opacity-100'
        )}
        size={30}
      />
      <Link className="flex w-full items-center" href={path}>
        <Button
          className={cn(
            'w-full justify-start gap-3 text-muted-foreground',
            isActiveLink && 'text-primary hover:text-primary'
          )}
          variant="ghost"
        >
          <Icon size={22} />
          <span>{label}</span>
          {label === 'Notifications' && (
            <span className="flex size-5 items-center justify-center rounded-full bg-muted p-1 text-xs text-muted-foreground">
              4
            </span>
          )}
        </Button>
      </Link>
    </li>
  );
}
