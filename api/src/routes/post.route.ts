import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getLikedPosts,
  getUserPosts,
  likeUnlikePost,
} from '../controllers/post.contoller';

const router = Router();

router.route('/').get(authMiddleware, getAllPosts);
router.route('/:username').get(authMiddleware, getUserPosts);
router.route('/following').get(authMiddleware, getFollowingPosts);
router.route('/create').post(authMiddleware, createPost);
router.route('/likes/:userId').get(authMiddleware, getLikedPosts);
router.route('/like/:postId').post(authMiddleware, likeUnlikePost);
router.route('/comment/:postId').post(authMiddleware, commentOnPost);
router.route('/:postId').delete(authMiddleware, deletePost);

export default router;
