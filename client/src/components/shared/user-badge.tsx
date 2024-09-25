import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { getAbbreviation } from '@/lib/utils/helper';
import { UserBadgeProps } from '@/types/user';

export default function UserBadge({
  fullname,
  username,
  profileImg,
}: UserBadgeProps) {
  return (
    <Link href={`/profile/${username}`} className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={profileImg} alt={fullname} />
        <AvatarFallback>{getAbbreviation(fullname)}</AvatarFallback>
      </Avatar>
      <div className="space-y-0.5">
        <div className="flex items-center gap-3">
          <CardTitle className="truncate">{fullname}</CardTitle>
        </div>
        <CardDescription className="truncate">@{username}</CardDescription>
      </div>
    </Link>
  );
}
