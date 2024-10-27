import { Button } from '@/components/ui/button';

type Props = {
  postsCount: number;
  followersCount: number;
  followingCount: number;
};

export default function UserStats({
  postsCount,
  followersCount,
  followingCount,
}: Props) {
  return (
    <div className="flex items-center gap-5">
      <p>
        <span className="mr-1 font-bold">{postsCount}</span>
        <span>{postsCount > 1 ? 'posts' : 'post'}</span>
      </p>
      <Button variant="ghost" size="sm">
        <span className="mr-1 font-bold">{followersCount}</span>
        <span>followers</span>
      </Button>
      <Button variant="ghost" size="sm">
        <span className="mr-1 font-bold">{followingCount}</span>
        <span>following</span>
      </Button>
    </div>
  );
}
