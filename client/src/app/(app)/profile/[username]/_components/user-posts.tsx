'use client';

import PostCard from '@/components/post-card';
import { useUserPosts } from '@/hooks/use-user-posts';

type Properties = {
  username: string;
};

export default function UserPosts({ username }: Properties) {
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
        <PostCard key={post._id} post={post}>
          <PostCard.Header />
          <PostCard.Content />
          <PostCard.Interaction />
        </PostCard>
      ))}
    </section>
  );
}
