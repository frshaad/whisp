'use client';

import { Button } from '@/components/ui/button';

type Props = React.ComponentPropsWithoutRef<'button'>;

export default function SubmitButton(props: Props) {
  return (
    <Button type="submit" className="w-full" {...props}>
      {props.disabled ? 'Please wait...' : 'Create an account'}
    </Button>
  );
}
