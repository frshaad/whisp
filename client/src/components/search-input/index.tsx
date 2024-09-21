import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SearchInput() {
  return (
    <div className="relative">
      <Label htmlFor="Search" className="sr-only">
        Search
      </Label>
      <Input
        type="text"
        id="Search"
        placeholder="Search for..."
        className="w-full py-2.5 pe-10"
      />
      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center text-muted-foreground">
        <span className="sr-only">Search</span>
        <Search size={16} />
      </span>
    </div>
  );
}