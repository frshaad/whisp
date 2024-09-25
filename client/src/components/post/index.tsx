import { Card } from '@/components/ui/card';
import { Post as PostType } from '@/types/post';

import PostContent from './post-content';
import PostHeader from './post-header';
import PostInterAction from './post-interaction';

export default function Post(post: PostType) {
  return (
    <Card>
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostInterAction post={post} />
    </Card>
  );
}
