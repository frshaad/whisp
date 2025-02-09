'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Ellipsis, UserPen } from 'lucide-react';

import FollowButton from '@/components/shared/follow-button';
import { Button } from '@/components/ui/button';
import { useAuthUser } from '@/hooks/use-auth-user';
import { useUser } from '@/hooks/use-user';
import { useUserPosts } from '@/hooks/use-user-posts';

import UserStats from './user-stats';

type Properties = { username: string };

export default function UserDashboard({ username }: Properties) {
  const { user: authUser } = useAuthUser();
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
    <section className="flex gap-10 pb-10">
      <div className="size-32">
        <Image
          alt={user.fullname}
          className="rounded-full"
          height={100}
          src={user.profileImg || '/unknown-user.webp'}
          width={100}
          priority
        />
      </div>

      <div className="w-full space-y-4">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-lg font-semibold">{username}</h2>
          {isSelfProfile ? (
            <Button size="sm" variant="outline" asChild>
              <Link
                className="flex items-center gap-2"
                href={`/profile/${username}/edit`}
              >
                <UserPen size={16} />
                Edit Profile
              </Link>
            </Button>
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
          followersCount={user.followers.length}
          followingCount={user.following.length}
          postsCount={posts?.length || 0}
        />

        <div>
          <p className="font-normal">{user.fullname}</p>
          {user.bio ? <p>{user.bio}</p> : undefined}
        </div>
      </div>
    </section>
  );
}
