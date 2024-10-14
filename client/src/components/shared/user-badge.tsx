import Link from 'next/link';

import { CardDescription, CardTitle } from '@/components/ui/card';
import { UserBadgeProps } from '@/types/user';

import UserAvatar from './user-avatar';

export default function UserBadge({
  fullname,
  username,
  profileImg,
}: UserBadgeProps) {
  return (
    <Link href={`/profile/${username}`} className="flex items-center gap-3">
      <UserAvatar fullname={fullname} profileImg={profileImg} />

      <div className="w-32 space-y-0.5">
        <div className="flex items-center gap-3">
          <CardTitle className="truncate text-sm">{fullname}</CardTitle>
        </div>
        <CardDescription className="truncate">@{username}</CardDescription>
      </div>
    </Link>
  );
}
