import { Router } from 'express';

import {
  getAuthenticatedUser,
  login,
  logout,
  signup,
} from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import zodMiddleware from '../middlewares/zod.middleware';
import { loginSchema, signupSchema } from '../validation/auth.validation';

const router = Router();

// Public routes
router.post('/signup', zodMiddleware(signupSchema), signup);
router.post('/login', zodMiddleware(loginSchema), login);
router.post('/logout', logout);

// Authenticated routes
router.route('/me').get(authMiddleware, getAuthenticatedUser);

export default router;
