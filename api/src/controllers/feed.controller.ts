import { Response, Request } from 'express';
import { feedPostsService } from '../services/feed.services';

export const getFeed = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(401).json({
        status: 'failed',
        message: 'User not authenticated',
      });
    }

    const posts = await feedPostsService(user);

    res.status(200).json({ status: 'success', posts });
  } catch (error: any) {
    if (error.message) {
      return res.status(400).json({ status: 'failed', message: error.message });
    }

    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong. Please try again later.',
    });
  }
};
