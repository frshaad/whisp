import { Heart, UserPlus } from 'lucide-react';
import Link from 'next/link';

import { Card } from '@/components/ui/card';

type Props = {
  type: 'follow' | 'like';
  link: string;
  user: string;
};

export default function NotificationCard({ type, link, user }: Props) {
  return (
    <Link href={link}>
      <Card className="flex flex-row items-center gap-5 px-6 py-3">
        {type === 'like' ? <Heart size={20} /> : <UserPlus size={20} />}
        {type === 'like' ? (
          <p>
            <span className="font-medium">{user}</span> liked your post.
          </p>
        ) : (
          <p>
            <span className="font-medium">{user}</span> followed you.
          </p>
        )}
      </Card>
    </Link>
  );
}
