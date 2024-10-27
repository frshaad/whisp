'use client';

import { useEffect, useState } from 'react';

import { Button, ButtonProps } from '@/components/ui/button';
import { useAuthUser } from '@/hooks/use-auth-user';
import { useFollow } from '@/hooks/use-follow';

type Props = ButtonProps & {
  userId: string;
  username: string;
};

export default function FollowButton({ userId, username, ...props }: Props) {
  const { user: authUser } = useAuthUser();

  const [isAlreadyFollowed, setIsAlreadyFollowed] = useState<boolean>(
    authUser?.following.includes(userId) as boolean,
  );
  const { handleFollow } = useFollow(username);

  useEffect(() => {
    setIsAlreadyFollowed(authUser?.following.includes(userId) as boolean);
  }, [authUser, userId]);

  return (
    <Button
      variant={isAlreadyFollowed ? 'default' : 'secondary'}
      onClick={() => {
        setIsAlreadyFollowed((prev) => !prev);
        handleFollow(userId);
      }}
      {...props}
    >
      {isAlreadyFollowed ? 'Following' : 'Follow'}
    </Button>
  );
}
