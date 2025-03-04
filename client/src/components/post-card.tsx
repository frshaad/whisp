'use client';

import Image from 'next/image';
import { createContext, memo, useContext, useMemo } from 'react';

import { Eraser, Heart, MessageCircle } from 'lucide-react';

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
import { useLikePost } from '@/hooks/use-like-post';
import { vazir } from '@/lib/fonts';
import { formatRelativeTime } from '@/lib/format-relative-time';
import { getLangDirection } from '@/lib/languages';
import { cn } from '@/lib/utils';
import type { Post } from '@/types/post';

type PostCardContext = {
  post: Post;
};

const postCardContext = createContext<PostCardContext | undefined>(undefined);

function usePostCardContext() {
  const context = useContext(postCardContext);
  if (!context) {
    throw new Error('usePostCardContext must be used within a PostCard');
  }
  return context;
}

type PostCardProperties = React.PropsWithChildren & {
  post: Post;
};

export default function PostCard({ post, children }: PostCardProperties) {
  const providerValue = useMemo(() => ({ post }), [post]);

  return (
    <postCardContext.Provider value={providerValue}>
      <Card>{children}</Card>
    </postCardContext.Provider>
  );
}

PostCard.Header = memo(() => {
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

PostCard.Header.displayName = 'PostCard.Header';

PostCard.Content = memo(() => {
  const { post } = usePostCardContext();
  const { text, img } = post;

  const langDirection = useMemo(
    () => (text ? getLangDirection(text) : 'ltr'),
    [text],
  );

  return (
    <CardContent className="block space-y-6">
      {!!text && (
        <p
          className={cn(
            'whitespace-pre-wrap',
            langDirection === 'rtl' && vazir.className,
          )}
          dir={langDirection}
        >
          {text}
        </p>
      )}
      {!!img && (
        <Image
          alt={text || 'post'}
          className="w-full rounded-md border"
          height={100}
          src={img}
          width={100}
        />
      )}
    </CardContent>
  );
});

PostCard.Content.displayName = 'PostCard.Content';

PostCard.Interaction = memo(() => {
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

      {post.user?.username === user?.username && <PostCard.DeleteButton />}
    </CardFooter>
  );
});

PostCard.Interaction.displayName = 'PostCard.Interaction';

PostCard.LikeButton = memo(() => {
  const { post } = usePostCardContext();
  const { user } = useAuthUser();
  const { handleLikePost } = useLikePost(post);

  const isLiked = user ? post.likes.includes(user._id) : false;

  return (
    <Button
      className="flex items-center gap-2"
      size="sm"
      variant="ghost"
      onClick={() => handleLikePost()}
    >
      <Heart
        className={cn('transition', isLiked && 'fill-primary text-primary')}
        size={17}
      />
      <span>{post.likes.length}</span>
    </Button>
  );
});

PostCard.LikeButton.displayName = 'PostCard.LikeButton';

PostCard.DeleteButton = memo(() => {
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

PostCard.DeleteButton.displayName = 'PostCard.DeleteButton';
