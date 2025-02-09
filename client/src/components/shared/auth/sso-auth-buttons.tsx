import { FaGithub, FaGoogle } from 'react-icons/fa';

import { Button } from '@/components/ui/button';

export default function SSOAuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button className="flex w-full items-center gap-2" variant="outline">
        <FaGoogle />
        Google
      </Button>
      <Button className="flex w-full items-center gap-2" variant="outline">
        <FaGithub />
        GitHub
      </Button>
    </div>
  );
}
