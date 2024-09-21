import { Dot, PenLine } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NewPost() {
  return (
    <li className="flex items-center">
      <Dot size={30} className="opacity-0" />
      <Button className="gap-3">
        <PenLine size={22} />
        <span>New Post</span>
      </Button>
    </li>
  );
}
