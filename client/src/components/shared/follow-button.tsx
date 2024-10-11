'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { useAuthUser } from '@/hooks/use-auth-user';
import { useFollow } from '@/hooks/use-follow';

type Props = ButtonProps & {
  userId: string;
  username: string;
};

export default function FollowButton({ userId, username, ...props }: Props) {
  const { user: authUser } = useAuthUser();
  const { handleFollow, isFollowing } = useFollow(username);

  const isAlreadyFollowed = authUser?.following.includes(userId);

  return (
    <Button
      variant={isAlreadyFollowed ? 'default' : 'secondary'}
      disabled={isFollowing}
      onClick={() => handleFollow(userId)}
      {...props}
    >
      {isAlreadyFollowed ? 'Following' : 'Follow'}
    </Button>
  );
}
