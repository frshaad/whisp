import {
  Bookmark,
  EllipsisVertical,
  Heart,
  MessageCircle,
  Repeat2,
} from 'lucide-react';

import UserBadge from '@/components/shared/user-badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { PostProps } from '@/types/post';
import { UserBadgeProps } from '@/types/user';

type Props = {
  user: UserBadgeProps;
  post: PostProps;
};

export default function Post({ user, post }: Props) {
  const isLiked = true;
  const isSaved = true;
  const isReposted = false;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <UserBadge {...user} />
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="text-sm">{post.time}</span>
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

      <CardContent>{post.content && <p>{post.content}</p>}</CardContent>

      <CardFooter className="justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-8">
          <Button className="flex items-center gap-2" size="sm" variant="ghost">
            <Heart
              size={17}
              className={cn(
                'transition',
                isLiked && 'fill-primary text-primary',
              )}
            />
            <span>{post.likes.length}</span>
          </Button>

          <Button className="flex items-center gap-2" size="sm" variant="ghost">
            <MessageCircle size={17} />
            <span>{post.comments.length}</span>
          </Button>

          <Button className="flex items-center gap-2" size="sm" variant="ghost">
            <Repeat2
              size={17}
              className={cn('transition', isReposted && 'text-primary')}
            />
            <span>{post.reposts.length}</span>
          </Button>
        </div>
        <Button className="flex items-center gap-2" size="sm" variant="ghost">
          <Bookmark
            size={17}
            className={cn('transition', isSaved && 'fill-primary text-primary')}
          />
        </Button>
      </CardFooter>
    </Card>
  );
}
