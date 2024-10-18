'use client';

import PostCard from '@/components/post-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFeedPosts } from '@/hooks/use-feed-posts';

export default function ForYouFeed() {
  const { posts, isPending, isError, error } = useFeedPosts();

  if (isPending) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error?.message}</h2>;
  }
  if (!posts) {
    return (
      <h2>No posts to show. Follow some users to see their posts here!</h2>
    );
  }

  return (
    <ScrollArea type="scroll" className="min-h-screen w-full">
      <div className="space-y-4 py-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post}>
            <PostCard.Header />
            <PostCard.Content />
            <PostCard.Interaction />
          </PostCard>
        ))}
      </div>
    </ScrollArea>
  );
}
