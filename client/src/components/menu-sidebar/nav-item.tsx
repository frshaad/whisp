'use client';

import { Dot } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuItem } from '@/types/menu-sidebar';

type Props = React.ComponentPropsWithoutRef<'li'> & MenuItem;

export default function NavItem({ icon: Icon, label, path, ...props }: Props) {
  const pathname = usePathname();
  const isActiveLink = pathname === path;

  return (
    <li className={cn('flex items-center', props.className)} {...props}>
      <Dot
        size={30}
        className={cn('opacity-0 transition', isActiveLink && 'opacity-100')}
      />
      <Link href={path} className="flex w-full items-center">
        <Button
          variant="ghost"
          className={cn(
            'gap-3 text-muted-foreground',
            isActiveLink && 'text-foreground',
          )}
        >
          <Icon size={22} />
          <span>{label}</span>
        </Button>
      </Link>
    </li>
  );
}
