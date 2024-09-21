import { Router } from 'express';
import {
  getNotifications,
  deleteNotifications,
  deleteNotification,
} from '../controllers/notification.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.route('/').get(getNotifications).delete(deleteNotifications);
router.route('/:notificationId').delete(deleteNotification);

export default router;
