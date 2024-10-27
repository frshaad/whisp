'use client';

import { Heart, Images, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ProfileTabsProps = {
  username: string;
};

export default function ProfileTabs({ username }: ProfileTabsProps) {
  let defaultTab: 'posts' | 'media' | 'liked';
  const pathname = usePathname();
  switch (pathname) {
    case `/profile/${username}/liked`:
      defaultTab = 'liked';
      break;
    case `/profile/${username}/media`:
      defaultTab = 'media';
      break;
    default:
      defaultTab = 'posts';
      break;
  }

  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList className="w-full">
        <TabsTrigger value="posts" className="flex-1" asChild>
          <Link
            href={`/profile/${username}`}
            className="flex items-center gap-2"
          >
            <Newspaper size={16} />
            All Posts
          </Link>
        </TabsTrigger>
        <TabsTrigger value="media" className="flex-1" asChild>
          <Link
            href={`/profile/${username}/media`}
            className="flex items-center gap-2"
          >
            <Images size={16} />
            Media
          </Link>
        </TabsTrigger>
        <TabsTrigger value="liked" className="flex-1" asChild>
          <Link
            href={`/profile/${username}/liked`}
            className="flex items-center gap-2"
          >
            <Heart size={16} />
            Liked
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
