'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Ellipsis } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useAuthUser } from '@/hooks/use-auth-user';
import { useUser } from '@/hooks/use-user';
import { useUserPosts } from '@/hooks/use-user-posts';
import api from '@/lib/api';

import FollowButton from './follow-button';
import UserStats from './user-stats';

type Props = { username: string };

export default function UserDashboard({ username }: Props) {
  const queryClient = useQueryClient();

  const { user: authenticatedUser } = useAuthUser();
  const {
    user,
    error: userError,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useUser(username);
  const { posts } = useUserPosts(username);

  const isSelfProfile = authenticatedUser?.username === username;
  const isAlreadyFollowed = !!authenticatedUser?.following.find(
    (userId) => userId === user?._id,
  );

  const { mutate: followUser, isPending: isFollowingLoading } = useMutation({
    mutationFn: async () => {
      await api.post(`/users/follow/${user?._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      queryClient.invalidateQueries({ queryKey: ['user', username] });
    },
    onError: () => {
      toast.error('Failed to follow/unfollow user. Please try again.');
    },
  });

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
              <FollowButton
                isFollowing={isAlreadyFollowed}
                onClick={followUser}
                isLoading={isFollowingLoading}
              />
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
