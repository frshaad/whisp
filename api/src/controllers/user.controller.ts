import { Request, Response } from 'express';
import User from '../models/user.model';

export const getUserProfile = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
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
