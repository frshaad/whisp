import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function AuthButtons() {
  return (
    <div className="flex w-full items-center gap-2">
      <Link className="w-1/2" href="/login">
        <Button className="w-full" variant="outline">
          Log In
        </Button>
      </Link>
      <Link className="w-1/2" href="/signup">
        <Button className="w-full">Sign Up</Button>
      </Link>
    </div>
  );
}
