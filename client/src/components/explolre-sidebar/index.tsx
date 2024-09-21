import SearchInput from '@/components/search-input';
import { cn } from '@/lib/utils';

import Suggestions from './suggestions';

type Props = React.ComponentPropsWithoutRef<'section'> & {};

export default function ExploreSidebar({ ...props }: Props) {
  return (
    <section className={cn('space-y-5', props.className)} {...props}>
      <SearchInput />
      <Suggestions />
    </section>
  );
}
