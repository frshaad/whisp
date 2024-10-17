import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import FollowingFeed from './_components/following-feed';
import ForYouFeed from './_components/for-you-feed';

export default function HomePage() {
  return (
    <section className="mx-auto w-11/12 sm:w-full">
      <Tabs defaultValue="foryou">
        <TabsList className="w-full">
          <TabsTrigger value="foryou" className="flex-1">
            For You
          </TabsTrigger>
          <TabsTrigger value="following" className="flex-1">
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
