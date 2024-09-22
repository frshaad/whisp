import SearchInput from '@/components/search-input';

import Suggestions from './suggestions';

type Props = React.ComponentPropsWithoutRef<'section'> & {};

export default function ExploreSidebar({ ...props }: Props) {
  return (
    <section {...props}>
      <SearchInput />
      <Suggestions />
    </section>
  );
}
