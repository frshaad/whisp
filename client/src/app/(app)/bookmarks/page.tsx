import Post from '@/components/post';
import { POSTS } from '@/config/dummy-data';

export default function BookmarksPage() {
  return (
    <div className="space-y-4">
      {POSTS.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </div>
  );
}
