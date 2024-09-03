import mongoose from 'mongoose';

export const createUserResponse = (user: {
  _id: mongoose.Types.ObjectId;
  fullname: string;
  username: string;
  email: string;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  profileImg: string;
  coverImg: string;
  createdAt: NativeDate;
}) => ({
  _id: user._id,
  fullname: user.fullname,
  username: user.username,
  email: user.email,
  followers: user.followers,
  following: user.following,
  profileImg: user.profileImg,
  coverImg: user.coverImg,
  createdAt: user.createdAt,
});
