import { Router } from 'express';
import {
  getAuthenticatedUser,
  login,
  logout,
  signup,
} from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Authenticated routes
router.route('/me').get(authMiddleware, getAuthenticatedUser);

export default router;
