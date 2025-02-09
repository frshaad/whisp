import { Button } from '@/components/ui/button';

type Properties = {
  postsCount: number;
  followersCount: number;
  followingCount: number;
};

export default function UserStats({
  postsCount,
  followersCount,
  followingCount,
}: Properties) {
  return (
    <div className="flex items-center gap-5">
      <p>
        <span className="mr-1 font-bold">{postsCount}</span>
        <span>{postsCount > 1 ? 'posts' : 'post'}</span>
      </p>
      <Button size="sm" variant="ghost">
        <span className="mr-1 font-bold">{followersCount}</span>
        <span>followers</span>
      </Button>
      <Button size="sm" variant="ghost">
        <span className="mr-1 font-bold">{followingCount}</span>
        <span>following</span>
      </Button>
    </div>
  );
}
