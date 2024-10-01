'use client';

import { Ellipsis } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useAuthUser } from '@/hooks/use-auth-user';
import { useUser } from '@/hooks/use-user';
import { useUserPosts } from '@/hooks/use-user-posts';

type Props = { username: string };

export default function UserDashboard({ username }: Props) {
  const { user: authenticatedUser } = useAuthUser();
  const {
    user,
    error: userError,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useUser(username);
  const { posts } = useUserPosts(username);

  const isSelfProfile = authenticatedUser?.username === username;

  if (isUserLoading) {
    return <p>Loading...</p>;
  }

  if (isUserError) {
    return <p>{userError?.message}</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <section className="flex gap-10 border-b pb-10">
      <div className="size-32">
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
            <span className="mr-1 font-bold">{posts?.length}</span>
            <span>{posts && posts?.length > 1 ? 'posts' : 'post'}</span>
          </p>
          <Button variant="ghost" size="sm">
            <span className="mr-1 font-bold">{user.followers.length}</span>
            <span>followers</span>
          </Button>
          <Button variant="ghost" size="sm">
            <span className="mr-1 font-bold">{user.following.length}</span>
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
