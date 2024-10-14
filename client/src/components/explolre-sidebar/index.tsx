import SearchInput from '@/components/search-input';

import Suggestions from './suggestions';

export default function ExploreSidebar() {
  return (
    <section className="hidden max-w-sm flex-1 space-y-8 px-6 py-10 xl:block">
      <SearchInput />
      <Suggestions />
    </section>
  );
}
