import mongoose, { Document } from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    profileImg: {
      type: String,
      default: '',
    },
    coverImg: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

export type UserType = Document & {
  username: string;
  fullname: string;
  email: string;
  password: string;
  followers: mongoose.Schema.Types.ObjectId[];
  following: mongoose.Schema.Types.ObjectId[];
  profileImg?: string;
  coverImg?: string;
  bio?: string;
  link?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
