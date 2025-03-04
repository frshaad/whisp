import { Router } from 'express';

import { getFeed } from '../controllers/feed.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

// Get feed for the authenticated user
router.get('/', getFeed);

export default router;
