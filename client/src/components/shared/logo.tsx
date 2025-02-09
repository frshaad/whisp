import Link from 'next/link';

import { Podcast } from 'lucide-react';

import { pacifico } from '@/lib/fonts';
import { cn } from '@/lib/utils';

type Properties = React.ComponentPropsWithoutRef<'div'>;

export default function Logo(properties: Properties) {
  return (
    <div {...properties}>
      <Link className="flex items-center gap-2" href="/">
        <Podcast size={36} />
        <h1 className={cn('text-xl', pacifico.className)}>Whisp</h1>
      </Link>
    </div>
  );
}
