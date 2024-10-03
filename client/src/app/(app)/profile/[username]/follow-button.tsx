import { Button } from '@/components/ui/button';

type Props = {
  isFollowing: boolean;
  onClick: () => void;
  isLoading: boolean;
};

export default function FollowButton({
  isFollowing,
  onClick,
  isLoading,
}: Props) {
  return (
    <Button
      variant={isFollowing ? 'default' : 'secondary'}
      disabled={isLoading}
      onClick={onClick}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
}
