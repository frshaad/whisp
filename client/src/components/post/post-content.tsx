import Image from 'next/image';

import { CardContent } from '@/components/ui/card';
import { vazir } from '@/lib/fonts';
import { langDirection } from '@/lib/languages';
import { cn } from '@/lib/utils';
import { Post } from '@/types/post';

type Props = {
  post: Post;
};

export default function PostContent({ post: { text, img } }: Props) {
  let langDir;
  if (text) {
    langDir = langDirection(text);
  }

  return (
    <CardContent className="block space-y-6">
      {text && (
        <p dir={langDir} className={cn(langDir === 'rtl' && vazir.className)}>
          {text}
        </p>
      )}
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
