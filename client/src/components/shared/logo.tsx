import { Podcast } from 'lucide-react';
import Link from 'next/link';

import { pacifico } from '@/lib/fonts';
import { cn } from '@/lib/utils';

type Props = React.ComponentPropsWithoutRef<'div'>;

export default function Logo(props: Props) {
  return (
    <div {...props}>
      <Link href="/" className="flex items-center gap-2">
        <Podcast size={36} />
        <h1 className={cn('text-xl', pacifico.className)}>Whisp</h1>
      </Link>
    </div>
  );
}
