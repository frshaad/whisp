'use client';

import Post from '@/components/post';
import { useUserPosts } from '@/hooks/use-user-posts';

type Props = {
  username: string;
};

export default function UserPosts({ username }: Props) {
  const {
    posts: userPosts,
    error,
    isError,
    isPending,
  } = useUserPosts(username);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  if (!userPosts || userPosts.length === 0) {
    return <p>User has no post.</p>;
  }

  return (
    <section className="space-y-4">
      {userPosts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </section>
  );
}
