import Post from '../models/post.model';
import User from '../models/user.model';
import { PostType } from '../schemas/post.schema';
import { UserType } from '../schemas/user.schema';

export const feedPostsService = async (user: UserType): Promise<PostType[]> => {
  const authUser = await User.findById(user._id).select('following');
  if (!authUser) {
    throw new Error('Authenticated user not found');
  }

  const posts = await Post.find({ user: { $in: authUser.following } })
    .sort({ createdAt: -1 })
    .populate('user', 'username profileImg fullname')
    .exec();

  return posts;
};
