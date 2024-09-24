'use client';

import { Button } from '@/components/ui/button';

type Props = React.ComponentPropsWithoutRef<'button'> & { label: string };

export default function SubmitButton({ label, ...props }: Props) {
  return (
    <Button type="submit" className="w-full" {...props}>
      {props.disabled ? 'Please wait...' : label}
    </Button>
  );
}
