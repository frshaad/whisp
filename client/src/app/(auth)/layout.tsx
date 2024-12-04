import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Logo from '@/components/shared/logo';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jwt = cookies().has('jwt');

  if (jwt) {
    redirect('/');
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-16 py-12">
        <Logo />
        {children}
      </div>
    </div>
  );
}
