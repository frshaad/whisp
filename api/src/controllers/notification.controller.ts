import type { Request, Response } from 'express';
import type mongoose from 'mongoose';

import { Notification } from '../models/notification.model';

export async function getNotifications(req: Request, res: Response) {
  try {
    const userId = req.user?._id;
    const notifications = await Notification.find({ to: userId }).populate({
      path: 'from',
      select: 'username profileImg',
    });
    await Notification.updateMany({ to: userId }, { isRead: true });

    res.status(200).json({ status: 'success', notifications });
  } catch (error) {
    console.log('Error in get notifications controller', error);
    res
      .status(500)
      .json({ status: 'failed', message: 'Internal server error' });
  }
}

export async function deleteNotifications(req: Request, res: Response) {
  try {
    const userId = req.user?._id;

    await Notification.deleteMany({ to: userId });

    res
      .status(200)
      .json({ status: 'success', message: 'Notifications deleted' });
  } catch (error) {
    console.log('Error in delete notification controller', error);
    res
      .status(500)
      .json({ status: 'failed', message: 'Internal server error' });
  }
}

export async function deleteNotification(req: Request, res: Response) {
  try {
    const userId = req.user?._id as mongoose.Types.ObjectId;
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({
        status: 'failed',
        message: 'Notification not found',
      });
    }

    if (notification.to.toString() !== userId.toString()) {
      return res.status(401).json({
        status: 'failed',
        message: 'You do not have access to the notification',
      });
    }
    await Notification.findByIdAndDelete(notificationId);

    res
      .status(200)
      .json({ status: 'success', message: 'Notification deleted' });
  } catch (error) {
    console.log('Error in delete notification controller', error);
    res
      .status(500)
      .json({ status: 'failed', message: 'Internal server error' });
  }
}
