import { Post } from '@/types/post';

import { CardContent } from '../ui/card';

type Props = {
  post: Post;
};

export default function PostContent({ post: { text, img } }: Props) {
  return <CardContent>{text && <p>{text}</p>}</CardContent>;
}
