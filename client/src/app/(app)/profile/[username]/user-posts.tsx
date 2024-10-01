'use client';

import Post from '@/components/post';
import { POSTS } from '@/config/dummy-data';
import { useUserPosts } from '@/hooks/use-user-posts';

type Props = {
  username: string;
};

export default function UserPosts({ username }: Props) {
  const {
    posts: userPosts,
    error,
    isError,
    isLoading,
  } = useUserPosts(username);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  // if (!userPosts || userPosts.length === 0) {
  //   return <p>User has no post.</p>;
  // }

  return (
    <section className="space-y-4">
      {POSTS.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </section>
  );
}
