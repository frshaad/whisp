'use client';

import Post from '@/components/post';
import { useFeedPosts } from '@/hooks/use-feed-posts';

export default function HomePage() {
  const { posts, isLoading, isError, error } = useFeedPosts();

  if (isLoading) {
    return <div>Loading feed...</div>;
  }

  if (isError || !posts) {
    return <div>Error loading feed: {error?.message}</div>;
  }

  return (
    <section defaultValue="foryou" className="mx-auto w-11/12 sm:w-full">
      <div className="space-y-4">
        {posts?.length === 0 ? (
          <p>No posts to show. Follow some users to see their posts here!</p>
        ) : (
          posts.map((post) => <Post key={post._id} {...post} />)
        )}
      </div>
    </section>
  );
}
