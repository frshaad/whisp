import { MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Post } from '@/types/post';

import LikeButton from './like-button';

type Props = {
  post: Post;
};

export default function PostInterAction({ post }: Props) {
  return (
    <CardFooter className="justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-8">
        <LikeButton post={post} />

        <Button className="flex items-center gap-2" size="sm" variant="ghost">
          <MessageCircle size={17} />
          <span>{post.comments ? post.comments.length : 0}</span>
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

      {/* TODO: add bookmark functionality */}
      {/* <Button className="flex items-center gap-2" size="sm" variant="ghost">
        <Bookmark
          size={17}
          className={cn('transition', isSaved && 'fill-primary text-primary')}
        />
      </Button> */}
    </CardFooter>
  );
}
