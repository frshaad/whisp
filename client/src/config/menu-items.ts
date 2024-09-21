import { Bell, Bookmark, House, User } from 'lucide-react';
import { nanoid } from 'nanoid';

import { MenuItem } from '@/types/menu-sidebar';

export const MENU_ITEMS: MenuItem[] = [
  { id: nanoid(), icon: House, label: 'Home', path: '/' },
  { id: nanoid(), icon: Bell, label: 'Notifications', path: '/notifications' },
  { id: nanoid(), icon: User, label: 'Profile', path: '/profile' },
  { id: nanoid(), icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
];
