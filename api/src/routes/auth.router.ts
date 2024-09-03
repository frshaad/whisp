import { Router } from 'express';
import {
  getAuthenticatedUser,
  login,
  logout,
  signup,
} from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/me').get(authMiddleware, getAuthenticatedUser);

export default router;
