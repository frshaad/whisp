export type User = {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  password: string;
  followers: string[];
  following: string[];
  profileImg?: string;
  coverImg?: string;
  bio?: string;
  link?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserBadgeProps = Pick<User, 'fullname' | 'username' | 'profileImg'>;
