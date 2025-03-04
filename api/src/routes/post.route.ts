import { Router } from 'express';

import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getLikedPosts,
  getUserPosts,
  likeUnlikePost,
} from '../controllers/post.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

// Posts related routes
router.route('/').get(getAllPosts).post(createPost);

// Get posts by specific user or following
router.route('/:username').get(getUserPosts);
router.route('/following').get(getFollowingPosts);

// Like/unlike and get liked posts
router.route('/like/:postId').post(likeUnlikePost);
router.route('/likes/:userId').get(getLikedPosts);

// Comment and delete posts
router.route('/comment/:postId').post(commentOnPost);
router.route('/:postId').delete(deletePost);

export default router;
