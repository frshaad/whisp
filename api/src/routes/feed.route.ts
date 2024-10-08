import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import { getFeed } from '../controllers/feed.controller';

const router = Router();

router.use(authMiddleware);

// Get feed for the authenticated user
router.get('/', getFeed);

export default router;
