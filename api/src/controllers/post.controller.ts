import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import User from '../models/user.model';
import Post from '../models/post.model';
import mongoose from 'mongoose';
import Notification from '../models/notification.model';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const currentUserId = req.user?._id;
    const user = await User.findById(currentUserId);

    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found',
      });
    }

    if (!text && !img) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post must have content (text or image)',
      });
    }

    if (img) {
      const uploadedImgRes = await cloudinary.uploader.upload(img);
      img = uploadedImgRes.secure_url;
    }

    const newPost = new Post({ user: currentUserId, text, img });
    await newPost.save();
    return res.status(201).json({ status: 'success', post: newPost });
  } catch (error) {
    console.log('Error in create post controller', error);
    res.status(500).json({
      status: 'failed',
      message: 'An error occurred while creating the post.',
    });
  }
};

export const likeUnlikePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const currentUserId = req.user?._id as mongoose.Types.ObjectId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    const isLikedByUser = post.likes.includes(currentUserId);

    if (isLikedByUser) {
      await Post.updateOne(
        { _id: postId },
        { $pull: { likes: currentUserId } },
      );
      await User.updateOne(
        { _id: currentUserId },
        { $pull: { likedPosts: postId } },
      );
      res.status(200).json({
        status: 'success',
        message: 'Post successfully unliked',
        postId,
      });
    } else {
      post.likes.push(currentUserId);
      await User.updateOne(
        { _id: currentUserId },
        { $push: { likedPosts: postId } },
      );
      await post.save();
      const notification = new Notification({
        from: currentUserId,
        to: post.user,
        type: 'like',
      });
      await notification.save();

      res.status(200).json({
        status: 'success',
        message: 'Post successfully liked',
        postId,
      });
    }
  } catch (error) {
    console.log('Error in create post controller', error);
    res
      .status(500)
      .json({ status: 'failed', message: 'Internal server error' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const currentUserId = req.user?._id as mongoose.Types.ObjectId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    const isUserAuthorized = post.user.toString() === currentUserId.toString();

    if (!isUserAuthorized) {
      return res.status(403).json({
        status: 'failed',
        message: 'You only can delete your posts',
      });
    }

    const imgId = post.img?.split('/').pop()?.split('.')[0];
    if (imgId) {
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(postId);
    res
      .status(200)
      .json({ status: 'success', message: 'Post deleted successfully' });
  } catch (error) {
    console.log('Error in delete post controller', error);
    res
      .status(500)
      .json({ status: 'failed', message: 'Internal server error' });
  }
};

export const commentOnPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const currentUserId = req.user?._id as mongoose.Types.ObjectId;

    if (!text) {
      return res.status(400).json({
        status: 'failed',
        message: "Comment couldn't be empty",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    const comment = { text, user: currentUserId };
    post.comments.push(comment);
    await post.save();
    res.status(200).json({ status: 'success', post, comment });
  } catch (error) {
    console.log('Error in comment on post controller', error);
    res
      .status(500)
      .json({ status: 'failed', message: 'Internal server error' });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .sort({ createAt: -1 })
      .populate('user', '-password')
      .populate('comments.user', '-password');
    res.status(200).json({ status: 'success', count: posts.length, posts });
  } catch (error) {
    console.log('Error in get all posts controller', error);
    res
      .status(500)
      .json({ status: 'failed', message: 'Internal server error' });
  }
};

export const getLikedPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found',
      });
    }

    const likedPosts = await Post.find({
      _id: { $in: user.likedPosts },
    })
      .populate('user', '-password')
      .populate('comments.user', '-password');

    res.status(200).json({ status: 'success', likedPosts });
  } catch (error) {
    console.log('Error in liked posts controller', error);
    res
      .status(500)
      .json({ status: 'failed', message: 'Internal server error' });
  }
};

export const getFollowingPosts = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user?._id as mongoose.Types.ObjectId;
    const user = await User.findById(currentUserId);
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found',
      });
    }

    const { following } = user;
    const feedPosts = await Post.find({ user: { $in: following } })
      .sort({
        createdAt: -1,
      })
      .populate('user', '-password')
      .populate('comments.user', '-password');

    res.status(200).json({ status: 'success', feedPosts });
  } catch (error: any) {
    if (error.message) {
      console.error(
        'Error in getFollowingPosts controller',
        error.message,
        error.stack,
      );
    } else {
      console.log('Error in get following posts controller', error);
    }

    res
      .status(500)
      .json({ status: 'failed', message: 'Internal server error' });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found',
      });
    }

    const posts = await Post.find({ user: user._id })
      .sort({
        createdAt: -1,
      })
      .populate('user', '-password')
      .populate('comments.user', '-password');

    res.status(200).json({ status: 'success', posts });
  } catch (error) {
    console.log('Error in get following posts controller', error);
    res
      .status(500)
      .json({ status: 'failed', message: 'Internal server error' });
  }
};
