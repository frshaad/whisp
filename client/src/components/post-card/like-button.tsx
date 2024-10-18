'use client';

import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useGetAuthUser } from '@/hooks/use-get-auth-user';
import { cn } from '@/lib/utils';
import { Post } from '@/types/post';

type Props = {
  post: Post;
};

export default function LikeButton({ post }: Props) {
  const authUser = useGetAuthUser();
  const authUsername = authUser?.username as string;

  const isLiked = post.likes.includes(authUsername);

  return (
    <Button className="flex items-center gap-2" size="sm" variant="ghost">
      <Heart
        size={17}
        className={cn('transition', isLiked && 'fill-primary text-primary')}
      />
      <span>{post.likes.length}</span>
    </Button>
  );
}
