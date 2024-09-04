import mongoose from 'mongoose';
import { notificationSchema } from '../schemas/notification.schema';

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
