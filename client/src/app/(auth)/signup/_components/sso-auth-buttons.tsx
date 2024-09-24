import { FaGithub, FaGoogle } from 'react-icons/fa';

import { Button } from '@/components/ui/button';

export default function SSOAuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" className="flex w-full items-center gap-2">
        <FaGoogle />
        Google
      </Button>
      <Button variant="outline" className="flex w-full items-center gap-2">
        <FaGithub />
        GitHub
      </Button>
    </div>
  );
}
