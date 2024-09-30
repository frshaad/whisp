'use client';

import { Ellipsis } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useAuthUser } from '@/hooks/use-auth-user';
import { useUser } from '@/hooks/use-user';

type Props = {
  params: { username: string };
};

export default function ProfilePage({ params: { username } }: Props) {
  const { user: authenticatedUser } = useAuthUser();
  const { user, error, isError, isLoading } = useUser(username);

  const isSelfProfile = authenticatedUser?.username === username;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <section className="flex gap-20 border-b pb-10">
      <div className="size-24">
        <Image
          src={user.profileImg || '/unknown-user.webp'}
          alt={user.fullname}
          width={100}
          height={100}
          priority
          className="rounded-full"
        />
      </div>

      <div className="w-full space-y-4">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-lg font-semibold">{username}</h2>
          {isSelfProfile ? (
            <Button variant="outline">Edit Profile</Button>
          ) : (
            <div className="flex items-center gap-1">
              <Button variant="secondary">Follow</Button>
              <Button variant="ghost">
                <Ellipsis />
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-5">
          <p>
            <span className="mr-1 font-bold">{13}</span>
            <span>{true ? 'posts' : 'post'}</span>
          </p>
          <Button variant="ghost" size="sm">
            <span className="mr-1 font-bold">{212}</span>
            <span>{true ? 'followers' : 'follower'}</span>
          </Button>
          <Button variant="ghost" size="sm">
            <span className="mr-1 font-bold">{212}</span>
            <span>following</span>
          </Button>
        </div>

        <div>
          <p className="font-normal">{user.fullname}</p>
          {user.bio && <p>{user.bio}</p>}
        </div>
      </div>
    </section>
  );
}
