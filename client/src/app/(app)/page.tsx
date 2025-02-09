import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import FollowingFeed from './_components/following-feed';
import ForYouFeed from './_components/for-you-feed';

export default function HomePage() {
  return (
    <section className="mx-auto w-11/12 sm:w-full">
      <Tabs defaultValue="foryou">
        <TabsList className="w-full">
          <TabsTrigger className="flex-1" value="foryou">
            For You
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="following">
            Following
          </TabsTrigger>
        </TabsList>

        <TabsContent value="foryou">
          <ForYouFeed />
        </TabsContent>
        <TabsContent value="following">
          <FollowingFeed />
        </TabsContent>
      </Tabs>
    </section>
  );
}
