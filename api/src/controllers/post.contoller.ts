import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import User from '../models/user.model';
import Post from '../models/post.model';

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
    res
      .status(500)
      .json({ status: 'failed', message: 'Internal server error' });
  }
};
