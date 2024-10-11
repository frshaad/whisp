'use client';

import Post from '@/components/post';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TabsContent } from '@/components/ui/tabs';
import { useFeedPosts } from '@/hooks/use-feed-posts';

export default function FollowingFeed() {
  const { posts, isLoading, isError, error } = useFeedPosts('following');

  if (isLoading) {
    return <h2>Loading...</h2>;
  } else if (isError) {
    return <h2>{error?.message}</h2>;
  } else if (!posts) {
    return (
      <h2>No posts to show. Follow some users to see their posts here!</h2>
    );
  }

  return (
    <TabsContent value="foryou">
      <ScrollArea type="scroll" className="min-h-screen w-full">
        {posts.map((post) => (
          <Post key={post._id} {...post} />
        ))}
      </ScrollArea>
    </TabsContent>
  );
}
