import Image from 'next/image';

import FriendsImg from '@/assets/friends.jpg';
import Logo from '@/components/shared/logo';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex flex-col items-center justify-center gap-24 py-12">
        <Logo />
        {children}
      </div>
      <div className="hidden h-screen bg-muted lg:block">
        <Image
          src={FriendsImg}
          alt="friends"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
