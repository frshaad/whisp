import { Bookmark, Heart, MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Post } from '@/types/post';

type Props = {
  post: Post;
};

export default function PostInterAction({ post: { likes, comments } }: Props) {
  const isLiked = true;
  const isSaved = true;

  return (
    <CardFooter className="justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-8">
        <Button className="flex items-center gap-2" size="sm" variant="ghost">
          <Heart
            size={17}
            className={cn('transition', isLiked && 'fill-primary text-primary')}
          />
          <span>{likes ? likes.length : 0}</span>
        </Button>

        <Button className="flex items-center gap-2" size="sm" variant="ghost">
          <MessageCircle size={17} />
          <span>{comments ? comments.length : 0}</span>
        </Button>

        {/* TODO: add repost functionality */}
        {/* <Button className="flex items-center gap-2" size="sm" variant="ghost">
          <Repeat2
            size={17}
            className={cn('transition', isReposted && 'text-primary')}
          />
          <span>{post.reposts.length}</span>
        </Button> */}
      </div>
      <Button className="flex items-center gap-2" size="sm" variant="ghost">
        <Bookmark
          size={17}
          className={cn('transition', isSaved && 'fill-primary text-primary')}
        />
      </Button>
    </CardFooter>
  );
}
