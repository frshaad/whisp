'use client';

import { useEffect, useState } from 'react';

import type { ButtonProperties } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { useAuthUser } from '@/hooks/use-auth-user';
import { useFollow } from '@/hooks/use-follow';

type Properties = ButtonProperties & {
  userId: string;
  username: string;
};

export default function FollowButton({
  userId,
  username,
  ...properties
}: Properties) {
  const { user: authUser } = useAuthUser();

  const [isAlreadyFollowed, setIsAlreadyFollowed] = useState<boolean>(
    authUser?.following.includes(userId) as boolean
  );
  const { handleFollow } = useFollow(username);

  useEffect(() => {
    setIsAlreadyFollowed(authUser?.following.includes(userId) as boolean);
  }, [authUser, userId]);

  return (
    <Button
      variant={isAlreadyFollowed ? 'default' : 'secondary'}
      onClick={() => {
        setIsAlreadyFollowed((previous) => !previous);
        handleFollow(userId);
      }}
      {...properties}
    >
      {isAlreadyFollowed ? 'Following' : 'Follow'}
    </Button>
  );
}
