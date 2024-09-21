import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function AuthButtons() {
  return (
    <div className="flex w-full items-center gap-2">
      <Link href="/login" className="w-1/2">
        <Button variant="outline" className="w-full">
          Log In
        </Button>
      </Link>
      <Link href="/signup" className="w-1/2">
        <Button className="w-full">Sign Up</Button>
      </Link>
    </div>
  );
}
