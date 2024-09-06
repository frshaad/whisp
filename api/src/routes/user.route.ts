import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  updateUser,
} from '../controllers/user.controller';

const router = Router();

router.route('/profile/:username').get(authMiddleware, getUserProfile);
router.route('/follow/:id').post(authMiddleware, followUnfollowUser);
router.route('/suggested').get(authMiddleware, getSuggestedUsers);
router.route('/update').post(authMiddleware, updateUser);

export default router;
