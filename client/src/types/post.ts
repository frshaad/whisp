import { UserBadgeProps } from './user';

export type Post = {
  _id: string;
  user: UserBadgeProps;
  text?: string;
  img?: string;
  likes: string[];
  comments: Array<{
    _id: string;
    text: string;
    user: UserBadgeProps;
  }>;
  createdAt: Date;
  updatedAt: Date;
};
