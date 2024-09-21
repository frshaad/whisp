import SearchInput from '@/components/search-input';

type Props = React.ComponentPropsWithoutRef<'section'> & {};

export default function ExploreSidebar({ ...props }: Props) {
  return (
    <section {...props}>
      <SearchInput />
    </section>
  );
}
