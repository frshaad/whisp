import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import { createPost } from '../controllers/post.contoller';

const router = Router();

router.route('/create').post(authMiddleware, createPost);
// router.route('/like/:postId').post(authMiddleware, likeUnlikePost);
// router.route('/comment/:postId').post(authMiddleware, commentOnPost);
// router.route('/:postId').delete(authMiddleware, deletePost);

export default router;
