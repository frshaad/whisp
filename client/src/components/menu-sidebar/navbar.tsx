'use client';

import { MENU_ITEMS } from '@/config/menu-items';

import NavItem from './nav-item';
import NewPost from './new-post';
// import Preferences from './preferences';
import UserProfileLink from './user-profile-link';

type Properties = React.ComponentPropsWithoutRef<'ul'>;

export default function Navbar(properties: Properties) {
  return (
    <ul {...properties} className="space-y-2.5">
      {MENU_ITEMS.map((item) => (
        <NavItem key={item.id} {...item} />
      ))}
      <UserProfileLink />
      {/* <Preferences /> */}
      <NewPost />
    </ul>
  );
}
