import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import { getUserProfile } from '../controllers/user.controller';

const router = Router();

router.route('/profile/:username').get(authMiddleware, getUserProfile);
router.route('/suggested').get(authMiddleware);
router.route('/follow/:id').post(authMiddleware);
router.route('/update').post(authMiddleware);

export default router;
