import UserBadge from '@/components/shared/user-badge';
import { User } from '@/types/user';

import FollowButton from '../shared/follow-button';

export default function SuggestionItem(user: User) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <UserBadge
        fullname={user.fullname}
        username={user.username}
        profileImg={user.profileImg}
      />
      <FollowButton userId={user._id} username={user.username} />
    </div>
  );
}
