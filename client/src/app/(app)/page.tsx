import Post from '@/components/post';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { POSTS } from '@/config/dummy-data';

export default function HomePage() {
  return (
    <Tabs defaultValue="foryou" className="mx-auto w-11/12 sm:w-full">
      <TabsList>
        <TabsTrigger value="foryou">For You</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>
      <TabsContent value="foryou">
        <div className="space-y-4">
          {POSTS.map((post) => (
            <Post key={post._id} {...post} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="following">
        <div className="space-y-4">
          {POSTS.map((post) => (
            <Post key={post._id} {...post} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
