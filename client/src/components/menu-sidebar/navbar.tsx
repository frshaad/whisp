'use client';

import { MENU_ITEMS } from '@/config/menu-items';

import NavItem from './nav-item';

type Props = React.ComponentPropsWithoutRef<'ul'>;

export default function Navbar(props: Props) {
  return (
    <ul {...props} className="space-y-1">
      {MENU_ITEMS.map((item) => (
        <NavItem key={item.id} {...item} />
      ))}
    </ul>
  );
}
