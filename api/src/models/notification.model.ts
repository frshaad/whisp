import { type InferSchemaType, Schema, model } from 'mongoose';

const notificationSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
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

type NotificationType = InferSchemaType<typeof notificationSchema>;
const Notification = model('Notification', notificationSchema);

export { Notification, type NotificationType };
