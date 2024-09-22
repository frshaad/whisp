import UserBadge from '@/components/shared/user-badge';
import { Button } from '@/components/ui/button';
import { UserBadgeProps } from '@/types/user';

export default function SuggestionItem(userBadgeProps: UserBadgeProps) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <UserBadge {...userBadgeProps} />
      <Button variant="secondary" size="sm">
        Follow
      </Button>
    </div>
  );
}
