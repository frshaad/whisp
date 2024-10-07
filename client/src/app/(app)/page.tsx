import Post from '@/components/post';
import { POSTS } from '@/config/dummy-data';

export default function HomePage() {
  return (
    <section defaultValue="foryou" className="mx-auto w-11/12 sm:w-full">
      <div className="space-y-4">
        {POSTS.map((post) => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </section>
  );
}
