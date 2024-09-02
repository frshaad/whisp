import mongoose from 'mongoose';

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
