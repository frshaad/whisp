import mongoose from 'mongoose';

export const notificationSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['follow', 'like'],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export type NotificationType = mongoose.Document & {
  from: mongoose.Schema.Types.ObjectId;
  to: mongoose.Schema.Types.ObjectId;
  type: 'follow' | 'like';
  isRead?: boolean;
};
