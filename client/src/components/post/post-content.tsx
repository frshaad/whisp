import Image from 'next/image';

import { CardContent } from '@/components/ui/card';
import { Post } from '@/types/post';

type Props = {
  post: Post;
};

export default function PostContent({ post: { text, img } }: Props) {
  return (
    <CardContent className="block space-y-6">
      {text && <p>{text}</p>}
      {img && (
        <Image
          src={img}
          alt={text || 'post'}
          width={100}
          height={100}
          className="w-full rounded-md border"
        />
      )}
    </CardContent>
  );
}
