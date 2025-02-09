'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Heart, Images, Newspaper } from 'lucide-react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ProfileTabsProperties = {
  username: string;
};

export default function ProfileTabs({ username }: ProfileTabsProperties) {
  let defaultTab: 'posts' | 'media' | 'liked';
  const pathname = usePathname();
  switch (pathname) {
    case `/profile/${username}/liked`: {
      defaultTab = 'liked';
      break;
    }
    case `/profile/${username}/media`: {
      defaultTab = 'media';
      break;
    }
    default: {
      defaultTab = 'posts';
      break;
    }
  }

  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList className="w-full">
        <TabsTrigger className="flex-1" value="posts" asChild>
          <Link
            className="flex items-center gap-2"
            href={`/profile/${username}`}
          >
            <Newspaper size={16} />
            All Posts
          </Link>
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="media" asChild>
          <Link
            className="flex items-center gap-2"
            href={`/profile/${username}/media`}
          >
            <Images size={16} />
            Media
          </Link>
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="liked" asChild>
          <Link
            className="flex items-center gap-2"
            href={`/profile/${username}/liked`}
          >
            <Heart size={16} />
            Liked
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
