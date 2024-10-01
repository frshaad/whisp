import { Bell, House } from 'lucide-react';

import { MenuItem } from '@/types/menu-sidebar';

export const MENU_ITEMS: MenuItem[] = [
  { id: 'home', icon: House, label: 'Home', path: '/' },
  {
    id: 'notifications',
    icon: Bell,
    label: 'Notifications',
    path: '/notifications',
  },
  // { id: 'bookmarks', icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
];
