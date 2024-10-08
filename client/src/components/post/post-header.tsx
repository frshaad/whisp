import { EllipsisVertical } from 'lucide-react';

import UserBadge from '@/components/shared/user-badge';
import { CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatRelativeTime } from '@/lib/format-relative-time';
import { Post } from '@/types/post';

type Props = {
  post: Post;
};

export default function PostHeader({ post: { createdAt, user } }: Props) {
  const time = formatRelativeTime(createdAt);

  return (
    <CardHeader className="flex flex-row justify-between">
      <UserBadge {...user} />
      <div className="flex items-center gap-4 text-muted-foreground">
        <span className="text-sm">{time}</span>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <EllipsisVertical size={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer">
              Block User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
  );
}
