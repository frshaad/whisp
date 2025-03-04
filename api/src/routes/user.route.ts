import { Router } from 'express';

import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  updateUser,
} from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

// User profile routes
router.route('/profile/:username').get(getUserProfile);
router.route('/update').post(updateUser);

// Follow/unfollow and suggested users routes
router.route('/follow/:id').post(followUnfollowUser);
router.route('/suggested').get(getSuggestedUsers);

export default router;
