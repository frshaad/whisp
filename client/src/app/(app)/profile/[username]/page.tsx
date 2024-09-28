'use client';

import { useAuth } from '@/hooks/use-auth';

type Props = {
  params: { username: string };
};

export default function ProfilePage({ params: { username } }: Props) {
  const { isLoading, user } = useAuth();

  return (
    <div>
      <h1>{username}</h1>

      <p>
        {isLoading
          ? 'Loading...'
          : username === user?.username
            ? 'Hello Boss!'
            : 'Hello Guest!'}
      </p>
    </div>
  );
}
