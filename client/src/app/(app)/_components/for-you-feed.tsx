'use client';

import Post from '@/components/post';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TabsContent } from '@/components/ui/tabs';
import { useFeedPosts } from '@/hooks/use-feed-posts';

export default function ForYouFeed() {
  const { posts, isLoading, isError, error } = useFeedPosts();

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
    <TabsContent value="foryou" className="pt-2">
      <ScrollArea type="scroll" className="h-screen w-full">
        <div className="space-y-4">
          {posts.map((post) => (
            <Post key={post._id} {...post} />
          ))}
        </div>
      </ScrollArea>
    </TabsContent>
  );
}
