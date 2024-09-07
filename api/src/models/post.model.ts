import mongoose from 'mongoose';
import { postSchema } from '../schemas/post.schema';

const Post = mongoose.model('Post', postSchema);

export default Post;
