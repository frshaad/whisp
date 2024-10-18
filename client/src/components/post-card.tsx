'use client';

import { Eraser, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { createContext, memo, useContext, useMemo } from 'react';

import UserBadge from '@/components/shared/user-badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { useAuthUser } from '@/hooks/use-auth-user';
import { useDeletePost } from '@/hooks/use-delete-post';
import { vazir } from '@/lib/fonts';
import { formatRelativeTime } from '@/lib/format-relative-time';
import { langDirection } from '@/lib/languages';
import { cn } from '@/lib/utils';
import { Post } from '@/types/post';

type PostCardContext = {
  post: Post;
};

const postCardContext = createContext<PostCardContext | null>(null);

function usePostCardContext() {
  const context = useContext(postCardContext);
  if (!context) {
    throw new Error('usePostCardContext must be used within a PostCard');
  }
  return context;
}

type PostCardProps = React.PropsWithChildren & {
  post: Post;
};

export default function PostCard({ post, children }: PostCardProps) {
  const providerValue = useMemo(() => ({ post }), [post]);

  return (
    <postCardContext.Provider value={providerValue}>
      <Card>{children}</Card>
    </postCardContext.Provider>
  );
}

PostCard.Header = memo(function PostCardHeader() {
  const { post } = usePostCardContext();
  const time = formatRelativeTime(post.createdAt);

  return (
    <CardHeader className="flex flex-row justify-between">
      <UserBadge {...post.user} />
      <div className="flex items-center gap-4 text-muted-foreground">
        <span className="text-sm">{time}</span>
      </div>
    </CardHeader>
  );
});

PostCard.Content = memo(function PostCardContent() {
  const { post } = usePostCardContext();
  const { text, img } = post;

  const langDir = useMemo(() => (text ? langDirection(text) : 'ltr'), [text]);

  return (
    <CardContent className="block space-y-6">
      {text && (
        <p
          dir={langDir}
          className={cn(
            'whitespace-pre-wrap',
            langDir === 'rtl' && vazir.className,
          )}
        >
          {text}
        </p>
      )}
      {img && (
        <Image
          src={img}
          alt={text || 'post'}
          width={100}
          height={100}
          className="w-full rounded-md border"
        />
      )}
    </CardContent>
  );
});

PostCard.Interaction = memo(function PostCardInteraction() {
  const { post } = usePostCardContext();
  const { user } = useAuthUser();

  return (
    <CardFooter className="justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-8">
        <PostCard.LikeButton />

        <Button className="flex items-center gap-2" size="sm" variant="ghost">
          <MessageCircle size={17} />
          <span>{post.comments ? post.comments.length : 0}</span>
        </Button>
      </div>

      {post.user.username === user?.username && <PostCard.DeleteButton />}
    </CardFooter>
  );
});

PostCard.LikeButton = memo(function PostCardLikedButton() {
  const { post } = usePostCardContext();
  const { user } = useAuthUser();

  const isLiked = user ? post.likes.includes(user.username) : false;

  return (
    <Button className="flex items-center gap-2" size="sm" variant="ghost">
      <Heart
        size={17}
        className={cn('transition', isLiked && 'fill-primary text-primary')}
      />
      <span>{post.likes.length}</span>
    </Button>
  );
});

PostCard.DeleteButton = memo(function PostCardDeleteButton() {
  const { post } = usePostCardContext();
  const { handleDeletePost } = useDeletePost(post);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center gap-2">
        <Eraser size={16} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" asChild>
            <AlertDialogAction onClick={() => handleDeletePost()}>
              Remove the post
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});
