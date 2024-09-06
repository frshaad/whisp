import { Request, Response } from 'express';
import { Types } from 'mongoose';
import User from '../models/user.model';
import Notification from '../models/notification.model';
import { handleImageUpload, handlePasswordUpdate } from '../utils/helper';
import { UserType } from '../schemas/user.schema';

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

export const getSuggestedUsers = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user?._id;

    const currentUserFollowing =
      await User.findById(currentUserId).select('following');

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: currentUserId },
        },
      },
      {
        $sample: { size: 10 },
      },
    ]);

    const filteredUsers = users.filter(
      (user) => !currentUserFollowing?.following.includes(user._id),
    );
    const suggestedUsers = filteredUsers.slice(0.4);
    suggestedUsers.forEach((user) => (user.password = null));

    res.status(200).json({ status: 'success', suggestedUsers });
  } catch (error) {
    console.log('Error in get suggested users controller', error);
    res
      .status(500)
      .json({ status: 'failed', message: 'Internal server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const {
      fullname,
      email,
      username,
      currentPassword,
      newPassword,
      bio,
      link,
      profileImg,
      coverImg,
    } = req.body;

    const userId = req.user?._id;
    const user = await User.findById(userId);

    // let { profileImg, coverImg } = req.body;

    // const userId = req.user?._id;
    // let user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'User not found' });
    }

    if (
      (currentPassword && !newPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res.status(400).json({
        status: 'failed',
        message: 'Please provide both current and new password',
      });
    }

    // Handle password update if both current and new passwords are provided
    if (currentPassword && newPassword) {
      try {
        await handlePasswordUpdate(user, currentPassword, newPassword);
      } catch (error) {
        return res.status(400).json({
          status: 'failed',
          message: `${error}`,
        });
      }
    }

    const updatedFields: Partial<UserType> = {};

    if (profileImg) {
      updatedFields.profileImg = await handleImageUpload(
        user.profileImg,
        profileImg,
      );
    }

    if (coverImg) {
      updatedFields.coverImg = await handleImageUpload(user.coverImg, coverImg);
    }

    if (fullname) updatedFields.fullname = fullname;
    if (email) updatedFields.email = email;
    if (username) updatedFields.username = username;
    if (bio) updatedFields.bio = bio;
    if (link) updatedFields.link = link;

    Object.assign(user, updatedFields);

    const updatedUser = await user.save();
    updatedUser.password = '';
    return res.status(201).json({ status: 'success', user: updatedUser });
  } catch (error) {
    console.log('Error in update user controller', error);
    res
      .status(500)
      .json({ status: 'failed', message: 'Internal server error' });
  }
};
