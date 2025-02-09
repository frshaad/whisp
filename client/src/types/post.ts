import type { UserBadgeProperties } from './user';

export type Post = {
  _id: string;
  user: UserBadgeProperties;
  text?: string;
  img?: string;
  likes: string[];
  comments: Array<{
    _id: string;
    text: string;
    user: UserBadgeProperties;
  }>;
  createdAt: Date;
  updatedAt: Date;
};
