import { Post, type PostType } from '../models/post.model';
import { User, type UserTypeWithId } from '../models/user.model';

export async function feedPostsService(
  user: UserTypeWithId,
): Promise<PostType[]> {
  const authUser = await User.findById(user._id).select('following');
  if (!authUser) {
    throw new Error('Authenticated user not found');
  }

  const posts = await Post.find({ user: { $in: authUser.following } })
    .sort({ createdAt: -1 })
    .populate('user', 'username profileImg fullname')
    .exec();

  return posts;
}
