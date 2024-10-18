import { MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { useAuthUser } from '@/hooks/use-auth-user';
import { Post } from '@/types/post';

import DeletePost from './delete-post';
import LikeButton from './like-button';

type Props = {
  post: Post;
};

export default function PostInterAction({ post }: Props) {
  const { user } = useAuthUser();

  return (
    <CardFooter className="justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-8">
        <LikeButton post={post} />

        <Button className="flex items-center gap-2" size="sm" variant="ghost">
          <MessageCircle size={17} />
          <span>{post.comments ? post.comments.length : 0}</span>
        </Button>
      </div>

      {post.user.username === user?.username && <DeletePost post={post} />}
    </CardFooter>
  );
}
