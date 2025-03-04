import type { Request, Response } from 'express';

import { feedPostsService } from '../services/feed.services';

export async function getFeed(req: Request, res: Response) {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 'failed', message: error.message });
    }

    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong. Please try again later.',
    });
  }
}
