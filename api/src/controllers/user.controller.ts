import { Request, Response } from 'express';
import User from '../models/user.model';
import { Types } from 'mongoose';
import Notification from '../models/notification.model';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select('-password');

    if (!user) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'User not found' });
    }

    res.status(200).json({ status: 'success', user });
  } catch (error) {
    console.log('Error in get user profile controller', error);
    res
      .status(500)
      .json({ status: 'failed', message: 'Internal server error' });
  }
};

export const followUnfollowUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const currentUserId = (req.user?._id as string).toString();

    if (currentUserId === id) {
      return res.status(400).json({
        status: 'failed',
        message: 'You can not follow/unfollow yourself',
      });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(id);

    if (!targetUser || !currentUser) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found',
      });
    }

    const isInFollowing = currentUser?.following.includes(
      id as unknown as Types.ObjectId,
    );

    if (isInFollowing) {
      await User.findByIdAndUpdate(id, { $pull: { followers: currentUserId } });
      await User.findByIdAndUpdate(currentUserId, { $pull: { following: id } });
      res.status(200).json({
        status: 'success',
        message: 'User is successfully unfollowed',
        targetUserId: targetUser._id,
      });
    } else {
      await User.findByIdAndUpdate(id, { $push: { followers: currentUserId } });
      await User.findByIdAndUpdate(currentUserId, { $push: { following: id } });
      // Send notification
      const newNotification = new Notification({
        from: currentUserId,
        to: id,
        type: 'follow',
      });
      await newNotification.save();

      res.status(200).json({
        status: 'success',
        message: 'User is successfully followed',
        targetUserId: targetUser._id,
      });
    }
  } catch (error) {
    console.log('Error in get user profile controller', error);
    res
      .status(500)
      .json({ status: 'failed', message: 'Internal server error' });
  }
};
