'use client';

import { Ellipsis } from 'lucide-react';
import Image from 'next/image';

import FollowButton from '@/components/shared/follow-button';
import { Button } from '@/components/ui/button';
import { useGetAuthUser } from '@/hooks/use-get-auth-user';
import { useUser } from '@/hooks/use-user';
import { useUserPosts } from '@/hooks/use-user-posts';

import UserStats from './user-stats';

type Props = { username: string };

export default function UserDashboard({ username }: Props) {
  const authUser = useGetAuthUser();
  const {
    user,
    error: userError,
    isError: isUserError,
    isPending: isUserLoading,
  } = useUser(username);
  const { posts } = useUserPosts(username);

  const isSelfProfile = authUser?.username === username;

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
              <FollowButton userId={user._id} username={username} />
              <Button variant="ghost">
                <Ellipsis />
              </Button>
            </div>
          )}
        </div>

        <UserStats
          postsCount={posts?.length || 0}
          followersCount={user.followers.length}
          followingCount={user.following.length}
        />

        <div>
          <p className="font-normal">{user.fullname}</p>
          {user.bio && <p>{user.bio}</p>}
        </div>
      </div>
    </section>
  );
}
