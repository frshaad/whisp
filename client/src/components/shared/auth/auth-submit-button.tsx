'use client';

import { Button } from '@/components/ui/button';

type Properties = React.ComponentPropsWithoutRef<'button'> & { label: string };

export default function SubmitButton({ label, ...properties }: Properties) {
  return (
    <Button className="w-full" type="submit" {...properties}>
      {properties.disabled ? 'Please wait...' : label}
    </Button>
  );
}
